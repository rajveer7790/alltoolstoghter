import type { ToolDef } from './types';

// These services require a configured provider. Their guides are public regardless of provider availability.
export const BACKEND_REQUIRED = new Set(['grammar-checker', 'paraphrasing-tool', 'plagiarism-checker', 'url-shortener']);
export const TOOL_ALIASES: Record<string, string> = {
  'scientific-notation-calculator': 'scientific-notation-converter',
  'logarithm-calculator': 'log-calculator',
  'permutation-combination-calculator': 'combination-calculator',
};
export const canonicalToolPath = (tool: { category: string; slug: string }) => `/${tool.category}/${TOOL_ALIASES[tool.slug] || tool.slug}`;
export const isIndexableTool = (tool: ToolDef) => !TOOL_ALIASES[tool.slug];
