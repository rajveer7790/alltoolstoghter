import Link from 'next/link';
import { getRelatedCategories, getDiscoveryTools } from '@/lib/linking';
import { INDEXABLE_TOOLS } from '@/lib/registry';
import { canonicalToolPath } from '@/lib/toolPolicy';
import type { CatKey } from '@/lib/types';

export default function CategoryCrossLinks({ category }: { category: CatKey }) {
  const related = getRelatedCategories(category);
  if (!related.length) return null;
  return (
    <section className="cross-cats" aria-labelledby="cross-cats-h">
      <h2 id="cross-cats-h" className="cross-cats-title">Explore related categories</h2>
      <div className="cross-cats-grid">
        {related.map(c => c && (
          <div key={c.key} className="cross-cat-card" style={{ borderColor: c.accent }}>
            <Link href={`/${c.key}`} className="cross-cat-name" style={{ color: c.accent }}>{c.name}</Link>
            <span className="cross-cat-tag">{c.tagline}</span>
            <span className="cross-cat-count">{INDEXABLE_TOOLS.filter(t => t.category === c.key).length} tools</span>
            <ul className="cross-cat-tools">
              {getDiscoveryTools(c.key).map(tool => <li key={tool.slug}><Link href={canonicalToolPath(tool)} prefetch={false}>{tool.name}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
