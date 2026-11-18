"""Reproducible PDF -> editable DOCX -> PDF quality measurements.

This measures the actual native backend plus Gotenberg, not Adobe equivalence.
Source PDF text is a machine-extracted reference, not human OCR ground truth.
"""
import argparse
from collections import Counter
import csv
import hashlib
import importlib.metadata
import json
import math
import os
from pathlib import Path
import platform
import re
import shutil
import statistics
import subprocess
import sys
import time
import unicodedata
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
import httpx
import numpy as np
from PIL import Image, ImageFilter, ImageOps
import psutil
import pypdfium2 as pdfium
from pypdf import PdfReader
from scipy.ndimage import uniform_filter
from backend.documents import engines
from backend.documents.runtime import ToolError

CATALOG = {t['id']: t for t in json.loads((ROOT / 'lib/documents/tools.json').read_text())}
MANIFEST = json.loads(Path(__file__).with_name('corpus.json').read_text())
GATES = {'text_token_f1': .98, 'visual_ssim': .95, 'foreground_f1': .85, 'same_page_count': True}


def normalized(value):
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFKC', value)).strip()


def text_metrics(reference, candidate):
    a = Counter(re.findall(r'\w+|[^\w\s]', normalized(reference).casefold()))
    b = Counter(re.findall(r'\w+|[^\w\s]', normalized(candidate).casefold()))
    if not a:
        return {'text_token_precision': None, 'text_token_recall': None, 'text_token_f1': None}
    overlap = sum((a & b).values())
    precision = overlap / sum(b.values()) if b else 0.
    recall = overlap / sum(a.values())
    return {'text_token_precision': precision, 'text_token_recall': recall,
            'text_token_f1': 2 * precision * recall / (precision + recall) if precision + recall else 0.}


def pdf_text(path):
    document = pdfium.PdfDocument(str(path))
    text = []
    try:
        for page in document:
            try:
                item = page.get_textpage()
                try: text.append(item.get_text_range())
                finally: item.close()
            finally: page.close()
    finally: document.close()
    return '\n'.join(text)


def pdf_info(path):
    reader = PdfReader(path)
    fonts, images = set(), 0
    for page in reader.pages:
        resources = page.get('/Resources')
        if resources:
            resources = resources.get_object()
            font_dictionary = resources.get('/Font')
            font_dictionary = font_dictionary.get_object() if font_dictionary else {}
            for value in font_dictionary.values():
                name = str(value.get_object().get('/BaseFont', ''))
                if name: fonts.add(re.sub(r'^/?[A-Z]{6}\+', '', name).lstrip('/'))
            xobjects = resources.get('/XObject')
            if xobjects:
                images += sum(value.get_object().get('/Subtype') == '/Image' for value in xobjects.get_object().values())
    return {'pages': len(reader.pages), 'fonts': sorted(fonts), 'top_level_images': images}


def docx_info(path):
    from lxml import etree
    with zipfile.ZipFile(path) as archive:
        xml = etree.fromstring(archive.read('word/document.xml'))
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        return {'editable_tables': len(xml.findall('.//w:tbl', ns)),
                'embedded_images': sum(p.startswith('word/media/') for p in archive.namelist()),
                'text_characters': len(''.join(xml.itertext())),
                'text_runs': len(xml.findall('.//w:t', ns))}


def page_image(document, index):
    if index >= len(document): return Image.new('L', (900, 900), 'white')
    page = document[index]
    try:
        width, height = page.get_size()
        if width * height > 16_000_000: raise ValueError('Page exceeds benchmark rendering limit')
        bitmap = page.render(scale=min(1., 900 / max(width, height)))
        try:
            image = bitmap.to_pil().convert('L')
            # Letterbox rather than distort page geometry to the same square.
            return ImageOps.pad(image, (900, 900), color='white', method=Image.Resampling.LANCZOS)
        finally: bitmap.close()
    finally: page.close()


def image_metrics(source, target):
    a, b = np.asarray(source, dtype=np.float64) / 255, np.asarray(target, dtype=np.float64) / 255
    # Standard local-window SSIM; report foreground overlap too, since blank space
    # can make SSIM deceptively high on document pages.
    ux, uy = uniform_filter(a, 11), uniform_filter(b, 11)
    vx = np.maximum(0., uniform_filter(a * a, 11) - ux * ux)
    vy = np.maximum(0., uniform_filter(b * b, 11) - uy * uy)
    covariance = uniform_filter(a * b, 11) - ux * uy
    ssim = (((2 * ux * uy + .01 ** 2) * (2 * covariance + .03 ** 2)) /
            ((ux ** 2 + uy ** 2 + .01 ** 2) * (vx + vy + .03 ** 2))).mean()
    am, bm = a < .92, b < .92
    ad = np.asarray(source.filter(ImageFilter.MinFilter(3))) < 235
    bd = np.asarray(target.filter(ImageFilter.MinFilter(3))) < 235
    precision = float((bm & ad).sum() / bm.sum()) if bm.any() else float(not am.any())
    recall = float((am & bd).sum() / am.sum()) if am.any() else float(not bm.any())
    return {'ssim': float(ssim), 'foreground_f1': 2 * precision * recall / (precision + recall) if precision + recall else 0.,
            'pixel_mae': float(np.abs(a - b).mean())}


def visual_metrics(source, candidate, directory):
    a, b = pdfium.PdfDocument(str(source)), pdfium.PdfDocument(str(candidate))
    values = []
    try:
        # Evaluate every page, including missing/extra pages against white.
        for index in range(max(len(a), len(b))):
            source_image, target_image = page_image(a, index), page_image(b, index)
            try:
                values.append(image_metrics(source_image, target_image))
                if index == 0:
                    panel = Image.new('L', (1800, 900), 'white')
                    panel.paste(source_image, (0, 0)); panel.paste(target_image, (900, 0))
                    panel.save(directory / 'first-page-comparison.png')
            finally: source_image.close(); target_image.close()
    finally: a.close(); b.close()
    return {'visual_ssim': statistics.mean(v['ssim'] for v in values),
            'foreground_f1': statistics.mean(v['foreground_f1'] for v in values),
            'pixel_mae': statistics.mean(v['pixel_mae'] for v in values), 'compared_pages': len(values)}


def fetch_document(entry, cache):
    path = cache / (entry['id'] + '.pdf')
    if not path.exists():
        # Reuse the original corpus lock cache when available.
        original = cache / (entry['sha256'] + '.pdf')
        if original.exists(): shutil.copyfile(original, path)
        else:
            request = urllib.request.Request(entry['url'], headers={'User-Agent': 'AllToolsTogether-quality-benchmark/1.0'})
            with urllib.request.urlopen(request, timeout=60) as response: payload = response.read(20 * 1024 * 1024 + 1)
            if len(payload) > 20 * 1024 * 1024: raise ValueError('Source exceeds 20 MB')
            path.write_bytes(payload)
    if hashlib.sha256(path.read_bytes()).hexdigest() != entry['sha256']:
        raise ValueError('Source bytes changed; do not silently replace the locked input')
    return path


def render_docx(path, directory, gotenberg, libreoffice=False):
    output = directory / 'roundtrip.pdf'
    if libreoffice:
        profile = directory / 'lo-profile'
        subprocess.run(['soffice', '-env:UserInstallation=' + profile.as_uri(), '--headless', '--convert-to', 'pdf', '--outdir', str(directory), str(path)],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=180)
        generated = directory / (path.stem + '.pdf')
        if generated != output: generated.replace(output)
    else:
        with path.open('rb') as upload, httpx.Client(timeout=180, trust_env=False) as client:
            response = client.post(gotenberg.rstrip('/') + '/forms/libreoffice/convert',
                                   files={'files': (path.name, upload, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')},
                                   data={'nativeBookmarks': 'true'})
            response.raise_for_status(); output.write_bytes(response.content)
    return output


def one_case(entry, args):
    directory = args.output / entry['id']; directory.mkdir(parents=True, exist_ok=True)
    result = {'id': entry['id'], 'source': entry['path'], 'url': entry['url'], 'sha256': entry['sha256'],
              'repository': entry['repository'], 'category': entry['category'], 'status': 'failed',
              'engine': args.engine, 'pipeline': args.engine + ' -> LibreOffice PDF'}
    stage = 'download'
    try:
        source = fetch_document(entry, args.cache)
        stage = 'source_analysis'; result['source_info'] = pdf_info(source)
        original_text = pdf_text(source); reference_text = original_text
        result['reference_characters'] = len(normalized(original_text))
        result['reference_kind'] = 'PDFium-extracted source text; not human ground truth'
        if result['source_info']['pages'] > 200: raise ValueError('Source exceeds backend page limit')
        start = time.perf_counter(); native_input = source
        if len(normalized(original_text)) < 20 and args.ocr:
            stage = 'ocr'; ocrdir = directory / 'ocr'; ocrdir.mkdir(exist_ok=True)
            native_input = engines.process(CATALOG['ocr-pdf'], [source], {'language': 'eng', 'deskew': False}, ocrdir)
            reference_text = pdf_text(native_input)
            result['pipeline'] = 'OCRmyPDF English -> native-text-tables -> LibreOffice PDF'
            result['reference_kind'] = 'OCR estimate; no independent OCR accuracy ground truth'
        stage = 'pdf_to_docx'; work = directory / 'native'; work.mkdir(exist_ok=True)
        if args.engine in {'native', 'docvortex'}:
            method = 'Editable document' if args.engine == 'docvortex' else 'Basic text and tables'
            docx = engines.process(CATALOG['pdf-to-word'], [native_input], {'layout': 'page-breaks', 'method': method, 'ocr': False}, work)
        else:
            from backend.documents.runtime import run
            docx = work / 'document.docx'
            run([str(args.engine_python.absolute()), str(Path(__file__).with_name('geometric_worker.py')), str(native_input), str(docx)], work, 120)
            result['engine_versions'] = json.loads((work / 'engine-versions.json').read_text())
        result['native_seconds'] = time.perf_counter() - start
        result['docx_info'] = docx_info(docx)
        stage = 'docx_to_pdf'; start = time.perf_counter()
        roundtrip = render_docx(docx, directory, args.gotenberg, args.libreoffice)
        result['office_seconds'] = time.perf_counter() - start
        result['conversion_seconds'] = result['native_seconds'] + result['office_seconds']
        result['output_info'] = pdf_info(roundtrip)
        stage = 'metrics'; output_text = pdf_text(roundtrip)
        result.update(text_metrics(reference_text, output_text))
        result.update(visual_metrics(source, roundtrip, directory))
        result['same_page_count'] = result['source_info']['pages'] == result['output_info']['pages']
        result['source_font_set_retained'] = set(result['source_info']['fonts']).issubset(result['output_info']['fonts'])
        result['layout_quality_gate'] = bool(result['text_token_f1'] is not None and result['text_token_f1'] >= GATES['text_token_f1']
            and result['visual_ssim'] >= GATES['visual_ssim'] and result['foreground_f1'] >= GATES['foreground_f1'] and result['same_page_count'])
        result['status'] = 'converted'
    except Exception as error:
        result['failed_stage'] = stage
        result['error'] = (error.message if isinstance(error, ToolError) else str(error))[:300]
    (directory / 'result.json').write_text(json.dumps(result, indent=2) + '\n')
    return result


def summarize(results, args):
    converted = [r for r in results if r['status'] == 'converted']
    def distribution(key):
        population = results if key == 'sampled_worker_peak_mib' else converted
        values = sorted(r[key] for r in population if isinstance(r.get(key), (int, float)))
        return {'n': len(values), 'median': statistics.median(values), 'mean': statistics.mean(values), 'p95': values[math.ceil(.95 * len(values))-1], 'max': max(values)} if values else {'n': 0}
    versions = {}
    for package in ['pypdf', 'pdfplumber', 'pypdfium2', 'python-docx', 'numpy', 'scipy', 'psutil']:
        versions[package] = importlib.metadata.version(package)
    summary = {'evaluated': len(results), 'converted': len(converted), 'failed': len(results)-len(converted),
        'layout_quality_gate_passed': sum(r.get('layout_quality_gate', False) for r in results),
        'engine': args.engine, 'comparison': 'open-source output versus original PDF', 'gates': GATES,
        'same_page_count': sum(r.get('same_page_count', False) for r in converted),
        'metrics': {key: distribution(key) for key in ['text_token_f1', 'visual_ssim', 'foreground_f1', 'conversion_seconds', 'sampled_worker_peak_mib']},
        'environment': {'python': platform.python_version(), 'machine': platform.machine(), 'platform': platform.platform(),
                        'cpu_count': os.cpu_count(), 'packages': versions, 'renderer': 'local LibreOffice (version in environment.txt)' if args.libreoffice else 'Gotenberg 9.6.0 LibreOffice',
                        'source_commit': os.getenv('GITHUB_SHA', 'local-working-copy')},
        'coverage': dict(Counter(r['category'] for r in results)),
        'limitations': ['Public government documents and upstream regression fixtures; not 100 representative customer documents.',
            'Source text extraction is not human OCR ground truth; token F1 ignores reading order.',
            'SSIM can reward blank space; foreground F1 and every-page/page-count checks are included.',
            'Heuristic quality thresholds are not an Adobe certification or industry standard.',
            'Worker RSS is sampled; Gotenberg is a separate process/container and excluded.',
            'Large optional model stacks and browser editor operations are outside this conversion benchmark.']}
    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
    (args.output / 'results.json').write_text(json.dumps({'summary': summary, 'documents': results}, indent=2) + '\n')
    columns = ['id', 'source', 'category', 'status', 'pipeline', 'text_token_f1', 'visual_ssim', 'foreground_f1', 'same_page_count', 'conversion_seconds', 'sampled_worker_peak_mib', 'layout_quality_gate', 'failed_stage', 'error']
    with (args.output / 'results.csv').open('w') as stream:
        writer = csv.DictWriter(stream, fieldnames=columns, extrasaction='ignore'); writer.writeheader(); writer.writerows(results)
    print('QUALITY_SUMMARY ' + json.dumps(summary), flush=True)
    return summary


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, default=ROOT / '.cache/document-quality/results')
    parser.add_argument('--cache', type=Path, default=ROOT / '.cache/document-quality/corpus')
    parser.add_argument('--gotenberg', default=os.getenv('GOTENBERG_URL', 'http://127.0.0.1:8879'))
    parser.add_argument('--libreoffice', action='store_true', help='Local diagnostic renderer; CI uses pinned Gotenberg')
    parser.add_argument('--ocr', action='store_true')
    parser.add_argument('--engine', choices=['native', 'geometric', 'docvortex'], default='native')
    parser.add_argument('--engine-python', type=Path, default=Path(sys.executable))
    parser.add_argument('--shard', type=int, default=0)
    parser.add_argument('--shards', type=int, default=1)
    parser.add_argument('--case')
    parser.add_argument('--limit', type=int, default=100)
    args = parser.parse_args(); args.output = args.output.resolve(); args.cache = args.cache.resolve()
    args.output.mkdir(parents=True, exist_ok=True); args.cache.mkdir(parents=True, exist_ok=True)
    if args.case:
        entry = next(row for row in MANIFEST['documents'] if row['id'] == args.case)
        print('QUALITY_RESULT ' + json.dumps(one_case(entry, args)), flush=True)
        return
    corpus = MANIFEST['documents']
    assert len(corpus) == len({r['sha256'] for r in corpus}) == 100, 'Corpus must contain exactly 100 unique locked inputs'
    results = []
    selected = [r for i, r in enumerate(corpus) if i % args.shards == args.shard][:args.limit]
    for entry in selected:
        command = [sys.executable, str(Path(__file__).resolve()), '--case', entry['id'], '--output', str(args.output), '--cache', str(args.cache), '--gotenberg', args.gotenberg]
        if args.libreoffice: command.append('--libreoffice')
        if args.ocr: command.append('--ocr')
        command += ['--engine', args.engine, '--engine-python', str(args.engine_python.absolute())]
        log = args.output / (entry['id'] + '.log')
        peak, started = 0, time.monotonic()
        with log.open('w') as stream:
            child = subprocess.Popen(command, stdout=stream, stderr=stream, start_new_session=True)
            process = psutil.Process(child.pid)
            while child.poll() is None:
                try:
                    peak = max(peak, sum(p.memory_info().rss for p in [process, *process.children(recursive=True)] if p.is_running()))
                except psutil.Error: pass
                if time.monotonic() - started > 240:
                    import signal
                    try: os.killpg(child.pid, signal.SIGKILL)
                    except ProcessLookupError: pass
                    child.wait(); break
                time.sleep(.05)
        result_file = args.output / entry['id'] / 'result.json'
        if result_file.exists(): result = json.loads(result_file.read_text())
        else: result = {**{k: entry[k] for k in ['id', 'category', 'url', 'sha256']}, 'source': entry['path'], 'status': 'failed', 'failed_stage': 'worker', 'error': 'Worker exited or exceeded 240 seconds', 'engine': args.engine}
        result['sampled_worker_peak_mib'] = peak / 1024 ** 2
        result['total_case_seconds'] = time.monotonic() - started
        results.append(result)
        result_file.parent.mkdir(exist_ok=True); result_file.write_text(json.dumps(result, indent=2) + '\n')
        print('QUALITY_RESULT ' + json.dumps(result), flush=True)
    summarize(results, args)


if __name__ == '__main__': main()
