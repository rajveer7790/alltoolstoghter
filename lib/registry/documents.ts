import type { ToolDef } from '../types';
import { DOCUMENT_TOOLS } from '../documents/catalog';
export const DOCUMENTS: ToolDef[] = DOCUMENT_TOOLS.filter(tool => tool.page).map(tool => ({
  slug: tool.id, name: tool.name, short: tool.description, category: 'pdf', prio: 'P2',
  widget: 'document', dataset: tool.id,
  keywords: [tool.name.toLowerCase(), tool.group.toLowerCase(), tool.engine, tool.mode === 'server' ? 'self hosted document conversion' : 'local private pdf tool'],
  metaDescription: tool.description + (tool.mode === 'server' ? ' Server availability is shown before upload; no external AI API key is needed.' : ' Process on your device with clear options and a downloadable result.'),
  content: {
    intro: tool.description + (tool.mode === 'server' ? ' This operation uses a separately deployed document server. Its availability is checked before you can submit a file.' : ' The operation runs in your browser. Your file is not uploaded for this task.'),
    how: tool.mode === 'workspace' ? 'Open a PDF in our editor. Click a blue text outline to replace editable text, or choose Add text and click the page. Apply changes before downloading. Scans and grouped artwork have clear limitations; the original file is kept unchanged.' : tool.description + ' Choose a supported file, review the operation options, process the document, and download the result. ' + (tool.note || 'Keep and review the original.'),
    howSteps: ['Choose the source document in a supported format.', 'Review the options, processing location and any limitations shown beside the tool.', 'Process the file and review the downloaded result while keeping the original.'],
    faqs: [
      ['Where is my file processed?', tool.mode === 'server' ? 'On the configured document server after you press Upload & process. Temporary conversion files are deleted after the response. The page shows unavailable if the service is not ready.' : 'On your device. This tool does not upload the document. Loading the app and its assets still makes normal website requests.'],
      ['Does this modify my original file?', 'No. Download the processed copy and review it before replacing or sharing any original.'],
      ['What limitations should I check?', tool.note || 'Complex PDFs, uncommon fonts, encryption, malformed content and limited device memory can affect processing. Existing digital signatures may become invalid after a document changes.'],
    ],
  },
  sources: [{ label: tool.engine === 'pdfium' ? 'PDFium engine: source and component licenses' : tool.engine === 'pdf-lib' ? 'pdf-lib documentation' : 'Document engine sources and processing details', url: tool.engine === 'pdfium' ? 'https://github.com/embedpdf/embed-pdf-viewer' : tool.engine === 'pdf-lib' ? 'https://pdf-lib.js.org/' : 'https://alltoolstogether.com/open-source' }],
  related: ['pdf-editor', 'merge-pdf', 'split-pdf', 'pdf-to-text'].filter(slug => slug !== tool.id),
}));
