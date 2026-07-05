'use client';
import { useState } from 'react';
import { FileDrop, StatusLine } from '../pdfShared';
import PreviewModal, { type PreviewData } from '../PreviewModal';
import { loadPdfjs } from './pdfjsLoader';

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}

export default function PdfToImagesWidget({ format = 'png' }: { format?: 'png' | 'jpeg' }) {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [pages, setPages] = useState<{ url: string; n: number }[]>([]);
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const render = async (f: File) => {
    setBusy(true); setError(''); setPages([]); setPreview(null);
    try {
      const pdfjs = await loadPdfjs();
      const data = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;
      const out: { url: string; n: number }[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width; canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        if (format === 'jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
        await page.render({ canvasContext: ctx, viewport }).promise;
        out.push({ url: canvas.toDataURL(format === 'jpeg' ? 'image/jpeg' : 'image/png', 0.92), n: i });
      }
      setPages(out);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not render this PDF.'); }
    setBusy(false);
  };

  const pick = (fs: File[]) => { const f = fs[0]; if (!f) return; setFile(f); render(f); };
  const ext = format === 'jpeg' ? 'jpg' : 'png';
  const base = file?.name.replace(/\.pdf$/i, '') || 'document';
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';

  const openPreview = async (pageList: { url: string; n: number }[]) => {
    const files = await Promise.all(pageList.map(async p => ({
      blob: await dataUrlToBlob(p.url),
      filename: `${base}-page-${p.n}.${ext}`,
      label: `Page ${p.n}`,
    })));
    if (files.length === 1) {
      setPreview(files[0]);
    } else {
      setPreview({ ...files[0], files });
    }
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF to convert" onFiles={pick} />
      <div className="field-grid" style={{ marginTop: 12 }}>
        <div className="field"><label htmlFor="pi-scale">Quality: {scale}× ({scale === 1 ? 'screen' : scale >= 3 ? 'print' : 'high'})</label>
          <input id="pi-scale" type="range" min={1} max={4} step={0.5} value={scale} onChange={e => { setScale(parseFloat(e.target.value)); if (file) render(file); }} /></div>
        {pages.length > 0 && (
          <div className="field" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-primary" onClick={() => openPreview(pages)}>
              Preview all {pages.length} pages →
            </button>
          </div>
        )}
      </div>
      <StatusLine busy={busy} error={error} />
      {pages.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginTop: 16 }}>
          {pages.map(p => (
            <button key={p.n} type="button" onClick={() => openPreview([p])} title={`Preview page ${p.n}`}
              style={{ border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden', background: '#fff', cursor: 'pointer', padding: 0 }}>
              <img src={p.url} alt={`Page ${p.n}`} style={{ width: '100%', display: 'block' }} />
              <span style={{ display: 'block', fontSize: 12, padding: '6px', color: 'var(--ink-2)' }}>Page {p.n} — preview</span>
            </button>
          ))}
        </div>
      )}
      <p className="privacy-note"><span className="dot" />click any page to preview before download — rendered locally with PDF.js</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}