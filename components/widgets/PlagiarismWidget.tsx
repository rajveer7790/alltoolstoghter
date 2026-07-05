'use client';
import { useState } from 'react';
import { apiPost, hasBackend } from '@/lib/apiClient';

type Flag = { sentence: string; matches: { title: string; link: string }[] };

export default function PlagiarismWidget() {
  const [text, setText] = useState('');
  const [data, setData] = useState<{ checked: number; flagged: Flag[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const run = async () => {
    if (!text.trim()) { setError('Enter text to check.'); return; }
    setBusy(true); setError(''); setData(null);
    try {
      const res = await apiPost<{ checked: number; flagged: Flag[] }>('/api/plagiarism', { text });
      setData(res);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong.';
      setError(msg === 'BACKEND_NOT_CONFIGURED'
        ? 'Plagiarism checking needs the All Tools Together backend with a web-search provider (SEARCH_API_URL + SEARCH_API_KEY). Real detection requires searching the web — there is no honest offline version.'
        : msg);
    }
    setBusy(false);
  };
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="tool-card">
      {!hasBackend && (
        <p style={{ fontSize: 13, color: 'var(--ink-2)', background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.25)', borderRadius: 8, padding: '10px 12px', marginBottom: 14 }}>
          This tool needs the All Tools Together backend with a search provider. See <code>/backend</code> — set <code>SEARCH_API_URL</code> and <code>SEARCH_API_KEY</code>, then point <code>NEXT_PUBLIC_API_BASE</code> here.
        </p>
      )}
      <div className="field"><label htmlFor="pg-in">Text to check ({words} words)</label>
        <textarea id="pg-in" value={text} onChange={e => setText(e.target.value)} placeholder="Paste text to check against the web…" style={{ minHeight: 170 }} /></div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !text.trim()}>{busy ? 'Searching the web…' : 'Check for plagiarism →'}</button></div>
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }} aria-live="polite">✗ {error}</p>}
      {data && (
        <div style={{ marginTop: 16 }} aria-live="polite">
          <div className="readout" style={{ marginBottom: 12 }}>
            <div className="readout-main" style={{ color: data.flagged.length ? '#B45309' : '#047857' }}>
              <span className="rlabel">result</span>{data.flagged.length ? `${data.flagged.length} of ${data.checked} sentences matched online` : 'No matching sources found'}
            </div>
          </div>
          {data.flagged.map((f, i) => (
            <div key={i} style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
              <div style={{ fontSize: 13.5, fontStyle: 'italic', color: 'var(--ink-2)' }}>“{f.sentence}”</div>
              <div style={{ marginTop: 6 }}>
                {f.matches.map((m, j) => (
                  <a key={j} href={m.link} target="_blank" rel="noopener noreferrer nofollow" style={{ display: 'block', fontSize: 12.5, color: 'var(--signal-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>↳ {m.title || m.link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="privacy-note"><span className="dot" />compares sentences against web search results via your backend</p>
    </div>
  );
}
