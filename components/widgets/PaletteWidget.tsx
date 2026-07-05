'use client';
import { useMemo, useState } from 'react';

function hexToHsl(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  let r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b); let hue = 0; const l = (max + min) / 2;
  const d = max - min; const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) { if (max === r) hue = ((g - b) / d) % 6; else if (max === g) hue = (b - r) / d + 2; else hue = (r - g) / d + 4; hue = (hue * 60 + 360) % 360; }
  return [hue, s * 100, l * 100];
}
function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
}

export default function PaletteWidget() {
  const [base, setBase] = useState('#0B5FFF');
  const [mode, setMode] = useState<'shades' | 'complementary' | 'analogous' | 'triadic'>('shades');
  const [copied, setCopied] = useState('');
  const colors = useMemo(() => {
    const hsl = hexToHsl(base); if (!hsl) return [];
    const [h, s, l] = hsl;
    if (mode === 'shades') return [90, 75, 60, 50, 40, 25, 15].map(L => hslToHex(h, s, L));
    if (mode === 'complementary') return [base, hslToHex((h + 180) % 360, s, l)];
    if (mode === 'analogous') return [-30, -15, 0, 15, 30].map(d => hslToHex((h + d + 360) % 360, s, l));
    return [0, 120, 240].map(d => hslToHex((h + d) % 360, s, l));
  }, [base, mode]);
  const copy = async (c: string) => { try { await navigator.clipboard.writeText(c); setCopied(c); setTimeout(() => setCopied(''), 1200); } catch {} };

  return (
    <div className="tool-card">
      <div className="field-grid">
        <div className="field"><label htmlFor="pal-base">Base color</label>
          <input id="pal-base" type="color" value={base} onChange={e => setBase(e.target.value)} style={{ height: 42, padding: 4 }} /></div>
        <div className="field"><label htmlFor="pal-mode">Scheme</label>
          <select id="pal-mode" value={mode} onChange={e => setMode(e.target.value as any)}>
            <option value="shades">Shades & tints</option>
            <option value="complementary">Complementary</option>
            <option value="analogous">Analogous</option>
            <option value="triadic">Triadic</option>
          </select></div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        {colors.map((c, i) => (
          <button key={i} type="button" onClick={() => copy(c)} title="Click to copy"
            style={{ flex: '1 1 80px', minWidth: 70, border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', background: '#fff', padding: 0 }}>
            <span style={{ display: 'block', height: 56, background: c }} />
            <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 11, padding: '6px 4px', color: 'var(--ink-2)' }}>
              {copied === c ? 'copied!' : c.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
      <p className="privacy-note"><span className="dot" />click any swatch to copy its hex</p>
    </div>
  );
}
