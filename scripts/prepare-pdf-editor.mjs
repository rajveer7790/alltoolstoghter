// Engine helpers only. No third-party editor UI, branding, launcher or OCR app.
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const folder = resolve('public/pdf-editor-assets');
await mkdir(folder, { recursive: true });
const engine = dirname(dirname(require.resolve('@embedpdf/pdfium/pdfium.wasm')));
for (const [source, target] of [
  ['dist/pdfium.wasm', 'pdfium-2.15.1.wasm'],
  ['LICENSE', 'LICENSE-embedpdf.txt'],
  ['LICENSE.pdfium', 'LICENSE-pdfium.txt'],
]) await copyFile(resolve(engine, source), resolve(folder, target));
for (const [source, target, hash] of [
  ['Inter-Regular.ttf', 'Inter-Regular.ttf', '40d692fce188e4471e2b3cba937be967878f631ad3ebbbdcd587687c7ebe0c82'],
  ['OFL-Inter.txt', 'LICENSE-Inter.txt', '262481e844521b326f5ecd053e59b98c8b2da78c8ee1bdbb6e8174305e54935a'],
]) {
  const output = resolve(folder, target);
  let bytes = await readFile(output).catch(() => null);
  if (!bytes || createHash('sha256').update(bytes).digest('hex') !== hash) {
    const response = await fetch('https://raw.githubusercontent.com/storytold/pdfcraft/v0.21.1/assets/fonts/' + source, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error('Could not fetch the pinned editor font: ' + response.status);
    bytes = Buffer.from(await response.arrayBuffer());
    if (createHash('sha256').update(bytes).digest('hex') !== hash) throw new Error('Editor font checksum mismatch');
    await writeFile(output, bytes);
  }
}
await writeFile(resolve(folder, 'sources.json'), JSON.stringify({
  interface: 'All Tools Together, original React interface',
  engine: { name: '@embedpdf/pdfium', version: '2.15.1', source: 'https://github.com/embedpdf/embed-pdf-viewer', license: 'MIT; PDFium and component notices retained' },
  font: { name: 'Inter Regular', source: 'https://github.com/storytold/pdfcraft/tree/v0.21.1/assets/fonts', license: 'SIL Open Font License 1.1', sha256: '40d692fce188e4471e2b3cba937be967878f631ad3ebbbdcd587687c7ebe0c82' },
}) + '\n');
console.log('Prepared the PDFium engine, embedded Inter font and notices for our editor.');
