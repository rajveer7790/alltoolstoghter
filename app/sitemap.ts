import { isIndexableTool } from '@/lib/toolPolicy';
import type { MetadataRoute } from 'next';
import { ALL_TOOLS, CATEGORIES, SITE } from '@/lib/registry';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.6 },
    { path: '/privacy', priority: 0.5 },
    { path: '/terms', priority: 0.5 },
    { path: '/sitemap', priority: 0.5 },
  ];
  return [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1 },
    ...staticPages.map(p => ({
      url: `${SITE.url}${p.path}`,
      changeFrequency: 'monthly' as const,
      priority: p.priority,
    })),
    ...CATEGORIES.map(c => ({ url: `${SITE.url}/${c.key}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...ALL_TOOLS.filter(isIndexableTool).map(t => ({
      url: `${SITE.url}/${t.category}/${t.slug}`,
      changeFrequency: 'monthly' as const,
      priority: t.prio === 'P1' ? 0.9 : t.prio === 'P2' ? 0.7 : 0.5,
    })),
  ];
}
