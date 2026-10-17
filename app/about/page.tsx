import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_TOOLS, CATEGORIES, SITE } from '@/lib/registry';
import StaticPage from '@/components/StaticPage';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE.name} — ${ALL_TOOLS.length} free online calculators, converters, and file tools that run entirely in your browser. Verified formulas and privacy-first design.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About Us | ${SITE.name}`,
    description: `${ALL_TOOLS.length} free tools. Private, browser-based, no signup.`,
    url: '/about',
    siteName: SITE.name,
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: `About ${SITE.name}`,
        url: `${SITE.url}/about`,
        description: SITE.description,
        mainEntity: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.url,
          description: SITE.description,
          email: SITE.email,
        },
      }} />
      <StaticPage
        title="About Us"
        subtitle="Every tool you need — calculators, converters, PDFs, images — in one private, browser-based place."
      >
        <p>
          <strong>{SITE.name}</strong> ({SITE.url.replace('https://', '')}) is a free online toolkit with{' '}
          <strong>{ALL_TOOLS.length} tools</strong> across {CATEGORIES.length} categories. Whether you are
          calculating a mortgage, converting units, merging PDFs, or formatting JSON, everything runs on your
          device — your data never leaves your browser.
        </p>
        <h2>Our mission</h2>
        <p>
          We believe useful tools should be fast, free, and respectful of your privacy. No accounts, no paywalls,
          no uploading sensitive files to unknown servers. Just open a page, use the tool, and move on.
        </p>
        <h2>How we build and test our tools</h2>
        <p>
          Every calculator uses standard, publicly documented formulas (amortization, BMI, unit conversions, etc.).
          We verify results against known examples and reference implementations. Financial and health tools include
          clear explanations, step-by-step how-tos, and FAQs. Content is reviewed for accuracy and updated when
          formulas or best practices change. Last major content review: October 2026.
        </p>
        <h2>What makes us different</h2>
        <ul>
          <li><strong>Browser-first:</strong> Calculators, converters, PDF, and image tools process locally on your device.</li>
          <li><strong>No signup:</strong> Every tool is instant and free.</li>
          <li><strong>Verified formulas:</strong> Each tool includes explanations, how-to steps, and FAQs.</li>
          <li><strong>Built for the web:</strong> Fast static pages, accessible design, structured data for search engines.</li>
        </ul>
        <h2>Disclaimer</h2>
        <p>
          Results from financial, health, tax, and legal calculators are estimates for informational purposes only.
          They are not professional advice. Always consult qualified professionals for important decisions.
        </p>
        <p>
          <Link href="/contact">Contact us</Link> with questions, corrections, or feedback.
        </p>
      </StaticPage>
    </>
  );
}