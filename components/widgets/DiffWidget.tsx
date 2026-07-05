'use client';
import { useMemo, useState } from 'react';

/** Line-level LCS diff. */
function diffLines(a: string[], b: string[]) {
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: { type: 'same' | 'add' | 'del'; text: string }[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ type: 'same', text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ type: 'del', text: a[i] }); i++; }
    else { out.push({ type: 'add', text: b[j] }); j++; }
  }
  while (i < n) out.push({ type: 'del', text: a[i++] });
  while (j < m) out.push({ type: 'add', text: b[j++] });
  return out;
}

export default function DiffWidget() {
  const [left, setLeft] = useState('line one\nline two\nline three');
  const [right, setRight] = useState('line one\nline 2\nline three\nline four');
  const diff = useMemo(() => diffLines(left.split('\n'), right.split('\n')), [left, right]);
  const adds = diff.filter(d => d.type === 'add').length;
  const dels = diff.filter(d => d.type === 'del').length;

  return (
    <div className="tool-card">
      <div className="field-grid">
        <div className="field"><label htmlFor="df-l">Original</label>
          <textarea id="df-l" value={left} onChange={e => setLeft(e.target.value)} spellCheck={false} style={{ minHeight: 130 }} /></div>
        <div className="field"><label htmlFor="df-r">Changed</label>
          <textarea id="df-r" value={right} onChange={e => setRight(e.target.value)} spellCheck={false} style={{ minHeight: 130 }} /></div>
      </div>
      <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
        <div className="readout-main" style={{ fontSize: 16 }}>
          <span className="rlabel">changes</span>
          <span style={{ color: '#34D399' }}>+{adds}</span> <span style={{ color: '#F87171' }}>−{dels}</span>
        </div>
        <div style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.7, maxHeight: 280, overflow: 'auto' }}>
          {diff.map((d, i) => (
            <div key={i} style={{
              color: d.type === 'add' ? '#34D399' : d.type === 'del' ? '#F87171' : 'var(--readout-dim)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>{d.type === 'add' ? '+ ' : d.type === 'del' ? '− ' : '  '}{d.text || '\u00A0'}</div>
          ))}
        </div>
      </div>
      <p className="privacy-note"><span className="dot" />compared locally</p>
    </div>
  );
}
