"""Download public source candidates and lock 100 byte-distinct documents.

Selection is performed before conversion and never filters on conversion quality.
Original files remain in an ignored local cache, not in the git repository.
"""
import concurrent.futures
import hashlib
import json
from pathlib import Path
import urllib.request

ROOT = Path(__file__).resolve().parents[2]
CACHE = ROOT / '.cache/document-quality/corpus'
CACHE.mkdir(parents=True, exist_ok=True)
candidates = json.loads(Path(__file__).with_name('candidates.json').read_text())


def download(row):
    try:
        request = urllib.request.Request(row['url'], headers={'User-Agent': 'AllToolsTogether-public-document-quality-benchmark/1.0'})
        with urllib.request.urlopen(request, timeout=40) as response:
            content = response.read(20 * 1024 * 1024 + 1)
        if not content.startswith(b'%PDF-') or len(content) > 20 * 1024 * 1024:
            raise ValueError('Not a PDF within the upload size limit')
        digest = hashlib.sha256(content).hexdigest()
        (CACHE / (digest + '.pdf')).write_bytes(content)
        return {**row, 'sha256': digest, 'bytes': len(content)}
    except Exception as error:
        return {**row, 'download_error': str(error)[:200]}


with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    # executor.map preserves the predetermined candidate order.
    downloaded = list(executor.map(download, candidates))
selected, seen = [], set()
for row in downloaded:
    if row.get('sha256') and row['sha256'] not in seen and len(selected) < 100:
        seen.add(row['sha256'])
        selected.append({'id': f'doc-{len(selected) + 1:03}', **row})
if len(selected) != 100:
    raise SystemExit(f'Only {len(selected)} unique downloadable PDFs; do not report a 100-document run.')
Path(__file__).with_name('corpus.json').write_text(json.dumps({'version': 1, 'locked_date': '2026-11-18', 'documents': selected}, indent=2) + '\n')
Path(__file__).with_name('selection-log.json').write_text(json.dumps({'candidate_count': len(candidates), 'selected': len(selected), 'download_failures': [r for r in downloaded if r.get('download_error')]}, indent=2) + '\n')
print(json.dumps({'selected': len(selected), 'download_failures': sum('download_error' in r for r in downloaded), 'source_bytes': sum(r['bytes'] for r in selected)}))
