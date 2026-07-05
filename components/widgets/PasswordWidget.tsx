'use client';
import { useState } from 'react';

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
};
const AMBIG = new Set('l1IO0o');

/** Unbiased random index via rejection sampling. */
function randIndex(max: number): number {
  const limit = Math.floor(256 / max) * max;
  const buf = new Uint8Array(1);
  let x = 256;
  while (x >= limit) { crypto.getRandomValues(buf); x = buf[0]; }
  return x % max;
}

export default function PasswordWidget() {
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true, noAmbig: false });
  const [pw, setPw] = useState('');
  const [copied, setCopied] = useState(false);

  const gen = () => {
    let pool = '';
    (['lower', 'upper', 'digits', 'symbols'] as const).forEach(k => { if (opts[k]) pool += SETS[k]; });
    if (opts.noAmbig) pool = [...pool].filter(c => !AMBIG.has(c)).join('');
    if (!pool) { setPw(''); return; }
    const n = Math.min(128, Math.max(4, len));
    let out = '';
    for (let i = 0; i < n; i++) out += pool[randIndex(pool.length)];
    setPw(out);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(pw); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  const bits = pw ? Math.round(pw.length * Math.log2(
    (opts.lower ? 26 : 0) + (opts.upper ? 26 : 0) + (opts.digits ? 10 : 0) + (opts.symbols ? 25 : 0) || 1)) : 0;

  const toggle = (k: keyof typeof opts) => setOpts(o => ({ ...o, [k]: !o[k] }));

  return (
    <div className="tool-card">
      <div className="field" style={{ maxWidth: 220 }}>
        <label htmlFor="pwd-len">Length (4–128)</label>
        <input id="pwd-len" type="number" min={4} max={128} value={len}
          onChange={e => setLen(parseInt(e.target.value || '16', 10))} />
      </div>
      <div className="pills" style={{ margin: '14px 0' }}>
        <button type="button" className="pill" aria-pressed={opts.lower} onClick={() => toggle('lower')}>abc</button>
        <button type="button" className="pill" aria-pressed={opts.upper} onClick={() => toggle('upper')}>ABC</button>
        <button type="button" className="pill" aria-pressed={opts.digits} onClick={() => toggle('digits')}>123</button>
        <button type="button" className="pill" aria-pressed={opts.symbols} onClick={() => toggle('symbols')}>#$&amp;</button>
        <button type="button" className="pill" aria-pressed={opts.noAmbig} onClick={() => toggle('noAmbig')}>no l/1/O/0</button>
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={gen}>Generate password</button>
        <button type="button" className="btn" onClick={copy} disabled={!pw}>{copied ? 'Copied ✓' : 'Copy'}</button>
      </div>
      {pw && (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div className="readout-main" style={{ fontSize: 19, wordBreak: 'break-all' }}>
            <span className="rlabel">password · ~{bits} bits of entropy</span>{pw}
          </div>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />generated locally with crypto.getRandomValues — never transmitted</p>
    </div>
  );
}
