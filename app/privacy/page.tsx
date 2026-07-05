import type { Metadata } from 'next';
import { SITE } from '@/lib/registry';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE.name}. Learn how we handle data — most tools run entirely in your browser with no uploads.`,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: `Privacy Policy | ${SITE.name}`,
    url: '/privacy',
    siteName: SITE.name,
    type: 'website',
  },
};

export default function PrivacyPage() {
  const updated = 'July 5, 2026';
  return (
    <StaticPage title="Privacy Policy" subtitle={`Last updated: ${updated}`}>
      <p>
        {SITE.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates {SITE.url}. This policy explains
        what information we collect and how we use it.
      </p>
      <h2>Browser-based tools (default)</h2>
      <p>
        The majority of our tools — calculators, converters, text utilities, PDF tools, and image tools — run
        entirely in your web browser. Your inputs, files, and results are processed on your device and are{' '}
        <strong>not uploaded</strong> to our servers.
      </p>
      <h2>Optional backend tools</h2>
      <p>
        A small number of tools (grammar checker, paraphrasing, plagiarism checker, URL shortener) may send data
        to a backend service when configured. If deployed, that service is operated by us or you (self-hosted).
        Text submitted to these tools is transmitted only when you actively use them.
      </p>
      <h2>Information we may collect automatically</h2>
      <ul>
        <li>Standard web server logs (IP address, browser type, pages visited, timestamps)</li>
        <li>Cookies or similar technologies if we use analytics or advertising (disclosed when active)</li>
        <li>Aggregated, non-identifying usage statistics</li>
      </ul>
      <h2>Third-party services</h2>
      <p>
        Some tools connect to third-party APIs from your browser (e.g. currency exchange rates). Those requests
        go directly from your device to the third party subject to their privacy policies.
      </p>
      <h2>Children&apos;s privacy</h2>
      <p>
        Our services are not directed at children under 13. We do not knowingly collect personal information from children.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete personal data we hold.
        Contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
      <h2>Changes</h2>
      <p>We may update this policy. The &quot;Last updated&quot; date at the top reflects the latest revision.</p>
      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </StaticPage>
  );
}