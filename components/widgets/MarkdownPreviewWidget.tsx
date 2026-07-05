'use client';
import { useMemo, useState } from 'react';

/** Live Markdown previewer — same safe parser style as devtransforms (escape first, no raw HTML). */
function mdToHtml(s: string): string {
  const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inline = (t: string) => esc(t)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, a, b) => `<a href="${esc(b)}" rel="nofollow noopener">${a}</a>`);
  const lines = s.split('\n'); const out: string[] = [];
  let inList = false, inOl = false, inCode = false, inQuote = false;
  const closeAll = () => { if (inList) { out.push('</ul>'); inList = false; } if (inOl) { out.push('</ol>'); inOl = false; } if (inQuote) { out.push('</blockquote>'); inQuote = false; } };
  for (const raw of lines) {
    if (raw.trim().startsWith('```')) { closeAll(); if (inCode) { out.push('</code></pre>'); inCode = false; } else { out.push('<pre><code>'); inCode = true; } continue; }
    if (inCode) { out.push(esc(raw)); continue; }
    const h = raw.match(/^(#{1,6})\s+(.*)$/);
    if (h) { closeAll(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    if (/^>\s?/.test(raw)) { if (!inQuote) { closeAll(); out.push('<blockquote>'); inQuote = true; } out.push(`<p>${inline(raw.replace(/^>\s?/, ''))}</p>`); continue; }
    if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(raw)) { closeAll(); out.push('<hr/>'); continue; }
    if (/^\d+[.)]\s+/.test(raw)) { if (!inOl) { closeAll(); out.push('<ol>'); inOl = true; } out.push(`<li>${inline(raw.replace(/^\d+[.)]\s+/, ''))}</li>`); continue; }
    if (/^[-*]\s+/.test(raw)) { if (!inList) { closeAll(); out.push('<ul>'); inList = true; } out.push(`<li>${inline(raw.replace(/^[-*]\s+/, ''))}</li>`); continue; }
    closeAll();
    if (raw.trim() === '') continue;
    out.push(`<p>${inline(raw)}</p>`);
  }
  closeAll(); if (inCode) out.push('</code></pre>');
  return out.join('\n');
}

const SAMPLE = `# Markdown Previewer

Type on the left, see the result instantly.

## Features
- **Bold**, *italic*, and \`inline code\`
- [Links](https://example.com)
- Ordered and unordered lists

> Blockquotes work too.

\`\`\`
code blocks are preserved
\`\`\``;

export default function MarkdownPreviewWidget() {
  const [src, setSrc] = useState(SAMPLE);
  const html = useMemo(() => mdToHtml(src), [src]);
  return (
    <div className="tool-card">
      <div className="md-split">
        <div className="field"><label htmlFor="mp-in">Markdown</label>
          <textarea id="mp-in" value={src} onChange={e => setSrc(e.target.value)} spellCheck={false}
            style={{ minHeight: 340, fontFamily: 'var(--mono)', fontSize: 13.5 }} /></div>
        <div className="field"><label>Preview</label>
          <div className="md-preview prose" dangerouslySetInnerHTML={{ __html: html }} /></div>
      </div>
      <p className="privacy-note"><span className="dot" />rendered locally — input is escaped first, so pasted HTML can’t execute</p>
    </div>
  );
}
