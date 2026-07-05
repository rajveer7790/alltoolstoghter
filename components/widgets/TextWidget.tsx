'use client';
import { useMemo, useState } from 'react';
import { TRANSFORMS } from '@/lib/calc/text';

export default function TextWidget({ kind }: { kind: string }) {
  const t = TRANSFORMS[kind];
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(t?.modes?.[0]?.value ?? '');
  const [copied, setCopied] = useState(false);
  const output = useMemo(() => (t && input ? t.fn(input, mode) : ''), [t, input, mode]);
  if (!t) return null;

  const copy = async () => {
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  return (
    <div className="tool-card">
      {t.modes && (
        <div className="pills" style={{ marginBottom: 14 }}>
          {t.modes.map(m => (
            <button key={m.value} type="button" className="pill" aria-pressed={mode === m.value}
              onClick={() => setMode(m.value)}>{m.label}</button>
          ))}
        </div>
      )}
      <div className="field">
        <label htmlFor="tx-in">Input</label>
        <textarea id="tx-in" value={input} onChange={e => setInput(e.target.value)}
          placeholder="Type or paste text…" spellCheck={false} />
      </div>
      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="tx-out">Output</label>
        <textarea id="tx-out" value={output} readOnly aria-live="polite" spellCheck={false} />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={copy} disabled={!output}>
          {copied ? 'Copied ✓' : 'Copy output'}
        </button>
      </div>
      <p className="privacy-note"><span className="dot" />transformed locally — nothing leaves your browser</p>
    </div>
  );
}
