'use client';
import { useEffect, useRef, useState } from 'react';
import PreviewModal, { type PreviewData } from './PreviewModal';

export default function QrCodeWidget() {
  const [text, setText] = useState('https://alltoolstogether.com');
  const [size, setSize] = useState(256);
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [dark, setDark] = useState('#16181D');
  const [light, setLight] = useState('#FFFFFF');
  const [err, setErr] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!text.trim() || !canvasRef.current) return;
      try {
        const QR = (await import('qrcode')).default;
        if (cancelled) return;
        await QR.toCanvas(canvasRef.current, text, { width: size, errorCorrectionLevel: level, margin: 2, color: { dark, light } });
        setErr('');
      } catch (e) { setErr(e instanceof Error ? e.message : 'Could not generate QR code.'); }
    })();
    return () => { cancelled = true; };
  }, [text, size, level, dark, light]);

  const openPreview = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) setPreview({ blob, filename: 'qr-code.png' });
    }, 'image/png');
  };

  return (
    <div className="tool-card">
      <div className="field"><label htmlFor="qr-text">Text or URL</label>
        <textarea id="qr-text" value={text} onChange={e => setText(e.target.value)} style={{ minHeight: 70 }} spellCheck={false} /></div>
      <div className="field-grid">
        <div className="field"><label htmlFor="qr-size">Size: {size}px</label>
          <input id="qr-size" type="range" min={128} max={512} step={32} value={size} onChange={e => setSize(parseInt(e.target.value, 10))} /></div>
        <div className="field"><label htmlFor="qr-ec">Error correction</label>
          <select id="qr-ec" value={level} onChange={e => setLevel(e.target.value as any)}>
            <option value="L">Low (7%)</option><option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option><option value="H">High (30%)</option>
          </select></div>
        <div className="field"><label htmlFor="qr-dark">Foreground</label>
          <input id="qr-dark" type="color" value={dark} onChange={e => setDark(e.target.value)} style={{ height: 42, padding: 4 }} /></div>
        <div className="field"><label htmlFor="qr-light">Background</label>
          <input id="qr-light" type="color" value={light} onChange={e => setLight(e.target.value)} style={{ height: 42, padding: 4 }} /></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        {err ? <p style={{ color: '#DC2626', fontSize: 13.5 }}>✗ {err}</p> : <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />}
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={openPreview} disabled={!!err}>Preview & Download</button></div>
      <p className="privacy-note"><span className="dot" />generated locally — higher error correction survives logos and damage better</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
