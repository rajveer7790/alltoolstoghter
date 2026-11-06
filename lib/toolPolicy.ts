import type { ToolDef } from './types';

// These services remain unindexed until their production providers and data handling are verified.
export const BACKEND_REQUIRED = new Set(['grammar-checker', 'paraphrasing-tool', 'plagiarism-checker', 'url-shortener']);
export const TOOL_ALIASES: Record<string, string> = {
  'scientific-notation-calculator': 'scientific-notation-converter',
  'logarithm-calculator': 'log-calculator',
  'permutation-combination-calculator': 'combination-calculator',
};
export const canonicalToolPath = (tool: ToolDef) => `/${tool.category}/${TOOL_ALIASES[tool.slug] || tool.slug}`;
export const isIndexableTool = (tool: ToolDef) => !BACKEND_REQUIRED.has(tool.slug) && !TOOL_ALIASES[tool.slug];
