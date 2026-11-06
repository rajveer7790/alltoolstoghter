import { isIndexableTool } from '@/lib/toolPolicy';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, byCategory, getCategory, SITE } from '@/lib/registry';

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
  const tools = byCategory(cat.key).filter(isIndexableTool);
  const n = tools.length;
  const examples = tools.slice(0, 3).map(tool => tool.name).join(', ');
  const desc = `Explore ${cat.name} on All Tools Together. Find ${examples}, with usage instructions and FAQs.`;
  return {
    title: `${cat.name} — ${n} Free Online Tools`,
    description: desc,
    alternates: { canonical: `/${cat.key}` },
    openGraph: {
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'All Tools Together' }],
      title: `${cat.name} | ${SITE.name}`,
      description: desc,
      url: `/${cat.key}`,
      siteName: SITE.name,
      type: 'website',
    },
    twitter: { images: ['/opengraph-image.png'], card: 'summary_large_image', title: `${cat.name} | ${SITE.name}`, description: desc },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  if (!cat) notFound();
  const tools = byCategory(cat.key).filter(isIndexableTool);
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
          Browse {tools.length} tools and guides in {cat.name}. Start with{' '}
          {tools.slice(0, 3).map((tool, index) => (
            <span key={tool.slug}>{index > 0 && (index === 2 ? ' or ' : ', ')}
              <Link href={`/${tool.category}/${tool.slug}`}>{tool.name}</Link>
            </span>
          ))}. Each page explains the inputs and how to interpret the output.
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
