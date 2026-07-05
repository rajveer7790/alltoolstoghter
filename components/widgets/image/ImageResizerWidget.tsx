'use client';
import { useState } from 'react';
import { ImageDrop, loadImageFile, canvasToBlob, PreviewModal, type PreviewData, formatBytes } from './imageShared';
import BeforeAfterPreview from '../BeforeAfterPreview';

export default function ImageResizerWidget() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('image');
  const [fileSize, setFileSize] = useState(0);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [lock, setLock] = useState(true);
  const [pct, setPct] = useState(100);
  const [mode, setMode] = useState<'px' | 'pct'>('px');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultDims, setResultDims] = useState('');
  const ratio = img ? img.naturalWidth / img.naturalHeight : 1;

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return;
    setError(''); setFileName(f.name.replace(/\.[^.]+$/, '')); setFileSize(f.size);
    setPreview(null); setResultUrl(null);
    try { const i = await loadImageFile(f); setImg(i); setW(i.naturalWidth); setH(i.naturalHeight); setPct(100); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
  };
  const onW = (val: number) => { setW(val); if (lock) setH(Math.round(val / ratio)); };
  const onH = (val: number) => { setH(val); if (lock) setW(Math.round(val * ratio)); };

  const resize = async () => {
    if (!img) { setError('Choose an image first.'); return; }
    setBusy(true); setError('');
    try {
      const tw = mode === 'pct' ? Math.round(img.naturalWidth * pct / 100) : w;
      const th = mode === 'pct' ? Math.round(img.naturalHeight * pct / 100) : h;
      if (tw < 1 || th < 1) { setError('Dimensions must be at least 1px.'); setBusy(false); return; }
      const canvas = document.createElement('canvas');
      canvas.width = tw; canvas.height = th;
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, tw, th);
      const blob = await canvasToBlob(canvas, 'image/png');
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultDims(`${tw} × ${th}`);
      setPreview({ blob, filename: `${fileName}-${tw}x${th}.png` }); // opens preview modal
    } catch (e) { setError(e instanceof Error ? e.message : 'Resize failed.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose an image to resize" />
      {img && (
        <>
          <p style={{ fontSize: 13.5, marginTop: 12, color: 'var(--ink-2)' }}>Original: <strong>{img.naturalWidth} × {img.naturalHeight}</strong> px</p>
          <div className="pills" style={{ marginTop: 8 }}>
            <button type="button" className="pill" aria-pressed={mode === 'px'} onClick={() => setMode('px')}>By pixels</button>
            <button type="button" className="pill" aria-pressed={mode === 'pct'} onClick={() => setMode('pct')}>By percent</button>
          </div>
          {mode === 'px' ? (
            <>
              <div className="field-grid" style={{ marginTop: 12 }}>
                <div className="field"><label htmlFor="rs-w">Width (px)</label><input id="rs-w" type="number" min={1} value={w} onChange={e => onW(parseInt(e.target.value, 10) || 0)} /></div>
                <div className="field"><label htmlFor="rs-h">Height (px)</label><input id="rs-h" type="number" min={1} value={h} onChange={e => onH(parseInt(e.target.value, 10) || 0)} /></div>
              </div>
              <div className="pills"><button type="button" className="pill" aria-pressed={lock} onClick={() => setLock(!lock)}>🔒 Lock aspect ratio</button></div>
            </>
          ) : (
            <div className="field" style={{ marginTop: 12 }}><label htmlFor="rs-p">Scale: {pct}% → {Math.round(img.naturalWidth * pct / 100)} × {Math.round(img.naturalHeight * pct / 100)}</label>
              <input id="rs-p" type="range" min={5} max={200} value={pct} onChange={e => setPct(parseInt(e.target.value, 10))} /></div>
          )}
        </>
      )}
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={resize} disabled={busy || !img}>Resize &amp; Preview →</button></div>
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }}>✗ {error}</p>}

      {img && resultUrl && (
        <BeforeAfterPreview
          originalUrl={img.src}
          resultUrl={resultUrl}
          stats={[
            { label: 'Original', value: `${img.naturalWidth}×${img.naturalHeight} · ${formatBytes(fileSize)}` },
            { label: 'Resized', value: `${resultDims} px` },
          ]}
        />
      )}

      <p className="privacy-note"><span className="dot" />high-quality resampling, preview before download</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}