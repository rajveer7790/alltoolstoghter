import type { MetadataRoute } from 'next';
import { INDEXABLE_TOOLS, CATEGORIES, SITE } from '@/lib/registry';
import { lastModifiedFor, STATIC_PATHS } from '@/lib/contentDates';
import { canonicalToolPath } from '@/lib/toolPaths';
import { GUIDES } from '@/lib/guides';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...STATIC_PATHS, ...CATEGORIES.map(c => '/' + c.key), ...INDEXABLE_TOOLS.map(canonicalToolPath), ...GUIDES.map(g => '/guides/' + g.slug)];
  return paths.map(path => ({ url: SITE.url + path, lastModified: lastModifiedFor(path) }));
}
