"""Adapters expose local processing only. Cloud/LLM enhancement is never selected."""
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
from contextlib import ExitStack

import httpx
from .runtime import ToolError, run, one_or_bundle

MAX_OUTPUT = 64 * 1024 * 1024
BINS = {'ocrmypdf': 'ocrmypdf', 'tesseract': 'tesseract', 'qpdf': 'qpdf', 'ghostscript': 'gs',
        'pdfcpu': 'pdfcpu', 'poppler': 'pdftocairo', 'mineru': 'mineru', 'marker': 'marker_single',
        'filee': 'filee', 'genoffice': 'genoffice'}
SERVICES = {'gotenberg': 'GOTENBERG_URL', 'docling': 'DOCLING_URL', 'paddle': 'PADDLE_URL',
            'mineru': 'MINERU_URL', 'marker': 'MARKER_URL', 'filee': 'FILEE_URL', 'genoffice': 'GENOFFICE_URL'}


def endpoint(engine):
    value = os.getenv(SERVICES.get(engine, ''), '').rstrip('/')
    if value and not re.match(r'^https?://[^/]+', value):
        raise ToolError('The document engine URL is invalid.', 503)
    return value


def available(engine):
    if engine == 'native':
        return True, ''
    if endpoint(engine):
        return True, ''  # Service readiness is checked separately by the API.
    if engine in {'docling', 'paddle'}:
        module = 'paddleocr' if engine == 'paddle' else engine
        ready = importlib.util.find_spec(module) is not None
    else:
        ready = bool(shutil.which(BINS.get(engine, engine)))
    if engine in {'marker', 'mineru'} and os.getenv(engine.upper() + '_LICENSE_ACCEPTED') != 'true':
        return False, 'This optional model requires operator review of its code and model licenses.'
    return ready, '' if ready else 'This optional processing engine is not installed.'


def check_language(language):
    if not re.fullmatch(r'[a-z]{3}(?:\+[a-z]{3}){0,2}', str(language)):
        raise ToolError('Invalid OCR language.')
    result = subprocess.run(['tesseract', '--list-langs'], capture_output=True, text=True, timeout=10)
    installed = set(result.stdout.splitlines()[1:])
    if not set(language.split('+')).issubset(installed):
        raise ToolError('This OCR language is not installed on the server.', 503)
    return language


def remote_file(url, paths, options, directory, route='', fields=None):
    with ExitStack() as stack:
        uploads = [('files', (path.name, stack.enter_context(path.open('rb')), 'application/octet-stream')) for path in paths]
        try:
            with httpx.Client(trust_env=False, timeout=httpx.Timeout(330, connect=10), follow_redirects=False) as client:
                with client.stream('POST', url + route, files=uploads, data=fields or {'options': json.dumps(options)}) as response:
                    if response.status_code >= 400:
                        raise ToolError('The processing engine rejected this file or is unavailable. Review the options and try a smaller file.', 503 if response.status_code in {401, 402, 403, 503} else 422)
                    content_type = response.headers.get('content-type', '').split(';')[0]
                    extension = {'application/pdf': '.pdf', 'application/zip': '.zip', 'application/json': '.json', 'text/html': '.html', 'text/plain': '.txt', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'}.get(content_type, '.bin')
                    disposition = response.headers.get('content-disposition', '')
                    match = re.search(r'filename="?([^";]+)', disposition)
                    if match:
                        ext = Path(match[1]).suffix
                        if re.fullmatch(r'\.[A-Za-z0-9]{1,10}', ext):
                            extension = ext
                    output = directory / ('result' + extension)
                    size = 0
                    with output.open('wb') as stream:
                        for chunk in response.iter_bytes():
                            size += len(chunk)
                            if size > MAX_OUTPUT:
                                raise ToolError('The result exceeds the 64 MB download limit. Use a smaller input.', 413)
                            stream.write(chunk)
                    if not size:
                        raise ToolError('The engine returned an empty result.', 502)
                    return output
        except httpx.HTTPError:
            raise ToolError('The processing engine could not be reached. Try again later.', 503)


def process(tool, paths, options, directory):
    engine, operation = tool['engine'], tool['id']
    url = endpoint(engine)
    if engine == 'gotenberg':
        if not url:
            raise ToolError('Office conversion has not been deployed yet.', 503)
        route = '/forms/libreoffice/convert'
        fields = {'nativeBookmarks': 'true'}
        if operation == 'html-to-pdf':
            route = '/forms/chromium/convert/html'
            # Gotenberg requires an entry HTML named index.html.
            entry = directory / 'index.html'
            shutil.copyfile(paths[0], entry)
            paths = [entry]
            fields = {'printBackground': 'true'}
        elif operation == 'pdf-to-pdfa':
            route = '/forms/pdf/pipe'
            fields = {'stages': json.dumps([{'op': 'remediate', 'profile': options.get('profile', 'PDF/A-2b')}])}
        return remote_file(url, paths, options, directory, route, fields)
    if url:
        return remote_file(url, paths, options, directory, '/process/' + operation)
    ready, reason = available(engine)
    if not ready:
        raise ToolError(reason, 503)
    if engine in {'native', 'poppler', 'qpdf', 'ghostscript', 'ocrmypdf', 'tesseract', 'pdfcpu'}:
        request = directory / 'native-request.json'
        request.write_text(json.dumps({'operation': operation, 'inputs': [str(p) for p in paths], 'options': options}))
        request.chmod(0o600)
        try:
            run([sys.executable, str(Path(__file__).with_name('native_worker.py')), str(request)], directory, 330)
        except ToolError:
            details = directory / 'native-error.json'
            if details.exists():
                error = json.loads(details.read_text())
                raise ToolError(error['error'], error['status'])
            raise
        result = directory / json.loads((directory / 'native-result.json').read_text())['file']
        if not result.resolve().is_relative_to(directory.resolve()):
            raise ToolError('Invalid engine output path.', 500)
        return result
    source = paths[0]
    destination = directory / 'converted'
    destination.mkdir()
    if engine in {'docling', 'paddle'}:
        request = directory / 'model-request.json'
        request.write_text(json.dumps({'engine': engine, 'operation': operation, 'input': str(source), 'output': str(destination)}))
        # Import heavy models only in a killable, per-job child process.
        script = Path(__file__).with_name('model_worker.py')
        run([sys.executable, str(script), str(request)], directory, 300)
    elif engine == 'mineru':
        run(['mineru', '-p', str(source), '-o', str(destination), '-b', 'pipeline'], directory, 300)
    elif engine == 'marker':
        kind = 'markdown' if operation.endswith('markdown') else 'json' if operation.endswith('json') else 'html'
        run(['marker_single', str(source), '--output_dir', str(destination), '--output_format', kind, '--mode', 'fast'], directory, 300)
    elif engine in {'filee', 'genoffice'}:
        target = str(options.get('to', 'pdf')).lower()
        if not re.fullmatch(r'[a-z0-9]{1,10}', target):
            raise ToolError('Use a plain output extension, for example pdf or docx.')
        if engine == 'filee':
            run(['filee', 'convert', str(source), '--to', target, '-o', str(destination)], directory, 300)
        else:
            run(['genoffice', 'convert', str(source), '--to', target, '--out', str(destination / ('document.' + target))], directory, 300)
    else:
        raise ToolError('Unsupported document engine.', 404)
    generated = [p for p in destination.rglob('*') if p.is_file()]
    if len(generated) == 1:
        return generated[0]
    # Preserve relative asset paths in structured extraction output.
    import zipfile
    output = directory / 'converted-documents.zip'
    if not generated:
        raise ToolError('The engine returned no converted content.')
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
        for path in generated:
            if path.is_symlink() or not path.resolve().is_relative_to(destination.resolve()):
                raise ToolError('The engine returned an invalid output path.', 500)
            archive.write(path, path.relative_to(destination).as_posix())
    return output
