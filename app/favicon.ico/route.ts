import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export function GET() {
  // Intercept Next.js dev server trying to route /favicon.ico into the [category] catch-all
  // Returns a tiny transparent 1x1 SVG instead of crashing
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 0h16v16H0z" fill="transparent"/></svg>`;
  return new NextResponse(svg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' }
  });
}
