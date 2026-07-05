import type { Metadata } from 'next';
import { ALL_TOOLS, CATEGORIES, SITE } from '@/lib/registry';
import HomeToolGrid from '@/components/HomeToolGrid';
import PopularTools from '@/components/PopularTools';
import CategoryQuickLinks from '@/components/CategoryQuickLinks';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: `${SITE.name} — Free Online Calculators & Converters`,
  description: `Every tool you need to work with numbers, files, and text in one place. ${ALL_TOOLS.length} free calculators, converters, PDF and image tools — all 100% browser-based, private, and easy to use.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name} — Free Online Calculators & Converters`,
    description: `${ALL_TOOLS.length} free tools that run entirely in your browser.`,
    url: '/',
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
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
            logo: `${SITE.url}/opengraph-image`,
            description: SITE.description,
            email: SITE.email,
            sameAs: [],
          },
        ],
      }} />

      {/* Centered hero */}
      <section className="ilp-hero">
        <div className="wrap">
          <h1>Every tool you need to calculate, convert<br className="ilp-br" /> and create, in one place</h1>
          <p>All {ALL_TOOLS.length} tools are 100% FREE and easy to use! Calculate, convert, edit PDFs and images with just a few clicks — everything runs privately in your browser.</p>
        </div>
      </section>

      <CategoryQuickLinks />
      <section className="wrap">
        <PopularTools title="Most used tools" limit={12} />
      </section>

      {/* the grid */}
      <section className="wrap">
        <HomeToolGrid tools={tools} cats={cats} />
      </section>

      {/* trust band (kept) */}
      <section className="trust-band">
        <div className="wrap trust-grid">
          <div className="trust-item"><h3>Runs in your browser</h3><p>Calculations and file processing happen on your device. Your inputs are never uploaded or stored.</p></div>
          <div className="trust-item"><h3>No signup, no cost</h3><p>Every tool is free and instant. No account, no paywall, no email required.</p></div>
          <div className="trust-item"><h3>Built for accuracy</h3><p>Every formula is verified, with clear explanations and FAQs on every tool page.</p></div>
        </div>
      </section>
    </>
  );
}
