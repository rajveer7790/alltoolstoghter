import { referenceTable } from '@/lib/referenceTables';
import { INTENT_NOTES } from '@/lib/intentNotes';
import { EDITORIAL } from '@/lib/toolEditorial';
import { CONTENT_UPDATED, AUTHOR } from '@/lib/contentDates';
import { guideLinksForTool } from '@/lib/guides';
import { topicContext } from '@/lib/topicContext';
import { canonicalToolPath, isIndexableTool } from '@/lib/toolPolicy';
import { STANDALONE_TOOL_PATHS } from '@/lib/toolPaths';
import { backendGuides } from '@/lib/backendGuides';
import { toolSeo } from '@/lib/seo/meta';
import { sampleTables, generatedFaqs, workedExample } from '@/lib/seo/content';
import { DEEP } from '@/lib/seo/deep';
import { answerFor } from '@/lib/seo/openers';
import { AtAGlance } from '@/components/AtAGlance';
import { hasBackend } from '@/lib/apiClient';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_TOOLS, bySlug, getCategory, SITE } from '@/lib/registry';
import ToolWidget from '@/components/widgets';
import RelatedTools from '@/components/RelatedTools';
import AutoLinks from '@/components/AutoLinks';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';

export const dynamic = 'force-static';

const CATEGORY_MAP: Record<string, string> = {
  finance: 'FinanceApplication',
  'real-estate': 'FinanceApplication',
  investing: 'FinanceApplication',
  tax: 'FinanceApplication',
  business: 'BusinessApplication',
  health: 'HealthApplication',
  cooking: 'LifestyleApplication',
  math: 'EducationalApplication',
  statistics: 'EducationalApplication',
  science: 'EducationalApplication',
  'unit-converters': 'UtilitiesApplication',
  'date-time': 'UtilitiesApplication',
  construction: 'UtilitiesApplication',
  developer: 'DeveloperApplication',
  seo: 'DeveloperApplication',
  text: 'UtilitiesApplication',
  writing: 'UtilitiesApplication',
  pdf: 'UtilitiesApplication',
  image: 'MultimediaApplication',
};

export function generateStaticParams() {
  return ALL_TOOLS.filter(t => !STANDALONE_TOOL_PATHS[t.slug]).map(t => ({ category: t.category, tool: t.slug }));
}

export async function generateMetadata({ params: pendingParams }: { params: Promise<{ category: string; tool: string }> }): Promise<Metadata> {
  const params = await pendingParams;
  const t = bySlug.get(params.tool);
  if (!t || t.category !== params.category) return {};
  const seo = toolSeo(t);
  const description = backendGuides[t.slug]?.description || seo.description;
  const title = backendGuides[t.slug] ? (EDITORIAL[t.slug]?.title || INTENT_NOTES[t.slug]?.title || t.name) : seo.title;
  const canonical = canonicalToolPath(t);
  return {
    // Absolute: the brand suffix would push most titles past ~60 characters. The brand stays in Open Graph.
    title: { absolute: title },
    description,
    robots: t.widget === 'document' && !isIndexableTool(t) ? { index: false, follow: true } : undefined,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: canonical,
      siteName: SITE.name,
      type: 'website',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: `${t.name} — ${SITE.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function ToolPage({ params: pendingParams }: { params: Promise<{ category: string; tool: string }> }) {
  const params = await pendingParams;
  const t = bySlug.get(params.tool);
  if (!t || t.category !== params.category) notFound();
  const cat = getCategory(t.category)!;
  const appCategory = CATEGORY_MAP[t.category] || 'UtilitiesApplication';
  const guide = backendGuides[t.slug];
  const pendingDocument = t.widget === 'document' && !isIndexableTool(t);
  const editorial = EDITORIAL[t.slug];
  const context = topicContext(t);
  const table = editorial?.table || referenceTable(t);
  const deep = DEEP[t.slug];
  const computedExample = workedExample(t, deep?.exampleInputs);
  const tables = sampleTables(t);
  const faqs = [...t.content.faqs, ...(editorial?.faqs || []), ...(deep?.faqs || []), ...generatedFaqs(t)].filter(([q], i, list) => list.findIndex(([other]) => other === q) === i);
  const sources = [...(t.sources || []), ...(editorial?.sources || [])].filter((item, i, list) => list.findIndex(other => other.url === item.url) === i);
  const guides = guideLinksForTool(t.slug);
  const canonicalUrl = SITE.url + canonicalToolPath(t);

  return (
    <div className="content">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'WebPage', '@id': `${canonicalUrl}#page`, url: canonicalUrl, name: t.name, description: answerFor(t) || t.short,
            ...(deep?.aiSummary ? { abstract: deep.aiSummary } : {}),
            ...(deep?.shortKeyword ? { keywords: [deep.shortKeyword, ...(deep.longKeywords || [])].join(', ') } : {}),
            dateModified: CONTENT_UPDATED, inLanguage: 'en', author: { '@type': 'Person', name: AUTHOR.name, url: SITE.url + AUTHOR.path },
            publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          },
          ...(!guide && !pendingDocument ? [{
            '@type': 'WebApplication',
            name: t.name,
            url: canonicalUrl,
            applicationCategory: appCategory,
            operatingSystem: 'Web',
            description: t.short,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            dateModified: CONTENT_UPDATED,
            author: { '@type': 'Person', name: AUTHOR.name, url: SITE.url + AUTHOR.path },
          }] : [{ '@type': 'WebPage', name: t.name, url: canonicalUrl, description: guide?.description || t.short }]),
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map(([q, a]) => ({
              '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
          ...(!guide && t.content.howSteps && t.content.howSteps.length > 0 ? [{
            '@type': 'HowTo',
            name: `How to use ${t.name}`,
            description: t.metaDescription || t.short,
            step: t.content.howSteps.map((step, i) => ({
              '@type': 'HowToStep',
              url: `${canonicalUrl}#step${i + 1}`,
              name: `Step ${i + 1}`,
              itemListElement: [{ '@type': 'HowToDirection', text: step }]
            }))
          }] : []),
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
              { '@type': 'ListItem', position: 2, name: cat.name, item: `${SITE.url}/${t.category}` },
              { '@type': 'ListItem', position: 3, name: t.name, item: canonicalUrl },
            ],
          },
        ],
      }} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">home</Link> / <Link href={`/${t.category}`}>{cat.name}</Link> / {t.name}
      </nav>
      <h1 className="tool-h1">{t.name}</h1>
      <p className="tool-sub">{t.short}</p>
      <p className="content-byline">Maintained by <Link href={AUTHOR.path}>{AUTHOR.name}</Link> · Content updated <time dateTime={CONTENT_UPDATED}>{new Date(CONTENT_UPDATED + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time> · <Link href="/methodology">Methodology</Link></p>
      {!guide && <p className="quick-answer">{answerFor(t)}</p>}
      {context && <p className="availability-note" role="note">{context.notice}</p>}
      {guide && <p className="quick-answer" role="note">{guide.description}</p>}
      {!guide && !pendingDocument && <AtAGlance tool={t} summary={deep?.aiSummary} />}

      {guide && <p className="availability-note" role="note">
        {hasBackend ? 'This online tool sends your submission to a server for processing.' : 'The online tool is currently unavailable. You can follow the steps below.'}{' '}
        <Link href="/privacy">Read the privacy details</Link>.
      </p>}
      {(!guide || hasBackend) && <ToolWidget tool={t} />}

      <AdSlot id={`${t.slug}-1`} />

      <article className="prose">
        {guide && <>
          <h2>{guide.heading}</h2>
          <p>{guide.example}</p>
          <ol className="steps-list">{guide.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <p><Link href={guide.alternative.href}>{guide.alternative.label}</Link></p>
        </>}
        <p>{t.content.intro}</p>
        {INTENT_NOTES[t.slug] && <><h2>When to use this tool</h2><p>{INTENT_NOTES[t.slug].text}</p></>}
        <h2>How it works</h2>
        <p>{t.content.how}</p>
        {!guide && t.content.howSteps && (
          <ol className="steps-list">
            {t.content.howSteps.map((step, i) => <li key={i} id={`step${i + 1}`}>{step}</li>)}
          </ol>
        )}
        {(editorial?.example || computedExample || t.content.example) && <>
          <h2>Worked example</h2>
          <p>{editorial?.example || computedExample || t.content.example}</p>
        </>}
        {table && <>
          <div className="table-scroll" tabIndex={0} role="region" aria-label={table.caption}>
            <table><caption>{table.caption}</caption><thead><tr>{table.headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table>
          </div>
          {editorial?.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}
        </>}
        {deep?.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}
        {tables.length > 0 && <>
          <h2>Sample results for the {t.name}</h2>
          <p>These scenarios were produced by this page’s own formula, changing one input at a time. They are illustrations, not advice or a quote.</p>
          {tables.map(tb => (
            <div className="table-scroll" tabIndex={0} role="region" aria-label={tb.caption} key={tb.caption}>
              <table><caption>{tb.caption}</caption><thead><tr>{tb.headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{tb.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table>
            </div>
          ))}
        </>}
        <h2>Frequently asked questions</h2>
        {faqs.map(([q, a], i) => (
          <div className="faq-item" key={i}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
      </article>

      <AdSlot id={`${t.slug}-2`} />

      {sources.length > 0 && <section className="prose" aria-labelledby="sources-title"><h2 id="sources-title">Sources and assumptions</h2><ul>{sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer">{source.label}</a></li>)}</ul></section>}
      {context && <section className="prose"><h2>Further reading</h2><p>These official resources explain the wider topic. They do not certify this calculator or its assumptions.</p><a href={context.url} rel="noopener noreferrer">{context.label}</a></section>}
      {guides.length > 0 && <section className="prose"><h2>Practical guides</h2><ul>{guides.map(g => <li key={g.slug}><Link href={`/guides/${g.slug}`}>{g.title}</Link></li>)}</ul></section>}
      <AutoLinks tool={t} />
      <RelatedTools tool={{ ...t, related: [...new Set([...(editorial?.related || []), ...t.related])] }} />
    </div>
  );
}
