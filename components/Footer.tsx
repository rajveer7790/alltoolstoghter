import Link from 'next/link';
import { CATEGORIES, ALL_TOOLS, SITE } from '@/lib/registry';

const GROUPS: { label: string; keys: string[] }[] = [
  { label: 'Money', keys: ['finance', 'real-estate', 'investing', 'tax', 'business'] },
  { label: 'Health & Food', keys: ['health', 'cooking'] },
  { label: 'Learn', keys: ['math', 'science', 'statistics'] },
  { label: 'Everyday', keys: ['unit-converters', 'date-time', 'construction'] },
  { label: 'Web & Dev', keys: ['developer', 'seo', 'text', 'writing'] },
  { label: 'Files', keys: ['pdf', 'image'] },
];

export default function Footer() {
  const catMap = Object.fromEntries(CATEGORIES.map(c => [c.key, c]));
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand">
            <svg viewBox="0 0 512 512" aria-hidden="true">
              <path d="M86 370 L166 150 L246 370 H186 L166 310 L126 310 L106 370 Z M146 250 H186 L166 190 Z" fill="currentColor" />
              <path d="M276 150 H426 V200 H376 V370 H326 V200 H276 Z" fill="currentColor" />
            </svg>
            <span>all<span className="tw-dot">·</span>tools<span className="tw-dot">·</span>together</span>
          </Link>
            <p>{ALL_TOOLS.length} free tools that run entirely in your browser. No signup, no uploads, no tracking of your inputs.</p>
          </div>
          <div className="footer-cols">
            {GROUPS.map(g => (
              <div key={g.label} className="footer-col">
                <h4>{g.label}</h4>
                <ul>
                  {g.keys.map(k => {
                    const c = catMap[k]; if (!c) return null;
                    return <li key={k}><Link href={`/${k}`}>{c.name}</Link></li>;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-legal">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/sitemap">Sitemap</Link>
        </div>
        <div className="footer-bottom">
          <p>© {year} {SITE.name}. Every tool runs locally in your browser — your data never leaves your device.</p>
          <p className="disclaimer">Results are estimates for information only — not financial, medical, tax, or legal advice.</p>
        </div>
      </div>
    </footer>
  );
}
