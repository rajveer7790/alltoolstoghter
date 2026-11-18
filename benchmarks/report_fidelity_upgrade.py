"""Compare complete locked CI results without replacing failures or old evidence."""
import argparse
from collections import Counter
import csv
import hashlib
import json
import math
from pathlib import Path
import statistics

parser = argparse.ArgumentParser()
parser.add_argument('shards', type=Path)
parser.add_argument('--output', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).parent
manifest_path = root / 'documents/corpus.json'
manifest = json.loads(manifest_path.read_text())
expected = {r['id']: r['sha256'] for r in manifest['documents']}
old = json.loads((root / 'documents/results/2026-11-18/results.json').read_text())
shards = json.loads(args.shards.read_text())
rows = sorted([r for s in shards for r in s['documents']], key=lambda r: r['id'])
assert len(rows) == len({r['id'] for r in rows}) == 100
assert {r['id']: r['sha256'] for r in rows} == expected
assert all(s['summary']['environment']['source_commit'] == '7b7db17f8053107031473f1cca293cb30bf05cbe' for s in shards)
groups = {**old['documents'], 'docvortex': rows}
keys = ['text_token_f1', 'visual_ssim', 'foreground_f1', 'conversion_seconds', 'sampled_worker_peak_mib']

def stats(rows, key):
    values = sorted(r[key] for r in rows if (r['status'] == 'converted' or key == 'sampled_worker_peak_mib') and isinstance(r.get(key), (float, int)))
    return {'n': len(values), 'median': statistics.median(values), 'mean': statistics.mean(values), 'p95': values[math.ceil(.95 * len(values))-1], 'max': max(values)} if values else {'n': 0}

def summarize(rows):
    return {'evaluated': len(rows), 'converted_and_measured': sum(r['status'] == 'converted' for r in rows),
            'same_page_count': sum(r.get('same_page_count', False) for r in rows),
            'strict_layout_gate_passes': sum(r.get('layout_quality_gate', False) for r in rows),
            'failure_stages': dict(Counter(r.get('failed_stage') for r in rows if r['status'] != 'converted')),
            'actual_engine_paths': dict(Counter(r.get('engine_used', 'not_recorded') for r in rows if r['status'] == 'converted')),
            'metrics': {key: stats(rows, key) for key in keys}}

indexed = {engine: {r['id']: r for r in values} for engine, values in groups.items()}
paired_ids = [key for key in expected if all(indexed[e][key]['status'] == 'converted' and indexed[e][key].get('text_token_f1') is not None for e in groups)]
summary = {e: summarize(values) for e, values in groups.items()}
paired = {e: {key: stats([indexed[e][i] for i in paired_ids], key) for key in keys} for e in groups}
result = {'date': '2026-11-18', 'run_url': 'https://github.com/rajveer7790/alltoolstoghter/actions/runs/44276503460',
    'corpus_manifest_sha256': hashlib.sha256(manifest_path.read_bytes()).hexdigest(),
    'summary': summary, 'paired_text_reference_subset': {'n': len(paired_ids), 'ids': paired_ids, 'metrics': paired},
    'new_environment': [s['summary']['environment'] for s in shards],
    'baseline_run_url': old['benchmark_run'], 'documents': groups,
    'scope': 'Upgraded end-to-end DocVortex/Office pipeline compared with historical native and geometric pipelines. New open font image changes the Office renderer; this is not an isolated parser A/B test. No Adobe API or Adobe outputs.'}
args.output.mkdir(parents=True, exist_ok=True)
(args.output / 'results.json').write_text(json.dumps(result, indent=2) + '\n')
columns = ['engine', 'id', 'source', 'sha256', 'category', 'status', 'engine_used', 'editable_text', 'text_token_f1', 'visual_ssim', 'foreground_f1', 'same_page_count', 'conversion_seconds', 'sampled_worker_peak_mib', 'layout_quality_gate', 'failed_stage', 'error']
with (args.output / 'results.csv').open('w') as stream:
    writer = csv.DictWriter(stream, fieldnames=columns, extrasaction='ignore', lineterminator='\n'); writer.writeheader()
    for engine, values in groups.items():
        for row in values: writer.writerow({**row, 'engine': engine})

def number(value): return '—' if value is None else f'{value:.3f}'
def line(label, values): return '| ' + label + ' | ' + ' | '.join(str(v) for v in values) + ' |\n'
text = '''# Document fidelity upgrade: 100 locked inputs

Measured 18 November 2026. [Upgraded CI run](https://github.com/rajveer7790/alltoolstoghter/actions/runs/44276503460), source commit `7b7db17f8053107031473f1cca293cb30bf05cbe`. The original 100-document evidence is preserved in the [earlier report](../2026-11-18/REPORT.md).

The new default improves editable content retention and embeds images. **It does not achieve premium layout fidelity.** Complex forms, columns, formulas, fonts and pagination still need review. File creation and strict appearance acceptance are separate outcomes.

| Measurement | Earlier basic extractor | Earlier geometric candidate | Upgraded editable DocVortex |
| --- | ---: | ---: | ---: |
'''
for key, label in [('evaluated', 'Locked inputs attempted'), ('converted_and_measured', 'Converted and measured'), ('same_page_count', 'Same page count'), ('strict_layout_gate_passes', 'Strict layout gate passes')]:
    text += line(label, [summary[e][key] for e in groups])
text += line('Failed or unmeasurable', [100-summary[e]['converted_and_measured'] for e in groups])
for key, label in [('text_token_f1', 'Median retained-token F1'), ('foreground_f1', 'Median foreground F1'), ('visual_ssim', 'Median page SSIM'), ('conversion_seconds', 'Median conversion seconds')]:
    text += line(label, [number(summary[e]['metrics'][key].get('median')) for e in groups])
text += f'''
These are end-to-end pipelines: the upgraded run also uses the new Gotenberg open-font image. Differences cannot be attributed to DocVortex alone. Historical basic/geometric results were not rerun or relabeled as current. In particular, the current basic mode now removes duplicate table text and has separate regression tests; its upgraded 100-document performance is not inferred from the earlier baseline.

On the same **{len(paired_ids)}** successful inputs with a nonempty extracted-text reference in all three pipelines, median token F1 is ''' + ', '.join(f"{e}: {number(paired[e]['text_token_f1'].get('median'))}" for e in groups) + '''. This is retained-token overlap, not human-verified OCR accuracy; reading order is not scored.

## Applied changes and available choices

- Editable document: DocVortex 0.6.24, embedded images and structured blocks. Automatic local OCR for image-only pages; recover invisible OCR text when the structured exporter otherwise returns only images. Actual engine/fallback path is recorded per converted case.
- Basic text/tables: spatially ordered prose and tables with table text removed from prose. It remains a reconstruction mode.
- Page images: rendered pages embedded in DOCX at original page dimensions. This preserves the rendered page appearance at 150 DPI, while text is explicitly **not editable**. It is excluded from editable-conversion benchmark scores.
- Optional geometric worker: a separate, isolated pdf2docx/PyMuPDF profile, disabled by default until the operator reviews AGPL/commercial conditions. No paid API key. Earlier measured geometric scores above do not certify this deployment or every input.
- Office-to-PDF: open Noto/CJK and metric-compatible fonts, lossless image export, no resolution reduction and flattened form fields by default. Missing proprietary/custom fonts can still change pagination.
- PDF-to-HTML: semantic HTML with relative assets in a ZIP; OCR text recovery is covered separately. Compression defaults to higher image quality rather than aggressive downsampling.

## Scope and limitations

All 100 IDs and SHA-256 input hashes match the [locked manifest](../../corpus.json). The corpus contains 15 IRS forms, 25 Docling fixtures, 28 pypdf samples and 32 PDF.js fixtures, including real documents and intentionally synthetic regression cases. It is not 100 representative customer documents. Failures remain failures; no inputs were replaced.

The 100-document comparison disables automatic OCR to measure the direct extraction path consistently. Separate real container regressions exercise scan OCR → editable Word, images and page-image pagination. Scans without an extracted text reference cannot receive a meaningful text-retention score. The source reference itself is PDFium extraction, not manual transcription.

Strict layout acceptance requires retained-token F1 >= .98, SSIM >= .95, foreground F1 >= .85 and identical page count. These are heuristic thresholds, not an Adobe certification. Grayscale 900×900 letterboxed comparison does not measure color fidelity or microscopic details; blank space can inflate SSIM. Every source and output page is included, with missing/extra pages compared against white. Worker memory excludes the separate Office container. Timing is a CI observation, not an Oracle capacity promise.

PaddleOCR, MinerU and Marker version/CLI updates are separate optional integrations. Their model inference quality is not established by these results. No Adobe service, Adobe output or hosted LLM was used in this benchmark. Backend deployment remains an operator step; merging source does not start a VPS service.

## Actual paths, failures and per-document evidence

'''
text += 'Converted path counts: `' + json.dumps(summary['docvortex']['actual_engine_paths'], sort_keys=True) + '`.\n\n'
text += 'New failure stages: `' + json.dumps(summary['docvortex']['failure_stages'], sort_keys=True) + '`.\n\n'
text += 'Full immutable input hashes, errors, DOCX image/table counts, timings and all three pipelines are in [results.json](results.json); [results.csv](results.csv) has 300 engine/document rows.\n\n'
text += '| ID | Source | New status | Token F1 | Foreground F1 | Pages unchanged |\n| --- | --- | --- | ---: | ---: | --- |\n'
for row in rows:
    text += line(row['id'], [row['source'].replace('|', '\\|'), row['status'], number(row.get('text_token_f1')), number(row.get('foreground_f1')), row.get('same_page_count', '—')])
(args.output / 'REPORT.md').write_text(text)
print(json.dumps({'summary': summary, 'paired_n': len(paired_ids)}, indent=2))
