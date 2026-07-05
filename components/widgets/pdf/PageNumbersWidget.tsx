'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData } from '../pdfShared';

export default function PageNumbersWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState('bottom-center');
  const [start, setStart] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const run = async () => {
    if (!file) { setError('Choose a PDF first.'); return; }
    setBusy(true); setError('');
    try {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      pages.forEach((p, i) => {
        const { width, height } = p.getSize();
        const label = `${i + start}`;
        const size = 11;
        const tw = font.widthOfTextAtSize(label, size);
        const [vpos, hpos] = position.split('-');
        const x = hpos === 'left' ? 40 : hpos === 'right' ? width - 40 - tw : (width - tw) / 2;
        const y = vpos === 'top' ? height - 30 : 24;
        p.drawText(label, { x, y, size, font, color: rgb(0.2, 0.2, 0.2) });
      });
      const bytes = await doc.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: file.name.replace(/\.pdf$/i, '') + '-numbered.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not add page numbers.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF" onFiles={fs => { setFile(fs[0] || null); setError(''); }} />
      {file && <p style={{ fontSize: 13.5, marginTop: 12 }}>{file.name}</p>}
      <div className="field-grid" style={{ marginTop: 12 }}>
        <div className="field"><label htmlFor="pn-pos">Position</label>
          <select id="pn-pos" value={position} onChange={e => setPosition(e.target.value)}>
            {['bottom-center', 'bottom-right', 'bottom-left', 'top-center', 'top-right', 'top-left'].map(o => <option key={o} value={o}>{o.replace('-', ' ')}</option>)}
          </select></div>
        <div className="field"><label htmlFor="pn-start">Start number</label>
          <input id="pn-start" type="number" min={0} value={start} onChange={e => setStart(parseInt(e.target.value, 10) || 0)} /></div>
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !file}>Add numbers &amp; Preview →</button></div>
      <StatusLine busy={busy} error={error} />
      <p className="privacy-note"><span className="dot" />numbers are drawn onto each page locally</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
