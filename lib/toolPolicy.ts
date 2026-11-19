import documentTools from './documents/tools.json';
import type { ToolDef } from './types';
import { TOOL_ALIASES } from './toolPaths';
export { TOOL_ALIASES, canonicalToolPath } from './toolPaths';

// These services require a configured provider. Their guides are public regardless of provider availability.
export const BACKEND_REQUIRED = new Set(['grammar-checker', 'paraphrasing-tool', 'plagiarism-checker', 'url-shortener']);
const pendingDocumentTools = new Set(documentTools.filter(tool => tool.mode === 'server').map(tool => tool.id));
// Enable indexing only after deploying and verifying the document engines.
const documentsReady = process.env.NEXT_PUBLIC_DOCUMENTS_READY === 'true';
export const isIndexableTool = (tool: ToolDef) => !TOOL_ALIASES[tool.slug] && (documentsReady || !pendingDocumentTools.has(tool.slug));
