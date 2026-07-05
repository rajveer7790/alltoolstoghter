'use client';
import { useState } from 'react';

export default function GradientWidget() {
  const [c1, setC1] = useState('#0B5FFF');
  const [c2, setC2] = useState('#A21CAF');
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);
  const css = `background: linear-gradient(${angle}deg, ${c1}, ${c2});`;
  const copy = async () => { try { await navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      <div style={{ height: 140, borderRadius: 10, marginBottom: 16, background: `linear-gradient(${angle}deg, ${c1}, ${c2})`, border: '1px solid var(--line)' }} aria-label="Gradient preview" />
      <div className="field-grid">
        <div className="field"><label htmlFor="gr-c1">Color 1</label>
          <input id="gr-c1" type="color" value={c1} onChange={e => setC1(e.target.value)} style={{ height: 42, padding: 4 }} /></div>
        <div className="field"><label htmlFor="gr-c2">Color 2</label>
          <input id="gr-c2" type="color" value={c2} onChange={e => setC2(e.target.value)} style={{ height: 42, padding: 4 }} /></div>
        <div className="field"><label htmlFor="gr-ang">Angle: {angle}°</label>
          <input id="gr-ang" type="range" min={0} max={360} value={angle} onChange={e => setAngle(parseInt(e.target.value, 10))} /></div>
      </div>
      <div className="readout" style={{ marginTop: 14 }}>
        <div className="readout-main" style={{ fontSize: 14, wordBreak: 'break-all' }}><span className="rlabel">css</span>{css}</div>
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy CSS'}</button></div>
    </div>
  );
}
