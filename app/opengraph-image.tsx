import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/lib/studio-v3-content';

// Link-preview card shown when the site is shared in messengers and social networks.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const tags = ['Сайты', 'Интернет-магазины', 'Приложения', 'AI-агенты', 'Чат-боты'];

export default async function OpengraphImage() {
  const [extrabold, semibold] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/manrope-extrabold.ttf')),
    readFile(join(process.cwd(), 'public/fonts/manrope-semibold.ttf')),
  ]);

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', color: '#fff', fontFamily: 'Manrope', backgroundColor: '#0b1024', backgroundImage: 'radial-gradient(circle at 88% 12%, #3d6cf0 0%, rgba(61,108,240,0) 46%), radial-gradient(circle at 6% 100%, #1e3a9a 0%, rgba(30,58,154,0) 50%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 800, letterSpacing: -2 }}>SHIPKIND<span style={{ color: '#c9d3ff' }}>.</span></div>
        <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#c9d3ff', border: '2px solid rgba(255,255,255,0.28)', borderRadius: 99, padding: '0 26px', height: 56, alignItems: 'center', lineHeight: 1 }}>{site.region}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.04, letterSpacing: -4 }}>Сайты, приложения</div>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.04, letterSpacing: -4, color: '#c9d3ff' }}>и AI-агенты для бизнеса</div>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        {tags.map(tag => <div key={tag} style={{ display: 'flex', alignItems: 'center', height: 62, fontSize: 26, fontWeight: 600, lineHeight: 1, color: '#0b1024', backgroundColor: '#fff', borderRadius: 99, padding: '0 28px' }}>{tag}</div>)}
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Manrope', data: extrabold, weight: 800, style: 'normal' }, { name: 'Manrope', data: semibold, weight: 600, style: 'normal' }] },
  );
}
