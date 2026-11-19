import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup, PDFOptionList, pushGraphicsState, popGraphicsState, concatTransformationMatrix } from 'pdf-lib';
import { placedMatrix, type Matrix } from './geometry';
export type EditorField = { name: string; kind: 'text' | 'checkbox' | 'select'; value: string | boolean; options?: string[]; readonly: boolean };
export async function readEditorFields(bytes: Uint8Array): Promise<EditorField[]> {
  const document = await PDFDocument.load(bytes);
  return document.getForm().getFields().flatMap<EditorField>(field => {
    const common = { name: field.getName(), readonly: field.isReadOnly() };
    if (field instanceof PDFTextField) return [{ ...common, kind: 'text' as const, value: field.getText() || '' }];
    if (field instanceof PDFCheckBox) return [{ ...common, kind: 'checkbox' as const, value: field.isChecked() }];
    if (field instanceof PDFDropdown || field instanceof PDFRadioGroup || field instanceof PDFOptionList) return [{ ...common, kind: 'select' as const, value: field.getSelected()?.toString() || '', options: field.getOptions() }];
    return [];
  });
}
export async function updateEditorFields(bytes: Uint8Array, values: Record<string, string | boolean>): Promise<Uint8Array> {
  const document = await PDFDocument.load(bytes);
  const form = document.getForm();
  if (form.hasXFA()) throw new Error('Dynamic XFA forms are not supported. Use a standard fillable PDF.');
  const fontkit = (await import('@pdf-lib/fontkit')).default;
  document.registerFontkit(fontkit);
  const response = await fetch('/pdf-editor-assets/Inter-Regular.ttf');
  if (!response.ok) throw new Error('The form font could not load.');
  const font = await document.embedFont(await response.arrayBuffer());
  const supported = new Set(font.getCharacterSet());
  for (const field of form.getFields()) {
    const value = values[field.getName()];
    if (field.isReadOnly() || value === undefined) continue;
    if (field instanceof PDFTextField) {
      const text = String(value);
      if (field.getText() === text) continue;
      if (text.length > 10000 || /[\u0590-\u0fff\u1780-\u17ff]/u.test(text) || ![...text].every(char => /\s/.test(char) || supported.has(char.codePointAt(0)!))) throw new Error('This form value contains characters the editor cannot draw correctly.');
      field.setText(text);
    } else if (field instanceof PDFCheckBox) value ? field.check() : field.uncheck();
    else if ((field instanceof PDFDropdown || field instanceof PDFRadioGroup || field instanceof PDFOptionList) && typeof value === 'string') value ? field.select(value) : field.clear();
  }
  form.updateFieldAppearances(font);
  return document.save();
}
export async function insertEditorImage(bytes: Uint8Array, pageIndex: number, image: Uint8Array, kind: 'png' | 'jpg', view: Matrix, x: number, y: number, width: number, height: number): Promise<Uint8Array> {
  if (!image.length || image.length > 8 * 1024 * 1024) throw new Error('Choose a PNG or JPG smaller than 8 MB.');
  const document = await PDFDocument.load(bytes), page = document.getPage(pageIndex);
  const embedded = kind === 'png' ? await document.embedPng(image) : await document.embedJpg(image);
  if (embedded.width * embedded.height > 16000000) throw new Error('Choose an image smaller than 16 megapixels.');
  if (![x, y, width, height].every(Number.isFinite) || width < 1 || height < 1) throw new Error('Choose a valid image position.');
  page.pushOperators(pushGraphicsState(), concatTransformationMatrix(...placedMatrix(view, x, y + height)));
  page.drawImage(embedded, { x: 0, y: 0, width, height });
  page.pushOperators(popGraphicsState());
  return document.save();
}
