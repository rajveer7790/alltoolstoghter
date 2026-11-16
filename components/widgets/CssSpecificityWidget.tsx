'use client';
import { useState } from 'react';

import { selectorSpecificity } from '@/lib/calc/specificity';

const EXAMPLES = ['#nav .item a:hover', 'div.card > p::first-line', 'ul li.active', '[type="checkbox"]:checked', '.btn.btn-primary'];

export default function CssSpecificityWidget() {
  const [selector, setSelector] = useState('#nav .item a:hover');
  const { a, b, c, error } = selectorSpecificity(selector);
  const score = error ? '—' : `${a},${b},${c}`;

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="css-sel">CSS selector</label>
        <input id="css-sel" type="text" value={selector} onChange={e => setSelector(e.target.value)}
          placeholder="e.g. #nav .item a:hover" style={{ fontFamily: 'var(--mono)', fontSize: 15 }} spellCheck={false} />
      </div>

      <div className="readout" style={{ marginTop: 16 }} aria-live="polite">
        <div className="readout-main" style={{ fontSize: 30, fontFamily: 'var(--mono)' }}>
          <span className="rlabel">specificity</span>
          {score}
        </div>
        <div className="readout-rows">
          <div className="readout-row"><span className="k">IDs (a)</span><span className="v" style={{ color: a > 0 ? '#F87171' : undefined }}>{a}</span></div>
          <div className="readout-row"><span className="k">Classes, attrs, pseudo-classes (b)</span><span className="v">{b}</span></div>
          <div className="readout-row"><span className="k">Elements, pseudo-elements (c)</span><span className="v">{c}</span></div>
        </div>
      </div>

      {error && <p role="alert">{error}</p>}

      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Try an example</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {EXAMPLES.map(ex => (
            <button key={ex} type="button" onClick={() => setSelector(ex)}
              style={{ fontFamily: 'var(--mono)', fontSize: 12, padding: '5px 10px', borderRadius: 6, background: 'var(--card)', border: '1px solid var(--line)', cursor: 'pointer', color: 'var(--ink-2)' }}>
              {ex}
            </button>
          ))}
        </div>
      </div>

      <p className="privacy-note"><span className="dot" />parsed locally — nothing leaves your browser</p>
    </div>
  );
}
