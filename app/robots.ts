import type { MetadataRoute } from 'next';
import { isPublicSite, site } from '@/lib/studio-v3-content';

// Search and AI crawlers are named explicitly so a later blanket rule cannot shut them out by accident.
const crawlers = ['Googlebot', 'Bingbot', 'YandexBot', 'YandexAdditional', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended'];

export default function robots(): MetadataRoute.Robots {
  if (!isPublicSite) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }, { userAgent: crawlers, allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
