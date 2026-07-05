'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData } from '../pdfShared';

export default function ReorderPdfWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setFile(f); setError('');
    try { const { PDFDocument } = await import('pdf-lib'); const d = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true }); setOrder(d.getPageIndices()); }
    catch { setError('Could not read this PDF.'); }
  };
  const move = (i: number, d: number) => setOrder(prev => { const a = [...prev]; const j = i + d; if (j < 0 || j >= a.length) return prev; [a[i], a[j]] = [a[j], a[i]]; return a; });

  const run = async () => {
    if (!file) { setError('Choose a PDF first.'); return; }
    setBusy(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, order);
      pages.forEach(p => out.addPage(p));
      const bytes = await out.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: file.name.replace(/\.pdf$/i, '') + '-reordered.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not reorder this PDF.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF to reorder" onFiles={pick} />
      {order.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16, maxHeight: 320, overflow: 'auto' }}>
          {order.map((pg, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', border: '1px solid var(--line)', borderRadius: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13.5, flex: 1 }}>Position {i + 1} → original page <strong>{pg + 1}</strong></span>
              <button type="button" className="btn" style={{ padding: '2px 8px' }} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
              <button type="button" className="btn" style={{ padding: '2px 8px' }} onClick={() => move(i, 1)} disabled={i === order.length - 1} aria-label="Move down">↓</button>
            </li>
          ))}
        </ul>
      )}
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !file}>Save &amp; Preview →</button></div>
      <StatusLine busy={busy} error={error} />
      <p className="privacy-note"><span className="dot" />reorder pages with the arrows, then save — all in your browser</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
