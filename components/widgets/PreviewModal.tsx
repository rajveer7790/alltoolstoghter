'use client';
import { useEffect, useState } from 'react';

export type PreviewFile = {
  blob: Blob;
  filename: string;
  label?: string;
};

export type PreviewData = PreviewFile & {
  /** Multiple outputs (e.g. split PDF). When set, user picks which file to preview/download. */
  files?: PreviewFile[];
};

function isTextMime(type: string) {
  return type.startsWith('text/') || type === 'application/xml' || type === 'application/json';
}

export default function PreviewModal({ data, onClose }: { data: PreviewData | null; onClose: () => void }) {
  const [url, setUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const active: PreviewFile | null = data
    ? (data.files && data.files.length > 0 ? data.files[activeIdx] : data)
    : null;

  useEffect(() => {
    if (!data) {
      setUrl(null);
      setTextContent(null);
      setActiveIdx(0);
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [data]);

  useEffect(() => {
    if (!active) {
      setUrl(null);
      setTextContent(null);
      return;
    }
    const u = URL.createObjectURL(active.blob);
    setUrl(u);

    if (isTextMime(active.blob.type)) {
      active.blob.text().then(setTextContent).catch(() => setTextContent(null));
    } else {
      setTextContent(null);
    }

    return () => URL.revokeObjectURL(u);
  }, [active?.blob, active?.filename]);

  if (!data || !active || !url) return null;

  const isPdf = active.blob.type === 'application/pdf';
  const isImage = active.blob.type.startsWith('image/');
  const isSvg = active.blob.type === 'image/svg+xml';
  const isText = isTextMime(active.blob.type);
  const isZip = active.blob.type === 'application/zip' || active.filename.endsWith('.zip');
  const multi = data.files && data.files.length > 1;

  const handleDownload = (file?: PreviewFile) => {
    const target = file ?? active;
    const u = URL.createObjectURL(target.blob);
    const a = document.createElement('a');
    a.href = u;
    a.download = target.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
    if (!multi) onClose();
  };

  const downloadAll = () => {
    if (!data.files) return;
    data.files.forEach((f, i) => setTimeout(() => handleDownload(f), i * 200));
    onClose();
  };

  const typeLabel = isPdf ? 'PDF' : isImage || isSvg ? 'Image' : isText ? 'File' : isZip ? 'Archive' : 'File';

  return (
    <div className="preview-overlay" role="dialog" aria-modal="true" aria-label="Preview generated file">
      <div className="preview-dialog">
        <div className="preview-header">
          <div>
            <h3>Preview before download</h3>
            <div className="preview-meta">
              {active.label || active.filename} &bull; {(active.blob.size / 1024).toFixed(1)} KB
              {multi && ` &bull; ${data.files!.length} files`}
            </div>
          </div>
          <button type="button" className="preview-close" onClick={onClose} aria-label="Close preview">&times;</button>
        </div>

        {multi && (
          <div className="preview-tabs" role="tablist">
            {data.files!.map((f, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                className={`preview-tab${i === activeIdx ? ' on' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                {f.label || f.filename}
              </button>
            ))}
          </div>
        )}

        <div className="preview-body">
          {isPdf ? (
            <iframe src={`${url}#toolbar=0`} className="preview-iframe" title="PDF preview" />
          ) : isImage && !isSvg ? (
            <img src={url} alt="Preview" className="preview-img" />
          ) : isSvg ? (
            <img src={url} alt="SVG preview" className="preview-img" />
          ) : isText && textContent !== null ? (
            <pre className="preview-text">{textContent}</pre>
          ) : isZip ? (
            <div className="preview-zip">
              <p><strong>{active.filename}</strong> is ready.</p>
              <p>Archive size: {(active.blob.size / 1024).toFixed(1)} KB</p>
              {data.files && data.files.length > 1 && (
                <ul>{data.files.map((f, i) => <li key={i}>{f.label || f.filename}</li>)}</ul>
              )}
            </div>
          ) : (
            <p className="preview-fallback">Preview not available for this file type. You can still download it.</p>
          )}
        </div>

        <div className="preview-footer">
          <button type="button" className="btn" onClick={onClose}>Discard</button>
          {multi && (
            <button type="button" className="btn" onClick={downloadAll}>Download all ({data.files!.length})</button>
          )}
          <button type="button" className="btn btn-primary" onClick={() => handleDownload()}>
            Download {typeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}