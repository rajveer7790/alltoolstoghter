'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import type { Category } from '@/lib/types';

const GROUPS: { label: string; keys: string[] }[] = [
  { label: 'Money', keys: ['finance', 'real-estate', 'investing', 'tax', 'business'] },
  { label: 'Health', keys: ['health', 'cooking'] },
  { label: 'Learn', keys: ['math', 'science', 'statistics'] },
  { label: 'Everyday', keys: ['unit-converters', 'date-time', 'construction'] },
  { label: 'Web & Dev', keys: ['developer', 'seo', 'text', 'writing'] },
  { label: 'Files', keys: ['pdf', 'image'] },
];

export default function Header({ categories }: { categories: (Category & { count: number })[] }) {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const menuId = useId();
  const titleId = useId();
  const catMap = Object.fromEntries(categories.map(c => [c.key, c]));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setActiveGroup(null); }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 921px)');
    const sync = () => { if (desktop.matches) setOpen(false); else setActiveGroup(null); };
    sync();
    desktop.addEventListener('change', sync);
    return () => desktop.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = dialog.current;
    panel?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return; }
      if (event.key !== 'Tab' || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      const first = items[0], last = items[items.length - 1];
      if (!first || !last) { event.preventDefault(); panel.focus(); return; }
      if (!panel.contains(document.activeElement)) {
        event.preventDefault(); (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      if (trigger.current?.getClientRects().length) trigger.current.focus();
    };
  }, [open]);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap header-inner">
          <Link href="/" className="brand" onClick={() => { setOpen(false); setActiveGroup(null); }}>
            <svg viewBox="0 0 512 512" aria-hidden="true">
              <path d="M86 370 L166 150 L246 370 H186 L166 310 L126 310 L106 370 Z M146 250 H186 L166 190 Z" fill="currentColor" />
              <path d="M276 150 H426 V200 H376 V370 H326 V200 H276 Z" fill="currentColor" />
            </svg>
            <span>all<span className="tw-dot">·</span>tools<span className="tw-dot">·</span>together</span>
          </Link>
          <nav className="site-nav" aria-label="Tool categories" onMouseLeave={() => setActiveGroup(null)}
            onKeyDown={event => { if (event.key === 'Escape') setActiveGroup(null); }}>
            {GROUPS.map(g => (
              <div key={g.label} className="nav-group" onMouseEnter={() => setActiveGroup(g.label)}>
                <button type="button" className="nav-trigger" aria-expanded={activeGroup === g.label}
                  onClick={() => setActiveGroup(activeGroup === g.label ? null : g.label)}>
                  {g.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="chev"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                </button>
                <div className={`mega${activeGroup === g.label ? ' show' : ''}`}>
                  <div className="mega-inner">{g.keys.map(key => {
                    const c = catMap[key]; if (!c) return null;
                    return <Link key={key} href={`/${key}`} className="mega-item" onClick={() => setActiveGroup(null)}>
                      <span className="mega-dot" style={{ background: c.accent }} aria-hidden="true" />
                      <span><span className="mega-name">{c.name}</span><span className="mega-count">{c.count} tools</span></span>
                    </Link>;
                  })}</div>
                </div>
              </div>
            ))}
          </nav>
          <Link href="/tools" className="header-cta" aria-label="Browse all tools">All tools</Link>
          <button ref={trigger} type="button" className="hamburger" aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open} aria-controls={open ? menuId : undefined} onClick={() => setOpen(value => !value)}>
            <span className={open ? 'open' : ''} /><span className={open ? 'open' : ''} /><span className={open ? 'open' : ''} />
          </button>
        </div>
      </header>

      {/* Siblings of the filtered header: no fixed containing block or offscreen closed panel. */}
      {open && <>
        <button type="button" className="drawer-backdrop" tabIndex={-1} aria-label="Close navigation menu" onClick={() => setOpen(false)} />
        <div ref={dialog} id={menuId} className="drawer" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
          <div className="drawer-head">
            <h2 id={titleId}>Browse tools</h2>
            <button type="button" className="drawer-close btn" onClick={() => setOpen(false)}>Close menu <span aria-hidden="true">×</span></button>
          </div>
          <nav aria-label="Mobile categories">
            <Link href="/tools" className="drawer-link" onClick={() => setOpen(false)}>All tools</Link>
            <Link href="/guides" className="drawer-link" onClick={() => setOpen(false)}>Practical guides</Link>
            {GROUPS.map(g => <div key={g.label} className="drawer-group">
              <div className="drawer-label">{g.label}</div>
              {g.keys.map(key => {
                const c = catMap[key]; if (!c) return null;
                return <Link key={key} href={`/${key}`} className="drawer-link" onClick={() => setOpen(false)}>
                  <span className="mega-dot" style={{ background: c.accent }} aria-hidden="true" />
                  {c.name}<span className="drawer-count">{c.count}</span>
                </Link>;
              })}
            </div>)}
          </nav>
        </div>
      </>}
    </>
  );
}
