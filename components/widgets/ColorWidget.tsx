'use client';
import { useMemo, useState } from 'react';

function hexToRgb(hex: string): [number, number, number] | null {
  let h = hex.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map(c => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0; const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60); if (h < 0) h += 360;
  }
  return [h, Math.round(s * 100), Math.round(l * 100)];
}

export default function ColorWidget() {
  const [hex, setHex] = useState('#0B5FFF');
  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(...rgb) : null), [rgb]);
  const valid = !!rgb;
  return (
    <div className="tool-card">
      <div className="field-grid">
        <div className="field">
          <label htmlFor="cw-hex">HEX color</label>
          <input id="cw-hex" type="text" value={hex} onChange={e => setHex(e.target.value)}
            placeholder="#1D4ED8 or #FFF" spellCheck={false} />
        </div>
        <div className="field">
          <label htmlFor="cw-pick">Or pick</label>
          <input id="cw-pick" type="color" value={valid ? '#' + rgb!.map(c => c.toString(16).padStart(2, '0')).join('') : '#000000'}
            onChange={e => setHex(e.target.value)} style={{ height: 42, padding: 4 }} />
        </div>
      </div>
      <div className="readout" style={{ marginTop: 16 }} aria-live="polite">
        {valid ? (
          <>
            <div className="readout-main" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 44, height: 44, borderRadius: 8, background: `rgb(${rgb!.join(',')})`, border: '1px solid rgba(255,255,255,.25)', flex: 'none' }} />
              <span style={{ fontSize: 20 }}>{'#' + rgb!.map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase()}</span>
            </div>
            <div className="readout-rows">
              <div className="readout-row"><span className="k">RGB</span><span className="v">rgb({rgb!.join(', ')})</span></div>
              <div className="readout-row"><span className="k">HSL</span><span className="v">hsl({hsl![0]}, {hsl![1]}%, {hsl![2]}%)</span></div>
            </div>
          </>
        ) : (
          <div className="readout-main"><span className="rlabel">waiting</span>Enter a valid HEX color</div>
        )}
      </div>
    </div>
  );
}
