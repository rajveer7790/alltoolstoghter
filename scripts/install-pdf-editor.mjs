// Publish a checksum-pinned, unmodified independent open-source workspace.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import JSZip from 'jszip';

const version = '0.21.1';
const digest = 'fe9708d46af191aebb56f70eb32cf8b112b0b9452d17ae6ba3a8c4a8665fe748';
const url = `https://github.com/storytold/pdfcraft/releases/download/v${version}/pdfcraft-web-${version}.zip`;
const cache = resolve('.cache', `pdfcraft-web-${version}.zip`);
await mkdir(dirname(cache), { recursive: true });
let bytes;
try { bytes = await readFile(cache); } catch {
  const response = await fetch(url, { signal: AbortSignal.timeout(120000) });
  if (!response.ok) throw new Error(`PDF editor download failed: ${response.status}`);
  bytes = Buffer.from(await response.arrayBuffer());
}
if (createHash('sha256').update(bytes).digest('hex') !== digest) throw new Error('PDF editor checksum mismatch. Deployment stopped.');
await writeFile(cache, bytes);
const archive = await JSZip.loadAsync(bytes, { checkCRC32: true });
const prefix = `pdfcraft-web-${version}/`;
const destination = resolve('out/pdf-editor');
await mkdir(destination, { recursive: true });
for (const entry of Object.values(archive.files)) {
  if (entry.dir) continue;
  if (!entry.name.startsWith(prefix)) throw new Error('Unexpected PDF editor archive root');
  const name = entry.name.slice(prefix.length);
  const path = resolve(destination, name);
  if (!path.startsWith(destination + '/') || name.split('/').includes('..')) throw new Error('Invalid PDF editor asset path');
  // The host reads only the root /out/_headers. Keep upstream notices and instructions.
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, await entry.async('nodebuffer'));
}
await writeFile(resolve('out/pdf-editor-version.json'), JSON.stringify({ version, sha256: digest, source: `https://github.com/storytold/pdfcraft/tree/v${version}`, release: url }) + '\n');
console.log(`Published PdfCraft ${version} with verified checksum, licenses and OCR model attribution.`);
