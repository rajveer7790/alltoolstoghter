'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CATEGORIES, ALL_TOOLS } from '@/lib/registry';

// Logical groupings for the mega-menu (keeps 19 categories navigable)
const GROUPS: { label: string; keys: string[] }[] = [
  { label: 'Money', keys: ['finance', 'real-estate', 'investing', 'tax', 'business'] },
  { label: 'Health', keys: ['health', 'cooking'] },
  { label: 'Learn', keys: ['math', 'science', 'statistics'] },
  { label: 'Everyday', keys: ['unit-converters', 'date-time', 'construction'] },
  { label: 'Web & Dev', keys: ['developer', 'seo', 'text', 'writing'] },
  { label: 'Files', keys: ['pdf', 'image'] },
];

export default function Header() {
  const [open, setOpen] = useState(false);          // mobile drawer
  const [activeGroup, setActiveGroup] = useState<string | null>(null); // desktop mega-menu
  const [scrolled, setScrolled] = useState(false);
  const catMap = Object.fromEntries(CATEGORIES.map(c => [c.key, c]));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger the automated icon bug fix on mount
    fetch('/api/fix-icons').catch(() => {});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close menus on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setActiveGroup(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap header-inner">
        <Link href="/" className="brand" onClick={() => { setOpen(false); setActiveGroup(null); }}>
          <svg viewBox="0 0 512 512" aria-hidden="true">
            <path d="M86 370 L166 150 L246 370 H186 L166 310 L126 310 L106 370 Z M146 250 H186 L166 190 Z" fill="currentColor" />
            <path d="M276 150 H426 V200 H376 V370 H326 V200 H276 Z" fill="currentColor" />
          </svg>
          <span>all<span className="tw-dot">·</span>tools<span className="tw-dot">·</span>together</span>
        </Link>

        {/* Desktop mega-menu nav */}
        <nav className="site-nav" aria-label="Tool categories" onMouseLeave={() => setActiveGroup(null)}>
          {GROUPS.map(g => (
            <div key={g.label} className="nav-group"
              onMouseEnter={() => setActiveGroup(g.label)}>
              <button type="button" className="nav-trigger" aria-expanded={activeGroup === g.label}
                aria-haspopup="true" onClick={() => setActiveGroup(activeGroup === g.label ? null : g.label)}>
                {g.label}
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="chev"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              </button>
              <div className={`mega${activeGroup === g.label ? ' show' : ''}`} role="menu">
                <div className="mega-inner">
                  {g.keys.map(k => {
                    const c = catMap[k]; if (!c) return null;
                    const count = ALL_TOOLS.filter(t => t.category === k).length;
                    return (
                      <Link key={k} href={`/${k}`} role="menuitem" className="mega-item"
                        onClick={() => setActiveGroup(null)}>
                        <span className="mega-dot" style={{ background: c.accent }} aria-hidden="true" />
                        <span>
                          <span className="mega-name">{c.name}</span>
                          <span className="mega-count">{count} tools</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <Link href="/" className="header-cta" aria-label="Browse all tools">
          All tools
        </Link>

        {/* Mobile hamburger */}
        <button type="button" className="hamburger" aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={open ? 'open' : ''} />
          <span className={open ? 'open' : ''} />
          <span className={open ? 'open' : ''} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`drawer-backdrop${open ? ' show' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav className={`drawer${open ? ' show' : ''}`} aria-label="Mobile categories" aria-hidden={!open}>
        {GROUPS.map(g => (
          <div key={g.label} className="drawer-group">
            <div className="drawer-label">{g.label}</div>
            {g.keys.map(k => {
              const c = catMap[k]; if (!c) return null;
              const count = ALL_TOOLS.filter(t => t.category === k).length;
              return (
                <Link key={k} href={`/${k}`} className="drawer-link" onClick={() => setOpen(false)}>
                  <span className="mega-dot" style={{ background: c.accent }} aria-hidden="true" />
                  {c.name}<span className="drawer-count">{count}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </header>
  );
}
