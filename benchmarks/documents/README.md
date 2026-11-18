# Document conversion quality benchmark

This benchmark evaluates 100 byte-distinct PDF files selected **before** conversion. It is a mixture of public IRS forms and upstream Docling, pypdf and PDF.js test documents. Some upstream files are deliberately synthetic regression fixtures. It is not described as 100 real customer documents or a representative production sample.

`corpus.json` records every source URL, upstream revision, SHA-256, size, category and rights note. `lock_corpus.py` records the candidate selection process without filtering out poor conversion results. The original and converted documents stay in the ignored `.cache` directory; this repository distributes source provenance and measured numbers, not the original third-party PDFs.

## Run

Install the backend requirements plus `numpy`, `scipy` and `psutil`. The normal path uses the same native backend worker and Gotenberg 9.6.0 as the application:

```bash
docker run --rm -d --name document-benchmark-office -p 127.0.0.1:8879:3000 gotenberg/gotenberg:9.6.0
python benchmarks/documents/run.py --gotenberg http://127.0.0.1:8879
```

For a local diagnostic using an installed LibreOffice, add `--libreoffice`. Its version must be recorded; a local run is not silently relabeled as the pinned Docker renderer. Use `--shards 4 --shard 0` (through shard 3) for independent batches. `--limit` is only a smoke-test limit; a full report requires all 100 manifest IDs exactly once.

`--ocr` explicitly enables OCRmyPDF (English) before conversion for inputs with fewer than 20 extracted characters. This is an explicit chain, not a claim that the public PDF-to-Word endpoint automatically performs OCR. OCR estimates are not independent human ground truth. The default text-only path can correctly reject a scan; that rejection remains recorded rather than being replaced by another document.

## Open-source engine comparison

The native text/table reconstruction path is compared with the optional geometric `pdf2docx` path, using the same source bytes, renderer and metrics. Install its separate benchmark environment with `requirements-geometric.txt` and pass `--engine geometric --engine-python /absolute/path/to/venv/bin/python`. The geometric worker is an evaluation candidate, not a dependency silently added to the production website.

`pdf2docx` code is MIT, but its PyMuPDF dependency has AGPL/commercial terms. The upstream project is no longer actively maintained. No hosted API key is required; production use still needs license and maintenance review. These tests do not evaluate or use an Adobe API. A visual comparison against the original PDF is not a claim of Adobe parity.

## Measurements and limits

- Every original and round-trip page is rendered; extra/missing pages are compared against white, with page count reported separately.
- Token precision/recall/F1 uses independently extracted PDFium source text. It measures retained token content, ignores reading order, and is **not** human-verified text/OCR accuracy.
- SSIM, pixel MAE and foreground F1 measure page appearance. Letterboxing preserves aspect ratio. White space can inflate SSIM, so foreground F1 and pagination must also be considered.
- Native DOCX tables and embedded images are counted. Table correctness and semantic editability require annotated ground truth/manual review; table count alone is not an accuracy score.
- Source/output font sets are reported; exact names are only a diagnostic because aliases and subset naming can differ.
- Conversion wall time and sampled worker RSS are reported. RSS excludes a separate Gotenberg container; it is not total hosting RAM. Test-machine timings are not Oracle performance guarantees.
- The strict layout gate (token F1 >= .98, SSIM >= .95, foreground F1 >= .85 and unchanged page count) is a predeclared heuristic, not an industry or Adobe standard.

Do not claim Adobe-equivalent fidelity, production certification, or model quality from these measurements. Optional PaddleOCR/Docling/MinerU/Marker stacks need their own runs and model/license/version records.
