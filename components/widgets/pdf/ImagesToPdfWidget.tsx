'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData, formatBytes } from '../pdfShared';

export default function ImagesToPdfWidget({ accept = 'image/jpeg,image/png', label = 'images' }: { accept?: string; label?: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState('fit');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const add = (fs: File[]) => { setFiles(prev => [...prev, ...fs.filter(f => /image\/(jpeg|png)/.test(f.type))]); setError(''); };
  const move = (i: number, d: number) => setFiles(prev => { const a = [...prev]; const j = i + d; if (j < 0 || j >= a.length) return prev; [a[i], a[j]] = [a[j], a[i]]; return a; });
  const remove = (i: number) => setFiles(prev => prev.filter((_, k) => k !== i));

  const run = async () => {
    if (!files.length) { setError(`Add at least one ${label} file.`); return; }
    setBusy(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      const A4 = [595.28, 841.89];
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const img = f.type === 'image/png' ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        if (pageSize === 'fit') {
          const page = doc.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        } else {
          const page = doc.addPage(A4 as [number, number]);
          const scale = Math.min((A4[0] - 40) / img.width, (A4[1] - 40) / img.height);
          const w = img.width * scale, h = img.height * scale;
          page.drawImage(img, { x: (A4[0] - w) / 2, y: (A4[1] - h) / 2, width: w, height: h });
        }
      }
      const bytes = await doc.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'images.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not build the PDF. Ensure files are valid JPG or PNG.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept={accept} multiple label={`Choose ${label} files`} onFiles={add} />
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
      <div className="field" style={{ marginTop: 12 }}><label htmlFor="ip-size">Page sizing</label>
        <select id="ip-size" value={pageSize} onChange={e => setPageSize(e.target.value)}>
          <option value="fit">One page per image (match image size)</option>
          <option value="a4">Fit each image on an A4 page</option>
        </select></div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !files.length}>Create &amp; Preview PDF →</button></div>
      <StatusLine busy={busy} error={error} />
      <p className="privacy-note"><span className="dot" />images are embedded into a PDF locally — never uploaded</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
