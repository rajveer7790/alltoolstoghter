'use client';
import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';

export interface SearchItem { name: string; slug: string; category: string; catName: string; kw: string }

export default function SearchBox({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    return items
      .filter(t => t.name.toLowerCase().includes(needle) || t.kw.includes(needle))
      .slice(0, 8);
  }, [q, items]);

  return (
    <div className="searchbox" ref={boxRef}
      onBlur={(e) => { if (!boxRef.current?.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <input
        type="search" placeholder="Search tools… (e.g. mortgage, BMI, JSON)"
        value={q} aria-label="Search tools"
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {open && results.length > 0 && (
        <div className="search-results" role="listbox">
          {results.map(t => (
            <Link key={t.slug} href={`/${t.category}/${t.slug}`} role="option" aria-selected="false">
              {t.name}<span className="sr-cat">{t.catName}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
