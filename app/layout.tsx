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
  openGraph: {
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
        <Header />
        <hr className="ruler" aria-hidden="true" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
