'use client';
import { useState } from 'react';

export default function UuidWidget() {
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const gen = () => {
    const n = Math.min(100, Math.max(1, count));
    const out: string[] = [];
    for (let i = 0; i < n; i++) {
      out.push(typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
          }));
    }
    setList(out);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(list.join('\n')); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <div className="tool-card">
      <div className="field" style={{ maxWidth: 220 }}>
        <label htmlFor="uu-n">How many (1–100)</label>
        <input id="uu-n" type="number" min={1} max={100} value={count}
          onChange={e => setCount(parseInt(e.target.value || '1', 10))} />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={gen}>Generate UUIDs</button>
        <button type="button" className="btn" onClick={copy} disabled={!list.length}>{copied ? 'Copied ✓' : 'Copy all'}</button>
      </div>
      {list.length > 0 && (
        <div className="field" style={{ marginTop: 12 }}>
          <label htmlFor="uu-out">UUID v4</label>
          <textarea id="uu-out" readOnly value={list.join('\n')} style={{ minHeight: 140 }} aria-live="polite" spellCheck={false} />
        </div>
      )}
      <p className="privacy-note"><span className="dot" />cryptographic randomness — generated locally</p>
    </div>
  );
}
