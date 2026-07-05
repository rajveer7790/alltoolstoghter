'use client';
import { useState } from 'react';
import { apiPost, hasBackend } from '@/lib/apiClient';

export default function UrlShortenerWidget() {
  const [url, setUrl] = useState('');
  const [custom, setCustom] = useState('');
  const [result, setResult] = useState<{ shortUrl: string; target: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setBusy(true); setError(''); setResult(null);
    try {
      const data = await apiPost<{ shortUrl: string; target: string }>('/api/shorten', { url, custom: custom || undefined });
      setResult(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong.';
      setError(msg === 'BACKEND_NOT_CONFIGURED'
        ? 'The link backend is not connected yet. Once the All Tools Together backend service is deployed and NEXT_PUBLIC_API_BASE is set, this tool goes live.'
        : msg);
    }
    setBusy(false);
  };
  const copy = async () => { if (!result) return; try { await navigator.clipboard.writeText(result.shortUrl); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      {!hasBackend && (
        <p style={{ fontSize: 13, color: 'var(--ink-2)', background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.25)', borderRadius: 8, padding: '10px 12px', marginBottom: 14 }}>
          This tool needs the All Tools Together backend. It is included in the project under <code>/backend</code> — deploy it and set <code>NEXT_PUBLIC_API_BASE</code> to activate.
        </p>
      )}
      <div className="field"><label htmlFor="us-url">Long URL</label>
        <input id="us-url" type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/a/very/long/path" spellCheck={false} /></div>
      <div className="field"><label htmlFor="us-custom">Custom alias (optional)</label>
        <input id="us-custom" type="text" value={custom} onChange={e => setCustom(e.target.value)} placeholder="my-link" spellCheck={false} /></div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !url.trim()}>{busy ? 'Shortening…' : 'Shorten URL →'}</button></div>
      {error && <p style={{ color: '#DC2626', fontSize: 13.5, marginTop: 10 }} aria-live="polite">✗ {error}</p>}
      {result && (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div className="readout-main" style={{ fontSize: 16, wordBreak: 'break-all' }}><span className="rlabel">short link</span>{result.shortUrl}</div>
          <div className="btn-row"><button type="button" className="btn" onClick={copy}>{copied ? 'Copied ✓' : 'Copy link'}</button></div>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />links are created by your own backend — you own the data</p>
    </div>
  );
}
