'use client';
import { useState } from 'react';
import { ImageDrop, loadImageFile, rgbToHex } from './imageShared';

/** Extract dominant colors by quantizing pixels into buckets and ranking by frequency. */
function extractPalette(img: HTMLImageElement, count: number): string[] {
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, 120 / Math.max(img.naturalWidth, img.naturalHeight));
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const buckets = new Map<string, { r: number; g: number; b: number; n: number }>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue; // skip transparent
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`; // 4-bit-per-channel bucket
    const cur = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0 };
    cur.r += r; cur.g += g; cur.b += b; cur.n++; buckets.set(key, cur);
  }
  return [...buckets.values()].sort((a, b) => b.n - a.n).slice(0, count)
    .map(c => rgbToHex(Math.round(c.r / c.n), Math.round(c.g / c.n), Math.round(c.b / c.n)));
}

export default function PaletteExtractorWidget() {
  const [colors, setColors] = useState<string[]>([]);
  const [count, setCount] = useState(6);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const run = (i: HTMLImageElement, n: number) => { try { setColors(extractPalette(i, n)); } catch { setError('Could not analyze this image.'); } };
  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setError('');
    try { const i = await loadImageFile(f); setImg(i); run(i, count); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
  };
  const copy = async (c: string) => { try { await navigator.clipboard.writeText(c); setCopied(c); setTimeout(() => setCopied(''), 1200); } catch {} };

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose an image to extract its palette" />
      {img && (
        <div className="field" style={{ marginTop: 14 }}><label htmlFor="pl-n">Colors: {count}</label>
          <input id="pl-n" type="range" min={3} max={10} value={count} onChange={e => { setCount(+e.target.value); run(img, +e.target.value); }} /></div>
      )}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }}>✗ {error}</p>}
      {colors.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          {colors.map(c => (
            <button key={c} type="button" onClick={() => copy(c)} title="Click to copy"
              style={{ flex: '1 1 80px', minWidth: 70, border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', background: '#fff', padding: 0 }}>
              <span style={{ display: 'block', height: 56, background: c }} />
              <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 11, padding: '6px 4px', color: 'var(--ink-2)' }}>{copied === c ? 'copied!' : c}</span>
            </button>
          ))}
        </div>
      )}
      <p className="privacy-note"><span className="dot" />dominant colors computed locally from the image</p>
    </div>
  );
}
