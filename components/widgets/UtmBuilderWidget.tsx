'use client';
import { useMemo, useState } from 'react';

export default function UtmBuilderWidget() {
  const [url, setUrl] = useState('https://example.com/landing');
  const [source, setSource] = useState('newsletter');
  const [medium, setMedium] = useState('email');
  const [campaign, setCampaign] = useState('summer_sale');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!url.trim()) return '';
    const params: [string, string][] = [
      ['utm_source', source], ['utm_medium', medium], ['utm_campaign', campaign],
      ['utm_term', term], ['utm_content', content],
    ];
    const qs = params.filter(([, v]) => v.trim()).map(([k, v]) => `${k}=${encodeURIComponent(v.trim())}`).join('&');
    if (!qs) return url.trim();
    const sep = url.includes('?') ? '&' : '?';
    return url.trim() + sep + qs;
  }, [url, source, medium, campaign, term, content]);

  const copy = async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };
  const F = ({ id, label, val, set, ph, req }: any) => (
    <div className="field"><label htmlFor={id}>{label}{req && <span style={{ color: 'var(--signal-ink)' }}> *</span>}</label>
      <input id={id} type="text" value={val} onChange={e => set(e.target.value)} placeholder={ph} spellCheck={false} /></div>
  );

  return (
    <div className="tool-card">
      <F id="utm-url" label="Website URL" val={url} set={setUrl} ph="https://example.com/page" req />
      <div className="field-grid">
        <F id="utm-src" label="Campaign source" val={source} set={setSource} ph="google, newsletter" req />
        <F id="utm-med" label="Campaign medium" val={medium} set={setMedium} ph="cpc, email, social" req />
      </div>
      <F id="utm-camp" label="Campaign name" val={campaign} set={setCampaign} ph="spring_promo" req />
      <div className="field-grid">
        <F id="utm-term" label="Campaign term (optional)" val={term} set={setTerm} ph="paid keywords" />
        <F id="utm-cont" label="Campaign content (optional)" val={content} set={setContent} ph="logolink, textlink" />
      </div>
      {result && (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div className="readout-main" style={{ fontSize: 14, wordBreak: 'break-all', lineHeight: 1.5 }}><span className="rlabel">tagged url</span>{result}</div>
        </div>
      )}
      <div className="btn-row"><button type="button" className="btn btn-primary" onClick={copy} disabled={!result}>{copied ? 'Copied ✓' : 'Copy URL'}</button></div>
      <p className="privacy-note"><span className="dot" />built locally — Google Analytics reads these utm_ parameters to attribute traffic</p>
    </div>
  );
}
