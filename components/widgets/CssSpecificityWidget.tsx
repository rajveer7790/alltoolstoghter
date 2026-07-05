'use client';
import { useState } from 'react';

/** Compute CSS specificity as [a, b, c] (IDs, classes/attrs/pseudo-classes, elements/pseudo-elements). */
function computeSpecificity(selector: string): { a: number; b: number; c: number; tokens: { type: string; value: string }[] } {
  let a = 0, b = 0, c = 0;
  const tokens: { type: string; value: string }[] = [];
  // Remove the contents of :not(), :is(), :where() handled specially — but keep simple here.
  // Strip strings and clean
  let s = selector.trim();
  if (!s) return { a, b, c, tokens };

  // :where() contributes 0 — remove its contents entirely
  s = s.replace(/:where\([^)]*\)/g, ' ');

  // IDs: #foo
  s = s.replace(/#[\w-]+/g, (m) => { a++; tokens.push({ type: 'id', value: m }); return ' '; });

  // Pseudo-elements: ::before, ::after, :before (legacy) — count as element (c)
  s = s.replace(/::?(?:before|after|first-line|first-letter|selection|placeholder|marker|backdrop)/g, (m) => { c++; tokens.push({ type: 'pseudo-element', value: m }); return ' '; });

  // Classes: .foo
  s = s.replace(/\.[\w-]+/g, (m) => { b++; tokens.push({ type: 'class', value: m }); return ' '; });

  // Attributes: [type="text"]
  s = s.replace(/\[[^\]]+\]/g, (m) => { b++; tokens.push({ type: 'attribute', value: m }); return ' '; });

  // Pseudo-classes: :hover, :nth-child(2), :not(...)
  s = s.replace(/:[\w-]+(\([^)]*\))?/g, (m) => { b++; tokens.push({ type: 'pseudo-class', value: m }); return ' '; });

  // Elements / type selectors: div, span, a (word boundaries, not universal *)
  s.replace(/[a-zA-Z][\w-]*/g, (m) => { c++; tokens.push({ type: 'element', value: m }); return ' '; });

  return { a, b, c, tokens };
}

const EXAMPLES = ['#nav .item a:hover', 'div.card > p::first-line', 'ul li.active', '[type="checkbox"]:checked', '.btn.btn-primary'];

export default function CssSpecificityWidget() {
  const [selector, setSelector] = useState('#nav .item a:hover');
  const { a, b, c, tokens } = computeSpecificity(selector);
  const score = `${a},${b},${c}`;

  const TYPE_COLORS: Record<string, string> = {
    id: '#DC2626', class: '#0B5FFF', attribute: '#0B5FFF', 'pseudo-class': '#0B5FFF',
    element: '#16A34A', 'pseudo-element': '#16A34A',
  };

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

      {tokens.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Selector breakdown</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tokens.map((t, i) => (
              <span key={i} style={{ fontFamily: 'var(--mono)', fontSize: 13, padding: '4px 9px', borderRadius: 6, background: 'rgba(11,95,255,0.05)', border: `1px solid ${TYPE_COLORS[t.type] ?? 'var(--line)'}33`, color: TYPE_COLORS[t.type] ?? 'var(--ink)' }}>
                {t.value}<span style={{ color: 'var(--ink-3)', marginLeft: 6, fontSize: 11 }}>{t.type}</span>
              </span>
            ))}
          </div>
        </div>
      )}

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
