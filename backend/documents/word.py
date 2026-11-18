"""Key-free Word exports: semantic DOCX, basic reconstruction, or explicit page images."""
from pathlib import Path
import re
import zipfile

from docx import Document
from docx.enum.section import WD_SECTION_START
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt
import pypdfium2 as pdfium

from .runtime import ToolError, run

STRUCTURED = 'Editable document'
BASIC = 'Basic text and tables'
VISUAL = 'Page images (text not editable)'


def has_image_only_pages(source):
    document = pdfium.PdfDocument(str(source))
    try:
        for page in document:
            try:
                text = page.get_textpage()
                try:
                    if len(text.get_text_range().strip()) < 10: return True
                finally: text.close()
            finally: page.close()
    finally: document.close()
    return False


def ocr_source(source, directory, language):
    import shutil
    from .engines import check_language
    if not shutil.which('ocrmypdf'):
        raise ToolError('This PDF needs OCR, but OCR is not installed on this server.', 503)
    output = directory / 'searchable-source.pdf'
    run(['ocrmypdf', '--skip-text', '--output-type', 'pdf', '--jobs', '1', '-l', check_language(language), str(source), str(output)], directory, 240)
    return output


def page_images(source, directory):
    from .native import images
    document = Document()
    for index, (image, (width, height)) in enumerate(images(source, 150)):
        section = document.sections[0] if index == 0 else document.add_section(WD_SECTION_START.NEW_PAGE)
        section.page_width, section.page_height = Pt(width), Pt(height)
        section.top_margin = section.bottom_margin = section.left_margin = section.right_margin = Pt(0)
        section.header_distance = section.footer_distance = Pt(0)
        path = directory / f'word-page-{index + 1}.png'
        image.save(path); image.close()
        paragraph = document.add_paragraph()
        paragraph.paragraph_format.space_before = paragraph.paragraph_format.space_after = Pt(0)
        paragraph.paragraph_format.line_spacing = Pt(1)
        run_ = paragraph.add_run(); run_.font.size = Pt(1)
        inline = run_.add_picture(str(path), width=Pt(width), height=Pt(height))._inline
        # A full-page inline drawing can spill onto an extra Word page. Anchor it
        # to the page, outside text flow, while keeping the page break explicit.
        anchor = OxmlElement('wp:anchor')
        for key, value in {'distT':'0','distB':'0','distL':'0','distR':'0','simplePos':'0','relativeHeight':'0','behindDoc':'1','locked':'0','layoutInCell':'1','allowOverlap':'1'}.items(): anchor.set(key, value)
        simple = OxmlElement('wp:simplePos'); simple.set('x', '0'); simple.set('y', '0'); anchor.append(simple)
        for axis in ['H', 'V']:
            position = OxmlElement('wp:position' + axis); position.set('relativeFrom', 'page')
            offset = OxmlElement('wp:posOffset'); offset.text = '0'; position.append(offset); anchor.append(position)
        anchor.append(inline.find(qn('wp:extent')))
        anchor.append(OxmlElement('wp:wrapNone'))
        properties = inline.find(qn('wp:docPr')); properties.set('descr', 'Source page image; text is not editable'); anchor.append(properties)
        frame = inline.find(qn('wp:cNvGraphicFramePr'))
        if frame is not None: anchor.append(frame)
        anchor.append(inline.find(qn('a:graphic')))
        inline.getparent().replace(inline, anchor)
    output = directory / 'page-images.docx'; document.save(output)
    return output


def basic_document(source, directory, layout):
    import pdfplumber
    document = Document()
    normal = document.styles['Normal']
    normal.font.name, normal.font.size = 'Carlito', Pt(10)
    normal.paragraph_format.space_after = Pt(0)
    normal.paragraph_format.line_spacing = 1
    found_text = False
    with pdfplumber.open(source) as pdf:
        for index, page in enumerate(pdf.pages):
            if index and layout == 'page-breaks': document.add_page_break()
            section = document.sections[0]
            if index == 0:
                section.page_width, section.page_height = Pt(page.width), Pt(page.height)
            tables = page.find_tables()
            boxes = [table.bbox for table in tables]
            def outside_tables(obj):
                if obj.get('object_type') != 'char': return True
                x, y = (obj['x0'] + obj['x1']) / 2, (obj['top'] + obj['bottom']) / 2
                return not any(a <= x <= c and b <= y <= d for a,b,c,d in boxes)
            prose = page.filter(outside_tables)
            # Preserve page order and table placement without duplicating table
            # content in prose and then appending it a second time at the end.
            elements = [(line['top'], 'text', line['text']) for line in prose.extract_text_lines()]
            elements += [(table.bbox[1], 'table', table.extract()) for table in tables]
            for _, kind, value in sorted(elements, key=lambda element: element[0]):
                if kind == 'text':
                    if value.strip(): found_text = True; document.add_paragraph(value)
                elif value:
                    width = max(len(row) for row in value)
                    table = document.add_table(rows=len(value), cols=width)
                    for row_index, row in enumerate(value):
                        for column, cell in enumerate(row):
                            table.cell(row_index, column).text = str(cell or '')
                            found_text |= bool(str(cell or '').strip())
    if not found_text: raise ToolError('No editable text was found. Enable OCR or choose page images.')
    output = directory / 'document.docx'; document.save(output); return output


def export(source, options, directory):
    method = options.get('method', STRUCTURED)
    if method == VISUAL: return page_images(source, directory)
    if method not in {STRUCTURED, BASIC}: raise ToolError('Choose an available Word output mode.')
    if options.get('ocr', True) and has_image_only_pages(source):
        source = ocr_source(source, directory, options.get('language', 'eng'))
    if method == BASIC: return basic_document(source, directory, options.get('layout', 'reflow'))
    try:
        import docvortex
    except ImportError:
        raise ToolError('The document layout engine is not installed. Deploy the current backend requirements.', 503)
    output = directory / 'document.docx'
    try:
        result = docvortex.parse(source, parse_mode='txt', pdf_structure='auto')
        result.export(output, output_format='docx', overwrite=True)
    except Exception as error:
        if getattr(error, 'code', '') == 'pdf_ocr_unsupported':
            raise ToolError('This PDF requires OCR. Enable OCR or choose page images.')
        raise ToolError('The structured engine could not convert this PDF. Try the basic mode or page images.')
    # A DOCX containing only pictures must not be advertised as editable text.
    from lxml import etree
    with zipfile.ZipFile(output) as archive:
        xml = etree.fromstring(archive.read('word/document.xml'))
        text = ''.join(xml.xpath('//w:t/text()', namespaces={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}))
    if not re.search(r'\S', text): raise ToolError('No editable text was recovered. Enable OCR or choose page images.')
    return output


def export_html(source, options, directory):
    """Package semantic HTML and its relative image assets together."""
    if options.get('ocr', True) and has_image_only_pages(source):
        source = ocr_source(source, directory, options.get('language', 'eng'))
    import docvortex
    destination = directory / 'html-export'
    destination.mkdir()
    try:
        result = docvortex.parse(source, parse_mode='txt', pdf_structure='auto')
        result.export(destination / 'document.html', output_format='html', overwrite=True)
    except Exception:
        raise ToolError('The structured HTML export could not process this PDF. Try OCR first.')
    paths = [path for path in destination.rglob('*') if path.is_file()]
    if len(paths) > 2000 or sum(path.stat().st_size for path in paths) > 64 * 1024 * 1024:
        raise ToolError('The HTML package exceeds the download limit.', 413)
    output = directory / 'document-html.zip'
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
        for path in paths:
            if path.is_symlink() or not path.resolve().is_relative_to(destination.resolve()):
                raise ToolError('Invalid HTML asset path.', 500)
            archive.write(path, path.relative_to(destination).as_posix())
    return output
