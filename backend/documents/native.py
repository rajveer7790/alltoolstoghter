"""Real CPU document operations using permissively licensed libraries and isolated CLIs."""
import csv
import html
import io
import json
from pathlib import Path
import re

from PIL import Image, ImageChops
from pypdf import PdfReader, PdfWriter
import pypdfium2 as pdfium

from .runtime import ToolError, run, bundle


def read_pdf(path, password=''):
    try:
        reader = PdfReader(path, strict=False)
        if reader.is_encrypted and not reader.decrypt(password):
            raise ToolError('This PDF needs its correct document password.')
        if not 0 < len(reader.pages) <= 200:
            raise ToolError('Use a PDF with 1–200 pages. Split longer documents first.')
        return reader
    except ToolError:
        raise
    except Exception:
        raise ToolError('This PDF is damaged, unsupported or cannot be decrypted.')


def safe_name(name):
    return re.sub(r'[^A-Za-z0-9._-]', '_', Path(name).name)[:100] or 'attachment.bin'


def images(path: Path, dpi=150, grayscale=False):
    document = pdfium.PdfDocument(str(path))
    try:
        if not 0 < len(document) <= 200:
            raise ToolError('Use 1–200 pages.')
        for index in range(len(document)):
            page = document[index]
            bitmap = None
            try:
                w, h = page.get_size()
                if w * h * (dpi / 72) ** 2 > 16_000_000:
                    raise ToolError('A page is too large to render safely. Reduce its dimensions.')
                bitmap = page.render(scale=dpi / 72)
                image = bitmap.to_pil().convert('L' if grayscale else 'RGB')
                yield image, (w, h)
            finally:
                if bitmap is not None:
                    bitmap.close()
                page.close()
    finally:
        document.close()


def process(operation: str, files: list[Path], options: dict, directory: Path) -> Path:
    source = files[0]
    output = directory / 'result.pdf'
    if operation == 'image-to-text':
        from .engines import check_language
        language = check_language(options.get('language', 'eng'))
        # Decode and re-encode images to reject invalid images and decompression bombs.
        with Image.open(source) as image:
            if image.width * image.height > 16_000_000:
                raise ToolError('Image is too large. Resize it first.')
            clean = directory / 'ocr-input.png'
            image.convert('RGB').save(clean)
        run(['tesseract', str(clean), str(directory / 'text'), '-l', language], directory)
        return directory / 'text.txt'

    reader = read_pdf(source, options.get('password', '') if operation == 'unlock-pdf' else '')
    if operation in {'repair-pdf', 'unlock-pdf', 'protect-pdf', 'remove-pdf-annotations'}:
        writer = PdfWriter()
        writer.clone_document_from_reader(reader)
        if operation == 'protect-pdf':
            password = str(options.get('password', ''))
            if not password or len(password) > 128:
                raise ToolError('Choose a password of 1–128 characters.')
            writer.encrypt(password, algorithm='AES-256')
        if operation == 'remove-pdf-annotations':
            for page in writer.pages:
                if '/Annots' in page:
                    del page['/Annots']
        writer.write(output)
        return output

    if operation == 'pdf-bookmarks-to-json':
        def outline(items):
            result = []
            for item in items:
                if isinstance(item, list):
                    result.append({'children': outline(item)})
                else:
                    page = reader.get_destination_page_number(item)
                    result.append({'title': item.title, 'page': page + 1 if page is not None else None})
            return result
        output = directory / 'bookmarks.json'
        output.write_text(json.dumps(outline(reader.outline), ensure_ascii=False, indent=2))
        return output

    if operation == 'extract-pdf-attachments':
        paths = []
        for name, payloads in reader.attachments.items():
            for payload in payloads:
                path = directory / f'{len(paths) + 1}-{safe_name(name)}'
                path.write_bytes(payload)
                paths.append(path)
        return bundle(directory, paths, 'attachments.zip')

    if operation == 'extract-pdf-images':
        paths = []
        for index, page in enumerate(reader.pages):
            for image in page.images:
                path = directory / f'page-{index + 1}-{len(paths) + 1}-{safe_name(image.name)}'
                path.write_bytes(image.data)
                paths.append(path)
        return bundle(directory, paths, 'images.zip')

    if operation in {'pdf-to-word', 'pdf-to-excel', 'pdf-to-csv', 'pdf-to-html'}:
        import pdfplumber
        with pdfplumber.open(source) as pdf:
            text = [(page.extract_text() or '') for page in pdf.pages]
            tables = [(i + 1, table) for i, page in enumerate(pdf.pages) for table in page.extract_tables()]
        if operation in {'pdf-to-excel', 'pdf-to-csv'}:
            if not tables:
                raise ToolError('No tables were detected. Try OCR or a layout-aware extraction engine for scans.')
            if operation == 'pdf-to-excel':
                from openpyxl import Workbook
                book = Workbook()
                book.remove(book.active)
                for i, (page, rows) in enumerate(tables):
                    sheet = book.create_sheet(f'Page {page} Table {i + 1}')
                    for row in rows:
                        # Treat untrusted spreadsheet content as text, never formulas.
                        sheet.append(["'" + str(cell) if str(cell or '').startswith(('=', '+', '-', '@')) else str(cell or '') for cell in row])
                output = directory / 'tables.xlsx'
                book.save(output)
                return output
            paths = []
            for i, (page, rows) in enumerate(tables):
                path = directory / f'page-{page}-table-{i + 1}.csv'
                with path.open('w', newline='', encoding='utf-8-sig') as stream:
                    writer = csv.writer(stream)
                    writer.writerows([['\'' + str(cell) if str(cell or '').startswith(('=', '+', '-', '@')) else cell or '' for cell in row] for row in rows])
                paths.append(path)
            return bundle(directory, paths, 'tables.zip')
        if not any(part.strip() for part in text):
            raise ToolError('No text layer was found. Run OCR before this conversion.')
        if operation == 'pdf-to-html':
            output = directory / 'document.html'
            output.write_text('<!doctype html><html lang="en"><meta charset="utf-8"><title>Converted document</title><body>' + ''.join(f'<section><h2>Page {i + 1}</h2><pre>{html.escape(t)}</pre></section>' for i, t in enumerate(text)) + '</body></html>')
            return output
        from docx import Document
        document = Document()
        for i, part in enumerate(text):
            if i and options.get('layout') == 'page-breaks':
                document.add_page_break()
            for line in part.splitlines():
                document.add_paragraph(line)
        for page, rows in tables:
            document.add_paragraph(f'Table extracted from page {page}')
            width = max(len(row) for row in rows)
            table = document.add_table(rows=len(rows), cols=width)
            for r, row in enumerate(rows):
                for c, cell in enumerate(row):
                    table.cell(r, c).text = str(cell or '')
        output = directory / 'document.docx'
        document.save(output)
        return output

    if operation in {'rasterize-pdf', 'pdf-to-grayscale', 'pdf-to-tiff', 'pdf-to-powerpoint'}:
        dpi = int(options.get('dpi', '150'))
        if dpi not in {96, 150, 200}:
            raise ToolError('Choose 96, 150 or 200 DPI.')
        rendered = []
        # Keep rendered frames on disk, not hundreds of decoded images in RAM.
        for index, (image, dimensions) in enumerate(images(source, dpi, operation == 'pdf-to-grayscale')):
            path = directory / f'rendered-{index + 1}.png'
            image.save(path); image.close()
            rendered.append((path, dimensions))
        if operation == 'pdf-to-tiff':
            from PIL.TiffImagePlugin import AppendingTiffWriter
            output = directory / 'pages.tiff'
            with AppendingTiffWriter(str(output), new=True) as stream:
                for path, _ in rendered:
                    with Image.open(path) as image:
                        image.save(stream, format='TIFF', compression='tiff_lzw')
                    stream.newFrame()
            return output
        if operation == 'pdf-to-powerpoint':
            from pptx import Presentation
            from pptx.util import Inches
            presentation = Presentation()
            presentation.slide_width, presentation.slide_height = Inches(13.333), Inches(7.5)
            for path, _ in rendered:
                slide = presentation.slides.add_slide(presentation.slide_layouts[6])
                with Image.open(path) as image:
                    ratio = min(presentation.slide_width / image.width, presentation.slide_height / image.height)
                    w, h = int(image.width * ratio), int(image.height * ratio)
                slide.shapes.add_picture(str(path), (presentation.slide_width - w) // 2, (presentation.slide_height - h) // 2, width=w, height=h)
            output = directory / 'slides.pptx'
            presentation.save(output)
            return output
        from reportlab.pdfgen.canvas import Canvas
        canvas = Canvas(str(output))
        for path, (w, h) in rendered:
            canvas.setPageSize((w, h))
            canvas.drawImage(str(path), 0, 0, width=w, height=h)
            canvas.showPage()
        canvas.save()
        return output

    if operation == 'compare-pdfs':
        if len(files) != 2:
            raise ToolError('Choose exactly two PDFs.')
        read_pdf(files[1])
        from itertools import zip_longest
        paths, report = [], []
        for index, pair in enumerate(zip_longest(images(source, 96), images(files[1], 96))):
            left, right = pair
            if left is None or right is None:
                report.append({'page': index + 1, 'different': True, 'reason': 'Page exists in only one file'})
                (left or right)[0].close()
                continue
            a, b = left[0], right[0]
            size = (max(a.width, b.width), max(a.height, b.height))
            first, second = Image.new('RGB', size, 'white'), Image.new('RGB', size, 'white')
            first.paste(a, (0, 0)); second.paste(b, (0, 0))
            difference = ImageChops.difference(first, second)
            changed = difference.getbbox() is not None
            report.append({'page': index + 1, 'different': changed, 'sameDimensions': a.size == b.size})
            if changed:
                path = directory / f'page-{index + 1}-difference.png'
                difference.save(path); paths.append(path)
            for item in [a, b, first, second, difference]: item.close()
        report_path = directory / 'comparison.json'
        report_path.write_text(json.dumps({'dpi': 96, 'pages': report}, indent=2))
        return bundle(directory, [report_path, *paths], 'comparison.zip')

    if operation == 'pdf-to-svg':
        paths = []
        for index, page in enumerate(reader.pages):
            single = directory / f'source-page-{index + 1}.pdf'
            writer = PdfWriter(); writer.add_page(page); writer.write(single)
            path = directory / f'page-{index + 1}.svg'
            run(['pdftocairo', '-svg', str(single), str(path)], directory)
            paths.append(path)
        return bundle(directory, paths, 'pages-svg.zip')

    if operation == 'linearize-pdf':
        run(['qpdf', '--linearize', str(source), str(output)], directory)
        return output
    if operation == 'compress-pdf-server':
        quality = options.get('quality', 'ebook')
        if quality not in {'screen', 'ebook', 'printer', 'prepress'}:
            raise ToolError('Invalid compression preset.')
        run(['gs', '-dSAFER', '-dBATCH', '-dNOPAUSE', '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.7',
             '-dPDFSETTINGS=/' + quality, '-sOutputFile=' + str(output), str(source)], directory)
        return output
    if operation in {'validate-pdf', 'optimize-pdf'}:
        if operation == 'validate-pdf':
            run(['pdfcpu', 'validate', '-mode', 'relaxed', str(source)], directory)
            output = directory / 'validation.json'
            output.write_text(json.dumps({'structurallyValid': True, 'engine': 'pdfcpu', 'mode': 'relaxed', 'notChecked': ['PDF/A', 'PDF/UA', 'signatures']}))
        else:
            run(['pdfcpu', 'optimize', str(source), str(output)], directory)
        return output
    if operation == 'ocr-pdf':
        from .engines import check_language
        language = check_language(options.get('language', 'eng'))
        command = ['ocrmypdf', '--skip-text', '--output-type', 'pdf', '--jobs', '2', '-l', language]
        if options.get('deskew', True):
            command.append('--deskew')
        run([*command, str(source), str(output)], directory, 300)
        return output
    raise ToolError('Unsupported document operation.', 404)
