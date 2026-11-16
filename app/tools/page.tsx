import { socialMetadata } from '@/lib/pageMetadata';
import type { Metadata } from 'next';
import { INDEXABLE_TOOLS, CATEGORIES } from '@/lib/registry';
import HomeToolGrid from '@/components/HomeToolGrid';
export const metadata: Metadata = socialMetadata({ title: 'All Free Tools — Search the Full Directory', description: 'Browse every free calculator, converter, PDF, image and developer tool by category or search phrase. Read processing and privacy details on each tool page.', alternates: { canonical: '/tools' } });
export default function Tools() { return <div className="wrap"><h1 className="tool-h1">All free tools</h1><p className="tool-sub">Search the full directory or filter by category.</p><HomeToolGrid fullCatalog tools={INDEXABLE_TOOLS.map(t => ({ slug: t.slug, name: t.name, short: t.short, category: t.category, kw: t.keywords.join(' ') }))} cats={CATEGORIES} /></div>; }
