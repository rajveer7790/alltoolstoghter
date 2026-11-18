import { ALL_TOOLS } from '../registry';
import { canonicalToolPath, isIndexableTool, TOOL_ALIASES } from '../toolPolicy';
import { WORKFLOWS } from '../workflows';
import type { ToolDef } from '../types';
import { processing } from './meta';

// Auto-linking between indexable tools and tools that are served but not yet indexed
// (server-processed document tools, `noindex, follow` until NEXT_PUBLIC_DOCUMENTS_READY=true).
// Links are topical (shared task words / explicit workflows), capped, and honestly labelled by where
// processing happens. Once document indexing is enabled these tools become ordinary indexable
// tools, so `pendingToolsFor` returns nothing and the normal related-tools block takes over.

const STOP = new Set(['to', 'and', 'the', 'a', 'an', 'of', 'for', 'online', 'free', 'tool', 'tools', 'converter', 'calculator', 'generator', 'file', 'files', 'document', 'documents', 'convert', 'editor', 'viewer', 'checker']);
const tokens = (tool: ToolDef) => {
  const set = new Set<string>();
  for (const text of [tool.name, ...tool.keywords, tool.slug.replace(/-/g, ' ')]) {
    for (const raw of text.toLowerCase().split(/[^a-z0-9]+/)) if (raw && !STOP.has(raw)) set.add(raw.replace(/s$/, ''));
  }
  return set;
};

const canonical = ALL_TOOLS.filter(t => !TOOL_ALIASES[t.slug]);
const tokenCache = new Map(canonical.map(t => [t.slug, tokens(t)]));

function score(a: ToolDef, b: ToolDef): number {
  const ta = tokenCache.get(a.slug)!, tb = tokenCache.get(b.slug)!;
  let s = 0;
  for (const w of ta) if (tb.has(w)) s += w === 'pdf' ? 0.5 : w === 'image' ? 1 : 2;
  if ((WORKFLOWS[a.slug] || []).includes(b.slug) || (WORKFLOWS[b.slug] || []).includes(a.slug)) s += 3;
  if (a.related.includes(b.slug) || b.related.includes(a.slug)) s += 3;
  if (a.category === b.category) s += 0.5;
  return s;
}

const rank = (source: ToolDef, pool: ToolDef[], limit: number, minScore: number) =>
  pool
    .filter(t => canonicalToolPath(t) !== canonicalToolPath(source))
    .map(t => ({ t, s: score(source, t) }))
    .filter(x => x.s >= minScore)
    .sort((x, y) => y.s - x.s || x.t.name.localeCompare(y.t.name))
    .slice(0, limit)
    .map(x => x.t);


/**
 * Curated user journeys: a not-indexed server tool -> the indexable browser tools whose users plausibly need it.
 * These are the primary source; the keyword scorer only fills remaining slots.
 */
export const PENDING_ANCHORS: Record<string, string[]> = {
  'pdf-to-word': ['pdf-to-text', 'pdf-to-markdown', 'pdf-editor'],
  'pdf-to-excel': ['pdf-to-text', 'pdf-to-json', 'pdf-info-viewer'],
  'pdf-to-csv': ['pdf-to-json', 'pdf-to-text'],
  'pdf-to-html': ['pdf-to-markdown', 'pdf-to-text', 'markdown-to-pdf', 'pdf-to-json'],
  'pdf-to-powerpoint': ['pdf-to-jpg', 'pdf-to-png', 'n-up-pdf'],
  'pdf-to-tiff': ['pdf-to-png', 'pdf-to-jpg'],
  'pdf-to-svg': ['pdf-to-png', 'crop-pdf'],
  'extract-pdf-images': ['pdf-to-jpg', 'pdf-to-png', 'image-compressor'],
  'extract-pdf-attachments': ['pdf-info-viewer', 'pdf-to-json'],
  'pdf-bookmarks-to-json': ['pdf-to-json', 'pdf-info-viewer'],
  'remove-pdf-annotations': ['annotate-pdf', 'flatten-pdf-forms', 'pdf-editor'],
  'repair-pdf': ['merge-pdf', 'split-pdf', 'pdf-info-viewer'],
  'protect-pdf': ['merge-pdf', 'remove-pdf-metadata', 'edit-pdf-metadata'],
  'unlock-pdf': ['merge-pdf', 'split-pdf'],
  'rasterize-pdf': ['pdf-to-png', 'flatten-pdf-forms'],
  'pdf-to-grayscale': ['compress-pdf', 'pdf-to-jpg'],
  'compare-pdfs': ['pdf-to-text', 'pdf-info-viewer', 'pdf-editor'],
  'ocr-pdf': ['pdf-to-text', 'pdf-to-markdown', 'pdf-to-jpg'],
  'image-to-text': ['image-converter', 'image-resizer', 'pdf-to-text'],
  'linearize-pdf': ['compress-pdf', 'merge-pdf'],
  'compress-pdf-server': ['compress-pdf', 'image-compressor'],
  'validate-pdf': ['pdf-info-viewer', 'edit-pdf-metadata'],
  'optimize-pdf': ['compress-pdf', 'pdf-info-viewer'],
  'word-to-pdf': ['markdown-to-pdf', 'jpg-to-pdf', 'merge-pdf', 'add-page-numbers-to-pdf', 'watermark-pdf'],
  'excel-to-pdf': ['markdown-to-pdf', 'resize-pdf-pages', 'merge-pdf', 'rotate-pdf', 'compress-pdf'],
  'powerpoint-to-pdf': ['n-up-pdf', 'pdf-booklet', 'merge-pdf', 'compress-pdf'],
  'odt-to-pdf': ['markdown-to-pdf', 'merge-pdf', 'add-page-numbers-to-pdf'],
  'rtf-to-pdf': ['markdown-to-pdf', 'merge-pdf', 'watermark-pdf'],
  'ods-to-pdf': ['resize-pdf-pages', 'merge-pdf', 'rotate-pdf'],
  'odp-to-pdf': ['n-up-pdf', 'merge-pdf', 'pdf-booklet'],
  'office-to-pdf': ['markdown-to-pdf', 'merge-pdf', 'split-pdf', 'extract-pdf-pages'],
  'html-to-pdf': ['markdown-to-pdf', 'jpg-to-pdf', 'crop-pdf'],
  'pdf-to-pdfa': ['edit-pdf-metadata', 'flatten-pdf-forms', 'compress-pdf'],
};

const bySlugLocal = new Map(canonical.map(t => [t.slug, t]));
const MAX_PENDING_LINKS = 5;
const MIN_INCOMING = 2;

/**
 * Deterministic, load-balanced assignment of each not-indexed tool to the indexable pages that should link to it.
 * Hub pages (merge-pdf, markdown-to-pdf) appear in many anchor lists; capping and balancing keeps every
 * server tool reachable from at least MIN_INCOMING indexable pages without any page exceeding the cap.
 */
const assigned = new Map<string, string[]>();
for (const [pendingSlug, anchors] of Object.entries(PENDING_ANCHORS).sort((x, y) => x[1].length - y[1].length || x[0].localeCompare(y[0]))) {
  const target = bySlugLocal.get(pendingSlug);
  if (!target || isIndexableTool(target)) continue;
  const candidates = anchors.filter(a => { const t = bySlugLocal.get(a); return t && isIndexableTool(t); });
  const order = [...candidates].sort((x, y) => (assigned.get(x)?.length || 0) - (assigned.get(y)?.length || 0));
  let placed = 0;
  for (const anchor of order) {
    const list = assigned.get(anchor) || [];
    if (list.length >= MAX_PENDING_LINKS) continue;
    assigned.set(anchor, [...list, pendingSlug]);
    if (++placed >= MIN_INCOMING) break;
  }
}
const anchoredFrom = (slug: string) => (assigned.get(slug) || []).map(s => bySlugLocal.get(s)).filter((t): t is ToolDef => !!t);

const pending = canonical.filter(t => !isIndexableTool(t));
const indexableLocal = canonical.filter(t => isIndexableTool(t) && processing(t) === 'local');

const unique = (list: ToolDef[]) => { const seen = new Set<string>(); return list.filter(t => !seen.has(t.slug) && !!seen.add(t.slug)); };

/** Up to five served-but-not-indexed tools that complement an indexable tool (curated journeys first). */
export function pendingToolsFor(tool: ToolDef): ToolDef[] {
  if (TOOL_ALIASES[tool.slug] || !isIndexableTool(tool)) return [];
  return unique([...anchoredFrom(tool.slug), ...rank(tool, pending.filter(t => t.category === tool.category), 4, 2)]).slice(0, MAX_PENDING_LINKS);
}

/** Up to four indexable browser-only tools that complement a not-indexed server tool. */
export function indexableAlternativesFor(tool: ToolDef): ToolDef[] {
  // Alias URLs redirect to a canonical tool and carry no links of their own.
  if (TOOL_ALIASES[tool.slug] || isIndexableTool(tool)) return [];
  const curated = (PENDING_ANCHORS[tool.slug] || []).map(s => bySlugLocal.get(s)).filter((t): t is ToolDef => !!t && isIndexableTool(t) && processing(t) === 'local');
  const sameCategory = indexableLocal.filter(t => t.category === tool.category);
  return unique([...curated, ...rank(tool, sameCategory, 4, 1.5)]).slice(0, 4);
}

/** Incoming-link coverage used by tests: every pending tool should be reachable from indexable pages. */
export function pendingCoverage(): Map<string, number> {
  const incoming = new Map(pending.map(t => [t.slug, 0]));
  for (const tool of canonical.filter(isIndexableTool)) for (const target of pendingToolsFor(tool)) incoming.set(target.slug, (incoming.get(target.slug) || 0) + 1);
  return incoming;
}
