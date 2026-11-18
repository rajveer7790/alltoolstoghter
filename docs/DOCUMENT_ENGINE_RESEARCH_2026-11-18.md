# Document engine decisions — 18 November 2026

Official repositories, release metadata, supported output contracts and licenses were checked before changing the backend. Popularity and upstream benchmark claims are not treated as measurements of this website.

| Project | Verified release/contract | Decision |
| --- | --- | --- |
| [DocVortex](https://github.com/myhloli/DocVortex/releases/tag/v0.6.24) | 0.6.24, released 16 November; native structured parsing and DOCX/HTML/assets; MIT project with permissive components | Include in the CPU backend for editable semantic DOCX and HTML packages. It does not perform OCR or reproduce every page layout. |
| [Gotenberg](https://github.com/gotenberg/gotenberg/releases/tag/v9.6.0) | 9.6.0; LibreOffice export options include native lossless image compression, resolution preservation and form-field export | Retain the current stable engine; improve its font image and export defaults instead of pretending a version bump alone fixes Office fidelity. |
| [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR/releases/tag/v3.7.0) | 3.7.0; PP-StructureV3 provides Word export | Pin the optional worker. Heavy model inference remains deployment-specific and is not inferred from the native benchmark. |
| [MinerU](https://github.com/opendatalab/MinerU/releases/tag/mineru-4.2.3-released) | 4.2.3, released 16 November; the old `mineru -p ... -b pipeline` interface is obsolete | Update the adapter to local `mineru-kit parse --tier flash --format zip`; keep code/model license gating. Bundle Markdown, JSON and image assets together. |
| [Marker](https://github.com/datalab-to/marker/releases/tag/v2.2.0) | 2.2.0; local fast mode is distinct from hosted/VLM enhancement | Pin the optional worker. Do not enable hosted enhancement or assume model-weight eligibility. |
| [Docling](https://github.com/docling-project/docling/blob/main/docs/usage/supported_formats.md) | Structured HTML/Markdown/JSON outputs; no native DOCX output listed | Keep it for extraction. Do not mislabel a semantic parser as a lossless Word exporter. |
| [pdf2docx](https://github.com/ArtifexSoftware/pdf2docx) | 0.5.13; upstream no longer actively maintained, PyMuPDF dependency has AGPL/commercial terms | Add a separate, isolated optional geometric worker; keep it disabled until operator license review. It is not the default conversion path. Its earlier 6/100 strict-layout passes did not establish premium fidelity. |

## Applied changes

- Editable Word now retains native document structure and images through a current local engine. OCR text layers that a native layout parser ignores are recovered as editable text, with reflow limitations retained.
- Basic text/table mode removes table characters from prose before inserting the table, avoiding duplicate cell content. It remains an explicit choice.
- Page-image Word mode is explicitly noneditable, anchors page images at the original page sizes and avoids image-induced extra pagination. It is not presented as editable text.
- PDF-to-HTML returns a ZIP with semantic HTML and relative image assets, including recovered OCR text when needed.
- Office-to-PDF uses Noto/CJK, Liberation, Carlito and Caladea open fonts, lossless image export, no image-resolution reduction and flattened form fields by default. Operators must supply any additional licensed custom fonts they need.
- Server compression defaults to the higher-quality prepress profile; it does not promise that every input becomes smaller.

## Remaining fidelity boundaries

Editable DOCX is a reconstruction. Font substitution, complex forms, equations, uncommon writing modes and pagination can still differ. Page images retain appearance at the configured rendering resolution but do not produce editable text or vector graphics. Local OCR can introduce recognition errors. No Adobe API, proprietary conversion service or cloud AI key is required by these changes.

The updated benchmark measures the upgraded end-to-end pipeline, including its font stack; it does not attribute every improvement to DocVortex alone. Earlier results remain unchanged and identify their original source commit. Model-based PaddleOCR/Marker/MinerU performance is not claimed without a separate model run.

Primary references: [DocVortex usage](https://github.com/myhloli/DocVortex/blob/main/docs/USAGE.md), [Gotenberg route implementation](https://github.com/gotenberg/gotenberg/blob/v9.6.0/pkg/modules/libreoffice/routes.go), [font troubleshooting](https://gotenberg.dev/docs/troubleshooting), [MinerU output contracts](https://github.com/opendatalab/MinerU/blob/master/docs/en/reference/output_files.md), [PaddleOCR PP-StructureV3](https://github.com/PaddlePaddle/PaddleOCR/blob/main/docs/version3.x/pipeline_usage/PP-StructureV3.en.md).
