import type { WrappedPdfiumModule } from '@embedpdf/pdfium';
import { boxFromPoints, placedMatrix, transform, type Matrix, type Box } from './geometry';
export type TextRegion = { index: number; text: string; box: Box; size: number; color: string; matrix: Matrix };
export type EditorPage = { width: number; height: number; count: number; regions: TextRegion[]; grouped: boolean; view: Matrix; pixels: Uint8ClampedArray; pixelWidth: number; pixelHeight: number };
export type TextChange = { index?: number; original?: string; text: string; size: number; color: string; x?: number; y?: number; font: 'inter' | 'source' };
export type EditorAction = { kind: 'text'; change: TextChange } | { kind: 'remove-text'; index: number; original: string } | { kind: 'rotate' } | { kind: 'delete-page' } | { kind: 'highlight' | 'rectangle'; box: Box; color: string };
type Engine = Omit<WrappedPdfiumModule, 'pdfium'> & { pdfium: WrappedPdfiumModule['pdfium'] & { HEAPU8: Uint8Array } };
let enginePromise: Promise<Engine> | undefined;
let fontPromise: Promise<Uint8Array> | undefined;
export function initializeEditor(wasmBinary?: ArrayBuffer): Promise<Engine> {
  if (!enginePromise) enginePromise = (async () => {
    const { init } = await import('@embedpdf/pdfium');
    if (!wasmBinary) {
      const response = await fetch('/pdf-editor-assets/pdfium-2.15.1.wasm');
      if (!response.ok) throw new Error('The PDF engine could not load. Refresh the page and try again.');
      wasmBinary = await response.arrayBuffer();
    }
    const module = await init({ wasmBinary });
    module.PDFiumExt_Init();
    return module as Engine;
  })().catch(error => { enginePromise = undefined; throw error; });
  return enginePromise;
}
async function interFont(bytes?: Uint8Array): Promise<Uint8Array> {
  if (bytes) return bytes;
  if (!fontPromise) fontPromise = fetch('/pdf-editor-assets/Inter-Regular.ttf').then(async response => {
    if (!response.ok) throw new Error('The embedded font could not load. Try again.');
    return new Uint8Array(await response.arrayBuffer());
  }).catch(error => { fontPromise = undefined; throw error; });
  return fontPromise;
}
function assert(value: unknown, message: string): asserts value { if (!value) throw new Error(message); }
function rgb(color: string) {
  if (!/^#[0-9a-f]{6}$/i.test(color)) throw new Error('Choose a valid text or shape color.');
  return [1, 3, 5].map(offset => parseInt(color.slice(offset, offset + 2), 16));
}
class Session {
  doc = 0; page = 0; input = 0;
  allocations: number[] = []; fonts: number[] = [];
  constructor(readonly api: Engine, bytes: Uint8Array, pageIndex: number) {
    try {
      assert(bytes.byteLength && bytes.byteLength <= 20 * 1024 * 1024, 'Choose a nonempty PDF smaller than 20 MB.');
      this.input = this.alloc(bytes.byteLength); api.pdfium.HEAPU8.set(bytes, this.input);
      this.doc = api.FPDF_LoadMemDocument(this.input, bytes.length, '');
      if (!this.doc) throw new Error(api.FPDF_GetLastError() === 4 ? 'This PDF needs a password. Unlock an authorized copy first, then open it here.' : 'This PDF is damaged or unsupported. Try a different file.');
      const count = api.FPDF_GetPageCount(this.doc);
      assert(count > 0 && count <= 200, 'Choose a PDF with between 1 and 200 pages.');
      assert(Number.isInteger(pageIndex) && pageIndex >= 0 && pageIndex < count, 'That page is outside this document.');
      this.page = api.FPDF_LoadPage(this.doc, pageIndex);
      assert(this.page, 'This page could not be opened.');
    } catch (error) { this.close(); throw error; }
  }
  alloc(size: number) { const pointer = this.api.pdfium.wasmExports.malloc(size); assert(pointer, 'Not enough memory. Try a smaller document.'); this.allocations.push(pointer); return pointer; }
  getFloat(pointer: number) { return this.api.pdfium.getValue(pointer, 'float') as number; }
  getMatrix(object: number): Matrix {
    const pointer = this.alloc(24);
    assert(this.api.FPDFPageObj_GetMatrix(object, pointer), 'This text has an unsupported transformation.');
    return Array.from({ length: 6 }, (_, i) => this.getFloat(pointer + 4 * i)) as Matrix;
  }
  setMatrix(object: number, matrix: Matrix) {
    const pointer = this.alloc(24);
    matrix.forEach((value, i) => this.api.pdfium.setValue(pointer + 4 * i, value, 'float'));
    assert(this.api.FPDFPageObj_SetMatrix(object, pointer), 'The edit could not be positioned.');
  }
  view(): Matrix {
    const width = this.api.FPDF_GetPageWidth(this.page), height = this.api.FPDF_GetPageHeight(this.page);
    assert(width > 0 && height > 0 && width < 20000 && height < 20000, 'This page size is not supported.');
    const px = this.alloc(4), py = this.alloc(4);
    const map = (x: number, y: number) => {
      assert(this.api.FPDF_PageToDevice(this.page, 0, 0, Math.round(width * 16), Math.round(height * 16), 0, x, y, px, py), 'This page cannot be positioned.');
      return { x: Number(this.api.pdfium.getValue(px, 'i32')) / 16, y: Number(this.api.pdfium.getValue(py, 'i32')) / 16 };
    };
    const origin = map(0, 0), horizontal = map(16, 0), vertical = map(0, 16);
    return [(horizontal.x - origin.x) / 16, (horizontal.y - origin.y) / 16, (vertical.x - origin.x) / 16, (vertical.y - origin.y) / 16, origin.x, origin.y];
  }
  text(object: number, textPage: number) {
    const length = this.api.FPDFTextObj_GetText(object, textPage, 0, 0);
    if (!length || length > 100000) return '';
    const pointer = this.alloc(length);
    this.api.FPDFTextObj_GetText(object, textPage, pointer, length);
    return this.api.pdfium.UTF16ToString(pointer, length).replace(/\r\n?/g, '\n');
  }
  object(index: number, original: string) {
    assert(Number.isInteger(index) && index >= 0 && index < this.api.FPDFPage_CountObjects(this.page), 'Select the text again before editing.');
    const object = this.api.FPDFPage_GetObject(this.page, index);
    assert(object && this.api.FPDFPageObj_GetType(object) === 1, 'Select an editable text object.');
    const textPage = this.api.FPDFText_LoadPage(this.page);
    try { assert(this.text(object, textPage) === original, 'The page changed. Select the text again.'); }
    finally { this.api.FPDFText_ClosePage(textPage); }
    return object;
  }
  generate() { assert(this.api.FPDFPage_GenerateContent(this.page), 'The PDF content could not be updated. Your previous version is still available.'); }
  save() {
    const blocks: Uint8Array[] = []; let size = 0; let overflow = false;
    const callback = this.api.pdfium.addFunction((_writer: number, data: number, length: number) => {
      size += length;
      if (size > 64 * 1024 * 1024) { overflow = true; return 0; }
      blocks.push(this.api.pdfium.HEAPU8.slice(data, data + length)); return 1;
    }, 'iiii');
    const writer = this.alloc(8);
    this.api.pdfium.setValue(writer, 1, 'i32'); this.api.pdfium.setValue(writer + 4, callback, 'i32');
    try {
      assert(this.api.FPDF_SaveAsCopy(this.doc, writer, 2) && !overflow, 'The edited file exceeds the download limit or could not be saved.');
      const output = new Uint8Array(size); let cursor = 0;
      for (const block of blocks) { output.set(block, cursor); cursor += block.length; }
      return output;
    } finally { this.api.pdfium.removeFunction(callback); }
  }
  close() {
    if (this.page) this.api.FPDF_ClosePage(this.page);
    for (const font of this.fonts) this.api.FPDFFont_Close(font);
    if (this.doc) this.api.FPDF_CloseDocument(this.doc);
    for (const pointer of this.allocations) this.api.pdfium.wasmExports.free(pointer);
    this.doc = this.page = 0; this.allocations = []; this.fonts = [];
  }
}
export async function inspectEditorPage(bytes: Uint8Array, pageIndex: number, scale = 1.5): Promise<EditorPage> {
  const api = await initializeEditor(), session = new Session(api, bytes, pageIndex);
  let textPage = 0, bitmap = 0, form = 0;
  try {
    const width = api.FPDF_GetPageWidth(session.page), height = api.FPDF_GetPageHeight(session.page), view = session.view();
    scale = Math.max(.25, Math.min(scale, 2, Math.sqrt(8000000 / (width * height))));
    const pixelWidth = Math.max(1, Math.ceil(width * scale)), pixelHeight = Math.max(1, Math.ceil(height * scale));
    bitmap = api.FPDFBitmap_Create(pixelWidth, pixelHeight, 1);
    assert(bitmap, 'The page is too large to preview.');
    api.FPDFBitmap_FillRect(bitmap, 0, 0, pixelWidth, pixelHeight, 0xffffffff);
    api.FPDF_RenderPageBitmap(bitmap, session.page, 0, 0, pixelWidth, pixelHeight, 0, 1);
    const formInfo = session.alloc(256); api.pdfium.HEAPU8.fill(0, formInfo, formInfo + 256); api.pdfium.setValue(formInfo, 2, 'i32');
    form = api.FPDFDOC_InitFormFillEnvironment(session.doc, formInfo);
    if (form) { api.FORM_OnAfterLoadPage(session.page, form); api.FPDF_FFLDraw(form, bitmap, session.page, 0, 0, pixelWidth, pixelHeight, 0, 1); }
    const pixels = new Uint8ClampedArray(pixelWidth * pixelHeight * 4), start = api.FPDFBitmap_GetBuffer(bitmap), stride = api.FPDFBitmap_GetStride(bitmap);
    for (let y = 0; y < pixelHeight; y++) for (let x = 0; x < pixelWidth; x++) {
      const source = start + y * stride + x * 4, target = (y * pixelWidth + x) * 4;
      pixels[target] = api.pdfium.HEAPU8[source + 2]; pixels[target + 1] = api.pdfium.HEAPU8[source + 1]; pixels[target + 2] = api.pdfium.HEAPU8[source]; pixels[target + 3] = api.pdfium.HEAPU8[source + 3];
    }
    textPage = api.FPDFText_LoadPage(session.page);
    const regions: TextRegion[] = []; let grouped = false;
    const pointer = session.alloc(32);
    for (let index = 0; index < api.FPDFPage_CountObjects(session.page); index++) {
      const object = api.FPDFPage_GetObject(session.page, index), type = api.FPDFPageObj_GetType(object);
      if (type === 5) grouped = true;
      if (type !== 1 || regions.length >= 1500) continue;
      // Invisible OCR text is not the visible scan: never pretend changing it removes printed words.
      if ([3, 7].includes(api.FPDFTextObj_GetTextRenderMode(object))) continue;
      const text = session.text(object, textPage);
      if (!text.trim() || !api.FPDFPageObj_GetBounds(object, pointer, pointer + 4, pointer + 8, pointer + 12)) continue;
      const [left, bottom, right, top] = [0, 4, 8, 12].map(offset => session.getFloat(pointer + offset));
      const box = boxFromPoints([{ x: left, y: bottom }, { x: left, y: top }, { x: right, y: bottom }, { x: right, y: top }].map(point => transform(view, point)));
      api.FPDFTextObj_GetFontSize(object, pointer + 16); const size = session.getFloat(pointer + 16);
      let color = '#17202e';
      if (api.FPDFPageObj_GetFillColor(object, pointer, pointer + 4, pointer + 8, pointer + 12)) color = '#' + [0, 4, 8].map(offset => Number(api.pdfium.getValue(pointer + offset, 'i32')).toString(16).padStart(2, '0')).join('');
      if (box.width > 0 && box.height > 0) regions.push({ index, text, box, size, color, matrix: session.getMatrix(object) });
    }
    return { width, height, count: api.FPDF_GetPageCount(session.doc), regions, grouped, view, pixels, pixelWidth, pixelHeight };
  } finally {
    if (form) { api.FORM_OnBeforeClosePage(session.page, form); api.FPDFDOC_ExitFormFillEnvironment(form); }
    if (textPage) api.FPDFText_ClosePage(textPage);
    if (bitmap) api.FPDFBitmap_Destroy(bitmap);
    session.close();
  }
}
export async function applyEditorAction(bytes: Uint8Array, pageIndex: number, action: EditorAction, suppliedFont?: Uint8Array): Promise<Uint8Array> {
  const api = await initializeEditor(), session = new Session(api, bytes, pageIndex);
  try {
    if (action.kind === 'delete-page') {
      assert(api.FPDF_GetPageCount(session.doc) > 1, 'Keep at least one page in the PDF.');
      api.FPDF_ClosePage(session.page); session.page = 0; api.FPDFPage_Delete(session.doc, pageIndex); return session.save();
    }
    if (action.kind === 'rotate') { api.FPDFPage_SetRotation(session.page, (api.FPDFPage_GetRotation(session.page) + 1) % 4); return session.save(); }
    if (action.kind === 'remove-text') {
      const object = session.object(action.index, action.original);
      assert(api.FPDFPage_RemoveObject(session.page, object), 'This text object cannot be removed.');
      api.FPDFPageObj_Destroy(object); session.generate(); return session.save();
    }
    const view = session.view();
    if (action.kind === 'highlight' || action.kind === 'rectangle') {
      const box = action.box;
      assert([box.x, box.y, box.width, box.height].every(Number.isFinite) && box.width >= 2 && box.height >= 2, 'Drag a larger area on the page.');
      const object = api.FPDFPageObj_CreateNewRect(0, 0, box.width, box.height);
      assert(object, 'The shape could not be created.');
      try {
        session.setMatrix(object, placedMatrix(view, box.x, box.y + box.height));
        const [r, g, b] = rgb(action.color);
        api.FPDFPageObj_SetFillColor(object, r, g, b, action.kind === 'highlight' ? 70 : 0);
        api.FPDFPageObj_SetStrokeColor(object, r, g, b, 255); api.FPDFPageObj_SetStrokeWidth(object, 1.5);
        api.FPDFPath_SetDrawMode(object, action.kind === 'highlight' ? 2 : 0, action.kind === 'rectangle');
        if (action.kind === 'highlight') api.FPDFPageObj_SetBlendMode(object, 'Multiply');
        api.FPDFPage_InsertObject(session.page, object);
      } catch (error) { api.FPDFPageObj_Destroy(object); throw error; }
      session.generate(); return session.save();
    }
    assert(action.kind === 'text', 'Choose a supported editing action.');
    const change = action.change;
    assert(change.text.trim() && change.text.length <= 2000, 'Enter between 1 and 2,000 characters.');
    const text = change.text.replace(/\r\n|[\r\u0085\u2028\u2029]/g, '\n').replace(/[^\S\n]/g, ' ');
    assert(Number.isFinite(change.size) && change.size >= .1 && change.size <= 1000, 'Choose a font size between 0.1 and 1,000 points.');
    assert(!/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(change.text), 'Remove unsupported control characters from the text.');
    // PDFium's simple text API does not perform complex-script shaping.
    assert(!/[\u0590-\u0fff\u1780-\u17ff\u200c\u200d]/u.test(change.text), 'This editor does not yet shape this writing system correctly. Keep that original text unchanged.');
    const original = change.index === undefined ? 0 : session.object(change.index, change.original || '');
    let matrix: Matrix, font: number;
    if (original) matrix = session.getMatrix(original);
    else {
      assert(Number.isFinite(change.x) && Number.isFinite(change.y), 'Click a position on the page first.');
      matrix = placedMatrix(view, change.x!, change.y!);
    }
    if (change.font === 'source' && original) {
      font = api.FPDFTextObj_GetFont(original);
      const known = new Set<string>(), textPage = api.FPDFText_LoadPage(session.page);
      try {
        for (let i = 0; i < api.FPDFPage_CountObjects(session.page); i++) {
          const object = api.FPDFPage_GetObject(session.page, i);
          if (api.FPDFPageObj_GetType(object) === 1 && api.FPDFTextObj_GetFont(object) === font) for (const char of session.text(object, textPage)) known.add(char);
        }
      } finally { api.FPDFText_ClosePage(textPage); }
      assert([...text].every(char => /\s/.test(char) || known.has(char)), 'The source font may not contain these new characters. Choose Inter to embed a complete font.');
    } else {
      const fontBytes = await interFont(suppliedFont);
      const { default: fontkit } = await import('@pdf-lib/fontkit');
      const face = fontkit.create(fontBytes);
      assert([...text].every(char => /\s/.test(char) || face.hasGlyphForCodePoint(char.codePointAt(0)!)), 'Inter cannot draw one or more characters. Keep the original text or use another document workflow.');
      const pointer = session.alloc(fontBytes.byteLength); api.pdfium.HEAPU8.set(fontBytes, pointer);
      font = api.FPDFText_LoadFont(session.doc, pointer, fontBytes.length, 2, true);
      assert(font, 'The replacement font could not be embedded.'); session.fonts.push(font);
    }
    const [r, g, b] = rgb(change.color);
    const objects: number[] = [];
    try {
      text.split('\n').forEach((line, index) => {
        if (!line) return;
        const object = api.FPDFPageObj_CreateTextObj(session.doc, font, change.size); assert(object, 'The text could not be created.'); objects.push(object);
        const pointer = session.alloc((line.length + 1) * 2); api.pdfium.stringToUTF16(line, pointer, (line.length + 1) * 2);
        assert(api.FPDFText_SetText(object, pointer), 'The font could not encode this text.');
        const position: Matrix = [...matrix]; position[4] -= index * change.size * 1.3 * matrix[2]; position[5] -= index * change.size * 1.3 * matrix[3];
        session.setMatrix(object, position); api.FPDFPageObj_SetFillColor(object, r, g, b, 255);
      });
    } catch (error) { objects.forEach(object => api.FPDFPageObj_Destroy(object)); throw error; }
    // Remove the actual original object only after the replacement has been built.
    // There is no white cover and no hidden duplicate text underneath.
    if (original) {
      if (!api.FPDFPage_RemoveObject(session.page, original)) { objects.forEach(object => api.FPDFPageObj_Destroy(object)); throw new Error('This original text object cannot be replaced.'); }
      api.FPDFPageObj_Destroy(original);
    }
    for (const object of objects) api.FPDFPage_InsertObject(session.page, object);
    session.generate(); return session.save();
  } finally { session.close(); }
}
