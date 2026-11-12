import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './v3.css';
import { isPublicSite, site } from '@/lib/studio-v3-content';

const inter = localFont({ src: '../public/fonts/inter-variable.woff2', weight: '100 900', variable: '--font-inter', display: 'swap' });
const archivo = localFont({ src: '../public/fonts/archivo-black.ttf', variable: '--font-archivo', display: 'swap' });
const pixel = localFont({ src: '../public/fonts/pixelify.ttf', variable: '--font-pixel', display: 'swap' });

const title = `${site.name} — разработка сайтов, приложений и AI-агентов`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: { title, description: site.description, url: '/', siteName: site.name, locale: 'ru_KZ', type: 'website' },
  twitter: { card: 'summary_large_image', title, description: site.description },
  // Indexed only on the real domain: set NEXT_PUBLIC_SITE_URL before publishing.
  robots: isPublicSite ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } } : { index: false, follow: false },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, yandex: process.env.YANDEX_VERIFICATION },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" className={`${inter.variable} ${archivo.variable} ${pixel.variable}`}><body>{children}</body></html>;
}
