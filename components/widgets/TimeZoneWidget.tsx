'use client';
import { wallTimeToInstant } from '@/lib/timezone';
import { useEffect, useMemo, useState } from 'react';

const ZONES = [
  'UTC', 'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
  'America/Sao_Paulo', 'Europe/London', 'Europe/Paris', 'Europe/Moscow',
  'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Shanghai', 'Asia/Tokyo', 'Australia/Sydney',
];

export default function TimeZoneWidget() {
  const [dt, setDt] = useState('');
  useEffect(() => { const now = new Date(); setDt(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)); }, []);
  const [from, setFrom] = useState('America/New_York');
  const [to, setTo] = useState('Asia/Kolkata');

  const result = useMemo(() => {
    if (!dt) return null;
    try {
      const guess = wallTimeToInstant(dt, from);
      const fmt = (z: string) => new Date(guess).toLocaleString('en-US', { timeZone: z, dateStyle: 'medium', timeStyle: 'short' });
      return { fromStr: fmt(from), toStr: fmt(to), error: '' };
    } catch (e) { return { fromStr: '', toStr: '', error: e instanceof Error ? e.message : 'Check the time.' }; }
  }, [dt, from, to]);

  const Sel = ({ id, val, set, label }: any) => (
    <div className="field"><label htmlFor={id}>{label}</label>
      <select id={id} value={val} onChange={e => set(e.target.value)}>
        {ZONES.map(z => <option key={z} value={z}>{z.replace(/_/g, ' ')}</option>)}
      </select></div>
  );

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="tz-dt">Date &amp; time (in the source zone)</label>
        <input id="tz-dt" type="datetime-local" value={dt} onChange={e => setDt(e.target.value)} />
      </div>
      <div className="field-grid" style={{ marginTop: 12 }}>
        <Sel id="tz-from" val={from} set={setFrom} label="From zone" />
        <Sel id="tz-to" val={to} set={setTo} label="To zone" />
      </div>
      {result?.error && <p role="alert">{result.error}</p>}
      {result && !result.error && (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div className="readout-main" style={{ fontSize: 18 }}><span className="rlabel">{to.replace(/_/g, ' ')}</span>{result.toStr}</div>
          <div className="readout-rows">
            <div className="readout-row"><span className="k">{from.replace(/_/g, ' ')}</span><span className="v">{result.fromStr}</span></div>
          </div>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />uses your browser&apos;s time-zone database — computed locally</p>
    </div>
  );
}
