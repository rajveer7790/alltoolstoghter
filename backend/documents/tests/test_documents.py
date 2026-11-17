import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import zipfile

from fastapi.testclient import TestClient
from reportlab.pdfgen.canvas import Canvas
from pypdf import PdfReader
from docx import Document
from PIL import Image

from backend.documents.app import app, REQUESTS, validate_upload
from backend.documents import native, engines, stirling, office
from backend.documents.runtime import ToolError


def sample_pdf():
    data = io.BytesIO()
    canvas = Canvas(data, pagesize=(400, 500))
    canvas.drawString(30, 460, 'Hello document studio')
    for x in [30, 180, 330]: canvas.line(x, 350, x, 410)
    for y in [350, 380, 410]: canvas.line(30, y, 330, y)
    canvas.drawString(40, 390, 'Item'); canvas.drawString(190, 390, 'Quantity')
    canvas.drawString(40, 360, 'Sensors'); canvas.drawString(190, 360, '4')
    canvas.showPage(); canvas.drawString(30, 460, 'Second page'); canvas.save()
    return data.getvalue()


class DocumentAPI(unittest.TestCase):
    def setUp(self):
        REQUESTS.clear()
        self.client = TestClient(app)

    def post(self, operation, options=None, data=None):
        return self.client.post('/process/' + operation, data={'options': json.dumps(options or {})}, files={'files': ('sample.pdf', data or sample_pdf(), 'application/pdf')})

    def test_capabilities_report_real_availability(self):
        result = self.client.get('/capabilities')
        self.assertEqual(result.status_code, 200)
        tools = {tool['id']: tool for tool in result.json()['tools']}
        self.assertTrue(tools['pdf-to-word']['available'])
        self.assertFalse(result.json()['officeEditor']['available'])
        self.assertNotIn('apiKey', result.text)

    def test_word_conversion_produces_editable_content(self):
        result = self.post('pdf-to-word')
        self.assertEqual(result.status_code, 200, result.text[:200] if result.status_code != 200 else '')
        document = Document(io.BytesIO(result.content))
        self.assertIn('Hello document studio', '\n'.join(p.text for p in document.paragraphs))
        self.assertTrue(document.tables)
        self.assertEqual(result.headers['cache-control'], 'no-store')

    def test_table_workbook_and_csv(self):
        from openpyxl import load_workbook
        result = self.post('pdf-to-excel')
        self.assertEqual(result.status_code, 200)
        book = load_workbook(io.BytesIO(result.content))
        self.assertEqual(book.active['A2'].value, 'Sensors')
        result = self.post('pdf-to-csv')
        self.assertEqual(result.status_code, 200)
        with zipfile.ZipFile(io.BytesIO(result.content)) as archive:
            self.assertIn('Sensors', archive.read(archive.namelist()[0]).decode('utf-8-sig'))

    def test_password_encryption_round_trip(self):
        result = self.post('protect-pdf', {'password': 'test-only-document-password'})
        self.assertEqual(result.status_code, 200)
        encrypted = PdfReader(io.BytesIO(result.content))
        self.assertTrue(encrypted.is_encrypted)
        result = self.post('unlock-pdf', {'password': 'test-only-document-password'}, result.content)
        self.assertEqual(result.status_code, 200)
        self.assertFalse(PdfReader(io.BytesIO(result.content)).is_encrypted)

    def test_invalid_files_and_unrecognized_options_rejected(self):
        self.assertEqual(self.post('pdf-to-word', data=b'not a PDF').status_code, 415)
        self.assertEqual(self.post('pdf-to-word', {'callbackUrl': 'http://127.0.0.1/'}).status_code, 400)
        self.assertEqual(self.post('not-a-tool').status_code, 404)
        self.assertEqual(self.post('protect-pdf', {'password': ''}).status_code, 400)

    def test_archive_traversal_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'document.docx'
            with zipfile.ZipFile(path, 'w') as archive: archive.writestr('../escape', 'unsafe')
            with self.assertRaises(ToolError): validate_upload(path, '.docx')

    def test_raster_image_and_presentation_outputs(self):
        from pptx import Presentation
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp); source = directory / 'input.pdf'; source.write_bytes(sample_pdf())
            for operation in ['rasterize-pdf', 'pdf-to-grayscale']:
                output = native.process(operation, [source], {'dpi': '96'}, directory)
                reader = PdfReader(output)
                self.assertEqual(len(reader.pages), 2)
                self.assertFalse(reader.pages[0].extract_text())
            output = native.process('pdf-to-tiff', [source], {'dpi': '96'}, directory)
            with Image.open(output) as image: self.assertEqual(image.n_frames, 2)
            output = native.process('pdf-to-powerpoint', [source], {}, directory)
            self.assertEqual(len(Presentation(output).slides), 2)

    def test_visual_compare_handles_extra_pages(self):
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp); a = directory / 'a.pdf'; b = directory / 'b.pdf'
            a.write_bytes(sample_pdf()); b.write_bytes(sample_pdf())
            output = native.process('compare-pdfs', [a, b], {}, directory)
            with zipfile.ZipFile(output) as archive:
                report = json.loads(archive.read(archive.namelist()[0]))
                self.assertFalse(any(page['different'] for page in report['pages']))

    def test_rate_limit_is_bounded(self):
        for _ in range(12): self.client.post('/process/unknown')
        self.assertEqual(self.client.post('/process/unknown').status_code, 429)


class EngineContracts(unittest.TestCase):
    def test_gotenberg_multipart_contract(self):
        import httpx
        original = httpx.Client
        calls = []
        def handler(request):
            calls.append((request.url.path, request.content))
            return httpx.Response(200, content=sample_pdf(), headers={'content-type': 'application/pdf'})
        with tempfile.TemporaryDirectory() as tmp, patch.dict(os.environ, {'GOTENBERG_URL': 'http://gotenberg:3000'}):
            path = Path(tmp) / 'sample.docx'; Document().save(path)
            with patch('backend.documents.engines.httpx.Client', side_effect=lambda **kw: original(transport=httpx.MockTransport(handler), **kw)):
                result = engines.process({'engine': 'gotenberg', 'id': 'word-to-pdf'}, [path], {}, Path(tmp))
            self.assertTrue(result.read_bytes().startswith(b'%PDF'))
            self.assertEqual(calls[0][0], '/forms/libreoffice/convert')
            self.assertIn(b'name="files"', calls[0][1])

    def test_stirling_discovery_excludes_keys_admin_and_nested_forms(self):
        import httpx
        original = httpx.Client
        def form(properties):
            return {'post': {'operationId': str(len(properties)), 'summary': 'Tool', 'requestBody': {'content': {'multipart/form-data': {'schema': {'properties': {'fileInput': {'type': 'string', 'format': 'binary'}, **properties}, 'required': ['fileInput']}}}}}}
        document = {'paths': {'/api/v1/misc/compress-pdf': form({'quality': {'type': 'integer', 'minimum': 1, 'maximum': 5}}), '/api/v1/misc/cloud-ai': form({'apiKey': {'type': 'string'}}), '/api/v1/admin/create': form({}), '/api/v1/misc/nested': form({'config': {'type': 'object'}})}}
        with patch.dict(os.environ, {'STIRLING_URL': 'http://stirling:8080'}), patch('backend.documents.stirling.httpx.Client', side_effect=lambda **kw: original(transport=httpx.MockTransport(lambda _req: httpx.Response(200, json=document)), **kw)):
            tools, excluded = stirling.discover(force=True)
            self.assertEqual(len(tools), 1)
            self.assertEqual(len(excluded), 2)
            self.assertEqual(next(iter(tools.values()))['uploads'][0]['key'], 'fileInput')
        stirling._cache.update(time=0, tools={}, excluded=[])

    def test_model_licenses_are_not_silently_assumed(self):
        with patch.dict(os.environ, {'MARKER_LICENSE_ACCEPTED': 'false', 'MINERU_LICENSE_ACCEPTED': 'false', 'MARKER_URL': '', 'MINERU_URL': ''}):
            self.assertFalse(engines.available('marker')[0])
            self.assertFalse(engines.available('mineru')[0])


class OfficeSessions(unittest.TestCase):
    def test_session_jwt_and_callback_boundary(self):
        document = io.BytesIO(); Document().save(document)
        with tempfile.TemporaryDirectory() as tmp, patch.object(office, 'ROOT', Path(tmp)), patch.dict(os.environ, {'ONLYOFFICE_JWT_SECRET': 'test-only-editor-secret', 'ONLYOFFICE_PUBLIC_URL': 'https://office.example.test', 'DOCUMENT_PUBLIC_URL': 'https://api.example.test/api/documents'}):
            with TestClient(app) as client:
                response = client.post('/office/start', files={'file': ('example.docx', document.getvalue())})
                self.assertEqual(response.status_code, 200)
                token = response.json()['editorUrl'].rsplit('/', 1)[1]
                self.assertEqual(client.get('/office/file/' + token).status_code, 200)
                self.assertIn('DocsAPI.DocEditor', client.get('/office/editor/' + token).text)
                self.assertEqual(client.post('/office/callback/' + token, json={'status': 1}).status_code, 403)
                value = {'status': 6, 'url': 'http://169.254.169.254/latest/meta-data'}
                value['token'] = office.sign(value)
                self.assertEqual(client.post('/office/callback/' + token, json=value).status_code, 403)
                (Path(tmp) / token / 'session.json').write_text(json.dumps({'expires': 1, 'file': 'document.docx'}))
                self.assertEqual(client.get('/office/file/' + token).status_code, 410)


if __name__ == '__main__': unittest.main()
