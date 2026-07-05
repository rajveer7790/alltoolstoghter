'use client';
import { useMemo, useState } from 'react';
import Readout from './Readout';

/** Inverse conversion: MPG (US/UK) <-> L/100km. */
export default function FuelEconomyWidget() {
  const [value, setValue] = useState('30');
  const [unit, setUnit] = useState<'mpgUS' | 'mpgUK' | 'l100'>('mpgUS');
  const out = useMemo(() => {
    const n = parseFloat(value);
    if (!Number.isFinite(n) || n <= 0) return null;
    let l100: number;
    if (unit === 'mpgUS') l100 = 235.215 / n;
    else if (unit === 'mpgUK') l100 = 282.481 / n;
    else l100 = n;
    return { mpgUS: 235.215 / l100, mpgUK: 282.481 / l100, l100 };
  }, [value, unit]);
  const f = (x: number) => x.toFixed(2);

  return (
    <div className="tool-card">
      <div className="field-grid">
        <div className="field">
          <label htmlFor="fe-val">Value</label>
          <input id="fe-val" type="number" step="any" value={value} onChange={e => setValue(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="fe-unit">Unit</label>
          <select id="fe-unit" value={unit} onChange={e => setUnit(e.target.value as any)}>
            <option value="mpgUS">MPG (US)</option>
            <option value="mpgUK">MPG (UK)</option>
            <option value="l100">L/100km</option>
          </select>
        </div>
      </div>
      <Readout results={!out ? [{ label: 'Enter a value', value: '—', main: true }] : [
        { label: 'L/100km', value: f(out.l100), main: true },
        { label: 'MPG (US)', value: f(out.mpgUS) },
        { label: 'MPG (UK)', value: f(out.mpgUK) },
      ]} />
      <p className="privacy-note"><span className="dot" />MPG and L/100km are inversely related — computed locally</p>
    </div>
  );
}
