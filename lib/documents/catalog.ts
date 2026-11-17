import inventory from './tools.json';
import bentoInventory from './bento-tools.json';

export type DocumentField = {
  key: string; label: string; kind: string; default: string | boolean | number;
  required?: boolean; min?: number; max?: number; options?: string[]; placeholder?: string;
};
export type DocumentTool = {
  id: string; name: string; description: string; group: string; mode: 'local' | 'server' | 'workspace';
  engine: string; accept: string; multiple: boolean; fields: DocumentField[]; note: string;
  page?: boolean; available?: boolean; unavailableReason?: string;
  uploads?: { key: string; label: string; multiple: boolean; accept: string; required?: boolean }[];
};
export const DOCUMENT_TOOLS = inventory as DocumentTool[];
export const BENTO_TOOLS = bentoInventory;
export const DOCUMENT_API = (process.env.NEXT_PUBLIC_DOCUMENT_API_BASE || (process.env.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE.replace(/\/$/, '') + '/api/documents' : '/api/documents')).replace(/\/$/, '');
export const HAS_DOCUMENT_BACKEND = !!DOCUMENT_API;
export const BENTO_URL = (process.env.NEXT_PUBLIC_BENTO_URL || '').replace(/\/$/, '');
export const PDF_EDITOR_URL = '/pdf-editor/';
export const DOCUMENT_BY_ID = new Map(DOCUMENT_TOOLS.map(tool => [tool.id, tool]));
export const defaultsFor = (tool: DocumentTool): Record<string, string | boolean | number> => Object.fromEntries(tool.fields.map(field => [field.key, field.default]));
