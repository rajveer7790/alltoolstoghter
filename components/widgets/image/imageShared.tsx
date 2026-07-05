'use client';
import { useState } from 'react';
export { default as PreviewModal, type PreviewData } from '../PreviewModal';

/** Load an image File into a fully-decoded HTMLImageElement. */
export function loadImageFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read this image.')); };
    img.src = url;
  });
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Export failed.'))), type, quality);
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(2)} MB`;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}
export function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0; const l = (max + min) / 2;
  const d = max - min; const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) { if (max === r) h = ((g - b) / d) % 6; else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h = (h * 60 + 360) % 360; }
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/** Drag-and-drop image picker. */
export function ImageDrop({ multiple, onFiles, label = 'Choose an image' }: { multiple?: boolean; onFiles: (f: File[]) => void; label?: string }) {
  const [over, setOver] = useState(false);
  return (
    <label
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); onFiles(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))); }}
      style={{
        display: 'block', border: `2px dashed ${over ? 'var(--signal)' : 'var(--line)'}`,
        background: over ? 'rgba(11,95,255,0.05)' : 'var(--paper)', borderRadius: 12,
        padding: '34px 20px', textAlign: 'center', cursor: 'pointer', color: 'var(--ink-2)',
      }}
    >
      <input type="file" accept="image/*" multiple={multiple} hidden
        onChange={e => { onFiles(Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'))); e.target.value = ''; }} />
      <div style={{ fontSize: 26, marginBottom: 8 }} aria-hidden="true">🖼</div>
      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
      <div style={{ fontSize: 13, marginTop: 4 }}>or drag &amp; drop here</div>
    </label>
  );
}
