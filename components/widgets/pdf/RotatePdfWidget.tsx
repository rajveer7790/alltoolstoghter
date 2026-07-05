'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData } from '../pdfShared';

export default function RotatePdfWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [scope, setScope] = useState('all');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const rotate = async () => {
    if (!file) { setError('Choose a PDF first.'); return; }
    setBusy(true); setError('');
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const pages = doc.getPages();
      pages.forEach((p, i) => {
        const odd = (i + 1) % 2 === 1;
        if (scope === 'all' || (scope === 'odd' && odd) || (scope === 'even' && !odd)) {
          const cur = p.getRotation().angle;
          p.setRotation(degrees((cur + angle) % 360));
        }
      });
      const bytes = await doc.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: file.name.replace(/\.pdf$/i, '') + '-rotated.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not rotate this PDF.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF to rotate" onFiles={fs => { setFile(fs[0] || null); setError(''); }} />
      {file && <p style={{ fontSize: 13.5, marginTop: 12 }}>{file.name}</p>}
      <div className="field-grid" style={{ marginTop: 12 }}>
        <div className="field"><label htmlFor="rt-ang">Rotation</label>
          <select id="rt-ang" value={angle} onChange={e => setAngle(parseInt(e.target.value, 10))}>
            <option value={90}>90° clockwise</option><option value={180}>180°</option><option value={270}>90° counter-clockwise</option>
          </select></div>
        <div className="field"><label htmlFor="rt-scope">Apply to</label>
          <select id="rt-scope" value={scope} onChange={e => setScope(e.target.value)}>
            <option value="all">All pages</option><option value="odd">Odd pages</option><option value="even">Even pages</option>
          </select></div>
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={rotate} disabled={busy || !file}>Rotate &amp; Preview →</button></div>
      <StatusLine busy={busy} error={error} />
      <p className="privacy-note"><span className="dot" />rotation is applied locally and saved into the file metadata</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
