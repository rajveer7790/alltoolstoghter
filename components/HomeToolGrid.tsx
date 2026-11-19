'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import CatIcon from './CatIcon';
import { canonicalToolPath } from '@/lib/toolPaths';

export type GridTool = { slug: string; name: string; short: string; category: string; kw: string };
export type GridCat = { key: string; name: string; accent: string; count?: number };

const normalizeSearch = (value: string) => value
  .normalize('NFKD')
  .toLowerCase()
  .replace(/\p{M}/gu, '')
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim();

export default function HomeToolGrid({ tools: initialTools, cats, fullCatalog = false, totalTools, catalogUrl }: { tools: GridTool[]; cats: GridCat[]; fullCatalog?: boolean; totalTools?: number; catalogUrl?: string }) {
  const [tools, setTools] = useState(initialTools);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const pending = useRef<Promise<void> | null>(null);
  const loaded = useRef(!catalogUrl);
  const count = totalTools || tools.length;
  const loadCatalog = () => {
    if (loaded.current || !catalogUrl) return;
    if (pending.current) return pending.current;
    setLoading(true); setLoadError('');
    pending.current = fetch(catalogUrl).then(response => { if (!response.ok) throw new Error(); return response.json(); }).then(data => {
      if (!Array.isArray(data) || !data.every(t => typeof t.slug === 'string' && typeof t.kw === 'string')) throw new Error();
      setTools(data); loaded.current = true;
    }).catch(() => setLoadError('The full catalog could not load. Open the full directory below.')).finally(() => { setLoading(false); pending.current = null; });
    return pending.current;
  };
  const [active, setActive] = useState('all');
  const [q, setQ] = useState('');
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const sync = () => { const value = new URLSearchParams(window.location.search).get('q') || ''; setQ(value); if (value) loadCatalog(); };
    sync(); window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const search = (value: string) => {
    setQ(value); setExpanded(false); loadCatalog();
    const url = new URL(window.location.href);
    if (value) url.searchParams.set('q', value); else url.searchParams.delete('q');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  };
  const catMap = useMemo(() => Object.fromEntries(cats.map(c => [c.key, c])), [cats]);

  const searchIndex = useMemo(() => tools.map(tool => ({
    tool,
    text: normalizeSearch(`${tool.name} ${tool.slug} ${tool.short} ${tool.kw}`),
  })), [tools]);

  const shown = useMemo(() => {
    const tokens = normalizeSearch(q).split(' ').filter(Boolean);
    return searchIndex
      .filter(({tool, text}) => (active === 'all' || tool.category === active) && tokens.every(token => text.includes(token)))
      .map(({tool}) => tool);
  }, [searchIndex, active, q]);

  return (
    <div className="ilp-wrap">
      <div className="ilp-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="search" placeholder={`Search ${count} tools…`} value={q}
          onChange={e => search(e.target.value)} aria-label="Search tools" onFocus={() => { loadCatalog(); }} />
      </div>

      <div className="ilp-tabs" role="group" aria-label="Filter by category">
        <button type="button" aria-pressed={active === 'all'}
          className={`ilp-tab${active === 'all' ? ' on' : ''}`} onClick={() => setActive('all')}>
          All <span className="ilp-tab-n">{count}</span>
        </button>
        {cats.map(c => {
          const n = c.count ?? tools.filter(t => t.category === c.key).length;
          return (
            <button key={c.key} type="button" aria-pressed={active === c.key}
              className={`ilp-tab${active === c.key ? ' on' : ''}`}
              style={active === c.key ? { borderColor: c.accent, color: c.accent } : undefined}
              onClick={() => { setActive(c.key); loadCatalog(); }}>
              {c.name} <span className="ilp-tab-n">{n}</span>
            </button>
          );
        })}
      </div>

      <p className="privacy-note" role="status">{loading ? 'Loading full catalog…' : `${!q && active === 'all' ? count : shown.length} tools found`}</p>
      {loadError && <p role="alert">{loadError} <Link href="/tools">Full directory</Link></p>}
      <div className="ilp-grid">
        {(fullCatalog || expanded || q || active !== 'all' ? shown : shown.slice(0, 36)).map(t => {
          const c = catMap[t.category];
          return (
            <Link prefetch={false} key={t.slug} href={canonicalToolPath(t)} className="ilp-card">
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
      {!fullCatalog && !expanded && !q && active === 'all' && count > 36 && <div className="btn-row"><button type="button" className="btn" onClick={() => { setExpanded(true); loadCatalog(); }}>Show all {count} tools</button><Link href="/tools" className="btn">Full tool directory</Link></div>}
    </div>
  );
}
