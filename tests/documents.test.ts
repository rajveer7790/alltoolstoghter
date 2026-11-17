import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { processLocalDocument } from '../lib/documents/local';
import { DOCUMENT_TOOLS, BENTO_TOOLS } from '../lib/documents/catalog';
import { bySlug } from '../lib/registry';
import { isIndexableTool } from '../lib/toolPolicy';

const source = async () => {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  for (const width of [300, 400, 500]) pdf.addPage([width, 600]).drawText('Document ' + width, { font, x: 20, y: 500 });
  pdf.setAuthor('Original author');
  const form = pdf.getForm();
  const field = form.createTextField('email'); field.setText('old@example.test'); field.addToPage(pdf.getPages()[0]);
  const bytes = await pdf.save();
  return { arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer };
};
const result = async (id: string, values: Record<string, unknown> = {}, second = false) => {
  const file = await source();
  return PDFDocument.load((await processLocalDocument(id, second ? [file, file] : [file], values)).bytes);
};

test('document inventory is unique and routes resolve; pending servers are excluded from indexing', () => {
  assert.equal(new Set(DOCUMENT_TOOLS.map(t => t.id)).size, DOCUMENT_TOOLS.length);
  assert.equal(new Set(BENTO_TOOLS.map(t => t.id)).size, BENTO_TOOLS.length);
  for (const tool of DOCUMENT_TOOLS.filter(t => t.page)) {
    const page = bySlug.get(tool.id)!;
    assert.ok(page, tool.id);
    assert.equal(page.dataset, tool.id);
    if (tool.mode === 'server' && process.env.NEXT_PUBLIC_DOCUMENTS_READY !== 'true') assert.equal(isIndexableTool(page), false);
  }
});
test('local organization preserves page dimensions, counts and ordering', async () => {
  assert.deepEqual((await result('reverse-pdf-pages')).getPages().map(p => p.getWidth()), [500, 400, 300]);
  assert.equal((await result('add-blank-pdf-page', { after: 1 })).getPageCount(), 4);
  assert.deepEqual((await result('alternate-merge-pdf', {}, true)).getPages().map(p => p.getWidth()), [300,300,400,400,500,500]);
  assert.equal((await result('n-up-pdf', { perSheet: '2' })).getPageCount(), 2);
  assert.equal((await result('n-up-pdf', { perSheet: '4' })).getPageCount(), 1);
  assert.equal((await result('pdf-booklet')).getPageCount(), 2);
  assert.equal((await result('resize-pdf-pages', { size: 'Letter' })).getPages()[0].getWidth(), 612);
});
test('forms are filled and flattened, standard metadata is removed', async () => {
  const filled = await result('fill-pdf-forms', { values: JSON.stringify({ email: 'new@example.test' }) });
  assert.equal(filled.getForm().getTextField('email').getText(), 'new@example.test');
  assert.equal((await result('flatten-pdf-forms')).getForm().getFields().length, 0);
  assert.equal((await result('remove-pdf-metadata')).getAuthor(), undefined);
});
test('cropping changes visible boxes and rejects impossible margins', async () => {
  const cropped = await result('crop-pdf', { top: 10, right: 20, bottom: 30, left: 40, pages: '1' });
  assert.deepEqual(cropped.getPages()[0].getCropBox(), { x: 40, y: 30, width: 240, height: 560 });
  assert.equal(cropped.getPages()[1].getCropBox().width, 400);
  await assert.rejects(result('crop-pdf', { left: 1000 }), /whole visible page/);
  await assert.rejects(result('crop-pdf', { pages: '0' }), /outside/);
});
test('text annotation validates page positions and unsupported operations fail explicitly', async () => {
  assert.equal((await result('annotate-pdf', { text: 'Reviewed', x: 20, y: 20, fontSize: 14 })).getPageCount(), 3);
  await assert.rejects(result('annotate-pdf', { text: 'Reviewed', x: 20, y: 9999, fontSize: 14 }), /outside/);
  await assert.rejects(result('unknown-operation'), /not supported/);
});
