'use client';
import { useEffect, useRef, useState } from 'react';
import PreviewModal, { type PreviewData } from './PreviewModal';

const FORMATS = ['CODE128', 'EAN13', 'EAN8', 'UPC', 'CODE39', 'ITF14', 'MSI', 'pharmacode'];

export default function BarcodeWidget() {
  const [value, setValue] = useState('1234567890128');
  const [format, setFormat] = useState('CODE128');
  const [showText, setShowText] = useState(true);
  const [err, setErr] = useState('');
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!svgRef.current) return;
      try {
        const JsBarcode = (await import('jsbarcode')).default;
        if (cancelled) return;
        JsBarcode(svgRef.current, value || ' ', { format, displayValue: showText, lineColor: '#16181D', width: 2, height: 90, margin: 10, valid: (v: boolean) => { if (!cancelled) setErr(v ? '' : `"${value}" is not valid for ${format}.`); } });
      } catch (e) { if (!cancelled) setErr(e instanceof Error ? e.message : 'Could not generate barcode.'); }
    })();
    return () => { cancelled = true; };
  }, [value, format, showText]);

  const openPreview = () => {
    if (!svgRef.current) return;
    const data = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    setPreview({ blob, filename: `barcode-${format.toLowerCase()}.svg` });
  };

  return (
    <div className="tool-card">
      <div className="field"><label htmlFor="bc-val">Value to encode</label>
        <input id="bc-val" type="text" value={value} onChange={e => setValue(e.target.value)} spellCheck={false} style={{ fontFamily: 'var(--mono)' }} /></div>
      <div className="field-grid">
        <div className="field"><label htmlFor="bc-fmt">Barcode format</label>
          <select id="bc-fmt" value={format} onChange={e => setFormat(e.target.value)}>
            {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
          </select></div>
        <div className="field" style={{ justifyContent: 'flex-end' }}>
          <div className="pills"><button type="button" className="pill" aria-pressed={showText} onClick={() => setShowText(!showText)}>Show text</button></div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0', background: '#fff', borderRadius: 8, marginTop: 12, minHeight: 120, alignItems: 'center' }}>
        {err ? <p style={{ color: '#DC2626', fontSize: 13.5 }}>✗ {err}</p> : <svg ref={svgRef} style={{ maxWidth: '100%' }} />}
      </div>
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={openPreview} disabled={!!err}>Preview & Download</button></div>
      <p className="privacy-note"><span className="dot" />EAN-13 needs 12–13 digits; CODE128 accepts any text — generated locally</p>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
