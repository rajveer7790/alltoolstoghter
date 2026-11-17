import { PDFDocument, PDFName, PDFTextField, PDFCheckBox, PDFDropdown, PDFOptionList, PDFRadioGroup, StandardFonts } from 'pdf-lib';

export type LocalDocumentResult = { bytes: Uint8Array; filename: string; type: string };
const selectedPages = (value: unknown, count: number): number[] => {
  if (!String(value || '').trim()) return Array.from({ length: count }, (_, i) => i);
  const result = new Set<number>();
  for (const part of String(value).split(',')) {
    const match = part.trim().match(/^(\d+)(?:-(\d+))?$/);
    if (!match) throw new Error('Use page numbers such as 1, 3-5.');
    const start = Number(match[1]), end = Number(match[2] || match[1]);
    if (start < 1 || end > count || start > end) throw new Error('A page range is outside the document.');
    for (let i = start; i <= end; i++) result.add(i - 1);
  }
  return [...result];
};

export async function processLocalDocument(id: string, files: { arrayBuffer(): Promise<ArrayBuffer> }[], values: Record<string, unknown>): Promise<LocalDocumentResult> {
  if (!files.length) throw new Error('Choose a PDF first.');
  if (id === 'pdf-to-json') {
    const { loadPdfjs } = await import('@/components/widgets/pdf/pdfjsLoader');
    const pdfjs = await loadPdfjs();
    const task = pdfjs.getDocument({ data: new Uint8Array(await files[0].arrayBuffer()) });
    const doc = await task.promise;
    try {
      if (doc.numPages > 500) throw new Error('Split PDFs longer than 500 pages first.');
      const pages = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const text = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1 });
        pages.push({ page: i, width: viewport.width, height: viewport.height,
          items: text.items.filter((item: any) => 'str' in item).map((item: any) => ({ text: item.str, transform: item.transform, width: item.width, height: item.height })) });
        page.cleanup();
      }
      return { bytes: new TextEncoder().encode(JSON.stringify({ pages }, null, 2)), filename: 'pdf-text.json', type: 'application/json' };
    } finally { await doc.destroy(); }
  }
  const source = await PDFDocument.load(await files[0].arrayBuffer());
  if (source.getPageCount() > 500) throw new Error('Split PDFs longer than 500 pages first.');
  let output = source;
  const pages = source.getPages();
  if (id === 'reverse-pdf-pages' || id === 'alternate-merge-pdf') {
    output = await PDFDocument.create();
    if (id === 'reverse-pdf-pages') {
      const copied = await output.copyPages(source, source.getPageIndices().reverse());
      copied.forEach(page => output.addPage(page));
    } else {
      if (files.length !== 2) throw new Error('Choose exactly two PDFs to interleave.');
      const second = await PDFDocument.load(await files[1].arrayBuffer());
      if (source.getPageCount() + second.getPageCount() > 500) throw new Error('Use at most 500 pages in total.');
      const firstPages = await output.copyPages(source, source.getPageIndices());
      const secondPages = await output.copyPages(second, second.getPageIndices());
      for (let i = 0; i < Math.max(firstPages.length, secondPages.length); i++) {
        if (firstPages[i]) output.addPage(firstPages[i]);
        if (secondPages[i]) output.addPage(secondPages[i]);
      }
    }
  } else if (id === 'add-blank-pdf-page') {
    const after = Number(values.after);
    if (!Number.isInteger(after) || after < 0 || after > pages.length) throw new Error('Choose an insertion position from 0 to the page count.');
    const size = pages[Math.max(0, after - 1)].getSize();
    source.insertPage(after, [size.width, size.height]);
  } else if (id === 'flatten-pdf-forms') {
    source.getForm().flatten();
  } else if (id === 'fill-pdf-forms') {
    let fields: unknown;
    try { fields = JSON.parse(String(values.values)); } catch { throw new Error('Enter a valid JSON object of field names and values.'); }
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) throw new Error('Field values must be a JSON object.');
    const form = source.getForm();
    const available = form.getFields();
    if (!available.length) throw new Error('No supported AcroForm fields were found. Use the PDF editor to add fields.');
    for (const [name, value] of Object.entries(fields)) {
      const field = available.find(field => field.getName() === name);
      if (!field) throw new Error(`Unknown field: ${name}. Available fields: ${available.map(f => f.getName()).join(', ')}`);
      if (field instanceof PDFTextField) form.getTextField(name).setText(String(value));
      else if (field instanceof PDFCheckBox) { if (typeof value !== 'boolean') throw new Error(`Use true or false for ${name}.`); value ? form.getCheckBox(name).check() : form.getCheckBox(name).uncheck(); }
      else if (field instanceof PDFDropdown) form.getDropdown(name).select(String(value));
      else if (field instanceof PDFOptionList) form.getOptionList(name).select(String(value));
      else if (field instanceof PDFRadioGroup) form.getRadioGroup(name).select(String(value));
      else throw new Error(`Field ${name} is not a supported fillable field.`);
    }
  } else if (id === 'remove-pdf-metadata') {
    const info = source.context.trailerInfo.Info;
    if (info) {
      const dictionary = source.context.lookup(info) as any;
      for (const key of dictionary.keys()) dictionary.delete(key);
    }
    source.catalog.delete(PDFName.of('Metadata'));
  } else if (id === 'crop-pdf') {
    const margins = ['top', 'right', 'bottom', 'left'].map(key => Number(values[key] || 0));
    if (margins.some(n => !Number.isFinite(n) || n < 0)) throw new Error('Margins must be nonnegative numbers.');
    const [top, right, bottom, left] = margins;
    for (const index of selectedPages(values.pages, pages.length)) {
      const page = pages[index], box = page.getCropBox();
      if (left + right >= box.width || top + bottom >= box.height) throw new Error('Margins would remove the whole visible page.');
      page.setCropBox(box.x + left, box.y + bottom, box.width - left - right, box.height - top - bottom);
    }
  } else if (['resize-pdf-pages', 'n-up-pdf', 'pdf-booklet'].includes(id)) {
    output = await PDFDocument.create();
    for (const page of pages) if (!page.node.Contents()) page.drawText(' ', { size: 1 });
    const embedded = await output.embedPages(pages);
    let width = values.size === 'Letter' ? 612 : 595.28, height = values.size === 'Letter' ? 792 : 841.89;
    if (values.landscape || id !== 'resize-pdf-pages') [width, height] = [height, width];
    const draw = (target: ReturnType<PDFDocument['addPage']>, index: number | null, x: number, y: number, cellW: number, cellH: number) => {
      if (index === null || index >= embedded.length) return;
      const item = embedded[index], scale = Math.min((cellW - 16) / item.width, (cellH - 16) / item.height);
      target.drawPage(item, { x: x + (cellW - item.width * scale) / 2, y: y + (cellH - item.height * scale) / 2, width: item.width * scale, height: item.height * scale });
    };
    if (id === 'pdf-booklet') {
      const padded = Math.ceil(pages.length / 4) * 4;
      for (let sheet = 0; sheet < padded / 4; sheet++) {
        const front = output.addPage([width, height]), back = output.addPage([width, height]);
        draw(front, padded - 1 - sheet * 2, 0, 0, width / 2, height);
        draw(front, sheet * 2, width / 2, 0, width / 2, height);
        draw(back, sheet * 2 + 1, 0, 0, width / 2, height);
        draw(back, padded - 2 - sheet * 2, width / 2, 0, width / 2, height);
      }
    } else {
      const count = id === 'resize-pdf-pages' ? 1 : Number(values.perSheet || 2);
      if (![1, 2, 4].includes(count)) throw new Error('Choose two or four pages per sheet.');
      const columns = count === 1 ? 1 : 2, rows = count === 4 ? 2 : 1;
      for (let i = 0; i < embedded.length; i += count) {
        const page = output.addPage([width, height]);
        for (let slot = 0; slot < count; slot++) draw(page, i + slot, slot % columns * width / columns, (rows - 1 - Math.floor(slot / columns)) * height / rows, width / columns, height / rows);
      }
    }
  } else if (id === 'annotate-pdf') {
    const text = String(values.text || '');
    if (!text || text.length > 1000) throw new Error('Enter 1–1,000 characters.');
    const x = Number(values.x), top = Number(values.y), size = Number(values.fontSize);
    if (![x, top, size].every(Number.isFinite) || x < 0 || top < 0 || size < 6 || size > 100) throw new Error('Check the text position and font size.');
    const font = await source.embedFont(StandardFonts.Helvetica);
    for (const i of selectedPages(values.pages, pages.length)) {
      if (top + size > pages[i].getHeight() || x > pages[i].getWidth()) throw new Error('Text position is outside a selected page.');
      pages[i].drawText(text, { x, y: pages[i].getHeight() - top - size, size, font });
    }
  } else throw new Error('This local operation is not supported.');
  return { bytes: await output.save({ updateFieldAppearances: id !== 'remove-pdf-metadata' }), filename: id + '.pdf', type: 'application/pdf' };
}
