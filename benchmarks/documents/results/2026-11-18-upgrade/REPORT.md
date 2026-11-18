# Document fidelity upgrade: 100 locked inputs

Measured 18 November 2026. [Upgraded CI run](https://github.com/rajveer7790/alltoolstoghter/actions/runs/44276503460), source commit `7b7db17f8053107031473f1cca293cb30bf05cbe`. The original 100-document evidence is preserved in the [earlier report](../2026-11-18/REPORT.md).

The new default improves editable content retention and embeds images. **It does not achieve premium layout fidelity.** Complex forms, columns, formulas, fonts and pagination still need review. File creation and strict appearance acceptance are separate outcomes.

| Measurement | Earlier basic extractor | Earlier geometric candidate | Upgraded editable DocVortex |
| --- | ---: | ---: | ---: |
| Locked inputs attempted | 100 | 100 | 100 |
| Converted and measured | 89 | 95 | 91 |
| Same page count | 36 | 59 | 42 |
| Strict layout gate passes | 0 | 6 | 0 |
| Failed or unmeasurable | 11 | 5 | 9 |
| Median retained-token F1 | 0.935 | 0.964 | 0.996 |
| Median foreground F1 | 0.059 | 0.372 | 0.102 |
| Median page SSIM | 0.825 | 0.843 | 0.777 |
| Median conversion seconds | 0.555 | 0.997 | 1.450 |

These are end-to-end pipelines: the upgraded run also uses the new Gotenberg open-font image. Differences cannot be attributed to DocVortex alone. Historical basic/geometric results were not rerun or relabeled as current. In particular, the current basic mode now removes duplicate table text and has separate regression tests; its upgraded 100-document performance is not inferred from the earlier baseline.

On the same **85** successful inputs with a nonempty extracted-text reference in all three pipelines, median token F1 is native: 0.950, geometric: 0.966, docvortex: 0.996. This is retained-token overlap, not human-verified OCR accuracy; reading order is not scored.

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

Converted path counts: `{"docvortex-0.6.24": 86, "text-layer-recovery": 5}`.

New failure stages: `{"pdf_to_docx": 8, "source_analysis": 1}`.

Full immutable input hashes, errors, DOCX image/table counts, timings and all three pipelines are in [results.json](results.json); [results.csv](results.csv) has 300 engine/document rows.

| ID | Source | New status | Token F1 | Foreground F1 | Pages unchanged |
| --- | --- | --- | ---: | ---: | --- |
| doc-001 | fw2.pdf | converted | 1.000 | 0.057 | False |
| doc-002 | fw3.pdf | converted | 0.998 | 0.087 | False |
| doc-003 | fw4.pdf | converted | 0.901 | 0.094 | False |
| doc-004 | fw4p.pdf | converted | 1.000 | 0.107 | False |
| doc-005 | fw4r.pdf | converted | 1.000 | 0.153 | False |
| doc-006 | fw8ben.pdf | converted | 1.000 | 0.085 | False |
| doc-007 | fw8bene.pdf | converted | 0.996 | 0.127 | False |
| doc-008 | fw9.pdf | converted | 0.999 | 0.143 | False |
| doc-009 | f1040.pdf | converted | 0.993 | 0.030 | False |
| doc-010 | f1040sr.pdf | converted | 1.000 | 0.082 | False |
| doc-011 | f1040sc.pdf | converted | 0.997 | 0.030 | False |
| doc-012 | f1040sd.pdf | converted | 0.959 | 0.077 | False |
| doc-013 | f1040se.pdf | converted | 0.993 | 0.061 | False |
| doc-014 | f941.pdf | converted | 0.994 | 0.048 | False |
| doc-015 | f1099div.pdf | converted | 1.000 | 0.095 | False |
| doc-016 | tests/data/ocr/sources/nemotron_multipage.pdf | failed | — | — | — |
| doc-017 | tests/data/ocr/sources/ocr_test.pdf | failed | — | — | — |
| doc-018 | tests/data/ocr/sources/sample_with_rotation_mismatch.pdf | failed | — | — | — |
| doc-019 | tests/data/odf/sources/odf_presentation_01.odp.pdf | converted | 0.990 | 0.007 | False |
| doc-020 | tests/data/odf/sources/odf_presentation_02.odp.pdf | converted | 0.974 | 0.071 | False |
| doc-021 | tests/data/odf/sources/odf_table_with_title_01.ods.pdf | converted | 1.000 | 0.191 | True |
| doc-022 | tests/data/odf/sources/text_document_01.odt.pdf | converted | 0.993 | 0.212 | True |
| doc-023 | tests/data/odf/sources/text_document_02.odt.pdf | converted | 0.905 | 0.265 | True |
| doc-024 | tests/data/odf/sources/text_document_03.odt.pdf | converted | 1.000 | 0.164 | True |
| doc-025 | tests/data/pdf/sources/2203.01017v2.pdf | converted | 0.927 | 0.292 | False |
| doc-026 | tests/data/pdf/sources/2206.01062.pdf | converted | 0.884 | 0.239 | False |
| doc-027 | tests/data/pdf/sources/2305.03393v1.pdf | converted | 0.863 | 0.248 | False |
| doc-028 | tests/data/pdf/sources/acroform_sample.pdf | converted | 1.000 | 0.000 | True |
| doc-029 | tests/data/pdf/sources/amt_handbook_sample.pdf | converted | 0.980 | 0.163 | False |
| doc-030 | tests/data/pdf/sources/code_and_formula.pdf | converted | 0.985 | 0.235 | True |
| doc-031 | tests/data/pdf/sources/multi_page.pdf | converted | 0.999 | 0.202 | False |
| doc-032 | tests/data/pdf/sources/newspaper-00.pdf | converted | 0.691 | 0.026 | False |
| doc-033 | tests/data/pdf/sources/normal_4pages.pdf | converted | 0.924 | 0.271 | False |
| doc-034 | tests/data/pdf/sources/picture_classification.pdf | converted | 0.989 | 0.251 | True |
| doc-035 | tests/data/pdf/sources/redp5110_sampled.pdf | converted | 0.935 | 0.265 | False |
| doc-036 | tests/data/pdf/sources/right_to_left_01.pdf | converted | 0.864 | 0.385 | True |
| doc-037 | tests/data/pdf/sources/right_to_left_02.pdf | converted | 0.224 | 0.030 | False |
| doc-038 | tests/data/pdf/sources/right_to_left_03.pdf | converted | 0.946 | 0.245 | True |
| doc-039 | tests/data/pdf/sources/table_misidentified_as_form.pdf | converted | 0.996 | 0.291 | True |
| doc-040 | tests/data/pdf/sources/table_mislabeled_as_picture.pdf | converted | 0.967 | 0.054 | False |
| doc-041 | 001-trivial/minimal-document.pdf | converted | 0.983 | 0.463 | True |
| doc-042 | 002-trivial-libre-office-writer/002-trivial-libre-office-writer.pdf | converted | 1.000 | 0.819 | True |
| doc-043 | 003-pdflatex-image/pdflatex-image.pdf | converted | 1.000 | 0.412 | True |
| doc-044 | 004-pdflatex-4-pages/pdflatex-4-pages.pdf | converted | 0.999 | 0.359 | False |
| doc-045 | 006-pdflatex-outline/pdflatex-outline.pdf | converted | 0.996 | 0.102 | False |
| doc-046 | 008-reportlab-inline-image/inline-image.pdf | converted | 1.000 | 0.000 | True |
| doc-047 | 009-pdflatex-geotopo/GeoTopo.pdf | converted | 0.890 | 0.132 | False |
| doc-048 | 010-pdflatex-forms/pdflatex-forms.pdf | converted | 1.000 | 0.000 | True |
| doc-049 | 011-google-doc-document/google-doc-document.pdf | converted | 0.980 | 0.243 | True |
| doc-050 | 012-libreoffice-form/libreoffice-form.pdf | converted | 1.000 | 0.111 | True |
| doc-051 | 013-reportlab-overlay/reportlab-overlay.pdf | converted | 1.000 | 0.000 | True |
| doc-052 | 014-outlines/mistitled_outlines_example.pdf | converted | 0.996 | 0.102 | False |
| doc-053 | 015-arabic/habibi.pdf | converted | 0.588 | 0.394 | True |
| doc-054 | 016-libre-office-link/libre-office-link.pdf | converted | 1.000 | 0.815 | True |
| doc-055 | 017-unreadable-meta-data/unreadablemetadata.pdf | failed | — | — | — |
| doc-056 | 018-base64-image/base64image.pdf | converted | 1.000 | 0.021 | True |
| doc-057 | 019-grayscale-image/grayscale-image.pdf | failed | — | — | — |
| doc-058 | 021-pdfa/crazyones-pdfa.pdf | converted | 1.000 | 0.259 | True |
| doc-059 | 022-pdfkit/pdfkit.pdf | converted | 1.000 | 0.000 | True |
| doc-060 | 023-cmyk-image/cmyk-image.pdf | failed | — | — | — |
| doc-061 | 024-annotations/annotated_pdf.pdf | converted | 1.000 | 0.000 | True |
| doc-062 | 025-attachment/with-attachment.pdf | converted | 0.983 | 0.463 | True |
| doc-063 | 026-latex-multicolumn/multicolumn.pdf | converted | 0.956 | 0.246 | False |
| doc-064 | 027-cropped-rotated-scaled/cropped-rotated-scaled.pdf | converted | 0.415 | 0.001 | False |
| doc-065 | 029-optional-content-groups/ocg_map_test.pdf | converted | 1.000 | 0.000 | True |
| doc-066 | 030-tagged-pdf/tagged.pdf | converted | 0.792 | 0.019 | False |
| doc-067 | 031-png-predictors/png-predictors.pdf | converted | 1.000 | 0.280 | True |
| doc-068 | 032-png-predictors-low-bit-depth/png-predictors-low-bit-depth.pdf | converted | 0.741 | 0.182 | True |
| doc-069 | test/pdfs/160F-2019.pdf | converted | 0.994 | 0.109 | False |
| doc-070 | test/pdfs/ArabicCIDTrueType.pdf | converted | 1.000 | 0.020 | True |
| doc-071 | test/pdfs/S2.pdf | converted | 1.000 | 0.025 | False |
| doc-072 | test/pdfs/TAMReview.pdf | converted | 0.038 | 0.339 | True |
| doc-073 | test/pdfs/ThuluthFeatures.pdf | converted | 0.715 | 0.170 | True |
| doc-074 | test/pdfs/basicapi.pdf | converted | 0.921 | 0.038 | False |
| doc-075 | test/pdfs/canvas.pdf | converted | 1.000 | 0.022 | False |
| doc-076 | test/pdfs/chrome-text-selection-markedContent.pdf | converted | 0.999 | 0.011 | False |
| doc-077 | test/pdfs/cmykjpeg.pdf | failed | — | — | — |
| doc-078 | test/pdfs/prefilled_f1040.pdf | converted | 0.997 | 0.029 | False |
| doc-079 | test/pdfs/scan-bad.pdf | converted | 1.000 | 0.000 | True |
| doc-080 | test/pdfs/standard_fonts.pdf | converted | 0.931 | 0.181 | False |
| doc-081 | test/pdfs/structure_simple.pdf | converted | 1.000 | 0.028 | True |
| doc-082 | test/pdfs/tracemonkey.pdf | converted | 0.942 | 0.224 | False |
| doc-083 | test/pdfs/two_pages.pdf | failed | — | — | — |
| doc-084 | test/pdfs/two_paragraphs.pdf | converted | 1.000 | 0.410 | True |
| doc-085 | test/pdfs/transparent.pdf | failed | — | — | — |
| doc-086 | test/pdfs/zero_descent.pdf | converted | 1.000 | 0.000 | True |
| doc-087 | test/pdfs/alphatrans.pdf | converted | 0.889 | 0.179 | True |
| doc-088 | test/pdfs/bigboundingbox.pdf | converted | 1.000 | 0.056 | False |
| doc-089 | test/pdfs/Test-plusminus.pdf | converted | 0.951 | 0.049 | True |
| doc-090 | test/pdfs/calrgb.pdf | converted | 0.866 | 0.077 | False |
| doc-091 | test/pdfs/blendmode.pdf | converted | 0.792 | 0.010 | False |
| doc-092 | test/pdfs/attachment.pdf | converted | 1.000 | 0.404 | True |
| doc-093 | test/pdfs/arial_unicode_ab_cidfont.pdf | converted | 0.000 | 0.000 | True |
| doc-094 | test/pdfs/arial_unicode_en_cidfont.pdf | converted | 1.000 | 0.011 | True |
| doc-095 | test/pdfs/font_ascent_descent.pdf | converted | 0.550 | 0.014 | True |
| doc-096 | test/pdfs/issue10402.pdf | converted | 1.000 | 0.000 | True |
| doc-097 | test/pdfs/perf_text_cff.pdf | converted | 1.000 | 0.154 | False |
| doc-098 | test/pdfs/perf_text_cff_embedded_variants.pdf | converted | 0.508 | 0.163 | False |
| doc-099 | test/pdfs/perf_text_cid_truetype.pdf | converted | 1.000 | 0.256 | False |
| doc-100 | test/pdfs/perf_text_cjk_nonembedded.pdf | converted | 0.004 | 0.042 | False |
