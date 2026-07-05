'use client';
import { useMemo, useState } from 'react';

export default function RegexWidget() {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Contact us at hello@example.com or sales@test.org');

  const result = useMemo(() => {
    if (!pattern) return { ok: true, matches: [] as string[], err: '' };
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const matches = [...text.matchAll(re)].map(m => m[0]).slice(0, 500);
      return { ok: true, matches, err: '' };
    } catch (e) {
      return { ok: false, matches: [], err: e instanceof Error ? e.message : 'Invalid pattern' };
    }
  }, [pattern, flags, text]);

  const toggleFlag = (f: string) => setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f);

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="rx-pat">Regular expression</label>
        <input id="rx-pat" type="text" value={pattern} onChange={e => setPattern(e.target.value)}
          style={{ fontFamily: 'var(--mono)' }} spellCheck={false} />
      </div>
      <div className="pills" style={{ margin: '12px 0' }}>
        {['g', 'i', 'm', 's'].map(f => (
          <button key={f} type="button" className="pill" aria-pressed={flags.includes(f)} onClick={() => toggleFlag(f)}>
            /{f} {f === 'i' ? 'ignore case' : f === 'm' ? 'multiline' : f === 's' ? 'dotall' : 'global'}
          </button>
        ))}
      </div>
      <div className="field">
        <label htmlFor="rx-text">Test string</label>
        <textarea id="rx-text" value={text} onChange={e => setText(e.target.value)} spellCheck={false} />
      </div>
      <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
        {result.ok ? (
          <>
            <div className="readout-main" style={{ fontSize: 22 }}>
              <span className="rlabel">matches</span>{result.matches.length}
            </div>
            {result.matches.length > 0 && (
              <div className="readout-rows">
                {result.matches.slice(0, 12).map((m, i) => (
                  <div className="readout-row" key={i}><span className="k">#{i + 1}</span><span className="v">{m}</span></div>
                ))}
                {result.matches.length > 12 && <div className="readout-row"><span className="k">…</span><span className="v">+{result.matches.length - 12} more</span></div>}
              </div>
            )}
          </>
        ) : (
          <div className="readout-main" style={{ fontSize: 15, color: '#FCA5A5' }}>
            <span className="rlabel">error</span>{result.err}
          </div>
        )}
      </div>
      <p className="privacy-note"><span className="dot" />tested locally in your browser&apos;s regex engine</p>
    </div>
  );
}
