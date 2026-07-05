'use client';
import { useState } from 'react';
import { FileDrop, StatusLine } from '../pdfShared';
import TextDownloadButton from '../TextDownloadButton';
import { loadPdfjs } from './pdfjsLoader';

/** Convert PDF text layer to Markdown, using font-size heuristics for headings. */
export default function PdfToMarkdownWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [md, setMd] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = async (f: File) => {
    setBusy(true); setError(''); setMd('');
    try {
      const pdfjs = await loadPdfjs();
      const data = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;

      // Pass 1: collect all line items with their font heights to find the body-text size
      type Line = { text: string; h: number; y: number; bold: boolean };
      const pages: Line[][] = [];
      const heights: number[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        // group items into lines by their y-position
        const rows = new Map<number, { parts: { x: number; s: string; h: number; bold: boolean }[] }>();
        for (const it of content.items as any[]) {
          if (!('str' in it) || !it.str.trim()) continue;
          const h = Math.abs(it.transform[3]) || Math.abs(it.height) || 10;
          const y = Math.round(it.transform[5]);
          const bold = /bold|black|heavy/i.test(it.fontName || '');
          const key = [...rows.keys()].find(k => Math.abs(k - y) <= 2) ?? y;
          if (!rows.has(key)) rows.set(key, { parts: [] });
          rows.get(key)!.parts.push({ x: it.transform[4], s: it.str, h, bold });
          heights.push(h);
        }
        const lines: Line[] = [...rows.entries()]
          .sort((a, b) => b[0] - a[0]) // top→bottom (PDF y grows upward)
          .map(([y, r]) => {
            const parts = r.parts.sort((a, b) => a.x - b.x);
            return {
              text: parts.map(p => p.s).join(' ').replace(/\s+/g, ' ').trim(),
              h: Math.max(...parts.map(p => p.h)),
              y, bold: parts.every(p => p.bold),
            };
          }).filter(l => l.text);
        pages.push(lines);
      }

      // Body size = most common height (mode)
      const freq = new Map<number, number>();
      heights.forEach(h => { const r = Math.round(h); freq.set(r, (freq.get(r) ?? 0) + 1); });
      const body = [...freq.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 10;

      // Pass 2: emit markdown
      const out: string[] = [];
      pages.forEach((lines, pi) => {
        if (pi > 0) out.push('\n---\n'); // page separator
        for (const l of lines) {
          const ratio = l.h / body;
          if (ratio >= 1.7) out.push(`# ${l.text}\n`);
          else if (ratio >= 1.35) out.push(`## ${l.text}\n`);
          else if (ratio >= 1.15 || (l.bold && l.text.length < 80)) out.push(`### ${l.text}\n`);
          else if (/^[•·▪‣-]\s*/.test(l.text)) out.push(`- ${l.text.replace(/^[•·▪‣-]\s*/, '')}`);
          else if (/^\d+[.)]\s+/.test(l.text) && l.text.length < 200) out.push(l.text.replace(/^(\d+)[.)]\s+/, '$1. '));
          else out.push(l.text);
        }
      });
      // join consecutive plain lines into paragraphs
      const result = out.join('\n').replace(/\n{3,}/g, '\n\n');
      setMd(result.trim() || '(No selectable text found. This PDF may be scanned images — Markdown conversion needs a text layer.)');
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not convert PDF.'); }
    setBusy(false);
  };

  const pick = (fs: File[]) => { const f = fs[0]; if (!f) return; setFile(f); convert(f); };
  const copy = async () => { try { await navigator.clipboard.writeText(md); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      <FileDrop accept="application/pdf" label="Choose a PDF to convert to Markdown" onFiles={pick} />
      <StatusLine busy={busy} error={error} />
      {md && (
        <>
          <div className="field" style={{ marginTop: 14 }}><label htmlFor="pm-out">Markdown output</label>
            <textarea id="pm-out" readOnly value={md} style={{ minHeight: 240 }} /></div>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy Markdown'}</button>
            <TextDownloadButton content={md} filename={`${file?.name.replace(/\.pdf$/i, '') || 'document'}.md`} mime="text/markdown" label="Preview & Download .md" />
          </div>
        </>
      )}
      <p className="privacy-note"><span className="dot" />converted locally — headings detected from font sizes; works on text-based PDFs (not scans)</p>
    </div>
  );
}
