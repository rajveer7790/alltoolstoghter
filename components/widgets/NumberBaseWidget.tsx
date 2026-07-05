'use client';
import { useMemo, useState } from 'react';
import Readout from './Readout';

export default function NumberBaseWidget() {
  const [value, setValue] = useState('255');
  const [base, setBase] = useState(10);
  const parsed = useMemo(() => {
    const n = parseInt(value.trim(), base);
    return Number.isFinite(n) && !isNaN(n) ? n : null;
  }, [value, base]);

  return (
    <div className="tool-card">
      <div className="field-grid">
        <div className="field">
          <label htmlFor="nb-val">Value</label>
          <input id="nb-val" type="text" value={value} onChange={e => setValue(e.target.value)} spellCheck={false} style={{ fontFamily: 'var(--mono)' }} />
        </div>
        <div className="field">
          <label htmlFor="nb-base">Input base</label>
          <select id="nb-base" value={base} onChange={e => setBase(parseInt(e.target.value, 10))}>
            <option value={2}>Binary (base 2)</option>
            <option value={8}>Octal (base 8)</option>
            <option value={10}>Decimal (base 10)</option>
            <option value={16}>Hexadecimal (base 16)</option>
          </select>
        </div>
      </div>
      <Readout results={parsed === null ? [{ label: 'Invalid', value: `Not a valid base-${base} number`, main: true }] : [
        { label: 'Decimal', value: parsed.toString(10), main: true },
        { label: 'Binary', value: parsed.toString(2) },
        { label: 'Octal', value: parsed.toString(8) },
        { label: 'Hexadecimal', value: '0x' + parsed.toString(16).toUpperCase() },
      ]} />
      <p className="privacy-note"><span className="dot" />converted locally</p>
    </div>
  );
}
