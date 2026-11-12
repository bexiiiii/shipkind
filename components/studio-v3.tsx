'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react';
import { cases, offerings, plans, questions, steps, type Case } from '@/lib/studio-v3-content';

export default function StudioV3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const caseDialog = useRef<HTMLDialogElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const heroScene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('v-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll('.v-reveal').forEach(el => observer.observe(el));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (progress.current) {
          const end = document.documentElement.scrollHeight - innerHeight;
          progress.current.style.transform = `scaleX(${end ? scrollY / end : 0})`;
        }
        raf = 0;
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    addEventListener('keydown', close);
    return () => removeEventListener('keydown', close);
  }, [menuOpen]);

  function onHeroMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--px', `${(event.clientX - box.left - box.width / 2) * 0.017}px`);
    event.currentTarget.style.setProperty('--py', `${(event.clientY - box.top - box.height / 2) * 0.017}px`);
  }

  function goToContact(nextService?: string) {
    const message = nextService
      ? `Здравствуйте! Хочу обсудить проект: ${nextService}.`
      : 'Здравствуйте! Хочу обсудить проект.';
    window.open(`https://wa.me/77064267143?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  function openCase(item: Case) {
    setActiveCase(item);
    caseDialog.current?.showModal();
  }

  return <>
    <div className="v-progress" ref={progress} />
    <a className="v-skip" href="#main">Перейти к содержанию</a>
    <header className="v-header v-pill-header">
      <nav className="v-pill-nav" aria-label="Основная навигация"><a href="#" className="v-pill-brand" aria-label="Shipkind — наверх">SHIPKIND<span>.</span></a><div className="v-pill-links"><a href="#services">Услуги</a><a href="#work">Работы</a><a href="#pricing">Цены</a><a href="#faq">Вопросы</a></div><div className="v-pill-actions"><a href="https://wa.me/77064267143?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82." target="_blank" rel="noopener noreferrer" className="v-pill-primary">Обсудить проект <ArrowUpRight size={17} /></a></div></nav>
      <button className="v-menu-button" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-controls="v-mobile-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <nav className="v-mobile-menu" id="v-mobile-menu" aria-label="Мобильная навигация">{[['Услуги', 'services'], ['Работы', 'work'], ['Стоимость', 'pricing'], ['Процесс', 'process'], ['FAQ', 'faq'], ['Обсудить проект', 'contact']].map(([label, id]) => <a key={id} href={id === 'contact' ? 'https://wa.me/77064267143?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82.' : `#${id}`} target={id === 'contact' ? '_blank' : undefined} rel={id === 'contact' ? 'noopener noreferrer' : undefined} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={18} /></a>)}</nav>}
    </header>

    <main id="main">
      <section className="v-token-hero" aria-labelledby="v-hero-title" ref={heroScene} onPointerMove={onHeroMove} onPointerLeave={event => { event.currentTarget.style.setProperty('--px', '0px'); event.currentTarget.style.setProperty('--py', '0px'); }}>
        <div className="v-portrait-object" aria-hidden="true"><Image src="/images/hero-vr-woman.png" alt="" fill priority unoptimized sizes="(max-width: 700px) 100vw, 58vw" /><Image className="v-portrait-blur" src="/images/hero-vr-woman.png" alt="" fill unoptimized sizes="(max-width: 700px) 100vw, 58vw" /></div>
        <div className="v-portrait-copy"><h1 id="v-hero-title">Сайты, приложения<br />и AI-агенты для бизнеса.</h1><p>Студия разработки в Казахстане. Цены — от 200 000 ₸, сроки — от 1 недели.</p><div className="v-portrait-actions"><button type="button" onClick={() => goToContact()}>Обсудить проект <ArrowUpRight size={18} /></button><a href="#work">Посмотреть работы <ArrowUpRight size={18} /></a></div></div>
      </section>

      <section className="v-services" id="services" aria-labelledby="v-services-title">
        <div className="v-section-intro v-intro-light"><h2 id="v-services-title">Что делаем<br /><em>и сколько это стоит.</em></h2></div>
        <div className="v-service-grid">{offerings.map(item => <article className="v-service-card v-reveal" key={item.id}><div className="v-service-art"><Image src={item.image} alt="" fill unoptimized sizes="(max-width: 700px) 45vw, 21vw" /></div><div className="v-service-body"><h3><a href={`/services/${item.id}`}>{item.title}</a></h3><p>{item.description}</p><p className="v-service-price"><b>от {item.price} ₸</b><span>{item.time}</span></p><button type="button" onClick={() => goToContact(item.service)}>Обсудить задачу <ArrowUpRight size={17} /></button></div></article>)}</div>
      </section>

      <section className="v-work v-work-showcase" id="work" aria-labelledby="v-work-title">
        <div className="v-work-frame">
          <div className="v-work-frame-head"><h2 id="v-work-title">Наши работы</h2></div>
          <article className="v-work-feature">
            <div className="v-work-feature-copy"><span>01 / 0{cases.length} &nbsp;·&nbsp; {cases[0].kind}</span><h3>{cases[0].name}</h3><p>{cases[0].teaser}</p><button type="button" onClick={() => openCase(cases[0])}>Смотреть кейс <ArrowUpRight size={17} /></button></div>
            <div className="v-work-feature-art v-work-shot" onClick={() => openCase(cases[0])}><Image src={cases[0].shots[0].src} alt={cases[0].shots[0].alt} fill sizes="(max-width: 700px) 100vw, 55vw" /></div>
          </article>
          <div className="v-work-tiles">{cases.map(item => <button type="button" className={`v-work-tile v-work-tile-${item.id}`} key={item.id} aria-label={`Смотреть кейс ${item.name}`} onClick={() => openCase(item)}><span className="v-work-tile-art"><Image src={item.shots[0].src} alt="" fill sizes="(max-width: 700px) 50vw, 380px" /></span><span className="v-work-tile-open" aria-hidden="true"><ArrowUpRight size={16} /></span><span className="v-work-tile-meta"><b>{item.name}</b><span>{item.kind}</span><em>Смотреть кейс <ArrowUpRight size={13} /></em></span></button>)}</div>
          <p className="v-work-links">Страницы кейсов: {cases.map(item => <a key={item.id} href={`/work/${item.id}`}>{item.name}</a>)}</p>
        </div>
      </section>

      <section className="v-start" id="about" aria-labelledby="v-start-title">
        <div className="v-start-visual"><Image src="/images/cabinet.webp" alt="Минималистичная иллюстрация открытого ящика для документов" fill priority unoptimized sizes="(max-width: 700px) 90vw, 40vw" /></div>
        <div className="v-start-copy"><h2 id="v-start-title">ТЗ пока нет?<br />Это нормально.</h2><p>Не нужно заранее знать стек и список функций. Расскажите, для кого продукт и какую задачу он решает — предложим первую версию, срок и смету.</p><button type="button" className="v-button v-button-dark" onClick={() => goToContact()}>Расскажите об идее <ArrowUpRight size={17} /></button></div>
      </section>

      <section className="v-showcase" aria-labelledby="v-showcase-title"><div className="v-showcase-heading"><h2 id="v-showcase-title">Сложное —<br />на простом экране.</h2><p>Демонстрационный концепт: главное действие, показатели и ближайшие события собраны в одном рабочем пространстве.</p></div><div className="v-dashboard"><div className="v-dashboard-blue"><span className="v-dashboard-dots">····</span><div><span>Доброе утро, Алекс</span><h3>Все важное<br />на виду.</h3><p>Что нужно узнать или сделать сегодня?</p><span className="v-dashboard-input">Найти задачу или отчет <ArrowUpRight size={16} /></span></div><small>Концепт интерфейса · демо-данные</small></div><div className="v-dashboard-right"><div className="v-dashboard-metric"><div><span>Динамика за 30 дней</span><span>↗</span></div><svg viewBox="0 0 420 105" preserveAspectRatio="none" aria-label="Иллюстративный график" role="img"><path d="M0 84 H45 Q55 84 55 69 V64 Q55 58 66 58 H122 Q133 58 133 42 V38 Q133 31 143 31 H203 Q215 31 215 15 Q215 9 226 9 H286 Q298 9 298 35 V48 Q298 57 310 57 H358 Q370 57 370 42 Q370 37 382 37 H420" fill="none" stroke="#1bc987" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg><div className="v-dashboard-metric-foot"><span>План выполнен</span><b>72%</b><span>+ 8% за месяц</span></div></div><div className="v-dashboard-timeline"><div><b>Ближайшие события</b><span>Эта неделя</span></div><p><i>18</i><span>Проверить макет</span><em>Сегодня</em></p><p><i>20</i><span>Согласовать сценарии</span><em>Среда</em></p><p><i>22</i><span>Посмотреть демо</span><em>Пятница</em></p></div></div></div><p className="v-showcase-note">Пример визуального подхода, а не действующий продукт клиента.</p></section>

      <section className="v-pricing v-pricing-reference" id="pricing" aria-labelledby="v-pricing-title">
        <div className="v-pricing-heading"><span>СТОИМОСТЬ / ОРИЕНТИРЫ</span><h2 id="v-pricing-title">Сколько стоит<br />начать проект.</h2><p>Три частых формата. Точную смету даём после короткого разговора о задаче.</p></div>
        <div className="v-pricing-cards">{plans.map((item, index) => <article className="v-price-card" key={item.name}>
          <div className="v-price-card-top"><span className="v-price-pill">{item.time}</span><h3>{item.name}</h3><p className="v-price-value">от <strong>{item.price} ₸</strong></p><div className="v-price-art"><Image src={index === 0 ? '/images/price-landing.png' : index === 1 ? '/images/price-business.png' : '/images/price-mvp.png'} alt="" fill unoptimized sizes="(max-width: 700px) 45vw, 170px" /></div></div>
          <div className="v-price-card-body"><p>{item.fit}</p><span>Что входит:</span><ul>{item.scope.map(part => <li key={part}><Check size={15} />{part}</li>)}</ul><button type="button" onClick={() => goToContact(item.service)}>Обсудить проект <ArrowUpRight size={17} /></button></div>
        </article>)}</div>
        <div className="v-price-list"><h3>Все услуги и цены</h3><table><thead><tr><th scope="col">Услуга</th><th scope="col">Срок</th><th scope="col">Цена</th></tr></thead><tbody>{offerings.map(item => <tr key={item.id}><th scope="row"><a href={`/services/${item.id}`}>{item.title}</a></th><td>{item.time}</td><td>от {item.price} ₸</td></tr>)}</tbody></table></div>
        <p className="v-pricing-footnote">Цены в тенге — ориентир для указанного состава работ. Хостинг, подписки и платные API, включая токены AI-моделей, оплачиваются отдельно.</p>
      </section>

      <section className="v-process" id="process" aria-labelledby="v-process-title"><div className="v-process-heading"><h2 id="v-process-title">От разговора<br />до запуска.</h2><p>На каждом этапе понятно, что делаем и какой результат вы увидите.</p></div><ol>{steps.map((step, i) => <li key={step.title} className="v-reveal"><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p><small>{step.result}</small></div></li>)}</ol></section>

      <section className="v-faq" id="faq" aria-labelledby="v-faq-title"><div><h2 id="v-faq-title">Частые вопросы.</h2><p>Цены, сроки, AI-агенты и условия работы.</p></div><div>{questions.map(([question, answer]) => <details key={question} name="v-faq"><summary><span>{question}</span><ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>

    </main>

    <footer className="v-footer v-footer-reference" id="contact"><div className="v-footer-shell">
      <div className="v-footer-banner"><Image src="/images/blue.webp" alt="" fill priority unoptimized sizes="100vw" /><div><h2>Есть идея?<br />Давайте придадим ей форму.</h2><button type="button" onClick={() => goToContact()}>Начать разговор <ArrowRight size={17} /></button></div></div>
      <div className="v-footer-links"><div className="v-footer-intro"><a href="#" className="v-footer-logo" aria-label="Shipkind — наверх"><span aria-hidden="true">◆</span> Shipkind</a><p>Сайты, приложения и AI-агенты<br />для бизнеса. Казахстан.</p></div><div><h3>Услуги</h3>{offerings.map(item => <a key={item.id} href={`/services/${item.id}`}>{item.title}</a>)}</div><div><h3>Навигация</h3><a href="#work">Работы</a><a href="#pricing">Стоимость</a><a href="#process">Процесс</a><a href="#faq">Вопросы</a></div><div><h3>Начать</h3><p>Расскажите о задаче — поможем определить первый шаг.</p><a href="https://wa.me/77064267143?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82." target="_blank" rel="noopener noreferrer" className="v-footer-link-cta">Обсудить проект <ArrowRight size={16} /></a></div></div>
      <div className="v-footer-bottom"><span>© 2026 Shipkind</span><span>Сайты, приложения и AI-агенты</span><a href="https://wa.me/77064267143?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82." target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
    </div></footer>

    <dialog ref={caseDialog} className="v-case-dialog" onClose={() => setActiveCase(null)} onClick={event => { if (event.target === event.currentTarget) caseDialog.current?.close(); }} aria-labelledby="v-case-title"><div className="v-dialog-inner"><button type="button" className="v-dialog-close" aria-label="Закрыть кейс" onClick={() => caseDialog.current?.close()}><X /></button>{activeCase && <><div className="v-dialog-head"><h2 id="v-case-title">{activeCase.name}</h2><span>{activeCase.kind}</span></div><p className="v-dialog-teaser">{activeCase.teaser}</p><div className="v-case-shots">{activeCase.shots.map(shot => <Image key={shot.src} src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 960px) 100vw, 890px" />)}</div><div className="v-dialog-story"><div><h3>Задача</h3><p>{activeCase.brief}</p></div><div><h3>Что сделали</h3><p>{activeCase.approach}</p></div></div><div className="v-dialog-bottom"><div><h3>Что входит</h3><ul>{activeCase.scope.map(part => <li key={part}>{part}</li>)}</ul></div><div>{activeCase.url ? <p><a href={activeCase.url} target="_blank" rel="noopener noreferrer">{activeCase.url.includes('apps.apple.com') ? 'App Store' : activeCase.url.replace('https://', '')} <ArrowUpRight size={14} /></a></p> : <p>Скриншоты рабочей системы. Данные клиента скрыты.</p>}<p><a href={`/work/${activeCase.id}`}>Страница кейса <ArrowUpRight size={14} /></a></p><button type="button" className="v-button v-button-dark" onClick={() => { caseDialog.current?.close(); goToContact(activeCase.service); }}>Обсудить похожий проект <ArrowUpRight size={17} /></button></div></div></>}</div></dialog>


  </>;
}
