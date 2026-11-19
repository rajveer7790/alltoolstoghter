// Independent of the full registry so client-side cards share the same policy.
export const TOOL_ALIASES: Record<string, string> = {
  'scientific-notation-calculator': 'scientific-notation-converter',
  'logarithm-calculator': 'log-calculator',
  'permutation-combination-calculator': 'combination-calculator',
};
export const STANDALONE_TOOL_PATHS: Record<string, string> = { 'pdf-editor': '/pdf-editor' };
export const canonicalToolPath = (tool: { category: string; slug: string }) =>
  STANDALONE_TOOL_PATHS[tool.slug] || '/' + tool.category + '/' + (TOOL_ALIASES[tool.slug] || tool.slug);
