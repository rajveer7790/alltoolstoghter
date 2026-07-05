'use client';
import { useState } from 'react';
import { ImageDrop, loadImageFile, canvasToBlob, formatBytes } from './imageShared';
import PreviewModal, { type PreviewData } from '../PreviewModal';
import BeforeAfterPreview from '../BeforeAfterPreview';

const TYPES: Record<string, { mime: string; ext: string; lossy: boolean }> = {
  png: { mime: 'image/png', ext: 'png', lossy: false },
  jpeg: { mime: 'image/jpeg', ext: 'jpg', lossy: true },
  webp: { mime: 'image/webp', ext: 'webp', lossy: true },
};

export default function ImageConverterWidget({ to }: { to?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [target, setTarget] = useState(to || 'png');
  const [quality, setQuality] = useState(90);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [pending, setPending] = useState<PreviewData | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const locked = !!to;

  const convert = async (f: File, fmt: string, q: number) => {
    setBusy(true); setError('');
    try {
      const img = await loadImageFile(f);
      if (!originalUrl) setOriginalUrl(img.src);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      const t = TYPES[fmt];
      if (t.mime === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, t.mime, t.lossy ? q / 100 : undefined);
      const name = f.name.replace(/\.[^.]+$/, '') + '.' + t.ext;
      const url = URL.createObjectURL(blob);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(url);
      setResultSize(blob.size);
      setPending({ blob, filename: name });
      setPreview(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Conversion failed.'); }
    setBusy(false);
  };

  const pick = (fs: File[]) => {
    const f = fs[0]; if (!f) return;
    setFile(f);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    convert(f, target, quality);
  };

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose an image to convert" />
      <div className="field-grid" style={{ marginTop: 14 }}>
        {!locked && (
          <div className="field"><label htmlFor="cv-fmt">Convert to</label>
            <select id="cv-fmt" value={target} onChange={e => { setTarget(e.target.value); if (file) convert(file, e.target.value, quality); }}>
              <option value="png">PNG (lossless)</option><option value="jpeg">JPG (smaller)</option><option value="webp">WebP (modern)</option>
            </select></div>
        )}
        {TYPES[target].lossy && (
          <div className="field"><label htmlFor="cv-q">Quality: {quality}%</label>
            <input id="cv-q" type="range" min={10} max={100} value={quality} onChange={e => { setQuality(+e.target.value); if (file) convert(file, target, +e.target.value); }} /></div>
        )}
      </div>
      {busy && <p style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 12 }}>Converting…</p>}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 12 }}>✗ {error}</p>}

      {originalUrl && resultUrl && file && (
        <BeforeAfterPreview
          originalUrl={originalUrl}
          resultUrl={resultUrl}
          originalLabel="Original"
          resultLabel={`Converted (${TYPES[target].ext.toUpperCase()})`}
          stats={[
            { label: 'Original size', value: formatBytes(file.size) },
            { label: 'Converted size', value: formatBytes(resultSize) },
          ]}
        />
      )}

      {pending && (
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={() => setPreview(pending)}>
            Preview &amp; Download {TYPES[target].ext.toUpperCase()} →
          </button>
        </div>
      )}

      <p className="privacy-note"><span className="dot" />converted locally with Canvas — your image is never uploaded</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}