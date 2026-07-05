import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_TOOLS, bySlug, getCategory, SITE } from '@/lib/registry';
import ToolWidget from '@/components/widgets';
import RelatedTools from '@/components/RelatedTools';
import ToolCard from '@/components/ToolCard';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return ALL_TOOLS.map(t => ({ category: t.category, tool: t.slug }));
}

export function generateMetadata({ params }: { params: { category: string; tool: string } }): Metadata {
  const t = bySlug.get(params.tool);
  if (!t || t.category !== params.category) return {};
  return {
    title: t.name,
    description: t.metaDescription || `${t.short.replace(/\.$/, '')}. Free, instant, and private — runs in your browser.`,
    keywords: t.keywords,
    alternates: { canonical: `/${t.category}/${t.slug}` },
    openGraph: {
      title: `${t.name} | ${SITE.name}`,
      description: t.metaDescription || t.short,
      url: `/${t.category}/${t.slug}`,
      siteName: SITE.name,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${t.name} — ${SITE.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.name} | ${SITE.name}`,
      description: t.metaDescription || t.short,
      images: ['/opengraph-image'],
    },
  };
}

export default function ToolPage({ params }: { params: { category: string; tool: string } }) {
  const t = bySlug.get(params.tool);
  if (!t || t.category !== params.category) notFound();
  const cat = getCategory(t.category)!;
  return (
    <div className="content">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication', name: t.name, url: `${SITE.url}/${t.category}/${t.slug}`,
            applicationCategory: 'UtilityApplication', operatingSystem: 'Any (web browser)',
            description: t.short, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          {
            '@type': 'FAQPage',
            mainEntity: t.content.faqs.map(([q, a]) => ({
              '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
          ...(t.content.howSteps && t.content.howSteps.length > 0 ? [{
            '@type': 'HowTo',
            name: `How to use ${t.name}`,
            description: t.metaDescription || t.short,
            step: t.content.howSteps.map((step, i) => ({
              '@type': 'HowToStep',
              url: `${SITE.url}/${t.category}/${t.slug}#step${i + 1}`,
              name: `Step ${i + 1}`,
              itemListElement: [{ '@type': 'HowToDirection', text: step }]
            }))
          }] : []),
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
              { '@type': 'ListItem', position: 2, name: cat.name, item: `${SITE.url}/${t.category}` },
              { '@type': 'ListItem', position: 3, name: t.name, item: `${SITE.url}/${t.category}/${t.slug}` },
            ],
          },
        ],
      }} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">home</Link> / <Link href={`/${t.category}`}>{cat.name}</Link> / {t.name}
      </nav>
      <h1 className="tool-h1">{t.name}</h1>
      <p className="tool-sub">{t.short}</p>
      <p className="quick-answer" role="note">
        <strong>Quick answer:</strong> {t.metaDescription || t.short}
      </p>

      <ToolWidget tool={t} />

      <AdSlot id={`${t.slug}-1`} />

      <article className="prose">
        <p>{t.content.intro}</p>
        <h2>How it works</h2>
        {t.content.howSteps ? (
          <ol className="steps-list">
            {t.content.howSteps.map((step, i) => <li key={i} id={`step${i + 1}`}>{step}</li>)}
          </ol>
        ) : (
          <p>{t.content.how}</p>
        )}
        <h2>Frequently asked questions</h2>
        {t.content.faqs.map(([q, a], i) => (
          <div className="faq-item" key={i}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
      </article>

      <AdSlot id={`${t.slug}-2`} />

      <RelatedTools tool={t} />
    </div>
  );
}
