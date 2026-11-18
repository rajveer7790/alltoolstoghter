"""Aggregate measured shards only after all 100 IDs are present per engine."""
import argparse
from collections import Counter
import csv
import hashlib
import json
import math
from pathlib import Path
import statistics

parser = argparse.ArgumentParser()
parser.add_argument('inputs', nargs='+', type=Path, help='Shard results.json files')
parser.add_argument('--output', required=True, type=Path)
parser.add_argument('--run-url', default='')
parser.add_argument('--evidence', type=Path)
args = parser.parse_args()
manifest = json.loads((Path(__file__).parent / 'documents/corpus.json').read_text())
expected = {r['id']: r for r in manifest['documents']}
groups, environments = {}, {}
for path in args.inputs:
    data = json.loads(path.read_text())
    engine = data['summary']['engine']
    groups.setdefault(engine, []).extend(data['documents'])
    environments.setdefault(engine, []).append(data['summary']['environment'])
assert set(groups) == {'native', 'geometric'}, 'Both actual engine runs are required'
for engine, rows in groups.items():
    assert len(rows) == len({r['id'] for r in rows}) == 100, (engine, '100 unique results required')
    assert set(r['id'] for r in rows) == set(expected), 'IDs differ from locked corpus'
    assert all(r['sha256'] == expected[r['id']]['sha256'] for r in rows), 'Input bytes differ'
    rows.sort(key=lambda r: r['id'])


def stats(rows, key, successful=True):
    values = sorted(r[key] for r in rows if (not successful or r['status'] == 'converted') and isinstance(r.get(key), (int, float)))
    return {'n': len(values), 'median': statistics.median(values), 'mean': statistics.mean(values),
            'p95': values[math.ceil(.95 * len(values))-1], 'max': max(values)} if values else {'n': 0}


def summary(rows):
    passed = [r for r in rows if r['status'] == 'converted']
    return {'evaluated': len(rows), 'converted_and_measured': len(passed), 'failed_or_unmeasurable': len(rows)-len(passed),
        'same_page_count': sum(r.get('same_page_count', False) for r in rows),
        'strict_layout_gate_passes': sum(r.get('layout_quality_gate', False) for r in rows),
        'failure_stages': dict(Counter(r.get('failed_stage') for r in rows if r['status'] != 'converted')),
        'metrics': {key: stats(rows, key, successful=key != 'sampled_worker_peak_mib') for key in ['text_token_f1', 'visual_ssim', 'foreground_f1', 'conversion_seconds', 'sampled_worker_peak_mib']}}


combined = {'date': '2026-11-18', 'benchmark_run': args.run_url,
    'corpus_manifest_sha256': hashlib.sha256((Path(__file__).parent / 'documents/corpus.json').read_bytes()).hexdigest(),
    'summary': {engine: summary(rows) for engine, rows in groups.items()},
    'environment': environments, 'documents': groups,
    'scope': 'Open-source engines versus original source PDFs; no proprietary API used in these measured runs.'}
indexed = {engine: {r['id']: r for r in rows} for engine, rows in groups.items()}
paired_ids = [key for key in expected if all(indexed[engine][key]['status'] == 'converted' and indexed[engine][key].get('text_token_f1') is not None for engine in groups)]
paired = {engine: [indexed[engine][key] for key in paired_ids] for engine in groups}
combined['paired_text_reference_subset'] = {'n': len(paired_ids), 'ids': paired_ids,
    'metrics': {engine: {key: stats(rows, key) for key in ['text_token_f1', 'visual_ssim', 'foreground_f1', 'conversion_seconds']} for engine, rows in paired.items()}}
if args.evidence: combined['ci_evidence'] = json.loads(args.evidence.read_text())
args.output.mkdir(parents=True, exist_ok=True)
(args.output / 'results.json').write_text(json.dumps(combined, indent=2) + '\n')
columns = ['engine', 'id', 'source', 'category', 'sha256', 'status', 'text_token_f1', 'visual_ssim', 'foreground_f1', 'same_page_count', 'conversion_seconds', 'sampled_worker_peak_mib', 'layout_quality_gate', 'failed_stage', 'error']
with (args.output / 'results.csv').open('w') as stream:
    writer = csv.DictWriter(stream, fieldnames=columns, extrasaction='ignore'); writer.writeheader()
    for engine, rows in groups.items():
        for row in rows: writer.writerow({**row, 'engine': engine})

def number(value): return '—' if value is None else f'{value:.3f}'
def median(engine, key): return number(combined['summary'][engine]['metrics'][key].get('median'))
native, geometric = combined['summary']['native'], combined['summary']['geometric']
text = f'''# 100-document open-source conversion benchmark

Measured: 18 November 2026. [Exact CI run]({args.run_url}).

## Result and deployment decision

Both engines were attempted on the same **100 SHA-256-locked input PDFs**. A successful DOCX download is not a fidelity pass. The native text/table extractor produced {native['converted_and_measured']} fully measured round trips; the geometric candidate produced {geometric['converted_and_measured']}. Strict layout acceptance passed on {native['strict_layout_gate_passes']} native and {geometric['strict_layout_gate_passes']} geometric inputs, out of 100 attempts each.

Do **not** advertise the native PDF-to-Word tool as a premium layout-preserving converter. Keep its existing text/table reconstruction limitations visible. The geometric candidate remains a benchmark-only option: it is not silently substituted into the production stack. Review failures, license obligations, upstream maintenance and actual customer samples before selecting it.

Core conversion, OCR, optimization and inspection services can be deployed separately with their documented limits. ARM64 smoke tests verify the core container path; they do not prove all optional models or production capacity on Oracle.

## Measured comparison

| Measurement | Native text/tables | Geometric pdf2docx |
| --- | ---: | ---: |
| Locked inputs attempted | 100 | 100 |
| Converted and measured | {native['converted_and_measured']} | {geometric['converted_and_measured']} |
| Failed or unmeasurable | {native['failed_or_unmeasurable']} | {geometric['failed_or_unmeasurable']} |
| Same page count | {native['same_page_count']} | {geometric['same_page_count']} |
| Strict layout gate passes | {native['strict_layout_gate_passes']} | {geometric['strict_layout_gate_passes']} |
| Nonempty source-text reference scores | {native['metrics']['text_token_f1']['n']} | {geometric['metrics']['text_token_f1']['n']} |
| Median retained-token F1 | {median('native','text_token_f1')} | {median('geometric','text_token_f1')} |
| Median page SSIM | {median('native','visual_ssim')} | {median('geometric','visual_ssim')} |
| Median foreground F1 | {median('native','foreground_f1')} | {median('geometric','foreground_f1')} |
| Median conversion seconds | {median('native','conversion_seconds')} | {median('geometric','conversion_seconds')} |
| Median sampled worker MiB | {median('native','sampled_worker_peak_mib')} | {median('geometric','sampled_worker_peak_mib')} |

Metric medians for content/appearance/time include successfully measured outputs, with their sample counts in `results.json`. Failures remain in the 100-input denominator and have no invented score. Memory includes failed workers too and excludes the separate Gotenberg container. These are test-run timings, not Oracle throughput guarantees. Retained-token F1 is **not** a percentage of human-verified text or OCR accuracy.

## Paired subset and content caveat

On the same {len(paired_ids)} inputs with successful measurements and a nonempty source-text reference in **both** engines, median token F1 is {number(combined['paired_text_reference_subset']['metrics']['native']['text_token_f1']['median'])} native versus {number(combined['paired_text_reference_subset']['metrics']['geometric']['text_token_f1']['median'])} geometric. Median foreground F1 is {number(combined['paired_text_reference_subset']['metrics']['native']['foreground_f1']['median'])} versus {number(combined['paired_text_reference_subset']['metrics']['geometric']['foreground_f1']['median'])}. This paired subset helps separate engine differences from different failure populations; the full 100-input success/failure counts still apply.

Eight geometric outputs had no nonempty source-text reference and contained no editable DOCX text. They are not counted as OCR or editable-text successes merely because a DOCX file was produced. Appearance/content gates remain separate from file creation.

## Corpus and fairness

Sources: 15 IRS government forms, 25 Docling test documents, 28 pypdf samples and 32 PDF.js test documents. The corpus includes real documents **and deliberately synthetic upstream regression fixtures**. It covers forms, tables, scientific/multicolumn pages, fonts, right-to-left text, graphics and scans. It is not 100 representative customer resumes/invoices/contracts. No document was replaced after a poor conversion or parser failure.

Input URLs, revisions, byte sizes, hashes and rights notes are in [the corpus manifest](../../corpus.json). Original copyrighted PDFs and temporary service URLs are not redistributed in this repository. Both DOCX paths use the same Gotenberg 9.6.0 LibreOffice renderer and installed fonts in CI. Every original/round-trip page is evaluated, including extra or missing pages against white.

The default benchmark evaluates the actual native text-layer endpoint and a geometric candidate. It does not silently run OCR first. A scan rejected with “run OCR first” is recorded as an unsupported input for this direct path. The separate ARM64 smoke test checks real image-only OCR. OCR quality, model-assisted reconstruction and the entire optional model inventory are not inferred from these results.

## Interpretation and limits

- Token precision/recall/F1 uses PDFium source extraction as a machine reference and ignores reading order. Fonts, ligatures and extraction differences can affect it.
- Appearance metrics use 900-by-900 letterboxed grayscale canvases; color fidelity and microscopic print detail are not assessed. White space inflates SSIM; foreground F1 and pagination are required alongside it. High SSIM alone is insufficient.
- Strict acceptance is a predeclared heuristic: token F1 >= .98, SSIM >= .95, foreground F1 >= .85 and unchanged page count. It is not an industry certification.
- DOCX table/image counts are available per document. Geometric layout tables can inflate table counts; these counts do not prove semantic table correctness.
- Font-name preservation is diagnostic only. Font aliases, substitution and unavailable licensed fonts can change pagination. No Microsoft Word rendering comparison or manual proofreading is claimed.
- Optional PaddleOCR, Docling, MinerU and Marker models were not benchmarked here. The geometric candidate uses MIT pdf2docx plus AGPL/commercial PyMuPDF, and pdf2docx is no longer actively maintained upstream. No hosted API key is required; licensing is separate from API access.

## Failures and next work

Native failure stages: `{json.dumps(native['failure_stages'], sort_keys=True)}`. Geometric failure stages: `{json.dumps(geometric['failure_stages'], sort_keys=True)}`.

The native path is intentionally a text/table reconstruction tool: it changes formatting, appends extracted tables and does not embed page graphics. That can duplicate table text and change page count substantially. The benchmark exposes this behavior; it does not turn a failed quality gate into a success. Before a premium PDF-to-Word release, add a maintained layout-aware path, remove duplicate table text, preserve images/styles/page geometry, validate RTL/fonts, and run a representative annotated customer corpus with manual review.

## Per-document record

N/G means native/geometric. A dash means the stage failed or no independent text reference was available. Full metrics, errors, timings, environment versions and hashes are in [results.json](results.json); [results.csv](results.csv) has 200 machine-readable engine/document rows.

| ID | Source | Native status | Geometric status | N token F1 | G token F1 | N foreground F1 | G foreground F1 | N/G pages unchanged |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- |
'''
for left, right in zip(groups['native'], groups['geometric']):
    assert left['id'] == right['id']
    name = left['source'].split('/')[-1].replace('|', '\\|')
    text += f"| {left['id']} | {name} | {left['status']} | {right['status']} | {number(left.get('text_token_f1'))} | {number(right.get('text_token_f1'))} | {number(left.get('foreground_f1'))} | {number(right.get('foreground_f1'))} | {left.get('same_page_count','—')} / {right.get('same_page_count','—')} |\n"
(args.output / 'REPORT.md').write_text(text)
print(json.dumps(combined['summary'], indent=2))
