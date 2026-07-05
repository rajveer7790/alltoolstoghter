'use client';
import { useState } from 'react';
import { ImageDrop, formatBytes } from './imageShared';

export default function ImageToBase64Widget() {
  const [dataUri, setDataUri] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const pick = (fs: File[]) => {
    const f = fs[0]; if (!f) return; setError(''); setName(f.name); setSize(f.size);
    const reader = new FileReader();
    reader.onload = () => setDataUri(String(reader.result));
    reader.onerror = () => setError('Could not read this image.');
    reader.readAsDataURL(f);
  };
  const copy = async (text: string, which: string) => { try { await navigator.clipboard.writeText(text); setCopied(which); setTimeout(() => setCopied(''), 1500); } catch {} };
  const cssBg = dataUri ? `background-image: url("${dataUri}");` : '';
  const imgTag = dataUri ? `<img src="${dataUri}" alt="">` : '';

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose an image to encode" />
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }}>✗ {error}</p>}
      {dataUri && (
        <>
          <p style={{ fontSize: 13.5, marginTop: 12, color: 'var(--ink-2)' }}>{name} — base64 is ~{formatBytes(dataUri.length)} ({Math.round((dataUri.length / size - 1) * 100)}% larger than the file)</p>
          <div className="field" style={{ marginTop: 8 }}><label htmlFor="b64-uri">Data URI</label>
            <textarea id="b64-uri" readOnly value={dataUri} style={{ minHeight: 110, fontFamily: 'var(--mono)', fontSize: 11.5 }} /></div>
          <div className="btn-row" style={{ flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary" onClick={() => copy(dataUri, 'uri')}>{copied === 'uri' ? 'Copied ✓' : 'Copy data URI'}</button>
            <button type="button" className="btn" onClick={() => copy(cssBg, 'css')}>{copied === 'css' ? 'Copied ✓' : 'Copy CSS'}</button>
            <button type="button" className="btn" onClick={() => copy(imgTag, 'img')}>{copied === 'img' ? 'Copied ✓' : 'Copy <img>'}</button>
          </div>
        </>
      )}
      <p className="privacy-note"><span className="dot" />encoded locally — inline small images to save HTTP requests (best under ~10 KB)</p>
    </div>
  );
}
