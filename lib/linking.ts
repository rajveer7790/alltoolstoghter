import { ALL_TOOLS, CATEGORIES, bySlug } from './registry';
import { CatKey, ToolDef } from './types';

/** P1 tools surfaced for homepage / category hubs (high traffic). */
export const POPULAR_SLUGS = [
  'mortgage-calculator', 'loan-calculator', 'bmi-calculator', 'percentage-calculator',
  'json-formatter', 'word-counter', 'merge-pdf', 'image-compressor',
  'qr-code-generator', 'unit-converter', 'password-generator', 'compound-interest-calculator',
  'salary-calculator', 'tip-calculator', 'pdf-to-jpg', 'case-converter',
  'age-calculator', 'scientific-calculator', 'url-encode-decode', 'markdown-to-pdf',
] as const;

export const popularTools = POPULAR_SLUGS
  .map(s => bySlug.get(s))
  .filter((t): t is ToolDef => !!t);

/** Adjacent categories for cross-linking on category pages. */
export const RELATED_CATEGORIES: Record<CatKey, CatKey[]> = {
  'finance': ['real-estate', 'investing', 'tax', 'math'],
  'health': ['cooking', 'math', 'date-time'],
  'math': ['finance', 'statistics', 'science', 'unit-converters'],
  'date-time': ['math', 'health', 'finance'],
  'unit-converters': ['math', 'cooking', 'science', 'finance'],
  'text': ['writing', 'developer', 'seo'],
  'developer': ['seo', 'text', 'math'],
  'seo': ['developer', 'text', 'image'],
  'pdf': ['image', 'text', 'developer'],
  'image': ['pdf', 'developer', 'seo'],
  'writing': ['text', 'seo', 'developer'],
  'real-estate': ['finance', 'construction', 'tax'],
  'construction': ['real-estate', 'math', 'unit-converters'],
  'cooking': ['health', 'unit-converters', 'math'],
  'science': ['math', 'unit-converters', 'statistics'],
  'statistics': ['math', 'science', 'finance'],
  'business': ['finance', 'investing', 'math'],
  'investing': ['finance', 'business', 'math'],
  'tax': ['finance', 'real-estate', 'business'],
};

export function getRelatedCategories(key: CatKey) {
  return (RELATED_CATEGORIES[key] || [])
    .map(k => CATEGORIES.find(c => c.key === k))
    .filter(Boolean);
}

/** Tools in same category not in current tool's related list (fill crawl depth). */
export function moreInCategory(tool: ToolDef, limit = 6): ToolDef[] {
  const relatedSet = new Set(tool.related);
  return ALL_TOOLS
    .filter(t => t.category === tool.category && t.slug !== tool.slug && !relatedSet.has(t.slug))
    .sort((a, b) => (a.prio === 'P1' ? 0 : a.prio === 'P2' ? 1 : 2) - (b.prio === 'P1' ? 0 : b.prio === 'P2' ? 1 : 2))
    .slice(0, limit);
}