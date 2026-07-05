'use client';
import { useRef, useState } from 'react';
import { ImageDrop, loadImageFile, rgbToHex, rgbToHsl } from './imageShared';

export default function ImageColorPickerWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [picked, setPicked] = useState<{ hex: string; rgb: string; hsl: string } | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setError('');
    try {
      const img = await loadImageFile(f); imgRef.current = img;
      const canvas = canvasRef.current!; const maxW = 560;
      const scale = Math.min(1, maxW / img.naturalWidth);
      canvas.width = img.naturalWidth * scale; canvas.height = img.naturalHeight * scale;
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
  };
  const onPick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!; const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    const d = canvas.getContext('2d')!.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(d[0], d[1], d[2]);
    setPicked({ hex, rgb: `rgb(${d[0]}, ${d[1]}, ${d[2]})`, hsl: rgbToHsl(d[0], d[1], d[2]) });
    setHistory(h => [hex, ...h.filter(c => c !== hex)].slice(0, 8));
  };
  const copy = async (text: string, which: string) => { try { await navigator.clipboard.writeText(text); setCopied(which); setTimeout(() => setCopied(''), 1200); } catch {} };

  return (
    <div className="tool-card">
      {!imgRef.current && <ImageDrop onFiles={pick} label="Choose an image to pick colors from" />}
      <canvas ref={canvasRef} onClick={onPick} style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid var(--line)', cursor: 'crosshair', display: imgRef.current ? 'block' : 'none', marginTop: imgRef.current ? 0 : 12 }} />
      {imgRef.current && <p style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 6 }}>Click anywhere on the image to sample a color.</p>}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }}>✗ {error}</p>}
      {picked && (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 44, height: 44, borderRadius: 8, background: picked.hex, border: '1px solid rgba(255,255,255,0.2)' }} />
            <div className="readout-main" style={{ margin: 0 }}><span className="rlabel">picked</span>{picked.hex}</div>
          </div>
          <div className="readout-rows">
            <div className="readout-row"><span className="k">RGB</span><span className="v" style={{ cursor: 'pointer' }} onClick={() => copy(picked.rgb, 'rgb')}>{copied === 'rgb' ? 'copied!' : picked.rgb}</span></div>
            <div className="readout-row"><span className="k">HSL</span><span className="v" style={{ cursor: 'pointer' }} onClick={() => copy(picked.hsl, 'hsl')}>{copied === 'hsl' ? 'copied!' : picked.hsl}</span></div>
          </div>
        </div>
      )}
      {history.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          {history.map(c => (
            <button key={c} type="button" title={`Copy ${c}`} onClick={() => copy(c, c)} style={{ width: 40, height: 32, borderRadius: 6, background: c, border: '1px solid var(--line)', cursor: 'pointer', fontSize: 9, color: '#fff', textShadow: '0 0 2px #000' }}>{copied === c ? '✓' : ''}</button>
          ))}
        </div>
      )}
      <p className="privacy-note"><span className="dot" />sampled locally from the image pixels</p>
    </div>
  );
}
