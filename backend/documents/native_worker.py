"""Killable native conversion process; worker errors stay inside its temporary directory."""
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from backend.documents.native import process
from backend.documents.runtime import ToolError

request = Path(sys.argv[1])
data = json.loads(request.read_text())
try:
    import resource
    resource.setrlimit(resource.RLIMIT_CPU, (120, 125))
    resource.setrlimit(resource.RLIMIT_AS, (1800 * 1024 * 1024, 1800 * 1024 * 1024))
except (ImportError, ValueError):
    pass
try:
    result = process(data['operation'], [Path(p) for p in data['inputs']], data['options'], request.parent)
    (request.parent / 'native-result.json').write_text(json.dumps({'file': result.name}))
except ToolError as error:
    (request.parent / 'native-error.json').write_text(json.dumps({'error': error.message, 'status': error.status}))
    sys.exit(2)
