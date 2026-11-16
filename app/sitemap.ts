import type { MetadataRoute } from 'next';
import { INDEXABLE_TOOLS, CATEGORIES, SITE } from '@/lib/registry';
import { CONTENT_UPDATED, STATIC_PATHS } from '@/lib/contentDates';
import { GUIDES } from '@/lib/guides';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
 return ['',...STATIC_PATHS,...CATEGORIES.map(c=>'/'+c.key),...INDEXABLE_TOOLS.map(t=>`/${t.category}/${t.slug}`),...GUIDES.map(g=>'/guides/'+g.slug)].map(path=>({url:SITE.url+path,lastModified:CONTENT_UPDATED}));
}
