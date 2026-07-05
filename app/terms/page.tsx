import type { Metadata } from 'next';
import { SITE } from '@/lib/registry';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${SITE.name}. Rules and disclaimers for using our free online tools.`,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: `Terms of Service | ${SITE.name}`,
    url: '/terms',
    siteName: SITE.name,
    type: 'website',
  },
};

export default function TermsPage() {
  const updated = 'July 5, 2026';
  return (
    <StaticPage title="Terms of Service" subtitle={`Last updated: ${updated}`}>
      <p>
        By using {SITE.name} ({SITE.url}), you agree to these terms. If you do not agree, please do not use the site.
      </p>
      <h2>Use of tools</h2>
      <p>
        All tools are provided free of charge for personal and commercial use unless otherwise stated.
        You may not attempt to disrupt, scrape excessively, or reverse-engineer the service in ways that harm availability.
      </p>
      <h2>No professional advice</h2>
      <p>
        Financial, health, tax, legal, and construction calculators produce <strong>estimates only</strong>.
        They are not a substitute for advice from licensed professionals. We make no guarantees about accuracy
        for your specific situation.
      </p>
      <h2>Disclaimer of warranties</h2>
      <p>
        The site and tools are provided &quot;as is&quot; without warranties of any kind, express or implied,
        including fitness for a particular purpose or accuracy of results.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE.name} and its operators shall not be liable for any
        indirect, incidental, special, or consequential damages arising from use of the site or reliance on tool outputs.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Site design, content, and branding are owned by {SITE.name}. Tool outputs belong to you.
        You may not copy substantial portions of the site for competing services without permission.
      </p>
      <h2>Third-party links and services</h2>
      <p>
        We are not responsible for third-party websites or APIs linked from or used by our tools.
      </p>
      <h2>Changes</h2>
      <p>We may modify these terms at any time. Continued use after changes constitutes acceptance.</p>
      <h2>Contact</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href="/contact">Contact page</a>
      </p>
    </StaticPage>
  );
}