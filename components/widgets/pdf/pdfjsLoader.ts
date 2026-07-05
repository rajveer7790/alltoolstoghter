/** Lazy-load pdf.js (legacy build) and point its worker at the same-origin file in /public. */
let cached: typeof import('pdfjs-dist') | null = null;

export async function loadPdfjs() {
  if (cached) return cached;
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs') as unknown as typeof import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  cached = pdfjs;
  return pdfjs;
}
