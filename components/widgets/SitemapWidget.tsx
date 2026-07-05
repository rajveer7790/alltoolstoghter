'use client';
import { useMemo, useState } from 'react';
import TextDownloadButton from './TextDownloadButton';

export default function SitemapWidget() {
  const [urls, setUrls] = useState('https://example.com/\nhttps://example.com/about\nhttps://example.com/blog');
  const [freq, setFreq] = useState('weekly');
  const [today, setToday] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const list = urls.split('\n').map(s => s.trim()).filter(s => /^https?:\/\//.test(s));
    const date = new Date().toISOString().slice(0, 10);
    const body = list.map(u => {
      const lines = [`  <url>`, `    <loc>${u.replace(/&/g, '&amp;')}</loc>`];
      if (today) lines.push(`    <lastmod>${date}</lastmod>`);
      lines.push(`    <changefreq>${freq}</changefreq>`, `  </url>`);
      return lines.join('\n');
    }).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
  }, [urls, freq, today]);

  const copy = async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };
  const count = urls.split('\n').filter(s => /^https?:\/\//.test(s.trim())).length;

  return (
    <div className="tool-card">
      <div className="field"><label htmlFor="sm-urls">Your URLs (one per line)</label>
        <textarea id="sm-urls" value={urls} onChange={e => setUrls(e.target.value)} style={{ minHeight: 120 }} spellCheck={false} /></div>
      <div className="field-grid">
        <div className="field"><label htmlFor="sm-freq">Change frequency</label>
          <select id="sm-freq" value={freq} onChange={e => setFreq(e.target.value)}>
            {['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(f => <option key={f} value={f}>{f}</option>)}
          </select></div>
        <div className="field" style={{ justifyContent: 'flex-end' }}>
          <div className="pills"><button type="button" className="pill" aria-pressed={today} onClick={() => setToday(!today)}>Add lastmod date</button></div>
        </div>
      </div>
      <div className="field" style={{ marginTop: 6 }}><label htmlFor="sm-out">sitemap.xml ({count} URL{count !== 1 ? 's' : ''})</label>
        <textarea id="sm-out" readOnly value={result} style={{ minHeight: 140, fontFamily: 'var(--mono)', fontSize: 12.5 }} /></div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy sitemap.xml'}</button>
        <TextDownloadButton content={result} filename="sitemap.xml" mime="application/xml" label="Preview & Download" />
      </div>
      <p className="privacy-note"><span className="dot" />submit your sitemap in Google Search Console after uploading it</p>
    </div>
  );
}
