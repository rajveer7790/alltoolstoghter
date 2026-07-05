'use client';
import { useState } from 'react';
import PreviewModal, { type PreviewData } from './PreviewModal';

/** Preview-then-download for text/XML/config file outputs. */
export default function TextDownloadButton({
  content,
  filename,
  mime = 'text/plain',
  label,
}: {
  content: string;
  filename: string;
  mime?: string;
  label?: string;
}) {
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const open = () => {
    setPreview({
      blob: new Blob([content], { type: mime }),
      filename,
    });
  };

  return (
    <>
      <button type="button" className="btn" onClick={open} disabled={!content.trim()}>
        {label || `Preview & Download ${filename}`}
      </button>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </>
  );
}