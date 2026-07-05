/** Colored rounded icon tile: category glyph in white on an accent tile. */
export default function CatIcon({ cat, color, size = 46 }: { cat: string; color: string; size?: number }) {
  const P: Record<string, JSX.Element> = {
    finance: <><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></>,
    'real-estate': <path d="M12 3L2 11h3v9h6v-6h2v6h6v-9h3L12 3z"/>,
    investing: <path d="M3 17l6-6 4 4 8-8v5h-2V9.8l-6 6-4-4-4.6 4.6L3 17zM3 19h18v2H3z"/>,
    tax: <path d="M6 2h12a1 1 0 011 1v18l-3-2-3 2-3-2-3 2V3a1 1 0 011-1zm3 5h6v2H9V7zm0 4h6v2H9v-2z"/>,
    business: <path d="M9 4h6v3h5a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1h5V4zm2 3h2V6h-2v1zM3 12h18v2H3v-2z"/>,
    health: <path d="M12 21S4 14.5 4 9a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-8 12-8 12z"/>,
    cooking: <path d="M8 3v6a2 2 0 002 2v10h2V11a2 2 0 002-2V3h-2v5h-1V3h-1v5h-1V3H8zm9 0v8h2v10h1V3h-3z"/>,
    math: <path d="M4 4h7v2H8.5L11 12l-2.5 6H11v2H4v-2h2.2L9 12 6.2 6H4V4zm10 3h7v2h-7V7zm0 8h7v2h-7v-2z"/>,
    science: <path d="M9 2h6v2h-1v5.5l5 8.5a2 2 0 01-1.7 3H6.7A2 2 0 015 18l5-8.5V4H9V2zm2 8l-3.5 6h9L13 10h-2z"/>,
    statistics: <path d="M12 3a9 9 0 109 9h-9V3z"/>,
    'unit-converters': <path d="M7 4l-4 4 4 4V9h9V7H7V4zm10 16l4-4-4-4v3H8v2h9v3z"/>,
    'date-time': <path d="M7 2h2v2h6V2h2v2h3a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3V2zm13 8H4v10h16V10z"/>,
    construction: <path d="M3 21v-3l9-9 3 3-9 9H3zm14.7-10.3l-3-3 1.6-1.6a1 1 0 011.4 0l1.6 1.6a1 1 0 010 1.4l-1.6 1.6z"/>,
    developer: <path d="M8 6l-6 6 6 6 1.5-1.5L5 12l4.5-4.5L8 6zm8 0l-1.5 1.5L19 12l-4.5 4.5L16 18l6-6-6-6z"/>,
    seo: <path d="M10 2a8 8 0 105.3 14l5 5 1.4-1.4-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>,
    text: <path d="M4 4h16v3h-2V6h-4v12h2v2H8v-2h2V6H6v1H4V4z"/>,
    writing: <path d="M3 17.2V21h3.8L17.8 10 14 6.2 3 17.2zM20.7 7.1a1 1 0 000-1.4l-2.4-2.4a1 1 0 00-1.4 0L15 5.2 18.8 9l1.9-1.9z"/>,
    pdf: <path d="M6 2h9l5 5v14a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zm8 1.5V8h4.5L14 3.5zM8 12h8v1.5H8V12zm0 3.5h8V17H8v-1.5z"/>,
    image: <path d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm1 12l4-5 3 3.5L15 10l4 6H5zm3-8a1.75 1.75 0 100 3.5A1.75 1.75 0 008 8z"/>,
  };
  const glyph = size * 0.55;
  return (
    <span className="cat-tile" style={{ width: size, height: size, background: color }}>
      <svg width={glyph} height={glyph} viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        {P[cat] ?? P['math']}
      </svg>
    </span>
  );
}
