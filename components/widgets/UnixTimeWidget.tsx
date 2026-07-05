'use client';
import { useEffect, useMemo, useState } from 'react';

export default function UnixTimeWidget() {
  const [now, setNow] = useState<number | null>(null);
  const [ts, setTs] = useState('');
  const [dateStr, setDateStr] = useState('');
  useEffect(() => {
    setNow(Math.floor(Date.now() / 1000));
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const fromTs = useMemo(() => {
    const n = parseInt(ts.trim(), 10);
    if (!Number.isFinite(n)) return null;
    const ms = String(Math.abs(n)).length >= 13 ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;
    return d;
  }, [ts]);

  const fromDate = useMemo(() => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : Math.floor(d.getTime() / 1000);
  }, [dateStr]);

  return (
    <div className="tool-card">
      <div className="readout" aria-live="off">
        <div className="readout-main">
          <span className="rlabel">current unix time · seconds</span>
          {now === null ? '…' : now.toLocaleString('en-US', { useGrouping: false })}
        </div>
      </div>
      <div className="field-grid" style={{ marginTop: 16 }}>
        <div className="field">
          <label htmlFor="ut-ts">Timestamp → date (s or ms auto-detected)</label>
          <input id="ut-ts" type="text" inputMode="numeric" value={ts} onChange={e => setTs(e.target.value)} placeholder="1750000000" spellCheck={false} />
        </div>
        <div className="field">
          <label htmlFor="ut-date">Date &amp; time → timestamp</label>
          <input id="ut-date" type="datetime-local" value={dateStr} onChange={e => setDateStr(e.target.value)} />
        </div>
      </div>
      {(fromTs || fromDate !== null) && (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div className="readout-rows" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
            {fromTs && (<>
              <div className="readout-row"><span className="k">UTC</span><span className="v">{fromTs.toUTCString()}</span></div>
              <div className="readout-row"><span className="k">Your local time</span><span className="v">{fromTs.toLocaleString()}</span></div>
              <div className="readout-row"><span className="k">ISO 8601</span><span className="v">{fromTs.toISOString()}</span></div>
            </>)}
            {fromDate !== null && (
              <div className="readout-row"><span className="k">Unix timestamp</span><span className="v">{fromDate}</span></div>
            )}
          </div>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />converted locally</p>
    </div>
  );
}
