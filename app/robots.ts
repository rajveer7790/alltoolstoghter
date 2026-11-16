import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/registry';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-User', 'Google-Extended'].map(userAgent => ({ userAgent, allow: '/' }))],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
