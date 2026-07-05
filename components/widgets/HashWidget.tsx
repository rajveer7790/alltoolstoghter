'use client';
import { useState } from 'react';

const ALGOS = ['SHA-256', 'SHA-512', 'SHA-1'] as const;

export default function HashWidget() {
  const [input, setInput] = useState('');
  const [algo, setAlgo] = useState<string>('SHA-256');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const run = async () => {
    const data = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest(algo, data);
    setOutput([...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join(''));
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  return (
    <div className="tool-card">
      <div className="pills" style={{ marginBottom: 14 }}>
        {ALGOS.map(a => (
          <button key={a} type="button" className="pill" aria-pressed={algo === a} onClick={() => setAlgo(a)}>{a}</button>
        ))}
      </div>
      <div className="field">
        <label htmlFor="hs-in">Text to hash</label>
        <textarea id="hs-in" value={input} onChange={e => setInput(e.target.value)} spellCheck={false} />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={run}>Compute {algo}</button>
        <button type="button" className="btn" onClick={copy} disabled={!output}>{copied ? 'Copied ✓' : 'Copy hash'}</button>
      </div>
      {output && (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div className="readout-main" style={{ fontSize: 14, wordBreak: 'break-all', lineHeight: 1.6 }}>
            <span className="rlabel">{algo} · hex</span>{output}
          </div>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />hashed locally with Web Crypto — input never uploaded</p>
    </div>
  );
}
