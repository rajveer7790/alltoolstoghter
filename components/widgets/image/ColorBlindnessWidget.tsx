'use client';
import { useEffect, useRef, useState } from 'react';
import { ImageDrop, loadImageFile, canvasToBlob, PreviewModal, type PreviewData } from './imageShared';
import BeforeAfterPreview from '../BeforeAfterPreview';

/** Color blindness simulation matrices (RGB linear transforms, Brettel/Viénot approximations). */
const MATRICES: Record<string, { label: string; pct: string; m: number[] }> = {
  normal:        { label: 'Normal vision', pct: '—',     m: [1,0,0, 0,1,0, 0,0,1] },
  protanopia:    { label: 'Protanopia (no red)', pct: '~1% of men',    m: [0.567,0.433,0, 0.558,0.442,0, 0,0.242,0.758] },
  protanomaly:   { label: 'Protanomaly (weak red)', pct: '~1% of men', m: [0.817,0.183,0, 0.333,0.667,0, 0,0.125,0.875] },
  deuteranopia:  { label: 'Deuteranopia (no green)', pct: '~1% of men', m: [0.625,0.375,0, 0.7,0.3,0, 0,0.3,0.7] },
  deuteranomaly: { label: 'Deuteranomaly (weak green)', pct: '~5% of men', m: [0.8,0.2,0, 0.258,0.742,0, 0,0.142,0.858] },
  tritanopia:    { label: 'Tritanopia (no blue)', pct: 'rare', m: [0.95,0.05,0, 0,0.433,0.567, 0,0.475,0.525] },
  tritanomaly:   { label: 'Tritanomaly (weak blue)', pct: 'rare', m: [0.967,0.033,0, 0,0.733,0.267, 0,0.183,0.817] },
  achromatopsia: { label: 'Achromatopsia (no color)', pct: 'very rare', m: [0.299,0.587,0.114, 0.299,0.587,0.114, 0.299,0.587,0.114] },
};

export default function ColorBlindnessWidget() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('image');
  const [type, setType] = useState('deuteranopia');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [simUrl, setSimUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    const canvas = canvasRef.current; if (!canvas || !img) return;
    const w = img.naturalWidth, h = img.naturalHeight;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    if (type === 'normal') { setSimUrl(canvas.toDataURL('image/png')); return; }
    const m = MATRICES[type].m;
    const data = ctx.getImageData(0, 0, w, h);
    const px = data.data;
    for (let i = 0; i < px.length; i += 4) {
      const r = px[i], g = px[i+1], b = px[i+2];
      px[i]   = Math.min(255, r*m[0] + g*m[1] + b*m[2]);
      px[i+1] = Math.min(255, r*m[3] + g*m[4] + b*m[5]);
      px[i+2] = Math.min(255, r*m[6] + g*m[7] + b*m[8]);
    }
    ctx.putImageData(data, 0, 0);
    setSimUrl(canvas.toDataURL('image/png'));
  };
  useEffect(draw, [img, type]);

  const pick = async (fs: File[]) => {
    const f = fs[0]; if (!f) return; setError(''); setFileName(f.name.replace(/\.[^.]+$/, ''));
    try { setImg(await loadImageFile(f)); } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image.'); }
  };
  const save = async () => { if (!canvasRef.current) return; const blob = await canvasToBlob(canvasRef.current, 'image/png'); setPreview({ blob, filename: `${fileName}-${type}.png` }); };

  return (
    <div className="tool-card">
      <ImageDrop onFiles={pick} label="Choose an image to simulate color blindness" />
      {error && <p style={{ color: '#DC2626', fontSize: 13.5, marginTop: 12 }}>✗ {error}</p>}
      {img && (
        <>
          <div className="field" style={{ marginTop: 16 }}>
            <label htmlFor="cb-type">Type of color vision deficiency</label>
            <select id="cb-type" value={type} onChange={e => setType(e.target.value)}>
              {Object.entries(MATRICES).map(([k, val]) => (
                <option key={k} value={k}>{val.label}{val.pct !== '—' ? ` — ${val.pct}` : ''}</option>
              ))}
            </select>
          </div>
          {type !== 'normal' && simUrl && (
            <BeforeAfterPreview
              originalUrl={img.src}
              resultUrl={simUrl}
              originalLabel="Normal vision"
              resultLabel={MATRICES[type].label}
            />
          )}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: 360, borderRadius: 8, border: '1px solid var(--line)' }} />
          </div>
          <div className="btn-row" style={{ marginTop: 14 }}>
            <button type="button" className="btn btn-primary" onClick={save}>Preview &amp; Download →</button>
          </div>
          <p className="privacy-note"><span className="dot" />image processed entirely in your browser — never uploaded</p>
        </>
      )}
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
