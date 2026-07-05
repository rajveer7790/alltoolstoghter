'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData } from '../pdfShared';

function parsePages(spec: string, max: number): Set<number> {
  const set = new Set<number>();
  for (const part of spec.split(',').map(s => s.trim()).filter(Boolean)) {
    const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) { const lo = Math.min(+m[1], +m[2]), hi = Math.max(+m[1], +m[2]); for (let p = lo; p <= hi; p++) if (p >= 1 && p <= max) set.add(p - 1); }
    else { const p = parseInt(part, 10); if (p >= 1 && p <= max) set.add(p - 1); }
  }
  return set;
}

export default function DeletePagesWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [spec, setSpec] = useState('2, 5-6');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setFile(f); setError('');
    try { const { PDFDocument } = await import('pdf-lib'); const d = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true }); setPageCount(d.getPageCount()); }
    catch { setError('Could not read this PDF.'); }
  };

  const run = async () => {
    if (!file) { setError('Choose a PDF first.'); return; }
    setBusy(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const drop = parsePages(spec, doc.getPageCount());
      if (!drop.size) { setError('No valid pages to delete. Try e.g. 2, 5-6.'); setBusy(false); return; }
      if (drop.size >= doc.getPageCount()) { setError('You cannot delete every page.'); setBusy(false); return; }
      [...drop].sort((a, b) => b - a).forEach(i => doc.removePage(i)); // remove high→low
      const bytes = await doc.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: file.name.replace(/\.pdf$/i, '') + '-edited.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not edit this PDF.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF" onFiles={pick} />
      {file && <p style={{ fontSize: 13.5, marginTop: 12 }}>{file.name} — <strong>{pageCount} pages</strong></p>}
      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="dp-spec">Pages to delete (e.g. 2, 5-6)</label>
        <input id="dp-spec" type="text" value={spec} onChange={e => setSpec(e.target.value)} spellCheck={false} />
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !file}>Delete &amp; Preview →</button></div>
      <StatusLine busy={busy} error={error} />
      <p className="privacy-note"><span className="dot" />the remaining pages keep their order — processed locally</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
