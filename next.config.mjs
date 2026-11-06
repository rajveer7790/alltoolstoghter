/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // fully static: zero servers, deploy to any CDN
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true } // static export: no image optimizer service
};
export default nextConfig;
