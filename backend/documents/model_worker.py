"""Optional self-hosted model entry point. No API keys or hosted AI calls."""
import json
from pathlib import Path
import sys

request = json.loads(Path(sys.argv[1]).read_text())
source, destination = Path(request['input']), Path(request['output'])
if request['engine'] == 'docling':
    from docling.document_converter import DocumentConverter
    document = DocumentConverter().convert(source).document
    operation = request['operation']
    if operation.endswith('markdown'):
        (destination / 'document.md').write_text(document.export_to_markdown(), encoding='utf-8')
    elif operation.endswith('html'):
        (destination / 'document.html').write_text(document.export_to_html(), encoding='utf-8')
    else:
        (destination / 'document.json').write_text(json.dumps(document.export_to_dict(), ensure_ascii=False, indent=2), encoding='utf-8')
elif request['engine'] == 'paddle':
    from paddleocr import PPStructureV3
    pipeline = PPStructureV3()
    for index, result in enumerate(pipeline.predict(input=str(source))):
        result.save_to_word(save_path=str(destination / f'page-{index + 1}.docx'))
else:
    raise ValueError('Unsupported model')
