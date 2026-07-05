'use client';
import { useState } from 'react';
import { ImageDrop, loadImageFile, canvasToBlob } from './imageShared';
import PreviewModal, { type PreviewData } from '../PreviewModal';

const SIZES = [16, 32, 48, 64, 180, 192, 512];

export default function FaviconGeneratorWidget() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const render = (i: HTMLImageElement, size: number): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    const s = Math.min(size / i.naturalWidth, size / i.naturalHeight);
    const w = i.naturalWidth * s, h = i.naturalHeight * s;
    ctx.drawImage(i, (size - w) / 2, (size - h) / 2, w, h);
    return canvasToBlob(canvas, 'image/png');
  };

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setError(''); setBusy(true);
    try {
      const i = await loadImageFile(f); setImg(i);
      const pv = await Promise.all(SIZES.map(async size => ({ size, url: URL.createObjectURL(await render(i, size)) })));
      setPreviews(pv);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
    setBusy(false);
  };

  const buildZip = async () => {
    if (!img) return null;
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const files: { filename: string; label: string }[] = [];
    for (const size of SIZES) {
      const blob = await render(img, size);
      const name = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
      zip.file(name, blob);
      files.push({ filename: name, label: `${size}×${size}` });
    }
    const out = await zip.generateAsync({ type: 'blob' });
    return { blob: out, files };
  };

  const openZipPreview = async () => {
    setBusy(true);
    try {
      const zipData = await buildZip();
      if (!zipData) return;
      setPreview({
        blob: zipData.blob,
        filename: 'favicons.zip',
        label: `${SIZES.length} icons (16–512px)`,
      });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not build the zip.'); }
    setBusy(false);
  };

  const snippet = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;
  const copy = async () => { try { await navigator.clipboard.writeText(snippet); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose a square image (512×512 ideal)" />
      {busy && <p style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 12 }}>Generating…</p>}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 12 }}>✗ {error}</p>}
      {previews.length > 0 && (
        <>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', flexWrap: 'wrap', marginTop: 16, justifyContent: 'center' }}>
            {previews.map(p => (
              <div key={p.size} style={{ textAlign: 'center' }}>
                <img src={p.url} alt={`${p.size}px favicon`} width={Math.min(p.size, 64)} height={Math.min(p.size, 64)} style={{ border: '1px solid var(--line)', borderRadius: 4 }} />
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{p.size}px</div>
              </div>
            ))}
          </div>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={openZipPreview} disabled={busy}>Preview &amp; Download .zip</button>
          </div>
          <div className="field" style={{ marginTop: 8 }}><label htmlFor="fv-snip">HTML to paste in &lt;head&gt;</label>
            <textarea id="fv-snip" readOnly value={snippet} style={{ minHeight: 80, fontFamily: 'var(--mono)', fontSize: 12 }} /></div>
          <div className="btn-row"><button type="button" className="btn" onClick={copy}>{copied ? 'Copied ✓' : 'Copy HTML'}</button></div>
        </>
      )}
      <p className="privacy-note"><span className="dot" />generates 16–512px icons + Apple touch icon — preview zip before download</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}