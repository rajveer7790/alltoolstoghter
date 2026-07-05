import Link from 'next/link';
import type { CSSProperties } from 'react';
import { CATEGORIES } from '@/lib/registry';

export default function CategoryQuickLinks() {
  return (
    <section className="cat-quicklinks wrap" aria-labelledby="cat-quick-h">
      <h2 id="cat-quick-h" className="cat-quick-title">Browse by category</h2>
      <div className="cat-quick-grid">
        {CATEGORIES.map(c => (
          <Link key={c.key} href={`/${c.key}`} className="cat-quick-pill" style={{ '--cat-accent': c.accent } as CSSProperties}>
            {c.name}
          </Link>
        ))}
      </div>
    </section>
  );
}