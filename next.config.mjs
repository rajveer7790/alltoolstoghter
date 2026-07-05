import fs from 'fs';
import path from 'path';

try {
  const cwd = process.cwd();
  // Pre-build cleanup: remove leftover route interceptors that conflict with static export
  ['app/icon', 'app/apple-icon', 'app/api', 'app/favicon.ico'].forEach(d => {
    const p = path.join(cwd, d);
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
  });
} catch (e) {}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // fully static: zero servers, deploy to any CDN
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true } // static export: no image optimizer service
};
export default nextConfig;
