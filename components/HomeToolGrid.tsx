'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import CatIcon from './CatIcon';

export type GridTool = { slug: string; name: string; short: string; category: string; kw: string };
export type GridCat = { key: string; name: string; accent: string };

export default function HomeToolGrid({ tools, cats }: { tools: GridTool[]; cats: GridCat[] }) {
  const [active, setActive] = useState('all');
  const [q, setQ] = useState('');
  const catMap = useMemo(() => Object.fromEntries(cats.map(c => [c.key, c])), [cats]);

  const shown = useMemo(() => {
    let list = tools;
    if (active !== 'all') list = list.filter(t => t.category === active);
    const s = q.trim().toLowerCase();
    if (s) list = list.filter(t => t.name.toLowerCase().includes(s) || t.kw.includes(s));
    return list;
  }, [tools, active, q]);

  return (
    <div className="ilp-wrap">
      <div className="ilp-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="search" placeholder={`Search ${tools.length} tools…`} value={q}
          onChange={e => setQ(e.target.value)} aria-label="Search tools" />
      </div>

      <div className="ilp-tabs" role="tablist" aria-label="Filter by category">
        <button type="button" role="tab" aria-selected={active === 'all'}
          className={`ilp-tab${active === 'all' ? ' on' : ''}`} onClick={() => setActive('all')}>
          All <span className="ilp-tab-n">{tools.length}</span>
        </button>
        {cats.map(c => {
          const n = tools.filter(t => t.category === c.key).length;
          return (
            <button key={c.key} type="button" role="tab" aria-selected={active === c.key}
              className={`ilp-tab${active === c.key ? ' on' : ''}`}
              style={active === c.key ? { borderColor: c.accent, color: c.accent } : undefined}
              onClick={() => setActive(c.key)}>
              {c.name} <span className="ilp-tab-n">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="ilp-grid">
        {shown.map(t => {
          const c = catMap[t.category];
          return (
            <Link key={t.slug} href={`/${t.category}/${t.slug}`} className="ilp-card">
              <div className="ilp-card-head">
                <CatIcon cat={t.category} color={c?.accent ?? '#0B5FFF'} />
                <span className="ilp-card-cat" style={{ color: c?.accent }}>{c?.name}</span>
              </div>
              <h3>{t.name}</h3>
              <p>{t.short}</p>
            </Link>
          );
        })}
        {shown.length === 0 && <p className="ilp-empty">No tools match “{q}”. Try a different word.</p>}
      </div>
    </div>
  );
}
