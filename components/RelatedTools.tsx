import Link from 'next/link';
import { bySlug, getCategory } from '@/lib/registry';
import { moreInCategory } from '@/lib/linking';
import { ToolDef } from '@/lib/types';
import ToolCard from './ToolCard';

export default function RelatedTools({ tool }: { tool: ToolDef }) {
  const related = tool.related.map(s => bySlug.get(s)).filter((t): t is ToolDef => !!t);
  const more = moreInCategory(tool, 6);
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