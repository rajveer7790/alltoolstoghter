"""Anonymous, bounded document gateway. Deploy separately from the static frontend."""
import asyncio
from collections import defaultdict, deque
from contextlib import asynccontextmanager, suppress
import json
import mimetypes
import os
from pathlib import Path
import re
import tempfile
import time
import zipfile

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from starlette.concurrency import run_in_threadpool
from starlette.datastructures import UploadFile
import httpx

from . import engines, stirling
from .runtime import ToolError

CATALOG = Path(os.getenv('DOCUMENT_CATALOG', Path(__file__).resolve().parents[2] / 'lib/documents/tools.json'))
TOOLS = {tool['id']: tool for tool in json.loads(CATALOG.read_text()) if tool['mode'] == 'server'}
MAX_BODY = 32 * 1024 * 1024
MAX_FILE = 20 * 1024 * 1024
CONCURRENCY = asyncio.Semaphore(int(os.getenv('DOCUMENT_CONCURRENCY', '2')))
REQUESTS = defaultdict(deque)
@asynccontextmanager
async def lifespan(_app):
    async def cleanup():
        from .office import clean_sessions
        while True:
            await run_in_threadpool(clean_sessions)
            await asyncio.sleep(60)
    task = asyncio.create_task(cleanup())
    yield
    task.cancel()
    with suppress(asyncio.CancelledError):
        await task

app = FastAPI(lifespan=lifespan, title='All Tools Together document API', docs_url=None, redoc_url=None, openapi_url=None)
origins = os.getenv('CORS_ORIGIN', 'https://alltoolstogether.com,http://localhost:3000,http://localhost:3100').split(',')
app.add_middleware(CORSMiddleware, allow_origins=[v.strip() for v in origins], allow_methods=['GET', 'POST'],
                   allow_headers=['Content-Type'], expose_headers=['Content-Disposition'], allow_credentials=False)


class BodyLimit:
    def __init__(self, app):
        self.app = app
    async def __call__(self, scope, receive, send):
        size = 0
        async def limited():
            nonlocal size
            message = await receive()
            size += len(message.get('body', b''))
            if size > MAX_BODY:
                raise ToolError('Upload limit is 32 MB per request.', 413)
            return message
        await self.app(scope, limited, send)


app.add_middleware(BodyLimit)
from .office import router as office_router, configured as office_configured
app.include_router(office_router)


@app.exception_handler(ToolError)
async def tool_error(_request, error):
    return JSONResponse({'error': error.message}, status_code=error.status, headers={'Cache-Control': 'no-store'})


@app.get('/health')
async def health():
    return {'ok': True, 'service': 'alltoolstogether-documents', 'apiVersion': 1}


async def readiness(engine):
    ready, reason = engines.available(engine)
    url = engines.endpoint(engine)
    if url:
        try:
            async with httpx.AsyncClient(trust_env=False, timeout=3) as client:
                response = await client.get(url + '/health')
                response.raise_for_status()
                if engine != 'gotenberg':
                    # Worker health alone is insufficient: ensure this engine is installed there.
                    capabilities = await client.get(url + '/capabilities')
                    capabilities.raise_for_status()
                    ready = any(t.get('engine') == engine and t.get('available') for t in capabilities.json().get('tools', []))
                    if not ready:
                        reason = 'The worker is online but its processing engine is unavailable.'
        except (httpx.HTTPError, ValueError):
            ready, reason = False, 'This processing service is offline.'
    return engine, ready, reason


@app.get('/capabilities')
async def capabilities():
    status = {name: (ready, reason) for name, ready, reason in await asyncio.gather(*(readiness(name) for name in {t['engine'] for t in TOOLS.values()}))}
    extra, exclusions = await run_in_threadpool(stirling.discover)
    tools = [{**tool, 'available': status[tool['engine']][0], 'unavailableReason': status[tool['engine']][1]} for tool in TOOLS.values()]
    tools += [{k: v for k, v in tool.items() if not k.startswith('_')} | {'available': True} for tool in extra.values()]
    workspaces = {}
    office_ready = False
    async with httpx.AsyncClient(trust_env=False, timeout=3) as client:
        for name in ['bento', 'pdfcraft']:
            url = os.getenv(name.upper() + '_PUBLIC_URL', '')
            internal = os.getenv(name.upper() + '_INTERNAL_URL', '')
            if url and internal:
                try:
                    result = await client.get(internal)
                    if result.status_code == 200: workspaces[name] = url
                except httpx.HTTPError: pass
        if office_configured():
            try:
                result = await client.get(os.getenv('ONLYOFFICE_INTERNAL_URL', 'http://onlyoffice') + '/healthcheck')
                office_ready = result.status_code == 200 and result.text.strip() == 'true'
            except httpx.HTTPError: pass
    return JSONResponse({'apiVersion': 1, 'tools': tools, 'excluded': exclusions,
                         'officeEditor': {'available': office_ready},
                         'limits': {'fileBytes': MAX_FILE, 'requestBytes': MAX_BODY, 'files': 8, 'pdfPages': 200},
                         'workspaces': workspaces},
                        headers={'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex'})


def validate_options(tool, supplied):
    if not isinstance(supplied, dict):
        raise ToolError('Options must be an object.', 400)
    fields = {field['key']: field for field in tool['fields']}
    if set(supplied) - fields.keys():
        raise ToolError('An unsupported option was submitted.', 400)
    output = {}
    for key, field in fields.items():
        value = supplied.get(key, field.get('default', ''))
        if field.get('required') and value in ['', None]:
            raise ToolError('Complete the required options.', 400)
        if isinstance(value, (dict, list)) or len(str(value)) > 12000:
            raise ToolError('An option is invalid or too long.', 400)
        kind = field['kind']
        if kind == 'checkbox':
            if not isinstance(value, bool):
                raise ToolError('Checkbox options must be true or false.', 400)
        elif kind == 'number' and value != '':
            try:
                number = float(value)
                if not __import__('math').isfinite(number) or number < field.get('min', -1e9) or number > field.get('max', 1e9):
                    raise ValueError()
            except (ValueError, TypeError):
                raise ToolError('A numeric option is outside its allowed range.', 400)
        if field.get('options') and str(value) not in [str(v) for v in field['options']]:
            raise ToolError('Choose one of the available options.', 400)
        output[key] = value
    return output


def validate_upload(path, accept):
    extension = path.suffix.lower()
    if accept != '*' and extension not in accept.split(','):
        raise ToolError('Choose a file in a supported format.', 415)
    with path.open('rb') as stream:
        head = stream.read(1024)
    if extension == '.pdf' and b'%PDF-' not in head:
        raise ToolError('This file is not a PDF.', 415)
    if extension in {'.docx', '.xlsx', '.pptx', '.odt', '.ods', '.odp', '.zip', '.epub'}:
        try:
            with zipfile.ZipFile(path) as archive:
                entries = archive.infolist()
                if len(entries) > 10000 or sum(e.file_size for e in entries) > 100 * 1024 * 1024:
                    raise ToolError('This document expands beyond the processing limit.', 413)
                if any((e.external_attr >> 16) & 0o170000 == 0o120000 for e in entries):
                    raise ToolError('Archive symbolic links are unsupported.', 400)
                if any(e.filename.startswith(('/', '\\')) or '..' in Path(e.filename.replace('\\', '/')).parts for e in entries):
                    raise ToolError('This document contains unsafe archive paths.', 400)
        except zipfile.BadZipFile:
            raise ToolError('This Office document or archive is invalid.', 415)


@app.post('/process/{identifier:path}')
async def process(identifier: str, request: Request):
    now = time.monotonic()
    address = request.client.host if request.client else 'unknown'
    # Bound memory as well as frequency. Proxy headers are not trusted by default.
    if len(REQUESTS) > 10000:
        REQUESTS.clear()
    recent = REQUESTS[address]
    while recent and recent[0] < now - 60:
        recent.popleft()
    if len(recent) >= 12:
        raise ToolError('Too many conversions. Please wait a minute.', 429)
    recent.append(now)
    if CONCURRENCY.locked():
        raise ToolError('All document workers are busy. Try again shortly.', 503)
    tool = TOOLS.get(identifier)
    if identifier.startswith('stirling:'):
        extras, _ = await run_in_threadpool(stirling.discover)
        tool = extras.get(identifier)
    if not tool:
        raise ToolError('This document tool is unavailable.', 404)
    if tool['engine'] != 'stirling':
        _, ready, reason = await readiness(tool['engine'])
        if not ready:
            raise ToolError(reason, 503)
    async with CONCURRENCY:
        try:
            form = await request.form(max_files=8, max_fields=40)
        except ToolError:
            raise
        except Exception:
            raise ToolError('The upload could not be read. Use at most eight files.', 400)
        try:
            try:
                options = validate_options(tool, json.loads(form.get('options', '{}')))
            except (TypeError, ValueError):
                raise ToolError('Invalid processing options.', 400)
            slots = tool.get('uploads') or [{'key': 'files', 'accept': tool['accept'], 'multiple': tool['multiple'], 'required': True}]
            if set(form.keys()) - {'options', *(slot['key'] for slot in slots)}:
                raise ToolError('Unsupported upload field.', 400)
            with tempfile.TemporaryDirectory(prefix='att-document-') as temporary:
                directory = Path(temporary)
                uploads, total, count = {}, 0, 0
                for slot in slots:
                    values = form.getlist(slot['key'])
                    if slot.get('required', True) and not values:
                        raise ToolError('Choose a file for each required upload.', 400)
                    if not slot.get('multiple') and len(values) > 1:
                        raise ToolError('This input accepts one file.', 400)
                    uploads[slot['key']] = []
                    for upload in values:
                        if not isinstance(upload, UploadFile):
                            raise ToolError('A file upload was expected.', 400)
                        extension = Path(upload.filename or '').suffix.lower()
                        if not re.fullmatch(r'\.[a-z0-9]{1,10}', extension):
                            raise ToolError('The input needs a supported filename extension.', 415)
                        count += 1
                        if count > 8:
                            raise ToolError('Choose at most eight files.', 413)
                        path, size = directory / f'input-{count}{extension}', 0
                        with path.open('wb') as stream:
                            while chunk := await upload.read(1024 * 1024):
                                size += len(chunk); total += len(chunk)
                                if size > MAX_FILE or total > MAX_BODY:
                                    raise ToolError('Use files up to 20 MB and a total upload below 32 MB.', 413)
                                stream.write(chunk)
                        if not size:
                            raise ToolError('Empty files cannot be processed.', 400)
                        validate_upload(path, slot.get('accept', '*'))
                        uploads[slot['key']].append(path)
                paths = [path for group in uploads.values() for path in group]
                if not paths:
                    raise ToolError('Choose a file first.', 400)
                if tool['engine'] == 'stirling':
                    output = await run_in_threadpool(stirling.process, tool, uploads, options, directory)
                else:
                    output = await run_in_threadpool(engines.process, tool, paths, options, directory)
                if not output.exists() or not 0 < output.stat().st_size <= engines.MAX_OUTPUT:
                    raise ToolError('The output is empty or exceeds the download limit.', 413)
                payload = output.read_bytes()
                name = 'alltoolstogether-' + identifier.replace(':', '-') + output.suffix
                return Response(payload, media_type=mimetypes.guess_type(name)[0] or 'application/octet-stream',
                    headers={'Content-Disposition': f'attachment; filename="{name}"', 'Cache-Control': 'no-store',
                             'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex'})
        except ToolError:
            raise
        except Exception:
            # Document contents and parser internals must not leak in errors or logs.
            raise ToolError('This file could not be processed. Try a smaller file or a different engine.')
        finally:
            await form.close()
