'use client';
import { useMemo, useState } from 'react';

/** Entropy + pattern based strength estimate. No external library — runs locally. */
function analyze(pw: string) {
  if (!pw) return null;
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^A-Za-z0-9]/.test(pw)) pool += 33;
  const entropy = pw.length * Math.log2(pool || 1);

  const warnings: string[] = [];
  if (pw.length < 12) warnings.push('Use at least 12 characters.');
  if (!/[A-Z]/.test(pw) || !/[a-z]/.test(pw)) warnings.push('Mix upper and lower case.');
  if (!/[0-9]/.test(pw)) warnings.push('Add numbers.');
  if (!/[^A-Za-z0-9]/.test(pw)) warnings.push('Add a symbol.');
  if (/(.)\1{2,}/.test(pw)) warnings.push('Avoid repeated characters (aaa, 111).');
  if (/^(?:[a-z]+|[0-9]+)$/i.test(pw)) warnings.push('Avoid using only one character type.');
  const sequences = ['0123456789', 'abcdefghijklmnopqrstuvwxyz', 'qwertyuiop'];
  if (sequences.some(seq => { const low = pw.toLowerCase(); for (let i = 0; i <= low.length - 4; i++) if (seq.includes(low.slice(i, i + 4))) return true; return false; }))
    warnings.push('Avoid keyboard or alphabet sequences.');
  const common = ['password', '123456', 'qwerty', 'letmein', 'admin', 'welcome', 'iloveyou', 'monkey', 'dragon'];
  if (common.some(c => pw.toLowerCase().includes(c))) warnings.push('Contains a very common password word.');

  // crack-time estimate at 10 billion guesses/sec (offline fast hash)
  const guesses = Math.pow(2, entropy) / 2;
  const seconds = guesses / 1e10;
  const human = (s: number) => {
    if (s < 1) return 'instantly';
    const u: [number, string][] = [[60, 'second'], [60, 'minute'], [24, 'hour'], [365, 'day'], [100, 'year'], [Infinity, 'century']];
    let val = s, i = 0;
    for (; i < u.length - 1 && val >= u[i][0]; i++) val /= u[i][0];
    const n = Math.round(val);
    return `${n.toLocaleString()} ${u[i][1]}${n !== 1 ? 's' : ''}`;
  };

  let score = 0;
  if (entropy >= 28) score = 1;
  if (entropy >= 45) score = 2;
  if (entropy >= 60) score = 3;
  if (entropy >= 80) score = 4;
  if (pw.length < 8 || warnings.some(w => w.includes('common password'))) score = 0;
  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  const colors = ['#DC2626', '#EA580C', '#CA8A04', '#16A34A', '#047857'];
  return { entropy, score, label: labels[score], color: colors[score], crack: human(seconds), warnings };
}

export default function PasswordStrengthWidget() {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const a = useMemo(() => analyze(pw), [pw]);

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="ps-in">Password to test</label>
        <input id="ps-in" type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)}
          placeholder="Type or paste a password" autoComplete="off" spellCheck={false} style={{ fontFamily: 'var(--mono)' }} />
      </div>
      <div className="pills" style={{ marginTop: 4 }}>
        <button type="button" className="pill" aria-pressed={show} onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'} password</button>
      </div>
      {a && (
        <>
          <div style={{ display: 'flex', gap: 5, marginTop: 16 }} aria-hidden="true">
            {[0, 1, 2, 3, 4].map(i => (
              <span key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: i <= a.score ? a.color : 'var(--line)' }} />
            ))}
          </div>
          <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
            <div className="readout-main" style={{ color: a.color }}><span className="rlabel">strength</span>{a.label}</div>
            <div className="readout-rows">
              <div className="readout-row"><span className="k">Estimated entropy</span><span className="v">{a.entropy.toFixed(0)} bits</span></div>
              <div className="readout-row"><span className="k">Est. offline crack time</span><span className="v">{a.crack}</span></div>
            </div>
          </div>
          {a.warnings.length > 0 && (
            <ul style={{ marginTop: 12, paddingLeft: 18, fontSize: 13.5, color: 'var(--ink-2)' }}>
              {a.warnings.map((w, i) => <li key={i} style={{ marginBottom: 3 }}>{w}</li>)}
            </ul>
          )}
        </>
      )}
      <p className="privacy-note"><span className="dot" />checked entirely in your browser — your password is never sent anywhere</p>
    </div>
  );
}
