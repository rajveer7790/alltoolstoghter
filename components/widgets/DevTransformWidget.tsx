'use client';
import { useState } from 'react';
import { DEV_TRANSFORMS } from '@/lib/calc/devtransforms';

/** Paired transforms get a direction toggle (encode/decode, escape/unescape). */
const PAIRS: Record<string, { reverse: string; aLabel: string; bLabel: string }> = {
  htmlEncode: { reverse: 'htmlDecode', aLabel: 'Encode', bLabel: 'Decode' },
  jsonEscape: { reverse: 'jsonUnescape', aLabel: 'Escape', bLabel: 'Unescape' },
};

export default function DevTransformWidget({ transformKey }: { transformKey: string }) {
  const pair = PAIRS[transformKey];
  const [dir, setDir] = useState<'a' | 'b'>('a');
  const activeKey = pair && dir === 'b' ? pair.reverse : transformKey;
  const t = DEV_TRANSFORMS[activeKey];
  const [input, setInput] = useState(DEV_TRANSFORMS[transformKey]?.placeholder ?? '');
  const [output, setOutput] = useState('');
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);
  if (!t) return null;

  const run = () => {
    setErr('');
    try { setOutput(t.fn(input)); }
    catch (e) { setOutput(''); setErr(e instanceof Error ? e.message : 'Could not process this input.'); }
  };
  const copy = async () => { try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      {pair && (
        <div className="pills" style={{ marginBottom: 14 }}>
          <button type="button" className="pill" aria-pressed={dir === 'a'} onClick={() => { setDir('a'); setOutput(''); setErr(''); }}>{pair.aLabel}</button>
          <button type="button" className="pill" aria-pressed={dir === 'b'} onClick={() => { setDir('b'); setOutput(''); setErr(''); }}>{pair.bLabel}</button>
        </div>
      )}
      <div className="field">
        <label htmlFor="dt-in">Input</label>
        <textarea id="dt-in" value={input} onChange={e => setInput(e.target.value)} spellCheck={false} style={{ minHeight: 130 }} />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={run}>{t.label} →</button>
        <button type="button" className="btn" onClick={copy} disabled={!output}>{copied ? 'Copied ✓' : 'Copy output'}</button>
      </div>
      {err && <p style={{ color: '#DC2626', fontSize: 13.5, marginTop: 10 }} aria-live="polite">✗ {err}</p>}
      {output && (
        <div className="field" style={{ marginTop: 6 }}>
          <label htmlFor="dt-out">Output</label>
          <textarea id="dt-out" readOnly value={output} spellCheck={false} style={{ minHeight: 130 }} />
        </div>
      )}
      <p className="privacy-note"><span className="dot" />processed locally — nothing leaves your browser</p>
    </div>
  );
}
