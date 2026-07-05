'use client';
import { useMemo, useState } from 'react';

const STOP = new Set('the a an and or but of to in on at for with is are was were be been it this that as by from'.split(' '));

export default function KeywordDensityWidget() {
  const [text, setText] = useState('');
  const [skipStop, setSkipStop] = useState(true);
  const rows = useMemo(() => {
    const words = (text.toLowerCase().match(/\b[a-z][a-z'-]*\b/g) || []);
    const total = words.length;
    if (!total) return { total: 0, list: [] as [string, number, number][] };
    const freq: Record<string, number> = {};
    words.forEach(w => { if (skipStop && STOP.has(w)) return; freq[w] = (freq[w] || 0) + 1; });
    const list = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 15)
      .map(([w, c]) => [w, c, (c / total) * 100] as [string, number, number]);
    return { total, list };
  }, [text, skipStop]);

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="kd-in">Your text</label>
        <textarea id="kd-in" value={text} onChange={e => setText(e.target.value)} placeholder="Paste an article or page copy…" style={{ minHeight: 150 }} />
      </div>
      <div className="pills" style={{ marginTop: 12 }}>
        <button type="button" className="pill" aria-pressed={skipStop} onClick={() => setSkipStop(!skipStop)}>Ignore common words</button>
      </div>
      {rows.total > 0 && (
        <div className="readout" style={{ marginTop: 14 }} aria-live="polite">
          <div className="readout-main" style={{ fontSize: 16 }}><span className="rlabel">total words</span>{rows.total}</div>
          <div className="readout-rows">
            {rows.list.map(([w, c, d], i) => (
              <div className="readout-row" key={i}><span className="k">{w} ({c}×)</span><span className="v">{d.toFixed(1)}%</span></div>
            ))}
          </div>
        </div>
      )}
      <p className="privacy-note"><span className="dot" />analyzed locally — useful for SEO keyword balance</p>
    </div>
  );
}
