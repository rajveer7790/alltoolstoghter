'use client';
import { useState } from 'react';

const enc = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin);
};
const dec = (s: string) => {
  const bin = atob(s.trim());
  const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export default function Base64Widget() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);

  const run = () => {
    setErr('');
    try { setOutput(mode === 'encode' ? enc(input) : dec(input)); }
    catch { setOutput(''); setErr('Invalid Base64 input — check for missing characters or wrong padding.'); }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  return (
    <div className="tool-card">
      <div className="pills" style={{ marginBottom: 14 }}>
        <button type="button" className="pill" aria-pressed={mode === 'encode'} onClick={() => setMode('encode')}>Encode</button>
        <button type="button" className="pill" aria-pressed={mode === 'decode'} onClick={() => setMode('decode')}>Decode</button>
      </div>
      <div className="field">
        <label htmlFor="b64-in">{mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}</label>
        <textarea id="b64-in" value={input} onChange={e => setInput(e.target.value)} spellCheck={false} />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={run}>{mode === 'encode' ? 'Encode →' : 'Decode →'}</button>
        <button type="button" className="btn" onClick={copy} disabled={!output}>{copied ? 'Copied ✓' : 'Copy output'}</button>
      </div>
      {err && <p style={{ color: '#DC2626', fontSize: 13.5, marginTop: 10 }} aria-live="polite">✗ {err}</p>}
      {output && (
        <div className="field" style={{ marginTop: 6 }}>
          <label htmlFor="b64-out">Output</label>
          <textarea id="b64-out" readOnly value={output} spellCheck={false} />
        </div>
      )}
      <p className="privacy-note"><span className="dot" />UTF-8 safe — processed locally</p>
    </div>
  );
}
