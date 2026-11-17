"""Integration checks run against the actual Docker CPU/Gotenberg stack."""
import io
import json
from pathlib import Path
import time
import httpx
from docx import Document
from pypdf import PdfReader
from PIL import Image, ImageDraw, ImageFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.utils import ImageReader

base = 'http://127.0.0.1:8790'
with httpx.Client(timeout=330, trust_env=False) as client:
    for attempt in range(120):
        try:
            capability = client.get(base + '/capabilities').json()
            if any(t['id'] == 'word-to-pdf' and t['available'] for t in capability['tools']): break
        except Exception: pass
        time.sleep(1)
    else: raise RuntimeError('Gotenberg did not become ready')

    def convert(tool, content, filename, options=None):
        response = client.post(base + '/process/' + tool, files={'files': (filename, content)}, data={'options': json.dumps(options or {})})
        assert response.status_code == 200, (tool, response.status_code, response.text[:200])
        return response.content

    source = io.BytesIO(); document = Document(); document.add_paragraph('Verified Office conversion'); document.save(source)
    pdf = convert('word-to-pdf', source.getvalue(), 'sample.docx')
    assert 'Verified Office conversion' in PdfReader(io.BytesIO(pdf)).pages[0].extract_text()
    linear = convert('linearize-pdf', pdf, 'sample.pdf')
    assert b'/Linearized' in linear[:1024]
    optimized = convert('optimize-pdf', pdf, 'sample.pdf')
    assert len(PdfReader(io.BytesIO(optimized)).pages) == 1
    report = json.loads(convert('validate-pdf', pdf, 'sample.pdf'))
    assert report['structurallyValid']
    compressed = convert('compress-pdf-server', pdf, 'sample.pdf')
    assert len(PdfReader(io.BytesIO(compressed)).pages) == 1
    # Actual image-only scan, not a PDF that already has a searchable text layer.
    image = Image.new('RGB', (1200, 400), 'white'); draw = ImageDraw.Draw(image)
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 64)
    draw.text((55, 140), 'HELLO DOCUMENT', font=font, fill='black')
    scan = io.BytesIO(); canvas = Canvas(scan, pagesize=(600, 200)); canvas.drawImage(ImageReader(image), 0, 0, 600, 200); canvas.showPage(); canvas.save()
    recognized = convert('ocr-pdf', scan.getvalue(), 'scan.pdf', {'language': 'eng', 'deskew': False})
    assert 'HELLO' in PdfReader(io.BytesIO(recognized)).pages[0].extract_text().upper()
    archived = convert('pdf-to-pdfa', pdf, 'sample.pdf', {'profile': 'PDF/A-2b'})
    assert len(PdfReader(io.BytesIO(archived)).pages) == 1
    print(json.dumps({'liveEngineChecks': ['Gotenberg Word to PDF', 'qpdf linearization', 'pdfcpu optimization', 'pdfcpu validation', 'Ghostscript compression', 'OCRmyPDF searchable text', 'Gotenberg archival remediation'], 'status': 'passed'}))
