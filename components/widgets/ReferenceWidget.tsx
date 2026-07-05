'use client';
import { useMemo, useState } from 'react';
import { HTTP_STATUS, MIME_TYPES } from '@/lib/calc/reference';

export default function ReferenceWidget({ dataset }: { dataset: 'http' | 'mime' }) {
  const rows = dataset === 'http' ? HTTP_STATUS : MIME_TYPES;
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return rows;
    return rows.filter(r => r.join(' ').toLowerCase().includes(n));
  }, [q, rows]);

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="rf-q">{dataset === 'http' ? 'Search status codes' : 'Search file types'}</label>
        <input id="rf-q" type="search" value={q} onChange={e => setQ(e.target.value)}
          placeholder={dataset === 'http' ? 'e.g. 404, redirect, forbidden' : 'e.g. png, json, font'} />
      </div>
      <div style={{ marginTop: 8, maxHeight: 420, overflow: 'auto' }}>
        {filtered.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 2px', borderTop: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--signal-ink)', minWidth: dataset === 'http' ? 38 : 56, fontSize: 13.5 }}>{r[0]}</span>
            <span>
              <span style={{ fontWeight: 650, fontSize: 14 }}>{r[1]}</span>
              <span style={{ display: 'block', fontSize: 13, color: 'var(--ink-2)' }}>{r[2]}</span>
            </span>
          </div>
        ))}
        {!filtered.length && <p style={{ color: 'var(--ink-3)', fontSize: 14, padding: '14px 2px' }}>No matches.</p>}
      </div>
    </div>
  );
}
