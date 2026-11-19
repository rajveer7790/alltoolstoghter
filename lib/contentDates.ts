// Maintained content revision, never the current build/deploy time.
// Update only when rendered content or methods change; rate verification is separate.
export const CONTENT_UPDATED = '2026-11-17';
const PAGE_UPDATED: Record<string, string> = { '/pdf-editor': '2026-11-19' };
export const lastModifiedFor = (path: string) => PAGE_UPDATED[path] || CONTENT_UPDATED;
export const AUTHOR = { name: 'Rajveer Choudhary', path: '/author/rajveer-choudhary', github: 'https://github.com/rajveer7790' };
export const STATIC_PATHS = ['/document-studio', '/open-source', '/about', '/contact', '/privacy', '/terms', '/sitemap', '/tools', '/embed', '/guides', '/editorial-policy', '/methodology', AUTHOR.path];
