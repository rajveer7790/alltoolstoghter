'use client';
import { useMemo, useState } from 'react';

export default function FindReplaceWidget() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [ci, setCi] = useState(false);
  const [useRe, setUseRe] = useState(false);
  const [copied, setCopied] = useState(false);

  const { output, count, err } = useMemo(() => {
    if (!find) return { output: text, count: 0, err: '' };
    try {
      const flags = 'g' + (ci ? 'i' : '');
      const re = useRe ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      const matches = text.match(re);
      return { output: text.replace(re, replace), count: matches ? matches.length : 0, err: '' };
    } catch (e) {
      return { output: text, count: 0, err: e instanceof Error ? e.message : 'Invalid pattern' };
    }
  }, [text, find, replace, ci, useRe]);

  const copy = async () => { try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="fr-text">Text</label>
        <textarea id="fr-text" value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text…" />
      </div>
      <div className="field-grid" style={{ marginTop: 12 }}>
        <div className="field"><label htmlFor="fr-find">Find</label>
          <input id="fr-find" type="text" value={find} onChange={e => setFind(e.target.value)} /></div>
        <div className="field"><label htmlFor="fr-rep">Replace with</label>
          <input id="fr-rep" type="text" value={replace} onChange={e => setReplace(e.target.value)} /></div>
      </div>
      <div className="pills" style={{ margin: '12px 0' }}>
        <button type="button" className="pill" aria-pressed={ci} onClick={() => setCi(!ci)}>Ignore case</button>
        <button type="button" className="pill" aria-pressed={useRe} onClick={() => setUseRe(!useRe)}>Regex</button>
      </div>
      {err && <p style={{ color: '#DC2626', fontSize: 13 }}>✗ {err}</p>}
      <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-2)' }} aria-live="polite">{count} replacement{count === 1 ? '' : 's'}</p>
      <div className="field" style={{ marginTop: 6 }}>
        <label htmlFor="fr-out">Result</label>
        <textarea id="fr-out" readOnly value={output} spellCheck={false} />
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={copy} disabled={!output}>{copied ? 'Copied ✓' : 'Copy result'}</button></div>
      <p className="privacy-note"><span className="dot" />processed locally</p>
    </div>
  );
}
