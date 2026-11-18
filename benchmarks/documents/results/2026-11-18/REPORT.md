# 100-document open-source conversion benchmark

Measured: 18 November 2026. [Exact CI run](https://github.com/rajveer7790/alltoolstoghter/actions/runs/44269141294).

## Result and deployment decision

Both engines were attempted on the same **100 SHA-256-locked input PDFs**. A successful DOCX download is not a fidelity pass. The native text/table extractor produced 89 fully measured round trips; the geometric candidate produced 95. Strict layout acceptance passed on 0 native and 6 geometric inputs, out of 100 attempts each.

Do **not** advertise the native PDF-to-Word tool as a premium layout-preserving converter. Keep its existing text/table reconstruction limitations visible. The geometric candidate remains a benchmark-only option: it is not silently substituted into the production stack. Review failures, license obligations, upstream maintenance and actual customer samples before selecting it.

Core conversion, OCR, optimization and inspection services can be deployed separately with their documented limits. ARM64 smoke tests verify the core container path; they do not prove all optional models or production capacity on Oracle.

## Measured comparison

| Measurement | Native text/tables | Geometric pdf2docx |
| --- | ---: | ---: |
| Locked inputs attempted | 100 | 100 |
| Converted and measured | 89 | 95 |
| Failed or unmeasurable | 11 | 5 |
| Same page count | 36 | 59 |
| Strict layout gate passes | 0 | 6 |
| Nonempty source-text reference scores | 89 | 87 |
| Median retained-token F1 | 0.935 | 0.964 |
| Median page SSIM | 0.825 | 0.843 |
| Median foreground F1 | 0.059 | 0.372 |
| Median conversion seconds | 0.555 | 0.997 |
| Median sampled worker MiB | 171.281 | 244.236 |

Metric medians for content/appearance/time include successfully measured outputs, with their sample counts in `results.json`. Failures remain in the 100-input denominator and have no invented score. Memory includes failed workers too and excludes the separate Gotenberg container. These are test-run timings, not Oracle throughput guarantees. Retained-token F1 is **not** a percentage of human-verified text or OCR accuracy.

## Paired subset and content caveat

On the same 85 inputs with successful measurements and a nonempty source-text reference in **both** engines, median token F1 is 0.950 native versus 0.966 geometric. Median foreground F1 is 0.059 versus 0.354. This paired subset helps separate engine differences from different failure populations; the full 100-input success/failure counts still apply.

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

Native failure stages: `{"pdf_to_docx": 10, "source_analysis": 1}`. Geometric failure stages: `{"pdf_to_docx": 4, "source_analysis": 1}`.

The native path is intentionally a text/table reconstruction tool: it changes formatting, appends extracted tables and does not embed page graphics. That can duplicate table text and change page count substantially. The benchmark exposes this behavior; it does not turn a failed quality gate into a success. Before a premium PDF-to-Word release, add a maintained layout-aware path, remove duplicate table text, preserve images/styles/page geometry, validate RTL/fonts, and run a representative annotated customer corpus with manual review.

## Per-document record

N/G means native/geometric. A dash means the stage failed or no independent text reference was available. Full metrics, errors, timings, environment versions and hashes are in [results.json](results.json); [results.csv](results.csv) has 200 machine-readable engine/document rows.

| ID | Source | Native status | Geometric status | N token F1 | G token F1 | N foreground F1 | G foreground F1 | N/G pages unchanged |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| doc-001 | fw2.pdf | converted | converted | 0.854 | 0.941 | 0.067 | 0.349 | False / False |
| doc-002 | fw3.pdf | converted | converted | 0.890 | 0.883 | 0.038 | 0.345 | False / False |
| doc-003 | fw4.pdf | converted | converted | 0.885 | 0.954 | 0.052 | 0.338 | False / False |
| doc-004 | fw4p.pdf | converted | converted | 0.995 | 0.945 | 0.056 | 0.201 | False / False |
| doc-005 | fw4r.pdf | converted | converted | 0.989 | 0.990 | 0.071 | 0.214 | False / False |
| doc-006 | fw8ben.pdf | converted | converted | 0.998 | 0.966 | 0.091 | 0.203 | False / False |
| doc-007 | fw8bene.pdf | converted | converted | 0.999 | 0.973 | 0.130 | 0.194 | False / False |
| doc-008 | fw9.pdf | converted | converted | 0.976 | 0.972 | 0.053 | 0.186 | False / False |
| doc-009 | f1040.pdf | converted | failed | 0.672 | — | 0.007 | — | False / — |
| doc-010 | f1040sr.pdf | converted | converted | 0.970 | 0.969 | 0.094 | 0.832 | False / True |
| doc-011 | f1040sc.pdf | converted | converted | 0.951 | 0.799 | 0.051 | 0.563 | False / True |
| doc-012 | f1040sd.pdf | converted | converted | 0.946 | 0.769 | 0.055 | 0.463 | False / True |
| doc-013 | f1040se.pdf | converted | converted | 0.911 | 0.731 | 0.037 | 0.413 | False / False |
| doc-014 | f941.pdf | converted | converted | 0.989 | 0.940 | 0.059 | 0.251 | False / False |
| doc-015 | f1099div.pdf | converted | converted | 0.847 | 0.972 | 0.033 | 0.481 | False / False |
| doc-016 | nemotron_multipage.pdf | failed | converted | — | — | — | 0.370 | — / True |
| doc-017 | ocr_test.pdf | failed | converted | — | — | — | 0.763 | — / True |
| doc-018 | sample_with_rotation_mismatch.pdf | failed | converted | — | — | — | 0.187 | — / True |
| doc-019 | odf_presentation_01.odp.pdf | converted | converted | 0.780 | 0.937 | 0.040 | 0.075 | True / False |
| doc-020 | odf_presentation_02.odp.pdf | converted | converted | 0.935 | 0.985 | 0.021 | 0.890 | False / True |
| doc-021 | odf_table_with_title_01.ods.pdf | converted | converted | 1.000 | 1.000 | 0.029 | 0.460 | True / True |
| doc-022 | text_document_01.odt.pdf | converted | converted | 0.996 | 0.996 | 0.096 | 0.720 | False / True |
| doc-023 | text_document_02.odt.pdf | converted | converted | 0.867 | 0.988 | 0.071 | 0.245 | False / True |
| doc-024 | text_document_03.odt.pdf | converted | converted | 0.653 | 0.946 | 0.031 | 0.632 | False / True |
| doc-025 | 2203.01017v2.pdf | converted | converted | 0.710 | 0.912 | 0.061 | 0.058 | False / False |
| doc-026 | 2206.01062.pdf | converted | converted | 0.323 | 0.902 | 0.075 | 0.064 | False / False |
| doc-027 | 2305.03393v1.pdf | converted | converted | 0.842 | 0.969 | 0.109 | 0.354 | False / False |
| doc-028 | acroform_sample.pdf | converted | converted | 1.000 | 0.757 | 0.256 | 0.204 | True / True |
| doc-029 | amt_handbook_sample.pdf | converted | converted | 0.990 | 0.117 | 0.104 | 0.273 | False / False |
| doc-030 | code_and_formula.pdf | converted | converted | 0.848 | 0.993 | 0.131 | 0.250 | False / False |
| doc-031 | multi_page.pdf | converted | converted | 1.000 | 0.999 | 0.183 | 0.190 | False / False |
| doc-032 | newspaper-00.pdf | converted | converted | 0.512 | 0.615 | 0.041 | 0.273 | False / False |
| doc-033 | normal_4pages.pdf | converted | converted | 0.930 | 0.857 | 0.158 | 0.080 | False / False |
| doc-034 | picture_classification.pdf | converted | converted | 0.864 | 0.996 | 0.325 | 0.778 | True / True |
| doc-035 | redp5110_sampled.pdf | converted | converted | 0.829 | 0.958 | 0.114 | 0.218 | False / False |
| doc-036 | right_to_left_01.pdf | converted | converted | 0.171 | 0.894 | 0.218 | 0.068 | True / False |
| doc-037 | right_to_left_02.pdf | converted | converted | 0.150 | 0.852 | 0.052 | 1.000 | False / True |
| doc-038 | right_to_left_03.pdf | converted | converted | 0.164 | 0.800 | 0.036 | 0.556 | False / True |
| doc-039 | table_misidentified_as_form.pdf | converted | converted | 0.996 | 0.000 | 0.091 | 0.805 | False / True |
| doc-040 | table_mislabeled_as_picture.pdf | converted | converted | 0.998 | 0.931 | 0.059 | 0.905 | False / True |
| doc-041 | minimal-document.pdf | converted | converted | 1.000 | 0.991 | 0.305 | 0.801 | True / True |
| doc-042 | 002-trivial-libre-office-writer.pdf | converted | converted | 0.657 | 1.000 | 0.168 | 0.999 | True / True |
| doc-043 | pdflatex-image.pdf | converted | converted | 0.852 | 1.000 | 0.178 | 0.961 | True / True |
| doc-044 | pdflatex-4-pages.pdf | converted | converted | 0.801 | 1.000 | 0.186 | 0.229 | False / False |
| doc-045 | pdflatex-outline.pdf | converted | converted | 0.895 | 1.000 | 0.122 | 0.189 | False / False |
| doc-046 | inline-image.pdf | converted | converted | 1.000 | 1.000 | 0.000 | 0.029 | True / True |
| doc-047 | GeoTopo.pdf | converted | converted | 0.845 | 0.946 | 0.036 | 0.102 | False / False |
| doc-048 | pdflatex-forms.pdf | converted | converted | 1.000 | 1.000 | 0.000 | 0.007 | True / True |
| doc-049 | google-doc-document.pdf | converted | converted | 0.868 | 0.957 | 0.124 | 0.821 | False / True |
| doc-050 | libreoffice-form.pdf | converted | converted | 0.645 | 0.974 | 0.095 | 0.581 | True / True |
| doc-051 | reportlab-overlay.pdf | converted | converted | 1.000 | 1.000 | 0.000 | 0.783 | True / True |
| doc-052 | mistitled_outlines_example.pdf | converted | converted | 0.895 | 1.000 | 0.122 | 0.189 | False / False |
| doc-053 | habibi.pdf | converted | converted | 0.533 | 0.625 | 0.000 | 0.491 | True / True |
| doc-054 | libre-office-link.pdf | converted | converted | 1.000 | 0.500 | 0.000 | 0.296 | True / True |
| doc-055 | unreadablemetadata.pdf | failed | failed | — | — | — | — | — / — |
| doc-056 | base64image.pdf | converted | converted | 1.000 | 1.000 | 0.056 | 1.000 | True / True |
| doc-057 | grayscale-image.pdf | failed | converted | — | — | — | 0.983 | — / True |
| doc-058 | crazyones-pdfa.pdf | converted | converted | 1.000 | 1.000 | 0.274 | 0.674 | True / True |
| doc-059 | pdfkit.pdf | converted | converted | 1.000 | 1.000 | 0.000 | 0.999 | True / True |
| doc-060 | cmyk-image.pdf | failed | converted | — | — | — | 0.981 | — / True |
| doc-061 | annotated_pdf.pdf | converted | converted | 1.000 | 1.000 | 0.116 | 0.190 | True / True |
| doc-062 | with-attachment.pdf | converted | converted | 1.000 | 0.991 | 0.305 | 0.801 | True / True |
| doc-063 | multicolumn.pdf | converted | converted | 0.950 | 0.959 | 0.094 | 0.051 | False / False |
| doc-064 | cropped-rotated-scaled.pdf | converted | failed | 0.400 | — | 0.011 | — | False / — |
| doc-065 | ocg_map_test.pdf | converted | converted | 1.000 | 1.000 | 0.000 | 0.632 | True / True |
| doc-066 | tagged.pdf | converted | converted | 1.000 | 1.000 | 0.265 | 0.986 | True / True |
| doc-067 | png-predictors.pdf | converted | converted | 1.000 | 1.000 | 0.024 | 0.774 | True / True |
| doc-068 | png-predictors-low-bit-depth.pdf | converted | converted | 1.000 | 1.000 | 0.071 | 0.680 | True / True |
| doc-069 | 160F-2019.pdf | converted | converted | 0.799 | 0.769 | 0.012 | 0.330 | False / True |
| doc-070 | ArabicCIDTrueType.pdf | converted | converted | 0.000 | 0.500 | 0.005 | 0.193 | True / True |
| doc-071 | S2.pdf | converted | converted | 0.897 | 0.897 | 0.007 | 0.372 | True / True |
| doc-072 | TAMReview.pdf | converted | converted | 0.032 | 0.196 | 0.054 | 0.050 | False / False |
| doc-073 | ThuluthFeatures.pdf | converted | converted | 0.003 | 0.346 | 0.046 | 0.215 | False / False |
| doc-074 | basicapi.pdf | converted | converted | 1.000 | 0.966 | 0.046 | 0.511 | True / True |
| doc-075 | canvas.pdf | converted | converted | 0.998 | 0.917 | 0.044 | 0.699 | False / True |
| doc-076 | chrome-text-selection-markedContent.pdf | converted | converted | 0.666 | 0.779 | 0.042 | 0.077 | False / False |
| doc-077 | cmykjpeg.pdf | failed | converted | — | — | — | 0.955 | — / True |
| doc-078 | prefilled_f1040.pdf | failed | converted | — | 0.574 | — | 0.224 | — / False |
| doc-079 | scan-bad.pdf | converted | converted | 1.000 | 0.000 | 0.000 | 0.549 | True / True |
| doc-080 | standard_fonts.pdf | converted | failed | 0.352 | — | 0.074 | — | False / — |
| doc-081 | structure_simple.pdf | converted | converted | 1.000 | 1.000 | 0.001 | 0.401 | True / True |
| doc-082 | tracemonkey.pdf | converted | failed | 0.659 | — | 0.070 | — | False / — |
| doc-083 | two_pages.pdf | failed | converted | — | — | — | 1.000 | — / True |
| doc-084 | two_paragraphs.pdf | converted | converted | 1.000 | 1.000 | 0.784 | 0.762 | True / True |
| doc-085 | transparent.pdf | failed | converted | — | — | — | 0.975 | — / True |
| doc-086 | zero_descent.pdf | converted | converted | 1.000 | 1.000 | 0.000 | 0.330 | True / True |
| doc-087 | alphatrans.pdf | converted | converted | 0.952 | 0.889 | 0.074 | 0.863 | True / True |
| doc-088 | bigboundingbox.pdf | converted | converted | 0.513 | 0.964 | 0.063 | 0.296 | False / False |
| doc-089 | Test-plusminus.pdf | converted | converted | 0.539 | 0.938 | 0.001 | 0.410 | False / False |
| doc-090 | calrgb.pdf | converted | converted | 0.676 | 1.000 | 0.169 | 0.527 | False / False |
| doc-091 | blendmode.pdf | converted | converted | 1.000 | 0.792 | 0.114 | 0.223 | True / True |
| doc-092 | attachment.pdf | converted | converted | 1.000 | 1.000 | 0.000 | 0.983 | True / True |
| doc-093 | arial_unicode_ab_cidfont.pdf | failed | converted | — | 0.000 | — | 0.000 | — / True |
| doc-094 | arial_unicode_en_cidfont.pdf | converted | converted | 1.000 | 1.000 | 0.147 | 0.612 | True / True |
| doc-095 | font_ascent_descent.pdf | converted | converted | 0.132 | 0.550 | 0.000 | 0.113 | True / True |
| doc-096 | issue10402.pdf | converted | converted | 1.000 | 1.000 | 0.000 | 0.909 | True / True |
| doc-097 | perf_text_cff.pdf | converted | converted | 0.983 | 0.997 | 0.067 | 0.270 | False / False |
| doc-098 | perf_text_cff_embedded_variants.pdf | converted | converted | 0.270 | 0.861 | 0.064 | 0.185 | False / False |
| doc-099 | perf_text_cid_truetype.pdf | converted | converted | 1.000 | 0.988 | 0.064 | 0.926 | False / True |
| doc-100 | perf_text_cjk_nonembedded.pdf | converted | converted | 0.000 | 0.000 | 0.021 | 0.094 | False / True |
