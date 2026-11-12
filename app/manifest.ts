import type { MetadataRoute } from 'next';
import { site } from '@/lib/studio-v3-content';

export default function manifest(): MetadataRoute.Manifest {
  return { name: `${site.name} — студия разработки`, short_name: site.name, description: site.tagline, start_url: '/', display: 'browser', background_color: '#101a38', theme_color: '#101a38', lang: 'ru', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }] };
}
