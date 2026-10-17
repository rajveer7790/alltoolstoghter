import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, byCategory, getCategory, SITE } from '@/lib/registry';
import { CatKey } from '@/lib/types';
import ToolCard from '@/components/ToolCard';
import CategoryCrossLinks from '@/components/CategoryCrossLinks';
import PopularTools from '@/components/PopularTools';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ category: c.key }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = getCategory(params.category);
  if (!cat) return {};
  const n = byCategory(cat.key).length;
  const desc = `${cat.tagline} ${n} free ${cat.name.toLowerCase()} tools that run entirely in your browser.`;
  return {
    title: `${cat.name} — ${n} Free Online Tools`,
    description: desc,
    alternates: { canonical: `/${cat.key}` },
    openGraph: {
      title: `${cat.name} | ${SITE.name}`,
      description: desc,
      url: `/${cat.key}`,
      siteName: SITE.name,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `${cat.name} | ${SITE.name}`, description: desc },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  if (!cat) notFound();
  const tools = byCategory(cat.key as CatKey);
  return (
    <div className="wrap">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
              { '@type': 'ListItem', position: 2, name: cat.name, item: `${SITE.url}/${cat.key}` },
            ],
          },
          {
            '@type': 'ItemList',
            name: `${cat.name} Tools`,
            numberOfItems: tools.length,
            itemListElement: tools.map((t, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: t.name,
              url: `${SITE.url}/${t.category}/${t.slug}`,
            })),
          },
        ],
      }} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">home</Link> / <Link href={`/${cat.key}`}>{cat.name}</Link>
      </nav>
      <h1 className="tool-h1" style={{ color: cat.accent }}>{cat.name}</h1>
      <p className="tool-sub">{cat.tagline}</p>
      <div className="prose" style={{ maxWidth: '720px', margin: '1.5rem 0 2rem' }}>
        <p>
          Browse {tools.length} free {cat.name.toLowerCase()} tools that run entirely in your browser. 
          No signup, no uploads, and no data stored — everything calculates or processes locally on your device. 
          Use these tools for quick calculations, conversions, and everyday tasks with clear explanations and FAQs on every page.
        </p>
      </div>
      <div className="grid grid-tools">
        {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
      </div>
      <AdSlot id={`cat-${cat.key}`} />
      <CategoryCrossLinks category={cat.key} />
      <PopularTools title="Popular across all categories" limit={8} />
    </div>
  );
}
