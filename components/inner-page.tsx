import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cases, offerings, site, type Case } from '@/lib/studio-v3-content';
import { SiteFooter, SiteHeader } from './site-chrome';
import '@/app/inner.css';

export type Crumb = { name: string; href?: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, name: crumb.name, ...(crumb.href ? { item: `${site.url}${crumb.href}` } : {}) })),
  };
}

// Content is our own static data; "<" is escaped so the JSON cannot close the script tag.
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
  return <nav className="in-crumbs" aria-label="Хлебные крошки"><ol>{crumbs.map(crumb => <li key={crumb.name}>{crumb.href ? <Link href={crumb.href}>{crumb.name}</Link> : <span aria-current="page">{crumb.name}</span>}</li>)}</ol></nav>;
}

// Same tile as on the home page, but a link to the case page instead of a dialog trigger.
export function CaseTiles({ items }: { items: readonly Case[] }) {
  return <div className="v-work-tiles">{items.map(item => <Link className={`v-work-tile v-work-tile-${item.id}`} key={item.id} href={`/work/${item.id}`} aria-label={`Смотреть кейс ${item.name}`}><span className="v-work-tile-art"><Image src={item.shots[0].src} alt="" fill sizes="(max-width: 700px) 50vw, 380px" /></span><span className="v-work-tile-open" aria-hidden="true"><ArrowUpRight size={16} /></span><span className="v-work-tile-meta"><b>{item.name}</b><span>{item.kind}</span><em>Смотреть кейс <ArrowUpRight size={13} /></em></span></Link>)}</div>;
}

// Same card as in the home "services" grid; the title and the action lead to the service page.
export function ServiceCards({ exclude }: { exclude?: string }) {
  return <div className="v-service-grid">{offerings.filter(item => item.id !== exclude).map(item => <article className="v-service-card" key={item.id}><div className="v-service-art"><Image src={item.image} alt="" fill unoptimized sizes="(max-width: 700px) 45vw, 21vw" /></div><div className="v-service-body"><h3><Link href={`/services/${item.id}`}>{item.title}</Link></h3><p>{item.description}</p><p className="v-service-price"><b>от {item.price} ₸</b><span>{item.time}</span></p><Link className="in-more" href={`/services/${item.id}`}>Подробнее <ArrowUpRight size={17} /></Link></div></article>)}</div>;
}

// Shell shared by the service and case pages: the home page's header and footer around the content.
export default function InnerPage({ topic, children }: { topic?: string; children: React.ReactNode }) {
  return <div className="in-page">
    <a className="v-skip" href="#main">Перейти к содержанию</a>
    <SiteHeader topic={topic} />
    <main id="main">{children}</main>
    <SiteFooter topic={topic} />
  </div>;
}

export { cases };
