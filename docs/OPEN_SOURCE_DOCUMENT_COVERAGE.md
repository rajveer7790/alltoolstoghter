# Open-source document coverage — 17 November 2026

The supplied report was checked against current upstream README/license/API documentation. Several projects have changed since the pasted recommendation: PdfCraft has a usable static WebAssembly release; Filee and GenOffice have headless conversion CLIs. No hosted AI key, enterprise module or commercial model eligibility is assumed.

| Project | Integration and actual boundary |
| --- | --- |
| PaddleOCR | Optional self-hosted PP-StructureV3 worker with `save_to_word`; may return per-page DOCX files as a ZIP. |
| MinerU | Optional local pipeline worker; Markdown/JSON output and assets. Current custom code license and model conditions must be accepted before activation. |
| Docling | Optional document-structure worker; Markdown/HTML/JSON, not a claimed pixel-faithful Word exporter. |
| Gotenberg | Docker service for Office/HTML to PDF and archival remediation; outbound HTML access/scripts disabled. |
| Stirling PDF | Dynamic safe multipart API form catalog; key/account/admin/outbound-URL/unsupported request forms excluded explicitly. No proprietary core modules copied. |
| BentoPDF | Independent optional upstream workspace with complete 114-tool reviewed inventory. No AGPL code merged into the Next.js application; upstream notices remain. Paid add-on rights excluded. |
| GenOffice | Installed headless `convert` adapter. Desktop application and cloud/AI features are not relabeled as native website features. Office editing is provided separately with ONLYOFFICE. |
| Filee | Installed `filee convert` adapter, including the installed engine's actual format pairs. No invented universal-fidelity claim. |
| Marker | Optional local fast-mode Markdown/HTML/JSON worker; no `--use_llm`, and model-license gate defaults off. |
| PdfCraft | Actual unmodified 0.21.1 WebAssembly release hosted at `/pdf-editor/`, verified SHA-256 `fe9708d46af191aebb56f70eb32cf8b112b0b9452d17ae6ba3a8c4a8665fe748`. Licenses/model attribution retained. |
| ONLYOFFICE Docs | Separate Community editor with one-hour sessions, internal JWT and constrained callbacks. Does not include paid enterprise features or unlimited edition capacity. |
| PDF.js | Existing browser PDF engine reused for thumbnails and JSON text/coordinates. |
| qpdf | Real native executable for linearization. |
| pdfcpu | Native executable for structure validation and optimization. |
| OCRmyPDF | Real self-hosted searchable-PDF OCR, with Tesseract language checks and deskew. |

## Coverage files

- `lib/documents/tools.json`: 57 native/adapter operations; 46 individual pages.
- `lib/documents/bento-tools.json`: all 114 reviewed upstream tool IDs, without counting them as installed/live by default.
- `lib/documents/engines.json`: source/license attribution for each project and supporting libraries.
- `backend/documents/README.md`: concrete deployment steps, service boundaries and testing commands.
- `/document-studio`: browser workspace and runtime availability.
- `/open-source`: public attribution, exclusions and processing limitations.

## Explicit exclusions and limits

External API-key/account AI features, enterprise modules and paid compression/model rights are excluded. Optional workers/workspaces need their own server deployment or installed CLI; the static Netlify deployment cannot execute them. Server-only pages are noindex until deployment readiness is explicitly enabled. A complete inventory is not a claim that an unavailable service is active.

Quality depends on the engine and source: text/table reconstruction is editable but can reflow pages; OCR can make mistakes; PDF-to-PowerPoint uses page images; cropping does not remove hidden page content; metadata cleanup is not redaction; structural validation is not archival/accessibility/signature certification. No 100-document fidelity benchmark or Adobe-equivalent claim has been made.

## Fidelity upgrade, 18 November 2026

DocVortex 0.6.24 is included for structured DOCX and semantic HTML/assets; the simple text/table path remains an explicit choice, with duplicate table text removed. Word output can alternatively contain explicitly labeled page images. Office PDF exports preserve image resolution and use a larger open-font set through a custom Gotenberg image. The local MinerU CLI contract is updated for 4.2.3; optional PaddleOCR/Marker versions are pinned, without implying their model inference was benchmarked. Existing earlier benchmark results remain immutable and identify their tested source commit.
