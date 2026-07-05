'use client';
import { useEffect, useRef, useState } from 'react';
import { ImageDrop, loadImageFile, canvasToBlob, PreviewModal, type PreviewData } from './imageShared';

export default function ImageRotatorWidget() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('image');
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    const canvas = canvasRef.current; if (!canvas || !img) return;
    const swap = rotation % 180 !== 0;
    const w = img.naturalWidth, h = img.naturalHeight;
    canvas.width = swap ? h : w; canvas.height = swap ? w : h;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -w / 2, -h / 2);
    ctx.restore();
  };
  useEffect(draw, [img, rotation, flipH, flipV]);

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setError(''); setFileName(f.name.replace(/\.[^.]+$/, ''));
    try { setImg(await loadImageFile(f)); setRotation(0); setFlipH(false); setFlipV(false); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
  };
  const save = async () => { if (!canvasRef.current) return; const blob = await canvasToBlob(canvasRef.current, 'image/png'); setPreview({ blob, filename: `${fileName}-rotated.png` }); };

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose an image to rotate or flip" />
      {img && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: 320, borderRadius: 8, border: '1px solid var(--line)' }} />
          </div>
          <div className="btn-row" style={{ flexWrap: 'wrap' }}>
            <button type="button" className="btn" onClick={() => setRotation(r => (r + 270) % 360)}>↺ Left</button>
            <button type="button" className="btn" onClick={() => setRotation(r => (r + 90) % 360)}>↻ Right</button>
            <button type="button" className="btn" aria-pressed={flipH} onClick={() => setFlipH(v => !v)}>⇆ Flip H</button>
            <button type="button" className="btn" aria-pressed={flipV} onClick={() => setFlipV(v => !v)}>⇅ Flip V</button>
          </div>
          <div className="btn-row"><button type="button" className="btn btn-primary" onClick={save}>Preview &amp; Download →</button></div>
        </>
      )}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }}>✗ {error}</p>}
      <p className="privacy-note"><span className="dot" />rotation and flips render live on a local canvas</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
