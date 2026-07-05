'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, PreviewModal, type PreviewData } from '../pdfShared';

export default function EditMetadataWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setFile(f); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const d = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setTitle(d.getTitle() || ''); setAuthor(d.getAuthor() || ''); setSubject(d.getSubject() || '');
      setKeywords((d.getKeywords() as unknown as string) || '');
    } catch { setError('Could not read this PDF.'); }
  };

  const run = async () => {
    if (!file) { setError('Choose a PDF first.'); return; }
    setBusy(true); setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      doc.setTitle(title); doc.setAuthor(author); doc.setSubject(subject);
      doc.setKeywords(keywords.split(',').map(k => k.trim()).filter(Boolean));
      doc.setModificationDate(new Date());
      const bytes = await doc.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: file.name.replace(/\.pdf$/i, '') + '-metadata.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not update metadata.'); }
    setBusy(false);
  };
  const F = ({ id, label, val, set }: any) => (
    <div className="field"><label htmlFor={id}>{label}</label><input id={id} type="text" value={val} onChange={e => set(e.target.value)} /></div>
  );

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF" onFiles={pick} />
      {file && (
        <>
          <F id="md-title" label="Title" val={title} set={setTitle} />
          <div className="field-grid"><F id="md-author" label="Author" val={author} set={setAuthor} /><F id="md-subject" label="Subject" val={subject} set={setSubject} /></div>
          <F id="md-kw" label="Keywords (comma-separated)" val={keywords} set={setKeywords} />
        </>
      )}
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={run} disabled={busy || !file}>Save &amp; Preview →</button></div>
      <StatusLine busy={busy} error={error} />
      <p className="privacy-note"><span className="dot" />existing metadata is loaded for editing — changes saved locally</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
