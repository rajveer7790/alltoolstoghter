'use client';
import { useState } from 'react';

export default function BoxShadowWidget() {
  const [x, setX] = useState(0), [y, setY] = useState(10), [blur, setBlur] = useState(25), [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('#16181D'), [opacity, setOpacity] = useState(25), [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);
  const rgba = (() => { const h = color.replace('#', ''); const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16); return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`; })();
  const shadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
  const css = `box-shadow: ${shadow};`;
  const copy = async () => { try { await navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };
  const Slider = ({ id, label, val, set, min, max }: any) => (
    <div className="field"><label htmlFor={id}>{label}: {val}px</label>
      <input id={id} type="range" min={min} max={max} value={val} onChange={e => set(parseInt(e.target.value, 10))} /></div>
  );

  return (
    <div className="tool-card">
      <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0', marginBottom: 14 }}>
        <div style={{ width: 120, height: 120, borderRadius: 14, background: '#fff', boxShadow: shadow }} aria-label="Shadow preview" />
      </div>
      <div className="field-grid">
        <Slider id="bs-x" label="X offset" val={x} set={setX} min={-50} max={50} />
        <Slider id="bs-y" label="Y offset" val={y} set={setY} min={-50} max={50} />
        <Slider id="bs-blur" label="Blur" val={blur} set={setBlur} min={0} max={100} />
        <Slider id="bs-spread" label="Spread" val={spread} set={setSpread} min={-50} max={50} />
        <div className="field"><label htmlFor="bs-color">Color</label>
          <input id="bs-color" type="color" value={color} onChange={e => setColor(e.target.value)} style={{ height: 42, padding: 4 }} /></div>
        <div className="field"><label htmlFor="bs-op">Opacity: {opacity}%</label>
          <input id="bs-op" type="range" min={0} max={100} value={opacity} onChange={e => setOpacity(parseInt(e.target.value, 10))} /></div>
      </div>
      <div className="pills" style={{ marginTop: 12 }}>
        <button type="button" className="pill" aria-pressed={inset} onClick={() => setInset(!inset)}>Inset</button>
      </div>
      <div className="readout" style={{ marginTop: 14 }}>
        <div className="readout-main" style={{ fontSize: 13.5, wordBreak: 'break-all' }}><span className="rlabel">css</span>{css}</div>
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy CSS'}</button></div>
    </div>
  );
}
