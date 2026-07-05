'use client';
import { useMemo, useState } from 'react';
import TextDownloadButton from './TextDownloadButton';

export default function OpenGraphWidget() {
  const [title, setTitle] = useState('How to Brew Better Coffee');
  const [desc, setDesc] = useState('Seven practical tips for a richer cup at home.');
  const [url, setUrl] = useState('https://example.com/coffee');
  const [image, setImage] = useState('https://example.com/og-image.jpg');
  const [type, setType] = useState('website');
  const [site, setSite] = useState('');
  const [twitter, setTwitter] = useState(true);
  const [copied, setCopied] = useState(false);

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const result = useMemo(() => {
    const t: string[] = [];
    if (title.trim()) t.push(`<meta property="og:title" content="${esc(title.trim())}">`);
    if (type.trim()) t.push(`<meta property="og:type" content="${esc(type)}">`);
    if (url.trim()) t.push(`<meta property="og:url" content="${esc(url.trim())}">`);
    if (image.trim()) t.push(`<meta property="og:image" content="${esc(image.trim())}">`);
    if (desc.trim()) t.push(`<meta property="og:description" content="${esc(desc.trim())}">`);
    if (site.trim()) t.push(`<meta property="og:site_name" content="${esc(site.trim())}">`);
    if (twitter) {
      t.push('', `<meta name="twitter:card" content="summary_large_image">`);
      if (title.trim()) t.push(`<meta name="twitter:title" content="${esc(title.trim())}">`);
      if (desc.trim()) t.push(`<meta name="twitter:description" content="${esc(desc.trim())}">`);
      if (image.trim()) t.push(`<meta name="twitter:image" content="${esc(image.trim())}">`);
    }
    return t.join('\n');
  }, [title, desc, url, image, type, site, twitter]);

  const copy = async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };
  const F = ({ id, label, val, set }: any) => (
    <div className="field"><label htmlFor={id}>{label}</label>
      <input id={id} type="text" value={val} onChange={e => set(e.target.value)} spellCheck={false} /></div>
  );

  return (
    <div className="tool-card">
      <F id="og-title" label="Title" val={title} set={setTitle} />
      <div className="field"><label htmlFor="og-desc">Description</label>
        <textarea id="og-desc" value={desc} onChange={e => setDesc(e.target.value)} style={{ minHeight: 60 }} /></div>
      <div className="field-grid">
        <F id="og-url" label="Page URL" val={url} set={setUrl} />
        <F id="og-img" label="Image URL (1200×630 ideal)" val={image} set={setImage} />
      </div>
      <div className="field-grid">
        <div className="field"><label htmlFor="og-type">Type</label>
          <select id="og-type" value={type} onChange={e => setType(e.target.value)}>
            {['website', 'article', 'product', 'profile', 'video.other'].map(o => <option key={o} value={o}>{o}</option>)}
          </select></div>
        <F id="og-site" label="Site name (optional)" val={site} set={setSite} />
      </div>
      <div className="pills" style={{ marginTop: 4 }}><button type="button" className="pill" aria-pressed={twitter} onClick={() => setTwitter(!twitter)}>Include Twitter Card tags</button></div>
      <div className="field" style={{ marginTop: 12 }}><label htmlFor="og-out">Open Graph &lt;head&gt; tags</label>
        <textarea id="og-out" readOnly value={result} style={{ minHeight: 150, fontFamily: 'var(--mono)', fontSize: 12.5 }} /></div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy tags'}</button>
        <TextDownloadButton content={result} filename="open-graph-tags.html" mime="text/html" label="Preview & Download" />
      </div>
      <p className="privacy-note"><span className="dot" />these control how your link previews on Facebook, LinkedIn, Slack, and X</p>
    </div>
  );
}
