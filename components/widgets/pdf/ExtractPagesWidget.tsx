'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData } from '../pdfShared';

function parsePages(spec: string, max: number): number[] {
  const out: number[] = [];
  for (const part of spec.split(',').map(s => s.trim()).filter(Boolean)) {
    const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) { const lo = Math.min(+m[1], +m[2]), hi = Math.max(+m[1], +m[2]); for (let p = lo; p <= hi; p++) if (p >= 1 && p <= max) out.push(p - 1); }
    else { const p = parseInt(part, 10); if (p >= 1 && p <= max) out.push(p - 1); }
  }
  return out;
}

export default function ExtractPagesWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [spec, setSpec] = useState('1, 3-4');
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
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const idx = parsePages(spec, src.getPageCount());
      if (!idx.length) { setError('No valid pages to extract. Try e.g. 1, 3-4.'); setBusy(false); return; }
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, idx);
      pages.forEach(p => out.addPage(p));
      const bytes = await out.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: file.name.replace(/\.pdf$/i, '') + '-extracted.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not extract pages.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF" onFiles={pick} />
      {file && <p style={{ fontSize: 13.5, marginTop: 12 }}>{file.name} — <strong>{pageCount} pages</strong></p>}
      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="ep-spec">Pages to keep (e.g. 1, 3-4) — order is preserved</label>
        <input id="ep-spec" type="text" value={spec} onChange={e => setSpec(e.target.value)} spellCheck={false} />
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !file}>Extract &amp; Preview →</button></div>
      <StatusLine busy={busy} error={error} />
      <p className="privacy-note"><span className="dot" />builds a new PDF from just the pages you list — locally</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
