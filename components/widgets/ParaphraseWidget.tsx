'use client';
import { useState } from 'react';
import { apiPost, hasBackend } from '@/lib/apiClient';

const TONES = [['standard', 'Standard'], ['formal', 'Formal'], ['simple', 'Simple'], ['creative', 'Creative']];

export default function ParaphraseWidget() {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('standard');
  const [result, setResult] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (!text.trim()) { setError('Enter text to paraphrase.'); return; }
    setBusy(true); setError(''); setResult('');
    try {
      const data = await apiPost<{ result: string }>('/api/paraphrase', { text, tone });
      setResult(data.result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong.';
      setError(msg === 'BACKEND_NOT_CONFIGURED'
        ? 'Paraphrasing needs the All Tools Together backend with an LLM provider configured (LLM_API_URL + LLM_API_KEY). Until then this tool stays inactive — by design, there is no fake offline paraphraser.'
        : msg);
    }
    setBusy(false);
  };
  const copy = async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      {!hasBackend && (
        <p style={{ fontSize: 13, color: 'var(--ink-2)', background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.25)', borderRadius: 8, padding: '10px 12px', marginBottom: 14 }}>
          This tool needs the All Tools Together backend with an LLM provider. See <code>/backend</code> — set <code>LLM_API_URL</code> and <code>LLM_API_KEY</code>, then point <code>NEXT_PUBLIC_API_BASE</code> here.
        </p>
      )}
      <div className="field"><label htmlFor="pp-in">Original text</label>
        <textarea id="pp-in" value={text} onChange={e => setText(e.target.value)} placeholder="Paste the text you want to rewrite…" style={{ minHeight: 140 }} /></div>
      <div className="field-grid">
        <div className="field"><label htmlFor="pp-tone">Style</label>
          <select id="pp-tone" value={tone} onChange={e => setTone(e.target.value)}>{TONES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
        <div className="field" style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary" onClick={run} disabled={busy || !text.trim()}>{busy ? 'Rewriting…' : 'Paraphrase →'}</button>
        </div>
      </div>
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }} aria-live="polite">✗ {error}</p>}
      {result && (
        <>
          <div className="field" style={{ marginTop: 14 }}><label htmlFor="pp-out">Paraphrased</label>
            <textarea id="pp-out" readOnly value={result} style={{ minHeight: 140 }} /></div>
          <div className="btn-row"><button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy result'}</button></div>
        </>
      )}
      <p className="privacy-note"><span className="dot" />rewritten by the LLM you configure on your own backend</p>
    </div>
  );
}
