'use client';
import { useState } from 'react';
import { ImageDrop, loadImageFile, canvasToBlob, PreviewModal, type PreviewData, formatBytes } from './imageShared';
import BeforeAfterPreview from '../BeforeAfterPreview';

export default function ImageCompressorWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');
  const [result, setResult] = useState<{ url: string; size: number; blob: Blob } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const compress = async (i: HTMLImageElement, q: number, fmt: string) => {
    setBusy(true); setError('');
    try {
      const canvas = document.createElement('canvas');
      canvas.width = i.naturalWidth; canvas.height = i.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      if (fmt === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(i, 0, 0);
      const blob = await canvasToBlob(canvas, fmt, q / 100);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ url: URL.createObjectURL(blob), size: blob.size, blob });
      setPreview(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Compression failed.'); }
    setBusy(false);
  };

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setFile(f); setError('');
    try { const i = await loadImageFile(f); setImg(i); compress(i, quality, format); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
  };

  const reduction = result && file ? Math.round((1 - result.size / file.size) * 100) : 0;
  const ext = format === 'image/webp' ? 'webp' : 'jpg';

  const openPreview = () => {
    if (!result || !file) return;
    setPreview({ blob: result.blob, filename: `${file.name.replace(/\.[^.]+$/, '')}-compressed.${ext}` });
  };

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose an image to compress" />
      <div className="field-grid" style={{ marginTop: 14 }}>
        <div className="field"><label htmlFor="cp-q">Quality: {quality}%</label>
          <input id="cp-q" type="range" min={10} max={95} value={quality} onChange={e => { setQuality(+e.target.value); if (img) compress(img, +e.target.value, format); }} /></div>
        <div className="field"><label htmlFor="cp-fmt">Output format</label>
          <select id="cp-fmt" value={format} onChange={e => { setFormat(e.target.value as any); if (img) compress(img, quality, e.target.value); }}>
            <option value="image/jpeg">JPG</option><option value="image/webp">WebP (smaller)</option>
          </select></div>
      </div>
      {busy && <p style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 12 }}>Compressing…</p>}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 12 }}>✗ {error}</p>}

      {img && result && file && (
        <BeforeAfterPreview
          originalUrl={img.src}
          resultUrl={result.url}
          originalLabel="Original"
          resultLabel={`Compressed (${ext.toUpperCase()})`}
          stats={[
            { label: 'Original', value: formatBytes(file.size) },
            { label: 'Compressed', value: formatBytes(result.size) },
            { label: 'Reduction', value: reduction > 0 ? `${reduction}% smaller` : 'no reduction' },
          ]}
        />
      )}

      {result && (
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={openPreview}>
            Preview &amp; Download {ext.toUpperCase()} →
          </button>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />re-encoded locally — compare before/after, then preview before download</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}