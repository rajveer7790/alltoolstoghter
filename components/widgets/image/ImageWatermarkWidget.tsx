'use client';
import { useEffect, useRef, useState } from 'react';
import { ImageDrop, loadImageFile, canvasToBlob, PreviewModal, type PreviewData } from './imageShared';

const POS: Record<string, [number, number, string]> = {
  'bottom-right': [1, 1, 'right'], 'bottom-left': [0, 1, 'left'], 'bottom-center': [0.5, 1, 'center'],
  'center': [0.5, 0.5, 'center'], 'top-right': [1, 0, 'right'], 'top-left': [0, 0, 'left'],
};

export default function ImageWatermarkWidget() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('image');
  const [text, setText] = useState('© All Tools Together');
  const [position, setPosition] = useState('bottom-right');
  const [opacity, setOpacity] = useState(60);
  const [size, setSize] = useState(5);
  const [color, setColor] = useState('#ffffff');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    const canvas = canvasRef.current; if (!canvas || !img) return;
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const fontPx = Math.max(12, Math.round(img.naturalWidth * size / 100));
    ctx.font = `bold ${fontPx}px system-ui, sans-serif`;
    ctx.globalAlpha = opacity / 100; ctx.fillStyle = color;
    const [fx, fy, align] = POS[position];
    ctx.textAlign = align as CanvasTextAlign;
    ctx.textBaseline = fy === 1 ? 'bottom' : fy === 0 ? 'top' : 'middle';
    const pad = fontPx * 0.5;
    const x = fx === 0 ? pad : fx === 1 ? canvas.width - pad : canvas.width / 2;
    const y = fy === 0 ? pad : fy === 1 ? canvas.height - pad : canvas.height / 2;
    ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = fontPx * 0.1;
    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  };
  useEffect(draw, [img, text, position, opacity, size, color]);

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setError(''); setFileName(f.name.replace(/\.[^.]+$/, ''));
    try { setImg(await loadImageFile(f)); } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
  };
  const save = async () => { if (!canvasRef.current) return; setPreview({ blob: await canvasToBlob(canvasRef.current, 'image/png'), filename: `${fileName}-watermarked.png` }); };

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose an image to watermark" />
      {img && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: 320, borderRadius: 8, border: '1px solid var(--line)' }} />
          </div>
          <div className="field" style={{ marginTop: 12 }}><label htmlFor="wm-t">Watermark text</label><input id="wm-t" type="text" value={text} onChange={e => setText(e.target.value)} /></div>
          <div className="field-grid">
            <div className="field"><label htmlFor="wm-p">Position</label>
              <select id="wm-p" value={position} onChange={e => setPosition(e.target.value)}>{Object.keys(POS).map(p => <option key={p} value={p}>{p.replace('-', ' ')}</option>)}</select></div>
            <div className="field"><label htmlFor="wm-c">Color</label><input id="wm-c" type="color" value={color} onChange={e => setColor(e.target.value)} style={{ height: 42, padding: 4 }} /></div>
            <div className="field"><label htmlFor="wm-o">Opacity: {opacity}%</label><input id="wm-o" type="range" min={10} max={100} value={opacity} onChange={e => setOpacity(+e.target.value)} /></div>
            <div className="field"><label htmlFor="wm-s">Size: {size}%</label><input id="wm-s" type="range" min={2} max={15} value={size} onChange={e => setSize(+e.target.value)} /></div>
          </div>
          <div className="btn-row"><button type="button" className="btn btn-primary" onClick={save}>Preview &amp; Download →</button></div>
        </>
      )}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }}>✗ {error}</p>}
      <p className="privacy-note"><span className="dot" />watermark is rendered locally onto the image</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
