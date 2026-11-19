import { ALL_TOOLS, CATEGORIES, bySlug } from './registry';
import type { CatKey, ToolDef } from './types';
import { canonicalToolPath, isIndexableTool, TOOL_ALIASES } from './toolPolicy';
import { WORKFLOWS } from './workflows';

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
  'ai-engineering': ['developer', 'statistics', 'electronics'],
  'electronics': ['science', 'developer', 'ai-engineering'],
  'creator': ['image', 'seo', 'unit-converters'],
  'ecommerce': ['business', 'finance', 'statistics'],
};

export function getRelatedCategories(key: CatKey) {
  return (RELATED_CATEGORIES[key] || [])
    .map(k => CATEGORIES.find(c => c.key === k))
    .filter(Boolean);
}

const canonicalTools = ALL_TOOLS.filter(isIndexableTool);
const resolveTool = (slug: string) => bySlug.get(TOOL_ALIASES[slug] || slug);

/** Nearest category peers rotate by source, so tail tools do not lose every slot to P1 tools. */
export function moreInCategory(tool: ToolDef, limit = 6, displayed: readonly ToolDef[] = []): ToolDef[] {
  const peers = canonicalTools.filter(t => t.category === tool.category);
  const index = peers.findIndex(t => canonicalToolPath(t) === canonicalToolPath(tool));
  if (index < 0 || peers.length < 2) return [];
  const used = new Set([canonicalToolPath(tool), ...displayed.map(canonicalToolPath)]);
  const selected: ToolDef[] = [];
  for (let distance = 1; distance < peers.length && selected.length < limit; distance++) {
    for (const direction of [-1, 1]) {
      const peer = peers[(index + direction * distance + peers.length) % peers.length];
      const path = canonicalToolPath(peer);
      if (used.has(path)) continue;
      used.add(path); selected.push(peer);
      if (selected.length >= limit) break;
    }
  }
  return selected;
}

export function getToolLinks(tool: ToolDef): { related: ToolDef[]; more: ToolDef[] } {
  const used = new Set([canonicalToolPath(tool)]);
  const candidates = [
    ...[...(WORKFLOWS[tool.slug] || []), ...tool.related].map(resolveTool).filter((t): t is ToolDef => !!t),
    ...canonicalTools.filter(t => t.related.includes(tool.slug)),
  ];
  const related = candidates.filter(t => {
    const path = canonicalToolPath(t);
    if (!isIndexableTool(t) || used.has(path)) return false;
    used.add(path); return true;
  }).slice(0, 6);
  return { related, more: moreInCategory(tool, 4, related) };
}

// This measures link coverage, not Google's indexing status.
const peerIncoming = new Map(canonicalTools.map(t => [t.slug, 0]));
for (const tool of canonicalTools) {
  const { related, more } = getToolLinks(tool);
  for (const target of [...related, ...more]) peerIncoming.set(target.slug, (peerIncoming.get(target.slug) || 0) + 1);
}
export function getDiscoveryTools(category: CatKey, limit = 2): ToolDef[] {
  return canonicalTools.filter(t => t.category === category)
    .sort((a, b) => (peerIncoming.get(a.slug) || 0) - (peerIncoming.get(b.slug) || 0) || a.name.localeCompare(b.name))
    .slice(0, limit);
}
