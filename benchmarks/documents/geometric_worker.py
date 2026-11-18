"""Optional local geometric candidate; no hosted APIs or keys."""
import importlib.metadata
import json
from pathlib import Path
import sys

import resource
resource.setrlimit(resource.RLIMIT_CPU, (120, 125))
resource.setrlimit(resource.RLIMIT_AS, (4 * 1024 ** 3, 4 * 1024 ** 3))
from pdf2docx import Converter

source, target = Path(sys.argv[1]), Path(sys.argv[2])
converter = Converter(str(source))
try:
    converter.convert(str(target), start=0, end=None, multi_processing=False)
finally:
    converter.close()
(target.parent / 'engine-versions.json').write_text(json.dumps({name: importlib.metadata.version(name) for name in ['pdf2docx', 'PyMuPDF', 'opencv-python-headless', 'numpy', 'python-docx']}))
