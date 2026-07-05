import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_TOOLS, CATEGORIES, SITE } from '@/lib/registry';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: `Browse all ${ALL_TOOLS.length} free tools on ${SITE.name} — calculators, converters, PDF, image, developer, and more.`,
  alternates: { canonical: '/sitemap' },
  openGraph: {
    title: `Sitemap | ${SITE.name}`,
    url: '/sitemap',
    siteName: SITE.name,
    type: 'website',
  },
};

export default function HtmlSitemapPage() {
  const byCat = CATEGORIES.map(c => ({
    ...c,
    tools: ALL_TOOLS.filter(t => t.category === c.key),
  }));

  return (
    <div className="wrap">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Sitemap',
        url: `${SITE.url}/sitemap`,
        description: `HTML sitemap of all tools on ${SITE.name}`,
      }} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">home</Link> / sitemap
      </nav>
      <h1 className="tool-h1">Sitemap</h1>
      <p className="tool-sub">
        All {ALL_TOOLS.length} tools across {CATEGORIES.length} categories. Machine-readable XML:{' '}
        <Link href="/sitemap.xml">sitemap.xml</Link>
      </p>

      <section className="sitemap-static">
        <h2>Pages</h2>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><Link href="/terms">Terms of Service</Link></li>
        </ul>
      </section>

      {byCat.map(c => (
        <section key={c.key} className="sitemap-cat">
          <h2>
            <Link href={`/${c.key}`} style={{ color: c.accent }}>{c.name}</Link>
            <span className="sitemap-count">{c.tools.length}</span>
          </h2>
          <ul>
            {c.tools.map(t => (
              <li key={t.slug}>
                <Link href={`/${t.category}/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}