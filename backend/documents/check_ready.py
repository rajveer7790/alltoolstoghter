"""Verify availability before enabling indexing for server-backed tool pages."""
import json
from pathlib import Path
import sys
import urllib.request

if len(sys.argv) != 2 or not sys.argv[1].startswith(('http://', 'https://')):
    raise SystemExit('Usage: python backend/documents/check_ready.py https://api.example.com/api/documents')
required = {tool['id'] for tool in json.loads((Path(__file__).resolve().parents[2] / 'lib/documents/tools.json').read_text()) if tool['mode'] == 'server' and tool.get('page')}
try:
    data = json.load(urllib.request.urlopen(sys.argv[1].rstrip('/') + '/capabilities', timeout=30))
    available = {tool['id'] for tool in data['tools'] if tool.get('available')}
except Exception:
    raise SystemExit('Document capabilities could not be verified. Keep NEXT_PUBLIC_DOCUMENTS_READY=false.')
missing = sorted(required - available)
print(json.dumps({'ready': not missing, 'requiredServerPages': len(required), 'missing': missing}, indent=2))
raise SystemExit(1 if missing else 0)
