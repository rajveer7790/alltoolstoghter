'use client';
import { useEffect, useRef, useState } from 'react';
import { ImageDrop, loadImageFile, canvasToBlob, PreviewModal, type PreviewData } from './imageShared';
import BeforeAfterPreview from '../BeforeAfterPreview';

type Rect = { x: number; y: number; w: number; h: number };

export default function ImageCropperWidget() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('image');
  const [disp, setDisp] = useState({ w: 0, h: 0, scale: 1 });
  const [rect, setRect] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const [aspect, setAspect] = useState(0); // 0 = free
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const drag = useRef<{ mode: 'move' | 'resize'; sx: number; sy: number; orig: Rect } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setError(''); setFileName(f.name.replace(/\.[^.]+$/, ''));
    try {
      const i = await loadImageFile(f); setImg(i);
      const maxW = 560; const scale = Math.min(1, maxW / i.naturalWidth);
      const w = i.naturalWidth * scale, h = i.naturalHeight * scale;
      setDisp({ w, h, scale });
      setRect({ x: w * 0.15, y: h * 0.15, w: w * 0.7, h: h * 0.7 });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
  };

  const clamp = (r: Rect): Rect => {
    let { x, y, w, h } = r;
    w = Math.max(20, w); h = Math.max(20, h);
    if (aspect) h = w / aspect;
    x = Math.max(0, Math.min(x, disp.w - w));
    y = Math.max(0, Math.min(y, disp.h - h));
    if (x + w > disp.w) w = disp.w - x;
    if (y + h > disp.h) h = aspect ? w / aspect : disp.h - y;
    return { x, y, w, h };
  };

  const onDown = (e: React.PointerEvent, mode: 'move' | 'resize') => {
    e.preventDefault(); e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { mode, sx: e.clientX, sy: e.clientY, orig: { ...rect } };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.sx, dy = e.clientY - drag.current.sy;
    const o = drag.current.orig;
    if (drag.current.mode === 'move') setRect(clamp({ ...o, x: o.x + dx, y: o.y + dy }));
    else setRect(clamp({ ...o, w: o.w + dx, h: aspect ? (o.w + dx) / aspect : o.h + dy }));
  };
  const onUp = () => { drag.current = null; };
  useEffect(() => { if (img) setRect(r => clamp(r)); /* eslint-disable-next-line */ }, [aspect]);

  const cropDownload = async () => {
    if (!img) return;
    const s = disp.scale;
    const sx = rect.x / s, sy = rect.y / s, sw = rect.w / s, sh = rect.h / s;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(sw); canvas.height = Math.round(sh);
    canvas.getContext('2d')!.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    const blob = await canvasToBlob(canvas, 'image/png');
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(URL.createObjectURL(blob));
    setPreview({ blob, filename: `${fileName}-cropped.png` });
  };

  return (
    <div className="tool-card">
      {!img && <ImageDrop onFiles={pick} label="Choose an image to crop" />}
      {img && (
        <>
          <div className="pills" style={{ marginBottom: 12 }}>
            {[['Free', 0], ['1:1', 1], ['4:3', 4 / 3], ['16:9', 16 / 9], ['3:2', 3 / 2]].map(([label, a]) => (
              <button key={label as string} type="button" className="pill" aria-pressed={aspect === a} onClick={() => setAspect(a as number)}>{label}</button>
            ))}
          </div>
          <div ref={wrapRef} style={{ position: 'relative', width: disp.w, maxWidth: '100%', margin: '0 auto', touchAction: 'none', userSelect: 'none' }}
            onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
            <img src={img.src} alt="To crop" style={{ width: disp.w, height: disp.h, display: 'block', borderRadius: 6 }} draggable={false} />
            <div style={{ position: 'absolute', inset: 0, boxShadow: `0 0 0 9999px rgba(0,0,0,0.45)`, clipPath: `polygon(0 0, 0 100%, ${rect.x}px 100%, ${rect.x}px ${rect.y}px, ${rect.x + rect.w}px ${rect.y}px, ${rect.x + rect.w}px ${rect.y + rect.h}px, ${rect.x}px ${rect.y + rect.h}px, ${rect.x}px 100%, 100% 100%, 100% 0)`, pointerEvents: 'none' }} />
            <div onPointerDown={e => onDown(e, 'move')}
              style={{ position: 'absolute', left: rect.x, top: rect.y, width: rect.w, height: rect.h, border: '2px solid #fff', boxSizing: 'border-box', cursor: 'move' }}>
              <div onPointerDown={e => onDown(e, 'resize')}
                style={{ position: 'absolute', right: -8, bottom: -8, width: 16, height: 16, background: 'var(--signal)', border: '2px solid #fff', borderRadius: 3, cursor: 'nwse-resize' }} />
            </div>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 8, textAlign: 'center' }}>
            Crop: {Math.round(rect.w / disp.scale)} × {Math.round(rect.h / disp.scale)} px — drag to move, corner to resize
          </p>
          <div className="btn-row"><button type="button" className="btn btn-primary" onClick={cropDownload}>Crop &amp; Preview →</button></div>
          {resultUrl && img && (
            <BeforeAfterPreview
              originalUrl={img.src}
              resultUrl={resultUrl}
              originalLabel="Original"
              resultLabel="Cropped"
              stats={[{ label: 'Crop size', value: `${Math.round(rect.w / disp.scale)} × ${Math.round(rect.h / disp.scale)} px` }]}
            />
          )}
        </>
      )}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }}>✗ {error}</p>}
      <p className="privacy-note"><span className="dot" />cropped at full resolution, locally</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
