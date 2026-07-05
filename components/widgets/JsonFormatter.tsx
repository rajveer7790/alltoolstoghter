'use client';
import { useState } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('{\n  "hello": "world",\n  "list": [1, 2, 3]\n}');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const run = (minify: boolean) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setStatus({ ok: true, msg: minify ? 'Valid JSON — minified.' : 'Valid JSON — formatted.' });
    } catch (e) {
      setOutput('');
      setStatus({ ok: false, msg: e instanceof Error ? e.message : 'Invalid JSON.' });
    }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="jf-in">JSON input</label>
        <textarea id="jf-in" style={{ minHeight: 170 }} value={input} onChange={e => setInput(e.target.value)} spellCheck={false} />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={() => run(false)}>Format</button>
        <button type="button" className="btn" onClick={() => run(true)}>Minify</button>
        <button type="button" className="btn" onClick={copy} disabled={!output}>{copied ? 'Copied ✓' : 'Copy output'}</button>
      </div>
      {status && (
        <p aria-live="polite" style={{
          fontFamily: 'var(--mono)', fontSize: 13, marginTop: 12,
          color: status.ok ? '#16A34A' : '#DC2626' }}>
          {status.ok ? '✓ ' : '✗ '}{status.msg}
        </p>
      )}
      {output && (
        <div className="field" style={{ marginTop: 6 }}>
          <label htmlFor="jf-out">Output</label>
          <textarea id="jf-out" style={{ minHeight: 170 }} readOnly value={output} spellCheck={false} />
        </div>
      )}
      <p className="privacy-note"><span className="dot" />parsed locally — your JSON never leaves your browser</p>
    </div>
  );
}
