import Link from 'next/link';
import { ALL_TOOLS, bySlug, getCategory } from '@/lib/registry';
import { moreInCategory } from '@/lib/linking';
import { ToolDef } from '@/lib/types';
import ToolCard from './ToolCard';
import { canonicalToolPath, isIndexableTool } from '@/lib/toolPolicy';

export default function RelatedTools({ tool }: { tool: ToolDef }) {
  const used = new Set([canonicalToolPath(tool)]);
  const related = [
    ...tool.related.map(slug => bySlug.get(slug)).filter((item): item is ToolDef => !!item),
    ...ALL_TOOLS.filter(item => isIndexableTool(item) && item.related.includes(tool.slug)),
  ].filter(item => {
    const path = canonicalToolPath(item);
    if (used.has(path)) return false;
    used.add(path);
    return true;
  }).slice(0, Math.max(6, tool.related.length));
  const more = moreInCategory(tool, 12).filter(item => isIndexableTool(item) && !related.includes(item)).slice(0, 6);
  const cat = getCategory(tool.category);

  return (
    <>
      <section className="related-tools" aria-labelledby="rel-h">
        <div className="cat-band">
          <h2 id="rel-h">Related tools</h2>
          {cat && (
            <Link href={`/${tool.category}`} className="all" style={{ color: cat.accent }}>
              All {cat.name} →
            </Link>
          )}
        </div>
        <div className="grid grid-tools">
          {related.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {more.length > 0 && (
        <section className="more-in-cat" aria-labelledby="more-h">
          <div className="cat-band">
            <h2 id="more-h">More in {cat?.name ?? tool.category}</h2>
          </div>
          <div className="grid grid-tools">
            {more.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>
      )}
    </>
  );
}