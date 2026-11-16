import Link from 'next/link';
import { socialMetadata } from '@/lib/pageMetadata';
import type { Metadata } from 'next';
import { INDEXABLE_TOOLS, CATEGORIES } from '@/lib/registry';
import HomeToolGrid from '@/components/HomeToolGrid';

export const metadata: Metadata = socialMetadata({ title: 'All Free Tools — Search the Full Directory', description: 'Browse every free calculator, converter, PDF, image and developer tool by category or search phrase. Read processing and privacy details on each tool page.', alternates: { canonical: '/tools' } });

export default function Tools() {
  return <div className="wrap">
    <h1 className="tool-h1">All free tools</h1>
    <p className="tool-sub">Search all {INDEXABLE_TOOLS.length} tools, filter this directory, or open a category below.</p>
    <nav className="cat-quick-grid directory-categories" aria-label="Browse tool categories">
      {CATEGORIES.map(category => <Link key={category.key} href={`/${category.key}`} className="cat-quick-pill">{category.name}</Link>)}
    </nav>
    <HomeToolGrid fullCatalog tools={INDEXABLE_TOOLS.map(t => ({ slug: t.slug, name: t.name, short: t.short, category: t.category, kw: t.keywords.join(' ') }))} cats={CATEGORIES} />
  </div>;
}
