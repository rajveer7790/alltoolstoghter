'use client';
import { useState } from 'react';

export default function UrlEncodeWidget() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [err, setErr] = useState('');
  const run = () => {
    setErr('');
    try { setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input.replace(/\+/g, '%20'))); }
    catch { setOutput(''); setErr('Malformed percent-encoding — a % must be followed by two hex digits.'); }
  };
  return (
    <div className="tool-card">
      <div className="pills" style={{ marginBottom: 14 }}>
        <button type="button" className="pill" aria-pressed={mode === 'encode'} onClick={() => setMode('encode')}>Encode</button>
        <button type="button" className="pill" aria-pressed={mode === 'decode'} onClick={() => setMode('decode')}>Decode</button>
      </div>
      <div className="field">
        <label htmlFor="ue-in">Input</label>
        <textarea id="ue-in" value={input} onChange={e => setInput(e.target.value)} spellCheck={false} />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={run}>{mode === 'encode' ? 'Encode →' : 'Decode →'}</button>
      </div>
      {err && <p style={{ color: '#DC2626', fontSize: 13.5, marginTop: 10 }} aria-live="polite">✗ {err}</p>}
      {output && (
        <div className="field" style={{ marginTop: 6 }}>
          <label htmlFor="ue-out">Output</label>
          <textarea id="ue-out" readOnly value={output} spellCheck={false} />
        </div>
      )}
      <p className="privacy-note"><span className="dot" />processed locally</p>
    </div>
  );
}
