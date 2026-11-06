import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/registry';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Free Online Calculators & Converters`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  verification: {
    google: 'vVZtwVZMlikBJTc-hYkUOpJ9mu7eOvqIGtpVGPOcV6Q',
  },
  openGraph: {
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'All Tools Together' }],
    siteName: SITE.name,
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <hr className="ruler" aria-hidden="true" />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
