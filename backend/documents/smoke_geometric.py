"""Exercise the optional local geometric worker through the real gateway."""
import io
import time
import zipfile
import httpx
from PIL import Image
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader

with httpx.Client(timeout=330, trust_env=False) as client:
    base = 'http://127.0.0.1:8790'
    for attempt in range(120):
        response = client.get(base + '/capabilities')
        if response.status_code == 200 and any(t['id'] == 'pdf-to-word-layout' and t['available'] for t in response.json()['tools']): break
        time.sleep(1)
    else: raise RuntimeError('The geometric worker did not become ready')
    content = io.BytesIO(); canvas = Canvas(content, pagesize=(500, 700))
    canvas.drawString(45, 640, 'Editable geometric conversion')
    canvas.drawImage(ImageReader(Image.new('RGB', (240, 100), 'blue')), 45, 400, 240, 100)
    canvas.showPage(); canvas.drawString(45, 640, 'Second source page'); canvas.save()
    response = client.post(base + '/process/pdf-to-word-layout', files={'files': ('source.pdf', content.getvalue())}, data={'options': '{}'})
    assert response.status_code == 200, response.text[:200]
    with zipfile.ZipFile(io.BytesIO(response.content)) as archive:
        assert b'Editable geometric conversion' in archive.read('word/document.xml')
        assert any(name.startswith('word/media/') for name in archive.namelist())
    pdf = client.post(base + '/process/word-to-pdf', files={'files': ('converted.docx', response.content)}, data={'options': '{}'})
    assert pdf.status_code == 200, pdf.text[:200]
    reader = PdfReader(io.BytesIO(pdf.content))
    assert 'Second source page' in '\n'.join(page.extract_text() for page in reader.pages)
    print('GEOMETRIC_SMOKE passed: gateway readiness, editable text, image retention and Office round trip')
