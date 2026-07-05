'use client';
import { useCallback, useRef, useState } from 'react';
export { default as PreviewModal, type PreviewData } from './PreviewModal';

export function downloadBlob(bytes: Uint8Array | Blob, filename: string, type = 'application/pdf') {
  const blob = bytes instanceof Blob ? bytes : new Blob([bytes], { type });
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

/** Reusable drag-and-drop file picker. */
export function FileDrop({ accept, multiple, onFiles, label }: {
  accept: string; multiple?: boolean; onFiles: (files: File[]) => void; label: string;
}) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handle = useCallback((list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list);
    onFiles(multiple ? arr : arr.slice(0, 1));
  }, [multiple, onFiles]);

  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      style={{
        border: `2px dashed ${over ? 'var(--signal)' : 'var(--line)'}`,
        background: over ? 'rgba(11,95,255,0.05)' : 'var(--paper)',
        borderRadius: 12, padding: '34px 20px', textAlign: 'center', cursor: 'pointer',
        transition: 'all .15s ease', color: 'var(--ink-2)',
      }}
    >
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} hidden
        onChange={e => { handle(e.target.files); e.target.value = ''; }} />
      <div style={{ fontSize: 26, marginBottom: 8 }} aria-hidden="true">⬆</div>
      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
      <div style={{ fontSize: 13, marginTop: 4 }}>or drag &amp; drop here</div>
    </div>
  );
}

/** Shared status line for processing/error feedback. */
export function StatusLine({ busy, error, ok }: { busy?: boolean; error?: string; ok?: string }) {
  if (busy) return <p style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 12 }} aria-live="polite">Processing…</p>;
  if (error) return <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 12 }} aria-live="polite">✗ {error}</p>;
  if (ok) return <p style={{ fontSize: 13.5, color: '#047857', marginTop: 12 }} aria-live="polite">✓ {ok}</p>;
  return null;
}
