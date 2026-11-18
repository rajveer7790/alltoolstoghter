import io
import json
import tempfile
from pathlib import Path
import re
import unittest
import zipfile

from fastapi.testclient import TestClient
from docx import Document
from lxml import etree
from PIL import Image
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.utils import ImageReader

from backend.documents.app import app, REQUESTS
from backend.documents import word
from backend.documents.tests.test_documents import sample_pdf


def illustrated_pdf():
    image = Image.new('RGB', (200, 100), '#176be5')
    data = io.BytesIO(); canvas = Canvas(data, pagesize=(400, 500))
    canvas.drawString(30, 460, 'Illustration with editable caption')
    canvas.drawImage(ImageReader(image), 30, 200, 200, 100)
    canvas.save(); return data.getvalue()


class FidelityTests(unittest.TestCase):
    def setUp(self):
        REQUESTS.clear(); self.client = TestClient(app)

    def post(self, operation, payload, options):
        return self.client.post('/process/' + operation, files={'files': ('sample.pdf', payload)}, data={'options': json.dumps(options)})

    def test_basic_mode_does_not_duplicate_table_text(self):
        result = self.post('pdf-to-word', sample_pdf(), {'method': word.BASIC, 'ocr': False})
        self.assertEqual(result.status_code, 200, result.text[:200] if result.status_code != 200 else '')
        with zipfile.ZipFile(io.BytesIO(result.content)) as archive:
            xml = etree.fromstring(archive.read('word/document.xml'))
            values = xml.xpath('//w:t/text()', namespaces={'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'})
            self.assertEqual(sum(value.count('Sensors') for value in values), 1)

    def test_page_image_mode_is_explicit_and_keeps_dimensions(self):
        result = self.post('pdf-to-word', sample_pdf(), {'method': word.VISUAL, 'ocr': False})
        self.assertEqual(result.status_code, 200)
        document = Document(io.BytesIO(result.content))
        self.assertEqual(len(document.sections), 2)
        self.assertAlmostEqual(document.sections[0].page_width.pt, 400)
        with zipfile.ZipFile(io.BytesIO(result.content)) as archive:
            xml = etree.fromstring(archive.read('word/document.xml'))
            ns = {'wp':'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing', 'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            self.assertEqual(len(xml.findall('.//wp:anchor', ns)), 2)
            self.assertFalse(xml.findall('.//w:t', ns))

    def test_structured_mode_keeps_images_and_editable_text(self):
        result = self.post('pdf-to-word', illustrated_pdf(), {'ocr': False})
        self.assertEqual(result.status_code, 200, result.text[:250] if result.status_code != 200 else '')
        with zipfile.ZipFile(io.BytesIO(result.content)) as archive:
            self.assertTrue(any(name.startswith('word/media/') for name in archive.namelist()))
            xml = etree.fromstring(archive.read('word/document.xml'))
            self.assertIn('editable caption', ''.join(xml.itertext()))

    def test_html_images_are_packaged_with_the_document(self):
        result = self.post('pdf-to-html', illustrated_pdf(), {'ocr': False})
        self.assertEqual(result.status_code, 200, result.text[:250] if result.status_code != 200 else '')
        with zipfile.ZipFile(io.BytesIO(result.content)) as archive:
            html = archive.read('document.html').decode()
            self.assertIn('editable caption', html)
            for src in re.findall(r'<img[^>]+src=[\"\']([^\"\']+)', html):
                if not src.startswith(('data:', 'https:', 'http:')):
                    self.assertIn(src.removeprefix('./'), archive.namelist())


if __name__ == '__main__': unittest.main()
