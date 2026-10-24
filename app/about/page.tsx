import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_TOOLS, CATEGORIES, SITE } from '@/lib/registry';
import StaticPage from '@/components/StaticPage';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE.name} — ${ALL_TOOLS.length} free online calculators, converters, and file tools that run entirely in your browser. Verified formulas, privacy-first design, and clear explanations.`,
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
        subtitle="Free, private, browser-based tools for everyday calculations and file tasks."
      >
        <p>
          <strong>{SITE.name}</strong> is a free online toolkit with <strong>{ALL_TOOLS.length} tools</strong> across {CATEGORIES.length} categories.
          We focus on practical calculators and utilities that run entirely in your browser — no accounts, no uploads, and no tracking of your inputs.
        </p>

        <h2>Our mission</h2>
        <p>
          Useful tools should be fast, free, and respectful of privacy. Most of our calculators, converters, PDF tools, and image tools process everything on your device.
          You can use them instantly without signing up or sending sensitive data to a server.
        </p>

        <h2>How we build and verify tools</h2>
        <p>
          Every calculator uses standard, publicly documented formulas (loan amortization, BMI / Mifflin-St Jeor, unit conversions based on international definitions, etc.).
          We check results against known examples and reference implementations. Financial and health tools include clear explanations, step-by-step how-tos, and FAQs.
          Content is reviewed for accuracy and updated when formulas or best practices change. Last major content review: October 2026.
        </p>

        <h2>What makes us different</h2>
        <ul>
          <li><strong>Browser-first:</strong> Most tools process data locally on your device.</li>
          <li><strong>No signup required:</strong> Every tool is free and instant.</li>
          <li><strong>Clear explanations:</strong> Each tool page includes how-to steps and FAQs.</li>
          <li><strong>Search-friendly:</strong> Structured data (FAQ, HowTo, Breadcrumb) on tool pages.</li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          Results from financial, health, tax, legal, and construction calculators are estimates for informational purposes only.
          They are not professional advice. Always consult qualified professionals (financial advisors, doctors, tax professionals, etc.) for important decisions.
        </p>

        <p>
          Questions or corrections? <Link href="/contact">Contact us</Link>.
        </p>
      </StaticPage>
    </>
  );
}