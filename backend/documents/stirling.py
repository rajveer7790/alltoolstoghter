"""Discover file tools from the installed OpenAPI contract; never proxy arbitrary URLs."""
from contextlib import ExitStack
import json
import os
import re
import time
import httpx

from .runtime import ToolError
from .engines import MAX_OUTPUT

_cache = {'time': 0, 'tools': {}, 'excluded': []}
# Operations that fetch URLs or use cloud credentials are intentionally not public.
FORBIDDEN = re.compile(r'api.?key|access.?token|webhook|callback|download.?from|remote.?url|url.?input|url.?to.?pdf|connection.?string|llm|ai.?provider', re.I)


def resolve(schema, document, depth=0):
    if depth > 8:
        return {}
    if '$ref' in schema:
        value = document
        for key in schema['$ref'].removeprefix('#/').split('/'):
            value = value.get(key, {})
        return resolve(value, document, depth + 1)
    if 'allOf' in schema:
        output = {'properties': {}, 'required': []}
        for item in schema['allOf']:
            part = resolve(item, document, depth + 1)
            output['properties'].update(part.get('properties', {}))
            output['required'].extend(part.get('required', []))
        return output
    return schema


def discover(force=False):
    url = os.getenv('STIRLING_URL', '').rstrip('/')
    if not url:
        return {}, []
    if not force and time.monotonic() - _cache['time'] < 60:
        return _cache['tools'], _cache['excluded']
    try:
        with httpx.Client(trust_env=False, timeout=10, follow_redirects=False) as client:
            response = client.get(url + '/v1/api-docs')
            response.raise_for_status()
            if len(response.content) > 8 * 1024 * 1024:
                raise ToolError('The engine specification is too large.', 503)
            document = response.json()
    except (httpx.HTTPError, ValueError):
        _cache.update(time=time.monotonic() - 50, tools={}, excluded=[])
        return {}, [{'id': 'stirling', 'reason': 'The self-hosted engine specification is unavailable.'}]
    tools, excluded = {}, []
    for path, methods in document.get('paths', {}).items():
        operation = methods.get('post', {})
        if not path.startswith('/api/v1/') or '{' in path or '}' in path or any(x in path.lower() for x in ['/admin', '/auth', '/login', '/storage', '/pipeline', '/system', '/settings', '/account']):
            continue
        content = operation.get('requestBody', {}).get('content', {})
        form = resolve(content.get('multipart/form-data', {}).get('schema', {}), document)
        properties = form.get('properties', {})
        if not properties:
            continue
        identifier = str(operation.get('operationId') or path.strip('/').replace('/', '-'))
        identity = 'stirling:' + re.sub(r'[^a-zA-Z0-9_-]', '-', identifier)[:100]
        fields, uploads, unsupported = [], [], ''
        for key, raw in properties.items():
            schema = resolve(raw, document)
            if FORBIDDEN.search(key + ' ' + path) or re.search(r'file.?path|directory|command|script|output.?dir|secret', key, re.I) or key.lower() in {'path', 'host', 'port', 'args', 'arguments', 'folder', 'endpoint'}:
                unsupported = 'Requires external credentials or outbound URL access.'
                break
            required = key in form.get('required', [])
            label = re.sub(r'([a-z])([A-Z])', r'\1 \2', key).replace('_', ' ').capitalize()
            if schema.get('format') == 'binary' or schema.get('type') == 'array' and resolve(schema.get('items', {}), document).get('format') == 'binary':
                uploads.append({'key': key, 'label': label, 'multiple': schema.get('type') == 'array', 'accept': '*', 'required': required})
                continue
            if schema.get('type') in {'object', 'array'} or '$ref' in raw:
                # JSON nested form objects vary by framework; don't advertise an unusable form.
                unsupported = 'This endpoint needs a specialized structured request; use the full workspace.'
                break
            choices = schema.get('enum')
            kind = 'select' if choices else 'checkbox' if schema.get('type') == 'boolean' else 'number' if schema.get('type') in {'integer', 'number'} else 'password' if 'password' in key.lower() else 'text'
            field = {'key': key, 'label': label, 'kind': kind, 'default': schema.get('default', False if kind == 'checkbox' else ''), 'required': required}
            if choices:
                field['options'] = [str(v) for v in choices]
            for original, mapped in [('minimum', 'min'), ('maximum', 'max')]:
                if original in schema:
                    field[mapped] = schema[original]
            fields.append(field)
        if unsupported or not uploads or len(fields) > 30 or len(uploads) > 8:
            excluded.append({'id': identity, 'reason': unsupported or 'Not a supported file-processing form.'})
            continue
        tools[identity] = {'id': identity, 'name': operation.get('summary') or label or identifier,
            'description': 'Run this tool on the self-hosted Stirling PDF service.', 'group': 'Stirling PDF',
            'engine': 'stirling', 'mode': 'server', 'fields': fields, 'uploads': uploads,
            'accept': '*', 'multiple': True, 'note': 'Powered by the installed Stirling PDF version. Review the processed file.',
            '_path': path}
    _cache.update(time=time.monotonic(), tools=tools, excluded=excluded)
    return tools, excluded


def process(tool, uploads, options, directory):
    url = os.environ['STIRLING_URL'].rstrip('/')
    with ExitStack() as stack:
        files = [(slot, (path.name, stack.enter_context(path.open('rb')), 'application/octet-stream')) for slot, paths in uploads.items() for path in paths]
        data = {key: str(value).lower() if isinstance(value, bool) else str(value) for key, value in options.items() if value != ''}
        try:
            with httpx.Client(trust_env=False, timeout=330, follow_redirects=False) as client:
                with client.stream('POST', url + tool['_path'], files=files, data=data) as response:
                    if response.status_code >= 400:
                        raise ToolError('The installed engine could not run this operation. A server allowance, optional dependency or valid input may be required.', 503 if response.status_code in {401, 402, 403, 503} else 422)
                    disposition = response.headers.get('content-disposition', '')
                    match = re.search(r'filename="?([^";]+)', disposition)
                    extension = '.pdf' if 'application/pdf' in response.headers.get('content-type', '') else '.zip' if 'zip' in response.headers.get('content-type', '') else '.bin'
                    if match and re.fullmatch(r'\.[a-zA-Z0-9]{1,10}', __import__('pathlib').Path(match[1]).suffix):
                        extension = __import__('pathlib').Path(match[1]).suffix
                    output, size = directory / ('result' + extension), 0
                    with output.open('wb') as stream:
                        for chunk in response.iter_bytes():
                            size += len(chunk)
                            if size > MAX_OUTPUT:
                                raise ToolError('The result exceeds 64 MB.', 413)
                            stream.write(chunk)
                    if not size:
                        raise ToolError('The engine returned no output.', 502)
                    return output
        except httpx.HTTPError:
            raise ToolError('The Stirling PDF service is unavailable.', 503)
