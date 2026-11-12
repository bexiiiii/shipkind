import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import InnerPage, { CaseTiles, Crumbs, JsonLd, breadcrumbJsonLd } from '@/components/inner-page';
import { ContactButton } from '@/components/site-chrome';
import { cases, offerings, site } from '@/lib/studio-v3-content';
import { caseService } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map(item => ({ slug: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find(entry => entry.id === slug);
  if (!item) return {};
  const title = `${item.name} — ${item.kind.toLowerCase()}: кейс`;
  const description = `${item.teaser} ${item.approach}`.slice(0, 200);
  return { title, description, alternates: { canonical: `/work/${item.id}` }, openGraph: { title, description, url: `/work/${item.id}`, type: 'article', images: [{ url: item.shots[0].src, width: item.shots[0].width, height: item.shots[0].height, alt: item.shots[0].alt }] } };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const item = cases.find(entry => entry.id === slug);
  if (!item) notFound();
  const service = offerings.find(entry => entry.id === caseService[item.id]);
  const crumbs = [{ name: 'Главная', href: '/' }, { name: 'Работы', href: '/#work' }, { name: item.name }];
  const url = `${site.url}/work/${item.id}`;

  return <InnerPage topic={item.service}>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CreativeWork', '@id': `${url}#case`, name: item.name, headline: `${item.name} — ${item.kind}`, description: `${item.teaser} ${item.approach}`, url, image: item.shots.map(shot => `${site.url}${shot.src}`), creator: { '@id': `${site.url}/#organization` }, inLanguage: 'ru', ...(item.url ? { sameAs: item.url } : {}) },
        breadcrumbJsonLd(crumbs),
      ],
    }} />

    <section className="v-services in-top in-top-case" aria-labelledby="in-title">
      <Crumbs crumbs={crumbs} />
      <div className="v-section-intro v-intro-light"><h1 id="in-title">{item.name}<br /><em>{item.kind}.</em></h1></div>
      <p className="in-lead">{item.teaser}</p>
      {item.url && <a className="in-site-link" href={item.url} target="_blank" rel="noopener noreferrer">{item.url.includes('apps.apple.com') ? 'Открыть в App Store' : item.url.replace('https://', '')} <ArrowUpRight size={15} /></a>}
    </section>

    <section className="v-work v-work-showcase in-case">
      <div className="v-work-frame">
        <div className="v-case-shots">{item.shots.map((shot, i) => <Image key={shot.src} src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} priority={i === 0} sizes="(max-width: 1290px) 100vw, 1230px" />)}</div>
        <div className="v-dialog-story"><div><h2>Задача</h2><p>{item.brief}</p></div><div><h2>Что сделали</h2><p>{item.approach}</p></div></div>
        <div className="v-dialog-bottom"><div><h2>Что входит</h2><ul>{item.scope.map(part => <li key={part}>{part}</li>)}</ul></div><div>{service && <p>Услуга: <Link href={`/services/${service.id}`}>{service.title} <ArrowUpRight size={14} /></Link><br />от {service.price} ₸, срок {service.time}</p>}<ContactButton topic={item.service} className="v-button v-button-dark">Обсудить похожий проект <ArrowUpRight size={17} /></ContactButton></div></div>
      </div>
      <div className="v-work-frame in-other"><div className="v-work-frame-head"><h2>Другие работы</h2></div><CaseTiles items={cases.filter(entry => entry.id !== item.id)} /></div>
    </section>
  </InnerPage>;
}
