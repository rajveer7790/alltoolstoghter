'use client';
import { useMemo, useState } from 'react';
import { loremIpsum } from '@/lib/calc/text';

export default function LoremWidget() {
  const [paras, setParas] = useState(3);
  const [copied, setCopied] = useState(false);
  const out = useMemo(() => loremIpsum(paras), [paras]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <div className="tool-card">
      <div className="field" style={{ maxWidth: 220 }}>
        <label htmlFor="li-n">Paragraphs</label>
        <input id="li-n" type="number" min={1} max={50} value={paras}
          onChange={e => setParas(Math.min(50, Math.max(1, parseInt(e.target.value || '1', 10))))} />
      </div>
      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="li-out">Generated text</label>
        <textarea id="li-out" style={{ minHeight: 200 }} readOnly value={out} aria-live="polite" />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy text'}</button>
      </div>
    </div>
  );
}
