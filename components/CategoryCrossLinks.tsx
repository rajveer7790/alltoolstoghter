import Link from 'next/link';
import { getRelatedCategories } from '@/lib/linking';
import { byCategory } from '@/lib/registry';
import { CatKey } from '@/lib/types';

export default function CategoryCrossLinks({ category }: { category: CatKey }) {
  const related = getRelatedCategories(category);
  if (!related.length) return null;
  return (
    <section className="cross-cats" aria-labelledby="cross-cats-h">
      <h2 id="cross-cats-h" className="cross-cats-title">Explore related categories</h2>
      <div className="cross-cats-grid">
        {related.map(c => (
          <Link key={c!.key} href={`/${c!.key}`} className="cross-cat-card" style={{ borderColor: c!.accent }}>
            <span className="cross-cat-name" style={{ color: c!.accent }}>{c!.name}</span>
            <span className="cross-cat-tag">{c!.tagline}</span>
            <span className="cross-cat-count">{byCategory(c!.key).length} tools</span>
          </Link>
        ))}
      </div>
    </section>
  );
}