import Link from 'next/link';
import DiscoveryLinks from '@/components/DiscoveryLinks';
import { isIndexableTool } from '@/lib/toolPolicy';
import type { Metadata } from 'next';
import { ALL_TOOLS, CATEGORIES, SITE } from '@/lib/registry';
import HomeToolGrid from '@/components/HomeToolGrid';
import PopularTools from '@/components/PopularTools';
import CategoryQuickLinks from '@/components/CategoryQuickLinks';
import JsonLd from '@/components/JsonLd';
import ToolCard from '@/components/ToolCard';
import { PRACTICAL } from '@/lib/registry/practical';
import { AUTHOR } from '@/lib/contentDates';
import { NORTH_AMERICA } from '@/lib/registry/northAmerica';

const canonicalTools = ALL_TOOLS.filter(isIndexableTool);

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Free Online Calculators & Converters` },
  description: `Every tool you need to work with numbers, files, and text in one place. ${canonicalTools.length} free calculators, converters, PDF and image tools — with local file processing and clear instructions.`,
  alternates: { canonical: '/' },
  openGraph: {
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'All Tools Together' }],
    title: `${SITE.name} — Free Online Calculators & Converters`,
    description: `${canonicalTools.length} free calculators and tools, with local PDF and image processing.`,
    url: '/',
    siteName: SITE.name,
    type: 'website',
  },
  twitter: { images: ['/opengraph-image.png'],
    card: 'summary_large_image',
    title: `${SITE.name} — Free Online Calculators & Converters`,
    description: `${canonicalTools.length} free tools — private, browser-based, no signup.`,
  },
};

export default function Home() {
  const tools = canonicalTools.map(t => ({
    slug: t.slug, name: t.name, short: t.short, category: t.category,
    kw: (t.keywords.join(' ') + ' ' + t.name).toLowerCase(),
  }));
  const cats = CATEGORIES.map(c => ({ key: c.key, name: c.name, accent: c.accent, count: canonicalTools.filter(t => t.category === c.key).length }));

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: SITE.name,
            url: SITE.url,
            description: SITE.description,
            potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/?q={search_term_string}` }, 'query-input': 'required name=search_term_string' },
            publisher: { '@id': `${SITE.url}/#organization` },
          },
          {
            '@type': 'Organization',
            '@id': `${SITE.url}/#organization`,
            name: SITE.name,
            url: SITE.url,
            logo: `${SITE.url}/icon.svg`,
            description: SITE.description,
            email: SITE.email,
            sameAs: [AUTHOR.github + '/alltoolstoghter'],
            founder: { '@type': 'Person', name: AUTHOR.name, url: SITE.url + AUTHOR.path, sameAs: [AUTHOR.github] },
            contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: SITE.email, url: SITE.url + '/contact' },
          },
        ],
      }} />

      {/* Centered hero */}
      <section className="ilp-hero">
        <div className="wrap">
          <h1>Free Online Calculators, Converters & Tools<br className="ilp-br" /> for Everyday Tasks</h1>
          <p>All {canonicalTools.length} tools are 100% FREE and easy to use! Calculate, convert, edit PDFs and images with just a few clicks — Local tools process files on your device. Advanced document services clearly show when an upload is needed.</p>
          <div className="btn-row hero-actions"><Link href="/tools" className="btn btn-primary">Browse all {canonicalTools.length} tools</Link><Link href="#tool-search" className="btn">Search tools</Link></div>
        </div>
      </section>

      <section className="wrap ds-home-promo"><div><span className="ds-eyebrow">NEW / DOCUMENT STUDIO</span><h2>A better workspace for your documents.</h2><p>Edit PDFs locally, organize pages and explore Office conversion and OCR in one place.</p></div><Link className="btn btn-primary" href="/document-studio">Open Document Studio ↗</Link></section>
      <CategoryQuickLinks />
      <section className="wrap">
        <PopularTools title="Featured tools" limit={12} />
      </section>

      <section className="wrap" aria-labelledby="new-calculators">
        <div className="cat-band"><h2 id="new-calculators">New calculators</h2></div>
        <div className="grid grid-tools">
          {[...NORTH_AMERICA, ...PRACTICAL].slice(0, 5).map(tool => <ToolCard key={tool.slug} tool={tool} showCat />)}
        </div>
      </section>

      <section className="wrap" style={{marginTop: '2rem', marginBottom: '1.5rem'}}>
        <h2 style={{fontSize: '1.4rem', marginBottom: '0.75rem'}}>Why use All Tools Together?</h2>
        <p style={{maxWidth: '720px', lineHeight: 1.6}}>
          All Tools Together gives you {canonicalTools.length} free calculators and utilities for numbers, text, and files.
          Most tools process inputs locally without an account. From mortgage and BMI calculators to unit converters,
          PDF tools, and developer utilities, every tool includes clear explanations, formulas, and FAQs so you can understand the results and limitations.
        </p>
      </section>

      {/* the grid */}
      <section className="wrap" id="tool-search">
        <HomeToolGrid tools={tools.slice(0, 36)} totalTools={canonicalTools.length} catalogUrl="/tool-catalog.json" cats={cats} />
      </section>

      <DiscoveryLinks />

      {/* trust band (kept) */}
      <section className="trust-band">
        <div className="wrap trust-grid">
          <div className="trust-item"><h3>Runs in your browser</h3><p>Calculations and file processing happen on your device. Tools marked local keep your files on your device. Server-powered document and writing tools disclose their upload processing.</p></div>
          <div className="trust-item"><h3>No signup, no cost</h3><p>Browser-based tools are free to use without an account. No account, no paywall, no email required.</p></div>
          <div className="trust-item"><h3>Built for accuracy</h3><p>Tool pages explain their methods. Estimates and simplified models have limitations; report unexpected results through our contact page.</p></div>
        </div>
      </section>
    </>
  );
}
