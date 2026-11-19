import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';
import { initializeEditor, inspectEditorPage, applyEditorAction } from '../lib/pdf-editor/engine';
import { readEditorFields, insertEditorImage } from '../lib/pdf-editor/documents';
import { newHistory, commitHistory } from '../lib/pdf-editor/history';
import { transform, inverse, type Matrix } from '../lib/pdf-editor/geometry';
const png = Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==', 'base64'));
let fontBytes: Uint8Array;
before(async () => {
  const bytes = await readFile('public/pdf-editor-assets/pdfium-2.15.1.wasm');
  await initializeEditor(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  fontBytes = await readFile('public/pdf-editor-assets/Inter-Regular.ttf');
});
async function fixture() {
  const pdf = await PDFDocument.create(), font = await pdf.embedFont(StandardFonts.Helvetica);
  const first = pdf.addPage([400, 500]);
  first.drawRectangle({ x: 20, y: 390, width: 300, height: 70, color: rgb(.8, .9, 1) });
  first.drawText('Original invoice', { x: 40, y: 420, size: 18, font });
  const field = pdf.getForm().createTextField('email'); field.setText('old@example.test'); field.addToPage(first, { x: 40, y: 50, width: 240, height: 25 });
  const second = pdf.addPage([400, 500]); second.drawText('Rotated original', { x: 70, y: 300, size: 16, font });
  second.setCropBox(30, 40, 300, 360); second.setRotation(degrees(90));
  return pdf.save();
}
test('real text replacement removes the old text object, embeds new glyphs and preserves the other page', async () => {
  const original = await fixture(), page = await inspectEditorPage(original, 0);
  const region = page.regions.find(r => r.text === 'Original invoice')!;
  assert.ok(region); assert.equal(region.size, 18);
  const edited = await applyEditorAction(original, 0, { kind: 'text', change: { index: region.index, original: region.text, text: 'Updated € invoice', size: 18, color: '#163879', font: 'inter' } }, fontBytes);
  const reopened = await inspectEditorPage(edited, 0), other = await inspectEditorPage(edited, 1);
  assert.ok(reopened.regions.some(r => r.text === 'Updated € invoice'));
  assert.ok(!reopened.regions.some(r => r.text.includes('Original')));
  assert.ok(other.regions.some(r => r.text === 'Rotated original'));
  assert.equal(reopened.count, 2); assert.notDeepEqual(reopened.pixels, page.pixels);
  const changed = reopened.regions.find(r => r.text === 'Updated € invoice')!;
  assert.ok(Math.abs(changed.box.x - region.box.x) < 3);
  assert.equal(changed.color, '#163879');
});
test('typing on a scan and a rotated cropped page is available without an original text selection', async () => {
  let bytes = await fixture();
  const before = await inspectEditorPage(bytes, 1);
  bytes = await applyEditorAction(bytes, 1, { kind: 'text', change: { text: 'Added to rotated page', size: 12, color: '#000000', font: 'inter', x: 30, y: 70 } }, fontBytes);
  const result = await inspectEditorPage(bytes, 1), added = result.regions.find(r => r.text === 'Added to rotated page')!;
  assert.ok(added); assert.ok(Math.abs(added.box.x - 30) < 4); assert.ok(Math.abs(added.box.y - 58) < 8);
  assert.equal(result.width, before.width); assert.equal(result.height, before.height);
  const scan = await PDFDocument.create(), image = await scan.embedPng(png);
  scan.addPage([300, 400]).drawImage(image, { x: 20, y: 20, width: 100, height: 100 });
  const source = await scan.save(); assert.equal((await inspectEditorPage(source, 0)).regions.length, 0);
  const withText = await applyEditorAction(source, 0, { kind: 'text', change: { text: 'New scan note', size: 14, color: '#000000', font: 'inter', x: 30, y: 60 } }, fontBytes);
  assert.equal((await inspectEditorPage(withText, 0)).regions[0].text, 'New scan note');
});
test('original text deletion does not paint over the colored page background', async () => {
  const source = await fixture(), page = await inspectEditorPage(source, 0), region = page.regions[0];
  const removed = await applyEditorAction(source, 0, { kind: 'remove-text', index: region.index, original: region.text });
  const reopened = await inspectEditorPage(removed, 0);
  assert.equal(reopened.regions.length, 0);
  const x = Math.round(80 * reopened.pixelWidth / reopened.width), y = Math.round(70 * reopened.pixelHeight / reopened.height);
  const offset = (y * reopened.pixelWidth + x) * 4;
  assert.ok(reopened.pixels[offset] < 230 && reopened.pixels[offset + 2] > 240, 'The blue page background remains; there is no white cover rectangle.');
});
test('source subset limitations and unsupported scripts fail without changing the input', async () => {
  const source = await fixture(), region = (await inspectEditorPage(source, 0)).regions[0];
  await assert.rejects(applyEditorAction(source, 0, { kind: 'text', change: { index: region.index, original: region.text, text: '@ unknown glyph', font: 'source', size: 18, color: '#000000' } }), /source font/);
  await assert.rejects(applyEditorAction(source, 0, { kind: 'text', change: { text: 'नमस्ते', font: 'inter', size: 16, color: '#000000', x: 30, y: 60 } }, fontBytes), /shape/);
  assert.equal((await inspectEditorPage(source, 0)).regions[0].text, 'Original invoice');
  await assert.rejects(inspectEditorPage(new Uint8Array([1,2,3]), 0), /damaged|unsupported/);
});
test('source text with a scaled matrix keeps its font size and placement when replaced', async () => {
  const pdf = await PDFDocument.create(), font = await pdf.embedFont(StandardFonts.Helvetica), page = pdf.addPage([400,500]);
  page.drawText('Scaled source', { x: 2, y: 20, font, size: 1 }); page.scaleContent(18,18);
  const source = await pdf.save(), before = (await inspectEditorPage(source, 0)).regions[0];
  assert.equal(before.size, 1);
  const next = await applyEditorAction(source, 0, { kind: 'text', change: { index: before.index, original: before.text, text: 'Scaled change', font: 'inter', size: before.size, color: '#000000' } }, fontBytes);
  const after = (await inspectEditorPage(next, 0)).regions[0];
  assert.equal(after.size, 1); assert.ok(after.box.height < before.box.height * 2); assert.ok(Math.abs(after.box.x - before.box.x) < 3);
});
test('page rotation, deletion, highlights and images produce reopenable PDFs', async () => {
  const source = await fixture(), original = await inspectEditorPage(source, 0);
  const rotated = await applyEditorAction(source, 0, { kind: 'rotate' });
  const rotatedView = await inspectEditorPage(rotated, 0);
  assert.equal(rotatedView.width, original.height); assert.equal(rotatedView.height, original.width);
  let next = await applyEditorAction(source, 0, { kind: 'highlight', box: { x: 30, y: 55, width: 200, height: 30 }, color: '#ffff00' });
  const marked = await inspectEditorPage(next, 0); assert.notDeepEqual(marked.pixels, original.pixels);
  next = await insertEditorImage(next, 0, png, 'png', marked.view, 50, 200, 60, 60);
  assert.notDeepEqual((await inspectEditorPage(next, 0)).pixels, marked.pixels);
  next = await applyEditorAction(next, 1, { kind: 'delete-page' });
  assert.equal((await inspectEditorPage(next, 0)).count, 1);
  await assert.rejects(applyEditorAction(next, 0, { kind: 'delete-page' }), /at least one/);
});
test('grouped source artwork remains intact and standard forms are detected', async () => {
  const source = await fixture(), grouped = await PDFDocument.create();
  const [embedded] = await grouped.embedPdf(source, [1]); grouped.addPage([400,500]).drawPage(embedded);
  const result = await inspectEditorPage(await grouped.save(), 0);
  assert.equal(result.grouped, true); assert.equal(result.regions.length, 0);
  const fields = await readEditorFields(source);
  assert.deepEqual(fields.map(f => [f.name, f.value]), [['email', 'old@example.test']]);
});
test('undo branching retains original bytes and keeps the history memory bounded', () => {
  const original = new Uint8Array([1]), first = new Uint8Array([2]), second = new Uint8Array([3]);
  const history = commitHistory(commitHistory(newHistory(original), first), second);
  const undo = { ...history, cursor: 1 };
  const changed = commitHistory(undo, new Uint8Array([4]));
  assert.deepEqual(changed.versions.map(b => b[0]), [1,2,4]); assert.equal(original[0], 1);
  let many = newHistory(original); for (let i = 0; i < 30; i++) many = commitHistory(many, new Uint8Array([i]));
  assert.equal(many.versions.length, 20);
});
test('coordinate transforms invert cropped and rotated page coordinates', () => {
  for (const matrix of [[1,0,0,-1,-30,460], [0,1,1,0,-40,-30], [-1,0,0,1,400,-40]] as Matrix[]) {
    const source = { x: 44.25, y: 120.5 }, result = transform(inverse(matrix), transform(matrix, source));
    assert.ok(Math.abs(result.x - source.x) < 1e-6 && Math.abs(result.y - source.y) < 1e-6);
  }
});
