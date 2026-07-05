'use client';
import { useState } from 'react';
import { FileDrop, StatusLine } from '../pdfShared';
import TextDownloadButton from '../TextDownloadButton';
import { loadPdfjs } from './pdfjsLoader';

export default function PdfToTextWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const extract = async (f: File) => {
    setBusy(true); setError(''); setText('');
    try {
      const pdfjs = await loadPdfjs();
      const data = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;
      let full = '';
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((it: any) => ('str' in it ? it.str : '')).join(' ');
        full += `--- Page ${i} ---\n${strings.replace(/\s+/g, ' ').trim()}\n\n`;
      }
      setText(full.trim() || '(No selectable text found. This PDF may be scanned images — try an OCR tool.)');
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not extract text.'); }
    setBusy(false);
  };

  const pick = (fs: File[]) => { const f = fs[0]; if (!f) return; setFile(f); extract(f); };
  const copy = async () => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF to extract text" onFiles={pick} />
      <StatusLine busy={busy} error={error} />
      {text && (
        <>
          <div className="field" style={{ marginTop: 14 }}><label htmlFor="pt-out">Extracted text</label>
            <textarea id="pt-out" readOnly value={text} style={{ minHeight: 220 }} /></div>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy text'}</button>
            <TextDownloadButton content={text} filename={`${file?.name.replace(/\.pdf$/i, '') || 'extract'}.txt`} mime="text/plain" label="Preview & Download .txt" />
          </div>
        </>
      )}
      <p className="privacy-note"><span className="dot" />extracts the real text layer locally — works on text-based PDFs (not scans)</p>
    </div>
  );
}
