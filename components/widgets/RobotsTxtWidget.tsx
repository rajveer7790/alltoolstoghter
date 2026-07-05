'use client';
import { useMemo, useState } from 'react';
import TextDownloadButton from './TextDownloadButton';

export default function RobotsTxtWidget() {
  const [preset, setPreset] = useState<'allow' | 'block' | 'custom'>('allow');
  const [sitemap, setSitemap] = useState('https://alltoolstogether.com/sitemap.xml');
  const [disallow, setDisallow] = useState('/admin/\n/cart/\n/tmp/');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const lines: string[] = ['User-agent: *'];
    if (preset === 'block') lines.push('Disallow: /');
    else if (preset === 'allow') lines.push('Disallow:');
    else { const paths = disallow.split('\n').map(s => s.trim()).filter(Boolean); if (paths.length) paths.forEach(p => lines.push(`Disallow: ${p}`)); else lines.push('Disallow:'); }
    if (sitemap.trim()) { lines.push(''); lines.push(`Sitemap: ${sitemap.trim()}`); }
    return lines.join('\n');
  }, [preset, sitemap, disallow]);

  const copy = async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="rb-preset">Crawl policy</label>
        <select id="rb-preset" value={preset} onChange={e => setPreset(e.target.value as any)}>
          <option value="allow">Allow all crawlers (full site)</option>
          <option value="block">Block all crawlers (staging / private)</option>
          <option value="custom">Allow all, except specific paths</option>
        </select>
      </div>
      {preset === 'custom' && (
        <div className="field"><label htmlFor="rb-dis">Disallowed paths (one per line)</label>
          <textarea id="rb-dis" value={disallow} onChange={e => setDisallow(e.target.value)} style={{ minHeight: 90 }} spellCheck={false} /></div>
      )}
      <div className="field"><label htmlFor="rb-sm">Sitemap URL (optional)</label>
        <input id="rb-sm" type="text" value={sitemap} onChange={e => setSitemap(e.target.value)} spellCheck={false} /></div>
      <div className="field" style={{ marginTop: 6 }}><label htmlFor="rb-out">robots.txt</label>
        <textarea id="rb-out" readOnly value={result} style={{ minHeight: 120, fontFamily: 'var(--mono)' }} /></div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy robots.txt'}</button>
        <TextDownloadButton content={result} filename="robots.txt" mime="text/plain" label="Preview & Download" />
      </div>
      <p className="privacy-note"><span className="dot" />place this file at the root of your domain: /robots.txt</p>
    </div>
  );
}
