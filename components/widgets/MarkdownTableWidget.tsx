'use client';
import { useMemo, useState } from 'react';

/** Markdown table generator: editable grid → MD table. */
export default function MarkdownTableWidget() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [cells, setCells] = useState<Record<string, string>>({ '0-0': 'Name', '0-1': 'Role', '0-2': 'City' });
  const [copied, setCopied] = useState(false);

  const get = (r: number, c: number) => cells[`${r}-${c}`] ?? '';
  const set = (r: number, c: number, v: string) => setCells(p => ({ ...p, [`${r}-${c}`]: v }));

  const md = useMemo(() => {
    const R = Math.max(2, Math.min(20, rows)), C = Math.max(1, Math.min(10, cols));
    // column widths for pretty alignment
    const w: number[] = [];
    for (let c = 0; c < C; c++) w.push(Math.max(3, ...Array.from({ length: R }, (_, r) => get(r, c).length)));
    const pad = (s: string, n: number) => s + ' '.repeat(Math.max(0, n - s.length));
    const sep = (n: number) => align === 'center' ? ':' + '-'.repeat(Math.max(1, n - 2)) + ':' : align === 'right' ? '-'.repeat(Math.max(1, n - 1)) + ':' : '-'.repeat(n);
    const lines: string[] = [];
    lines.push('| ' + Array.from({ length: C }, (_, c) => pad(get(0, c) || `Col ${c + 1}`, w[c])).join(' | ') + ' |');
    lines.push('| ' + Array.from({ length: C }, (_, c) => sep(w[c])).join(' | ') + ' |');
    for (let r = 1; r < R; r++) lines.push('| ' + Array.from({ length: C }, (_, c) => pad(get(r, c), w[c])).join(' | ') + ' |');
    return lines.join('\n');
  }, [rows, cols, align, cells]);

  const copy = async () => { try { await navigator.clipboard.writeText(md); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  const R = Math.max(2, Math.min(20, rows)), C = Math.max(1, Math.min(10, cols));
  return (
    <div className="tool-card">
      <div className="field-grid">
        <div className="field"><label htmlFor="mt-r">Rows (incl. header)</label>
          <input id="mt-r" type="number" min={2} max={20} value={rows} onChange={e => setRows(parseInt(e.target.value) || 2)} /></div>
        <div className="field"><label htmlFor="mt-c">Columns</label>
          <input id="mt-c" type="number" min={1} max={10} value={cols} onChange={e => setCols(parseInt(e.target.value) || 1)} /></div>
        <div className="field"><label htmlFor="mt-a">Alignment</label>
          <select id="mt-a" value={align} onChange={e => setAlign(e.target.value as any)}>
            <option value="left">Left</option><option value="center">Center</option><option value="right">Right</option>
          </select></div>
      </div>

      <div style={{ overflowX: 'auto', marginTop: 14 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {Array.from({ length: R }, (_, r) => (
              <tr key={r}>
                {Array.from({ length: C }, (_, c) => (
                  <td key={c} style={{ border: '1px solid var(--line)', padding: 3 }}>
                    <input type="text" value={get(r, c)} onChange={e => set(r, c, e.target.value)}
                      placeholder={r === 0 ? `Header ${c + 1}` : ''} aria-label={`Row ${r + 1} column ${c + 1}`}
                      style={{ border: 0, outline: 0, width: '100%', minWidth: 70, font: 'inherit', fontSize: 13.5, padding: '6px 8px', fontWeight: r === 0 ? 700 : 400, background: r === 0 ? 'var(--paper)' : '#fff' }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="field" style={{ marginTop: 14 }}><label htmlFor="mt-out">Markdown</label>
        <textarea id="mt-out" readOnly value={md} style={{ minHeight: 140 }} /></div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy Markdown'}</button>
      </div>
      <p className="privacy-note"><span className="dot" />generated locally — paste into GitHub, Notion, or any Markdown editor</p>
    </div>
  );
}
