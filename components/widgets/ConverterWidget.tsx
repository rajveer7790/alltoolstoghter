'use client';
import { useMemo, useState } from 'react';
import { UNIT_KINDS, convertUnit } from '@/lib/calc/units';
import Readout from './Readout';

export default function ConverterWidget({ kind, preset }: { kind: string; preset?: { from: string; to: string; def: number } }) {
  const [kindKey, setKindKey] = useState(kind in UNIT_KINDS ? kind : 'length');
  const k = UNIT_KINDS[kindKey];
  const unitKeys = Object.keys(k.units);
  const [from, setFrom] = useState(preset?.from && k.units[preset.from] ? preset.from : unitKeys[0]);
  const [to, setTo] = useState(preset?.to && k.units[preset.to] ? preset.to : unitKeys[1]);
  const [value, setValue] = useState(String(preset?.def ?? 1));

  const out = useMemo(() => {
    const n = parseFloat(value);
    if (!Number.isFinite(n)) return null;
    return convertUnit(kindKey, n, from, to);
  }, [kindKey, value, from, to]);

  const fmt = (n: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(n);
  const switchKind = (nk: string) => {
    setKindKey(nk);
    const keys = Object.keys(UNIT_KINDS[nk].units);
    setFrom(keys[0]); setTo(keys[1]);
  };
  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="tool-card">
      {!preset && (
        <div className="pills" role="tablist" aria-label="Unit category" style={{ marginBottom: 14 }}>
          {Object.entries(UNIT_KINDS).map(([key, uk]) => (
            <button key={key} type="button" className="pill" role="tab"
              aria-pressed={key === kindKey} onClick={() => switchKind(key)}>{uk.name}</button>
          ))}
        </div>
      )}
      <div className="field-grid">
        <div className="field">
          <label htmlFor="cv-value">Value</label>
          <input id="cv-value" type="number" inputMode="decimal" step="any"
            value={value} onChange={e => setValue(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="cv-from">From</label>
          <select id="cv-from" value={from} onChange={e => setFrom(e.target.value)}>
            {unitKeys.map(u => <option key={u} value={u}>{k.units[u].label}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cv-to">To</label>
          <select id="cv-to" value={to} onChange={e => setTo(e.target.value)}>
            {unitKeys.map(u => <option key={u} value={u}>{k.units[u].label}</option>)}
          </select>
        </div>
      </div>
      <div className="btn-row"><button type="button" className="btn" onClick={swap}>⇄ Swap units</button></div>
      <Readout results={[
        out === null
          ? { label: 'Enter a number', value: '—', main: true }
          : { label: `${k.units[from].label} → ${k.units[to].label}`, value: fmt(out), main: true },
      ]} />
      <p className="privacy-note"><span className="dot" />exact international definitions — computed locally</p>
    </div>
  );
}
