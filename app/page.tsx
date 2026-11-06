import type { Metadata } from 'next';
import { ALL_TOOLS, CATEGORIES, SITE } from '@/lib/registry';
import HomeToolGrid from '@/components/HomeToolGrid';
import PopularTools from '@/components/PopularTools';
import CategoryQuickLinks from '@/components/CategoryQuickLinks';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Free Online Calculators & Converters` },
  description: `Every tool you need to work with numbers, files, and text in one place. ${ALL_TOOLS.length} free calculators, converters, PDF and image tools — with local file processing and clear instructions.`,
  alternates: { canonical: '/' },
  openGraph: {
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'All Tools Together' }],
    title: `${SITE.name} — Free Online Calculators & Converters`,
    description: `${ALL_TOOLS.length} free calculators and tools, with local PDF and image processing.`,
    url: '/',
    siteName: SITE.name,
    type: 'website',
  },
  twitter: { images: ['/opengraph-image.png'],
    card: 'summary_large_image',
    title: `${SITE.name} — Free Online Calculators & Converters`,
    description: `${ALL_TOOLS.length} free tools — private, browser-based, no signup.`,
  },
};

export default function Home() {
  const tools = ALL_TOOLS.map(t => ({
    slug: t.slug, name: t.name, short: t.short, category: t.category,
    kw: (t.keywords.join(' ') + ' ' + t.name).toLowerCase(),
  }));
  const cats = CATEGORIES.map(c => ({ key: c.key, name: c.name, accent: c.accent }));

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
            sameAs: [],
          },
        ],
      }} />

      {/* Centered hero */}
      <section className="ilp-hero">
        <div className="wrap">
          <h1>Free Online Calculators, Converters & Tools<br className="ilp-br" /> for Everyday Tasks</h1>
          <p>All {ALL_TOOLS.length} tools are 100% FREE and easy to use! Calculate, convert, edit PDFs and images with just a few clicks — PDFs, images, and calculations are processed on your device. Online services disclose when a server is needed.</p>
        </div>
      </section>

      <CategoryQuickLinks />
      <section className="wrap">
        <PopularTools title="Most used tools" limit={12} />
      </section>

      <section className="wrap" style={{marginTop: '2rem', marginBottom: '1.5rem'}}>
        <h2 style={{fontSize: '1.4rem', marginBottom: '0.75rem'}}>Why use All Tools Together?</h2>
        <p style={{maxWidth: '720px', lineHeight: 1.6}}>
          All Tools Together gives you {ALL_TOOLS.length} free calculators and utilities for numbers, text, and files.
          Most tools process inputs locally without an account. From mortgage and BMI calculators to unit converters,
          PDF tools, and developer utilities, every tool includes clear explanations, formulas, and FAQs so you can understand the results and limitations.
        </p>
      </section>

      {/* the grid */}
      <section className="wrap">
        <HomeToolGrid tools={tools} cats={cats} />
      </section>

      {/* trust band (kept) */}
      <section className="trust-band">
        <div className="wrap trust-grid">
          <div className="trust-item"><h3>Runs in your browser</h3><p>Calculations and file processing happen on your device. PDF and image files stay on your device. Online writing services send submitted text to their provider.</p></div>
          <div className="trust-item"><h3>No signup, no cost</h3><p>Browser-based tools are free to use without an account. No account, no paywall, no email required.</p></div>
          <div className="trust-item"><h3>Built for accuracy</h3><p>Tool pages explain their methods. Estimates and simplified models have limitations; report unexpected results through our contact page.</p></div>
        </div>
      </section>
    </>
  );
}
