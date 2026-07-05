'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData } from '../pdfShared';

function parseRanges(spec: string, max: number): number[][] {
  const groups: number[][] = [];
  for (const part of spec.split(',').map(s => s.trim()).filter(Boolean)) {
    const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) { const a = +m[1], b = +m[2]; const lo = Math.min(a, b), hi = Math.max(a, b); const g: number[] = []; for (let p = lo; p <= hi; p++) if (p >= 1 && p <= max) g.push(p - 1); if (g.length) groups.push(g); }
    else { const p = parseInt(part, 10); if (p >= 1 && p <= max) groups.push([p - 1]); }
  }
  return groups;
}

export default function SplitPdfWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [ranges, setRanges] = useState('1-3, 4-6');
  const [mode, setMode] = useState<'ranges' | 'each'>('ranges');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return;
    setFile(f); setError(''); setPreview(null);
    try { const { PDFDocument } = await import('pdf-lib'); const d = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true }); setPageCount(d.getPageCount()); }
    catch { setError('Could not read this PDF.'); }
  };

  const split = async () => {
    if (!file) { setError('Choose a PDF first.'); return; }
    setBusy(true); setError(''); setPreview(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const groups = mode === 'each' ? src.getPageIndices().map(i => [i]) : parseRanges(ranges, src.getPageCount());
      if (!groups.length) { setError('No valid page ranges. Try something like 1-3, 5, 8-10.'); setBusy(false); return; }

      const base = file.name.replace(/\.pdf$/i, '');
      const outputs: { blob: Blob; filename: string; label: string }[] = [];

      for (const g of groups) {
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, g);
        pages.forEach(p => out.addPage(p));
        const label = g.length > 1 ? `Pages ${g[0] + 1}–${g[g.length - 1] + 1}` : `Page ${g[0] + 1}`;
        const fname = g.length > 1 ? `${base}-pages-${g[0] + 1}-${g[g.length - 1] + 1}.pdf` : `${base}-page-${g[0] + 1}.pdf`;
        const bytes = await out.save();
        outputs.push({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: fname, label });
      }

      if (outputs.length === 1) {
        setPreview(outputs[0]);
      } else {
        setPreview({
          blob: outputs[0].blob,
          filename: outputs[0].filename,
          label: outputs[0].label,
          files: outputs,
        });
      }
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not split this PDF.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF to split" onFiles={pick} />
      {file && <p style={{ fontSize: 13.5, marginTop: 12 }}>{file.name} — <strong>{pageCount} pages</strong></p>}
      <div className="pills" style={{ marginTop: 12 }}>
        <button type="button" className="pill" aria-pressed={mode === 'ranges'} onClick={() => setMode('ranges')}>By ranges</button>
        <button type="button" className="pill" aria-pressed={mode === 'each'} onClick={() => setMode('each')}>Every page separately</button>
      </div>
      {mode === 'ranges' && (
        <div className="field" style={{ marginTop: 12 }}>
          <label htmlFor="sp-r">Page ranges (e.g. 1-3, 5, 8-10) — each becomes its own PDF</label>
          <input id="sp-r" type="text" value={ranges} onChange={e => setRanges(e.target.value)} spellCheck={false} />
        </div>
      )}
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={split} disabled={busy || !file}>
          {busy ? 'Splitting…' : 'Split & Preview →'}
        </button>
      </div>
      <StatusLine busy={busy} error={error} ok={preview ? 'Preview ready — review each file before downloading.' : undefined} />
      <p className="privacy-note"><span className="dot" />each range becomes a separate PDF — preview before download, processed locally</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}