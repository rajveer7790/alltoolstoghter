'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData, formatBytes } from '../pdfShared';

export default function MergePdfWidget() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const add = (fs: File[]) => { setFiles(prev => [...prev, ...fs.filter(f => f.type === 'application/pdf')]); setError(''); };
  const move = (i: number, d: number) => setFiles(prev => { const a = [...prev]; const j = i + d; if (j < 0 || j >= a.length) return prev; [a[i], a[j]] = [a[j], a[i]]; return a; });
  const remove = (i: number) => setFiles(prev => prev.filter((_, k) => k !== i));

  const merge = async () => {
    if (files.length < 2) { setError('Add at least two PDF files to merge.'); return; }
    setBusy(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const out = await PDFDocument.create();
      for (const f of files) {
        const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach(p => out.addPage(p));
      }
      const bytes = await out.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'merged.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not merge these files.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" multiple label="Choose PDF files to merge" onFiles={add} />
      {files.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
          {files.map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', border: '1px solid var(--line)', borderRadius: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
              <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{formatBytes(f.size)}</span>
              <button type="button" className="btn" style={{ padding: '2px 8px' }} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
              <button type="button" className="btn" style={{ padding: '2px 8px' }} onClick={() => move(i, 1)} disabled={i === files.length - 1} aria-label="Move down">↓</button>
              <button type="button" className="btn" style={{ padding: '2px 8px' }} onClick={() => remove(i)} aria-label="Remove">✕</button>
            </li>
          ))}
        </ul>
      )}
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={merge} disabled={busy || files.length < 2}>Merge &amp; Preview {files.length || ''} PDFs →</button></div>
      <StatusLine busy={busy} error={error} ok={preview ? 'Preview ready — review the merged PDF before downloading.' : undefined} />
      <p className="privacy-note"><span className="dot" />merged in your browser — files are never uploaded to a server</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
