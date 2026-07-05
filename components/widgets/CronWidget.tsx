'use client';
import { useMemo, useState } from 'react';

const NAMES = ['minute', 'hour', 'day of month', 'month', 'day of week'];
const RANGES = ['(0–59)', '(0–23)', '(1–31)', '(1–12)', '(0–6, Sun=0)'];

function describeField(field: string, i: number): string {
  if (field === '*') return `every ${NAMES[i]}`;
  if (field.startsWith('*/')) return `every ${field.slice(2)} ${NAMES[i]}s`;
  if (field.includes(',')) return `${NAMES[i]} ${field}`;
  if (field.includes('-')) return `${NAMES[i]} ${field}`;
  return `${NAMES[i]} ${field}`;
}

export default function CronWidget() {
  const [expr, setExpr] = useState('0 9 * * 1-5');
  const result = useMemo(() => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return { err: 'A standard cron expression has exactly 5 fields: minute hour day-of-month month day-of-week.' };
    const valid = parts.every(p => /^[\d*,\-/]+$/.test(p));
    if (!valid) return { err: 'Fields may contain only digits and the characters * , - /' };
    return { parts, desc: parts.map((p, i) => describeField(p, i)) };
  }, [expr]);

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="cr-in">Cron expression</label>
        <input id="cr-in" type="text" value={expr} onChange={e => setExpr(e.target.value)}
          style={{ fontFamily: 'var(--mono)', fontSize: 16 }} spellCheck={false} />
      </div>
      {'err' in result ? (
        <p style={{ color: '#DC2626', fontSize: 13.5, marginTop: 12 }} aria-live="polite">✗ {result.err}</p>
      ) : (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div className="readout-main" style={{ fontSize: 15, lineHeight: 1.5 }}>
            <span className="rlabel">runs</span>
            At {result.parts![1] === '*' ? 'every hour' : result.parts![1]}:{result.parts![0] === '*' ? 'every minute' : String(result.parts![0]).padStart(2, '0')}
          </div>
          <div className="readout-rows">
            {result.desc!.map((d, i) => (
              <div className="readout-row" key={i}>
                <span className="k">{NAMES[i]} {RANGES[i]}</span><span className="v">{result.parts![i]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />parsed locally</p>
    </div>
  );
}
