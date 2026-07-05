'use client';
import { useState } from 'react';
import { FileDrop, StatusLine, formatBytes } from '../pdfShared';

export default function PdfInfoWidget() {
  const [info, setInfo] = useState<[string, string][] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const inspect = async (fs: File[]) => {
    const f = fs[0]; if (!f) return;
    setBusy(true); setError(''); setInfo(null);
    try {
      const { loadPdfjs } = await import('./pdfjsLoader');
      const pdfjs = await loadPdfjs();
      const data = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;
      const meta = await doc.getMetadata().catch(() => null);
      const m = (meta?.info || {}) as Record<string, any>;
      const page1 = await doc.getPage(1);
      const vp = page1.getViewport({ scale: 1 });
      const rows: [string, string][] = [
        ['File name', f.name],
        ['File size', formatBytes(f.size)],
        ['Pages', String(doc.numPages)],
        ['Page 1 size', `${Math.round(vp.width)} × ${Math.round(vp.height)} pt (${(vp.width / 72).toFixed(1)}″ × ${(vp.height / 72).toFixed(1)}″)`],
        ['Title', m.Title || '—'],
        ['Author', m.Author || '—'],
        ['Subject', m.Subject || '—'],
        ['Keywords', m.Keywords || '—'],
        ['Creator', m.Creator || '—'],
        ['Producer', m.Producer || '—'],
        ['PDF version', m.PDFFormatVersion || '—'],
        ['Created', m.CreationDate ? String(m.CreationDate).replace(/^D:(\d{4})(\d{2})(\d{2}).*/, '$1-$2-$3') : '—'],
        ['Encrypted', (meta as any)?.encrypted ? 'Yes' : 'No'],
      ];
      setInfo(rows);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not read this PDF.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF to inspect" onFiles={inspect} />
      <StatusLine busy={busy} error={error} />
      {info && (
        <div className="readout" style={{ marginTop: 16 }} aria-live="polite">
          <div className="readout-rows">
            {info.map(([k, v], i) => (
              <div className="readout-row" key={i}><span className="k">{k}</span><span className="v" style={{ textAlign: 'right', maxWidth: '60%', wordBreak: 'break-word' }}>{v}</span></div>
            ))}
          </div>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />metadata is read locally — nothing is uploaded</p>
    </div>
  );
}
