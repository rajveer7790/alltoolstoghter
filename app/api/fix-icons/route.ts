import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export function GET() {
  try {
    const cwd = process.cwd();
    const filesToDelete = ['app/icon.tsx', 'app/apple-icon.tsx', 'app/opengraph-image.tsx'];
    
    // Delete the buggy dynamic routes
    filesToDelete.forEach(f => {
      const p = path.join(cwd, f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

    // Write the static SVGs to public folder
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="128" fill="#0B5FFF"/><path d="M86 370 L166 150 L246 370 H186 L166 310 L126 310 L106 370 Z M146 250 H186 L166 190 Z" fill="#ffffff"/><path d="M276 150 H426 V200 H376 V370 H326 V200 H276 Z" fill="#ffffff"/></svg>`;
    fs.writeFileSync(path.join(cwd, 'public/icon.svg'), svg);
    fs.writeFileSync(path.join(cwd, 'public/apple-icon.svg'), svg);
    
    return NextResponse.json({ success: true });
  } catch(e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
