'use client';
import { useMemo, useState } from 'react';
import { StatusLine, PreviewModal, type PreviewData } from '../pdfShared';
import { mdToHtml } from '@/lib/mdPreview';

const SAMPLE = `# Project Report

## Summary
This document was generated **entirely in your browser** from Markdown.

## Key points
- No uploads — your text never leaves your device
- Headings, lists, bold, and code are styled
- Long paragraphs wrap and flow across pages automatically

## Code example
\`\`\`
npm install && npm run build
\`\`\`

> Tip: edit this sample or paste your own Markdown, then click Generate PDF.`;

/** Strip characters pdf-lib's WinAnsi fonts can't encode, keeping common typography. */
function sanitize(s: string): string {
  return s
    .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-').replace(/\u2026/g, '...')
    .replace(/[^\x20-\x7E\xA0-\xFF\n\t]/g, '?');
}

type Block =
  | { t: 'h'; level: number; text: string }
  | { t: 'p' | 'quote'; text: string }
  | { t: 'li'; text: string; ordered: boolean; n: number }
  | { t: 'code'; lines: string[] }
  | { t: 'hr' };

function parseMd(src: string): Block[] {
  const out: Block[] = []; let inCode = false; let codeLines: string[] = []; let olN = 0;
  for (const raw of src.split('\n')) {
    if (raw.trim().startsWith('```')) {
      if (inCode) { out.push({ t: 'code', lines: codeLines }); codeLines = []; inCode = false; }
      else inCode = true;
      continue;
    }
    if (inCode) { codeLines.push(raw); continue; }
    const h = raw.match(/^(#{1,6})\s+(.*)$/);
    if (h) { out.push({ t: 'h', level: h[1].length, text: h[2] }); olN = 0; continue; }
    if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(raw)) { out.push({ t: 'hr' }); olN = 0; continue; }
    if (/^>\s?/.test(raw)) { out.push({ t: 'quote', text: raw.replace(/^>\s?/, '') }); olN = 0; continue; }
    const ol = raw.match(/^\d+[.)]\s+(.*)$/);
    if (ol) { olN++; out.push({ t: 'li', text: ol[1], ordered: true, n: olN }); continue; }
    if (/^[-*]\s+/.test(raw)) { out.push({ t: 'li', text: raw.replace(/^[-*]\s+/, ''), ordered: false, n: 0 }); olN = 0; continue; }
    if (raw.trim() === '') { olN = 0; continue; }
    out.push({ t: 'p', text: raw }); olN = 0;
  }
  if (inCode && codeLines.length) out.push({ t: 'code', lines: codeLines });
  return out;
}

/** Split "a **b** c `d`" into styled segments. Links become "text (url)". */
function segments(text: string): { s: string; bold: boolean; code: boolean }[] {
  const t = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)').replace(/\*([^*]+)\*/g, '$1');
  const segs: { s: string; bold: boolean; code: boolean }[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g; let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    if (m.index > last) segs.push({ s: t.slice(last, m.index), bold: false, code: false });
    const tok = m[0];
    if (tok.startsWith('**')) segs.push({ s: tok.slice(2, -2), bold: true, code: false });
    else segs.push({ s: tok.slice(1, -1), bold: false, code: true });
    last = m.index + tok.length;
  }
  if (last < t.length) segs.push({ s: t.slice(last), bold: false, code: false });
  return segs.filter(x => x.s);
}

export default function MarkdownToPdfWidget() {
  const [src, setSrc] = useState(SAMPLE);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const htmlPreview = useMemo(() => mdToHtml(src), [src]);

  const generate = async () => {
    setBusy(true); setError('');
    try {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const bold = await doc.embedFont(StandardFonts.HelveticaBold);
      const mono = await doc.embedFont(StandardFonts.Courier);

      const PW = 595.28, PH = 841.89, M = 56;               // A4, 2cm margins
      const maxW = PW - M * 2;
      let page = doc.addPage([PW, PH]); let y = PH - M;
      const ink = rgb(0.09, 0.09, 0.11), dim = rgb(0.35, 0.37, 0.42);

      const ensure = (need: number) => { if (y - need < M) { page = doc.addPage([PW, PH]); y = PH - M; } };

      /** Word-wrap styled segments into lines that fit maxW (minus indent). */
      const drawRich = (text: string, size: number, indent = 0, baseBold = false, color = ink) => {
        const segs = segments(sanitize(text));
        type Word = { s: string; f: any; w: number };
        const words: Word[] = [];
        for (const seg of segs) {
          const f = seg.code ? mono : (seg.bold || baseBold) ? bold : font;
          for (const w of seg.s.split(/(\s+)/)) if (w) words.push({ s: w, f, w: f.widthOfTextAtSize(w, size) });
        }
        const lh = size * 1.45; let line: Word[] = []; let lw = 0;
        const flush = () => {
          if (!line.length) return;
          ensure(lh); let x = M + indent;
          for (const wd of line) { page.drawText(wd.s, { x, y: y - size, size, font: wd.f, color }); x += wd.w; }
          y -= lh; line = []; lw = 0;
        };
        for (const wd of words) {
          if (lw + wd.w > maxW - indent && lw > 0) flush();
          if (/^\s+$/.test(wd.s) && lw === 0) continue;   // no leading spaces
          line.push(wd); lw += wd.w;
        }
        flush();
      };

      for (const b of parseMd(src)) {
        if (b.t === 'h') {
          const size = [24, 18, 15, 13, 12, 11][b.level - 1];
          y -= size * 0.6; ensure(size * 2);
          drawRich(b.text, size, 0, true);
          if (b.level <= 2) { ensure(6); page.drawLine({ start: { x: M, y: y + 4 }, end: { x: PW - M, y: y + 4 }, thickness: 0.5, color: rgb(0.85, 0.85, 0.83) }); y -= 6; }
        } else if (b.t === 'p') { drawRich(b.text, 11); y -= 5;
        } else if (b.t === 'quote') {
          const startY = y; drawRich(b.text, 11, 16, false, dim);
          page.drawLine({ start: { x: M + 4, y: startY - 2 }, end: { x: M + 4, y: y + 4 }, thickness: 2, color: rgb(0.8, 0.8, 0.78) }); y -= 5;
        } else if (b.t === 'li') {
          const marker = b.ordered ? `${b.n}.` : '•';
          ensure(16); page.drawText(marker, { x: M + 6, y: y - 11, size: 11, font, color: ink });
          drawRich(b.text, 11, 24); y -= 2;
        } else if (b.t === 'code') {
          const lh = 13; const blockH = b.lines.length * lh + 16; ensure(Math.min(blockH, 200));
          const startY = y;
          const endYest = Math.max(M, y - blockH);
          page.drawRectangle({ x: M, y: endYest, width: maxW, height: startY - endYest, color: rgb(0.955, 0.955, 0.945) });
          y -= 9;
          for (const ln of b.lines) { ensure(lh); page.drawText(sanitize(ln).slice(0, 95), { x: M + 10, y: y - 10, size: 9.5, font: mono, color: ink }); y -= lh; }
          y -= 9;
        } else if (b.t === 'hr') {
          ensure(18); page.drawLine({ start: { x: M, y: y - 8 }, end: { x: PW - M, y: y - 8 }, thickness: 0.75, color: rgb(0.8, 0.8, 0.78) }); y -= 20;
        }
      }
      const bytes = await doc.save();
      setPreview({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'document.pdf' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not generate PDF.'); }
    setBusy(false);
  };

  return (
    <div className="tool-card">
      <div className="md-pdf-split">
        <div className="field"><label htmlFor="mp-src">Markdown source</label>
          <textarea id="mp-src" value={src} onChange={e => setSrc(e.target.value)} spellCheck={false}
            style={{ minHeight: 300, fontFamily: 'var(--mono)', fontSize: 13.5 }} /></div>
        <div>
          <div className="before-after-label" style={{ textAlign: 'left', marginBottom: 8 }}>Live preview</div>
          <div className="md-pdf-preview-pane prose" dangerouslySetInnerHTML={{ __html: htmlPreview }} />
        </div>
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={generate} disabled={busy || !src.trim()}>
          {busy ? 'Generating…' : 'Generate & Preview PDF →'}
        </button>
      </div>
      <StatusLine busy={busy} error={error} ok={preview ? 'PDF preview ready — review in the dialog, then download.' : undefined} />
      <p className="privacy-note"><span className="dot" />PDF generated locally with A4 layout — preview before download</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
