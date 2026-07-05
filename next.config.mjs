import fs from 'fs';
import path from 'path';

try {
  const cwd = process.cwd();
  // Delete the route interceptors I created earlier, as they conflict with Next.js's old build cache!
  ['app/icon', 'app/apple-icon'].forEach(d => {
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
