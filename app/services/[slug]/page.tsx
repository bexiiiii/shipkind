import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import InnerPage, { CaseTiles, Crumbs, JsonLd, ServiceCards, breadcrumbJsonLd } from '@/components/inner-page';
import { ContactButton } from '@/components/site-chrome';
import { cases, offerings, site, steps } from '@/lib/studio-v3-content';
import { servicePages } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };
// A page-level openGraph object replaces the root one, so the shared preview card is named again here.
const ogImage = { url: '/opengraph-image', width: 1200, height: 630 };

export const dynamicParams = false;
export function generateStaticParams() {
  return offerings.map(item => ({ slug: item.id }));
}

function find(slug: string) {
  const offer = offerings.find(item => item.id === slug);
  const page = servicePages[slug];
  return offer && page ? { offer, page } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { offer, page } = found;
  const title = `${page.metaTitle} — от ${offer.price} ₸`;
  const description = `${page.intro.split('. ')[0]}. Цена — от ${offer.price} ₸, срок — ${offer.time}. Студия ${site.name}, ${site.region}.`;
  return { title, description, alternates: { canonical: `/services/${offer.id}` }, openGraph: { title, description, url: `/services/${offer.id}`, type: 'website', images: [ogImage] }, twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] } };
}

export default async function ServicePage({ params }: Props) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { offer, page } = found;
  const related = cases.filter(item => page.caseIds.includes(item.id));
  const crumbs = [{ name: 'Главная', href: '/' }, { name: 'Услуги', href: '/#services' }, { name: offer.title }];
  const url = `${site.url}/services/${offer.id}`;

  return <InnerPage topic={offer.service}>
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service', '@id': `${url}#service`, name: page.h1, description: page.intro, url, serviceType: offer.title,
          provider: { '@id': `${site.url}/#organization` }, areaServed: { '@type': 'Country', name: 'Казахстан' },
          offers: { '@type': 'Offer', priceCurrency: site.currency, priceSpecification: { '@type': 'PriceSpecification', minPrice: offer.priceValue, priceCurrency: site.currency }, description: `от ${offer.price} ₸, срок: ${offer.time}` },
        },
        breadcrumbJsonLd(crumbs),
        { '@type': 'FAQPage', mainEntity: page.faq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
      ],
    }} />

    <section className="v-services in-top" aria-labelledby="in-title">
      <Crumbs crumbs={crumbs} />
      <div className="v-section-intro v-intro-light"><h1 id="in-title">{page.h1}<br /><em>от {offer.price} ₸.</em></h1></div>
      <p className="in-lead">{page.intro}</p>
      <dl className="in-facts"><div><dt>Цена</dt><dd>от {offer.price} ₸</dd></div><div><dt>Срок</dt><dd>{offer.time}</dd></div><div><dt>Где работаем</dt><dd>{site.region}, удалённо</dd></div></dl>
      <div className="v-portrait-actions in-actions"><ContactButton topic={offer.service}>Обсудить задачу <ArrowUpRight size={18} /></ContactButton></div>
      <div className="v-service-grid in-two">
        <article className="v-service-card"><div className="v-service-body"><h3>Кому подходит</h3><ul className="in-list">{page.forWhom.map(line => <li key={line}><Check size={15} />{line}</li>)}</ul></div></article>
        <article className="v-service-card"><div className="v-service-body"><h3>Что входит</h3><ul className="in-list">{page.includes.map(line => <li key={line}><Check size={15} />{line}</li>)}</ul></div></article>
      </div>
    </section>

    {related.length > 0 && <section className="v-work v-work-showcase" aria-labelledby="in-work-title"><div className="v-work-frame"><div className="v-work-frame-head"><h2 id="in-work-title">Примеры работ</h2></div><CaseTiles items={related} /></div></section>}

    <section className="v-process" id="process" aria-labelledby="v-process-title"><div className="v-process-heading"><h2 id="v-process-title">От разговора<br />до запуска.</h2><p>На каждом этапе понятно, что делаем и какой результат вы увидите.</p></div><ol>{steps.map((step, i) => <li key={step.title}><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p><small>{step.result}</small></div></li>)}</ol></section>

    <section className="v-faq" id="faq" aria-labelledby="v-faq-title"><div><h2 id="v-faq-title">Частые вопросы.</h2><p>{offer.title}: цена, сроки и условия.</p></div><div>{page.faq.map(([question, answer]) => <details key={question} name="v-faq"><summary><span>{question}</span><ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>

    <section className="v-services in-more" aria-labelledby="in-more-title">
      <div className="v-section-intro v-intro-light"><h2 id="in-more-title">Другие<br /><em>услуги.</em></h2></div>
      <ServiceCards exclude={offer.id} />
    </section>
  </InnerPage>;
}
