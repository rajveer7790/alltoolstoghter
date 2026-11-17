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
const destination = resolve('out/pdf-editor/app');
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
// Keep the upstream app unchanged. A small independent launcher prevents a blank
// canvas on browsers without WebGL and offers the non-graphics local tools.
const launcher = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>PDF Editor | All Tools Together</title><style>body{margin:0;background:#fafaf7;color:#16181d;font:16px/1.6 system-ui}main{max-width:640px;margin:12vh auto;padding:24px}h1{font-size:36px;line-height:1.15;letter-spacing:-.03em}a{color:#0847bc}nav{display:flex;gap:16px;flex-wrap:wrap}.note{color:#4b4f58}button{padding:10px 16px;font:inherit}</style><main><a href="/document-studio">All Tools Together / Document Studio</a><h1>Opening your PDF workspace…</h1><p id="status" role="status">Checking browser graphics support. Your files are not uploaded.</p><nav><a href="/document-studio">Local document tools</a><a href="/pdf">PDF tools</a></nav><p class="note">Powered by PdfCraft ${version}. <a href="app/NOTICE">Notices</a> · <a href="/open-source">Source and licenses</a></p></main><script>(function(){var supported=false;try{var c=document.createElement('canvas');supported=!!(c.getContext('webgl2')||c.getContext('webgl'));}catch(e){}if(supported){document.documentElement.dataset.editorState='supported';location.replace(new URL('app/',location.href).href);}else{document.documentElement.dataset.editorState='unsupported';document.querySelector('h1').textContent='Use local PDF tools in this browser';document.getElementById('status').textContent='This browser does not provide the graphics support required by the full PDF editor. You can still merge, split, crop, annotate and organize PDFs with the local document tools. The full editor can run in a browser with WebGL support.';}})();</script></html>`;
await writeFile(resolve('out/pdf-editor/index.html'), launcher);
await writeFile(resolve('out/pdf-editor-version.json'), JSON.stringify({ version, sha256: digest, source: `https://github.com/storytold/pdfcraft/tree/v${version}`, release: url }) + '\n');
console.log(`Published PdfCraft ${version} with verified checksum, licenses and OCR model attribution.`);
