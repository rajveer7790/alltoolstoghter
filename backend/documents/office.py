"""ONLYOFFICE integration using short-lived capability URLs and signed callbacks."""
import base64
import hashlib
import hmac
import html
import json
import os
from pathlib import Path
import re
import secrets
import shutil
import time
from urllib.parse import urlparse

from fastapi import APIRouter, Request
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
import httpx
from starlette.datastructures import UploadFile
from .runtime import ToolError

router = APIRouter()
ROOT = Path(os.getenv('OFFICE_SESSION_DIR', '/tmp/att-office-sessions'))
TTL = 3600


def configured():
    return bool(os.getenv('ONLYOFFICE_JWT_SECRET') and os.getenv('ONLYOFFICE_PUBLIC_URL') and os.getenv('DOCUMENT_PUBLIC_URL'))


def encoded(value):
    return base64.urlsafe_b64encode(json.dumps(value, separators=(',', ':')).encode()).decode().rstrip('=')


def sign(value):
    payload = encoded({'alg': 'HS256', 'typ': 'JWT'}) + '.' + encoded({**value, 'exp': int(time.time()) + TTL})
    signature = hmac.new(os.environ['ONLYOFFICE_JWT_SECRET'].encode(), payload.encode(), hashlib.sha256).digest()
    return payload + '.' + base64.urlsafe_b64encode(signature).decode().rstrip('=')


def verify(token):
    if not isinstance(token, str):
        raise ToolError('The editor callback signature is invalid.', 403)
    try:
        head, payload, signature = token.split('.')
        decode = lambda value: json.loads(base64.urlsafe_b64decode(value + '=' * (-len(value) % 4)))
        if decode(head).get('alg') != 'HS256':
            raise ValueError()
        expected = sign_raw(head + '.' + payload)
        if not hmac.compare_digest(signature, expected):
            raise ValueError()
        data = decode(payload)
        if data.get('exp', time.time() + 1) < time.time():
            raise ValueError()
        return data
    except (ValueError, TypeError, KeyError, AttributeError):
        raise ToolError('The editor callback signature is invalid.', 403)


def sign_raw(value):
    signature = hmac.new(os.environ['ONLYOFFICE_JWT_SECRET'].encode(), value.encode(), hashlib.sha256).digest()
    return base64.urlsafe_b64encode(signature).decode().rstrip('=')


def session(token):
    if not re.fullmatch(r'[A-Za-z0-9_-]{40,60}', token):
        raise ToolError('Editor session not found.', 404)
    folder = ROOT / token
    metadata = folder / 'session.json'
    if not metadata.is_file():
        raise ToolError('Editor session not found.', 404)
    data = json.loads(metadata.read_text())
    if data['expires'] < time.time():
        shutil.rmtree(folder, ignore_errors=True)
        raise ToolError('This editor session expired. Download or reopen the original file.', 410)
    return folder, data


def clean_sessions():
    ROOT.mkdir(parents=True, exist_ok=True)
    for folder in ROOT.iterdir():
        if folder.is_dir() and folder.stat().st_mtime < time.time() - TTL:
            shutil.rmtree(folder, ignore_errors=True)


@router.post('/office/start')
async def start(request: Request):
    if not configured():
        raise ToolError('The Office editor has not been deployed yet.', 503)
    clean_sessions()
    if sum(1 for _ in ROOT.iterdir()) >= 10 or sum(p.stat().st_size for p in ROOT.rglob('*') if p.is_file()) > 256 * 1024 * 1024:
        raise ToolError('The editor is busy. Try again later.', 503)
    form = await request.form(max_files=1, max_fields=0)
    folder = None
    try:
        upload = form.get('file')
        if not isinstance(upload, UploadFile):
            raise ToolError('Choose an Office document.', 400)
        suffix = Path(upload.filename or '').suffix.lower()
        if suffix not in {'.docx', '.xlsx', '.pptx', '.odt', '.ods', '.odp'}:
            raise ToolError('Choose a DOCX, XLSX, PPTX, ODT, ODS or ODP file.', 415)
        token = secrets.token_urlsafe(32)
        folder = ROOT / token
        folder.mkdir(mode=0o700)
        path, count = folder / ('document' + suffix), 0
        with path.open('wb') as stream:
            while chunk := await upload.read(1024 * 1024):
                count += len(chunk)
                if count > 20 * 1024 * 1024:
                    raise ToolError('Use an Office file smaller than 20 MB.', 413)
                stream.write(chunk)
        if not count:
            raise ToolError('Choose a nonempty file.', 400)
        from .app import validate_upload
        validate_upload(path, suffix)
        title = re.sub(r'[^A-Za-z0-9 ._-]', '_', upload.filename or path.name)[:100]
        data = {'file': path.name, 'title': title, 'expires': int(time.time()) + TTL}
        (folder / 'session.json').write_text(json.dumps(data))
        public = os.environ['DOCUMENT_PUBLIC_URL'].rstrip('/')
        return {'editorUrl': public + '/office/editor/' + token, 'downloadUrl': public + '/office/file/' + token, 'expires': data['expires']}
    except Exception:
        if folder:
            shutil.rmtree(folder, ignore_errors=True)
        raise
    finally:
        await form.close()


@router.get('/office/file/{token}')
async def file(token):
    folder, data = session(token)
    return FileResponse(folder / data['file'], filename=data['title'], headers={'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex'})


@router.get('/office/editor/{token}')
async def editor(token):
    _, data = session(token)
    internal = os.getenv('DOCUMENT_INTERNAL_URL', 'http://documents:8790').rstrip('/')
    public = os.environ['DOCUMENT_PUBLIC_URL'].rstrip('/')
    sdk = os.environ['ONLYOFFICE_PUBLIC_URL'].rstrip('/') + '/web-apps/apps/api/documents/api.js'
    ext = Path(data['file']).suffix.lstrip('.')
    kind = 'cell' if ext in {'xlsx', 'ods'} else 'slide' if ext in {'pptx', 'odp'} else 'word'
    config = {'document': {'fileType': ext, 'key': token, 'title': data['title'], 'url': internal + '/office/file/' + token,
                          'permissions': {'edit': True, 'download': True}}, 'documentType': kind,
              'editorConfig': {'callbackUrl': internal + '/office/callback/' + token, 'mode': 'edit',
                               'user': {'id': token[:16], 'name': 'Guest'}, 'customization': {'forcesave': True}},
              'height': '100%', 'width': '100%'}
    config['token'] = sign(config)
    page = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Office editor | All Tools Together</title><style>html,body{height:100%;margin:0;font-family:system-ui}header{height:46px;padding:0 16px;display:flex;align-items:center;gap:20px}#editor{height:calc(100% - 46px)}</style><header><a href="https://alltoolstogether.com/document-studio">All Tools Together</a><a href="' + html.escape(public + '/office/file/' + token, quote=True) + '">Download saved file</a><span>Session expires after one hour</span></header><div id="editor"></div><script src="' + html.escape(sdk, quote=True) + '"></script><script>new DocsAPI.DocEditor("editor",' + json.dumps(config).replace('<', '\\u003c') + ');</script></html>'
    return HTMLResponse(page, headers={'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', 'Referrer-Policy': 'no-referrer'})


@router.post('/office/callback/{token}')
async def callback(token, request: Request):
    folder, data = session(token)
    body = await request.json()
    if not isinstance(body, dict):
        raise ToolError('Invalid editor callback.', 400)
    auth = request.headers.get('authorization', '').removeprefix('Bearer ')
    claims = verify(body.get('token') or auth)
    signed = claims.get('payload', claims)
    if signed.get('status') != body.get('status') or signed.get('url') != body.get('url'):
        raise ToolError('The callback does not match its signature.', 403)
    if body.get('status') not in {2, 6}:
        return {'error': 0}
    target = urlparse(body.get('url', ''))
    allowed = [urlparse(os.getenv('ONLYOFFICE_INTERNAL_URL', 'http://onlyoffice')).netloc,
               urlparse(os.environ['ONLYOFFICE_PUBLIC_URL']).netloc]
    if target.scheme not in {'http', 'https'} or target.netloc not in allowed or not target.path.startswith(('/cache/', '/coauthoring/')):
        raise ToolError('The editor returned an invalid download URL.', 403)
    temporary, count = folder / 'saving.tmp', 0
    async with httpx.AsyncClient(trust_env=False, timeout=60, follow_redirects=False) as client:
        async with client.stream('GET', target.geturl()) as response:
            response.raise_for_status()
            with temporary.open('wb') as stream:
                async for chunk in response.aiter_bytes():
                    count += len(chunk)
                    if count > 64 * 1024 * 1024:
                        temporary.unlink(missing_ok=True)
                        raise ToolError('The saved file is too large.', 413)
                    stream.write(chunk)
    if not count:
        raise ToolError('The editor returned an empty saved file.', 502)
    temporary.replace(folder / data['file'])
    return JSONResponse({'error': 0})
