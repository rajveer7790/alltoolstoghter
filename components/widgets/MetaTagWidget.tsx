'use client';
import { useMemo, useState } from 'react';
import TextDownloadButton from './TextDownloadButton';

export default function MetaTagWidget() {
  const [title, setTitle] = useState('My Page Title — Brand');
  const [desc, setDesc] = useState('A concise, compelling description of this page in about 155 characters for search results.');
  const [keywords, setKeywords] = useState('');
  const [robots, setRobots] = useState('index, follow');
  const [author, setAuthor] = useState('');
  const [copied, setCopied] = useState(false);

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const result = useMemo(() => {
    const t: string[] = ['<meta charset="UTF-8">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">'];
    if (title.trim()) t.push(`<title>${esc(title.trim())}</title>`);
    if (desc.trim()) t.push(`<meta name="description" content="${esc(desc.trim())}">`);
    if (keywords.trim()) t.push(`<meta name="keywords" content="${esc(keywords.trim())}">`);
    if (author.trim()) t.push(`<meta name="author" content="${esc(author.trim())}">`);
    t.push(`<meta name="robots" content="${esc(robots)}">`);
    return t.join('\n');
  }, [title, desc, keywords, robots, author]);

  const copy = async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };
  const tLen = title.trim().length, dLen = desc.trim().length;
  const warn = (n: number, lo: number, hi: number) => n === 0 ? 'var(--ink-3)' : n < lo || n > hi ? '#B45309' : '#047857';

  return (
    <div className="tool-card">
      <div className="field"><label htmlFor="mt-title">Title <span style={{ color: warn(tLen, 30, 60), fontWeight: 600 }}>({tLen} chars)</span></label>
        <input id="mt-title" type="text" value={title} onChange={e => setTitle(e.target.value)} /></div>
      <div className="field"><label htmlFor="mt-desc">Meta description <span style={{ color: warn(dLen, 120, 160), fontWeight: 600 }}>({dLen} chars)</span></label>
        <textarea id="mt-desc" value={desc} onChange={e => setDesc(e.target.value)} style={{ minHeight: 70 }} /></div>
      <div className="field-grid">
        <div className="field"><label htmlFor="mt-robots">Robots</label>
          <select id="mt-robots" value={robots} onChange={e => setRobots(e.target.value)}>
            <option value="index, follow">index, follow</option>
            <option value="noindex, follow">noindex, follow</option>
            <option value="index, nofollow">index, nofollow</option>
            <option value="noindex, nofollow">noindex, nofollow</option>
          </select></div>
        <div className="field"><label htmlFor="mt-author">Author (optional)</label>
          <input id="mt-author" type="text" value={author} onChange={e => setAuthor(e.target.value)} /></div>
      </div>
      <div className="field"><label htmlFor="mt-kw">Keywords (optional, comma-separated)</label>
        <input id="mt-kw" type="text" value={keywords} onChange={e => setKeywords(e.target.value)} /></div>
      <div className="field" style={{ marginTop: 6 }}><label htmlFor="mt-out">HTML &lt;head&gt; tags</label>
        <textarea id="mt-out" readOnly value={result} style={{ minHeight: 130, fontFamily: 'var(--mono)', fontSize: 12.5 }} /></div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy meta tags'}</button>
        <TextDownloadButton content={result} filename="meta-tags.html" mime="text/html" label="Preview & Download" />
      </div>
      <p className="privacy-note"><span className="dot" />title ~50–60 and description ~120–160 characters show best in search results</p>
    </div>
  );
}
