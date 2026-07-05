'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData } from '../pdfShared';

export default function WatermarkPdfWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(15);
  const [size, setSize] = useState(50);
  const [diagonal, setDiagonal] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const run = async () => {
    if (!file) { setError('Choose a PDF first.'); return; }
    if (!text.trim()) { setError('Enter watermark text.'); return; }
    setBusy(true); setError('');
    try {
      const { PDFDocument, StandardFonts, rgb, degrees } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      doc.getPages().forEach(p => {
        const { width, height } = p.getSize();
        const tw = font.widthOfTextAtSize(text, size);
        p.drawText(text, {
          x: (width - (diagonal ? tw * 0.7 : tw)) / 2,
          y: height / 2 - size / 2,
          size, font, color: rgb(0.5, 0.5, 0.5), opacity: opacity / 100,
          rotate: diagonal ? degrees(45) : degrees(0),
        });
      });
      const bytes = await doc.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: file.name.replace(/\.pdf$/i, '') + '-watermarked.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not add watermark.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF" onFiles={fs => { setFile(fs[0] || null); setError(''); }} />
      {file && <p style={{ fontSize: 13.5, marginTop: 12 }}>{file.name}</p>}
      <div className="field" style={{ marginTop: 12 }}><label htmlFor="wm-text">Watermark text</label>
        <input id="wm-text" type="text" value={text} onChange={e => setText(e.target.value)} /></div>
      <div className="field-grid">
        <div className="field"><label htmlFor="wm-op">Opacity: {opacity}%</label>
          <input id="wm-op" type="range" min={5} max={60} value={opacity} onChange={e => setOpacity(parseInt(e.target.value, 10))} /></div>
        <div className="field"><label htmlFor="wm-sz">Font size: {size}pt</label>
          <input id="wm-sz" type="range" min={20} max={100} value={size} onChange={e => setSize(parseInt(e.target.value, 10))} /></div>
      </div>
      <div className="pills"><button type="button" className="pill" aria-pressed={diagonal} onClick={() => setDiagonal(!diagonal)}>Diagonal (45°)</button></div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !file}>Add watermark &amp; Preview →</button></div>
      <StatusLine busy={busy} error={error} />
      <p className="privacy-note"><span className="dot" />stamped onto every page locally — no upload</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
