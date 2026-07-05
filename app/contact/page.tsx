import type { Metadata } from 'next';
import { SITE } from '@/lib/registry';
import StaticPage from '@/components/StaticPage';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE.name}. Report bugs, suggest tools, or ask questions about our free online calculators and converters.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact Us | ${SITE.name}`,
    description: `Reach ${SITE.name} for support, feedback, and tool requests.`,
    url: '/contact',
    siteName: SITE.name,
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `Contact ${SITE.name}`,
        url: `${SITE.url}/contact`,
        mainEntity: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.url,
          email: SITE.email,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: SITE.email,
            availableLanguage: 'English',
          },
        },
      }} />
      <StaticPage
        title="Contact Us"
        subtitle="Questions, bug reports, tool requests — we read every message."
      >
        <p>
          We welcome feedback on accuracy, usability, and new tool ideas. For general inquiries, reach us at:
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
        <h2>What to include</h2>
        <ul>
          <li><strong>Bug reports:</strong> Tool name, browser, and steps to reproduce.</li>
          <li><strong>Accuracy issues:</strong> Expected vs actual result, with inputs used.</li>
          <li><strong>Feature requests:</strong> Which tool or category you need and why.</li>
          <li><strong>Privacy questions:</strong> See our <a href="/privacy">Privacy Policy</a>.</li>
        </ul>
        <p>We aim to respond within 3–5 business days.</p>
      </StaticPage>
    </>
  );
}