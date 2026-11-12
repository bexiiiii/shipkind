import type { MetadataRoute } from 'next';
import { cases, offerings, site } from '@/lib/studio-v3-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...offerings.map(item => ({ url: `${site.url}/services/${item.id}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...cases.map(item => ({ url: `${site.url}/work/${item.id}`, lastModified, changeFrequency: 'yearly' as const, priority: 0.7 })),
  ];
}
