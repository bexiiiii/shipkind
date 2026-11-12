'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, ArrowDown, Plus, Minus } from 'lucide-react';
import { projects, packages, faqs, type Project } from '@/lib/content';
import ProjectArtwork from './project-artwork';

type Props = { onProject: (project: Project) => void; onService: (service: string) => void };

export default function Editorial({ onProject, onService }: Props) {
  const [filter, setFilter] = useState('Все');
  const visibleProjects = projects.filter(p => filter === 'Все' || p.category === filter);

  return <div className="editorial">
    <section className="studio-landscape" id="about" aria-labelledby="about-title">
      <Image className="film-image" src="/images/landscape.webp" alt="Тихий пейзаж: свет на чёрно-белых холмах" fill sizes="100vw" />
      <div className="studio-landscape-copy">
        <h2 id="about-title">От идеи.<br />До запуска.</h2>
        <div className="signal-rule" />
        <p>Дизайн и разработка сайтов, сервисов и приложений.</p>
        <a href="#services" aria-label="Перейти к направлениям разработки"><ArrowDown size={18} /></a>
      </div>
      <span className="landscape-signature" aria-hidden="true">Forma</span>
    </section>

    <section className="practice" id="services" aria-label="Что мы разрабатываем">
      <div className="practice-triptych">
        <article className="practice-panel practice-sites reveal">
          <div className="practice-photo"><Image src="/images/cloud.webp" alt="" fill sizes="(max-width: 700px) 100vw, 30vw" /></div>
          <div className="practice-text"><h2>Сайты.<br />С характером.</h2><p>Лендинги, сайты компаний, магазины.</p><button onClick={() => onService('Сайт для бизнеса')}>Обсудить сайт <ArrowUpRight size={15} /></button></div>
        </article>
        <article className="practice-panel practice-note">
          <svg className="practice-monogram" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M31 17a12 12 0 0 0-22-3l-4-3v12h12l-4-4a7 7 0 0 1 13-2h5Zm-22 6a12 12 0 0 0 22 3l4 3V17H23l4 4a7 7 0 0 1-13 2H9Z" fill="currentColor" /></svg>
          <div><h2>Одна команда.<br />Весь путь.</h2><p>Дизайн, код и запуск — в одних руках. Исходники и доступы остаются у вас.</p></div>
          <div className="practice-signature"><div className="signal-rule" /><span>Forma Studio</span></div>
        </article>
        <article className="practice-panel practice-products reveal">
          <div className="practice-photo"><Image src="/images/dunes.webp" alt="" fill sizes="(max-width: 700px) 100vw, 30vw" /></div>
          <div className="practice-text"><h2>Продукты.<br />С продолжением.</h2><p>Личные кабинеты, CRM, SaaS, мобильные приложения.</p><button onClick={() => onService('Сервис / MVP')}>Обсудить продукт <ArrowUpRight size={15} /></button></div>
        </article>
      </div>
      <div className="practice-after"><p>А ещё — Telegram-боты, AI и интеграции.</p><button onClick={() => onService('Бот / интеграция')}>Автоматизировать задачу <ArrowUpRight size={16} /></button></div>
    </section>

    <section className="folio" id="work" aria-labelledby="work-title">
      <div className="folio-heading"><h2 id="work-title">Форма<br /><span>бывает разной.</span></h2><div className="studio-object folio-object" aria-hidden="true"><Image src="/images/coil.webp" alt="" fill unoptimized sizes="(max-width: 760px) 30vw, 20vw" /></div><p>Три авторских концепта.</p></div>
      <div className="folio-toolbar"><div role="group" aria-label="Фильтр работ">{['Все', 'Сайты', 'Сервисы', 'Приложения'].map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div></div>
      <div className={`folio-gallery ${filter !== 'Все' ? 'folio-filtered' : ''}`}>{visibleProjects.map(p => <article key={p.id} className={`folio-piece piece-${p.id}`}>
        <button className="folio-open" aria-label={`Посмотреть концепт ${p.name}`} onClick={() => onProject(p)}><ProjectArtwork id={p.id} /><span className="folio-open-label">Смотреть концепт <ArrowUpRight size={15} /></span></button>
        <div className="folio-caption"><h3>{p.name}<span>{p.type}</span></h3><span>{p.tags.join(' / ')}</span></div>
      </article>)}</div>
    </section>

    <section className="estimate" id="pricing" aria-labelledby="pricing-title">
      <div className="estimate-heading"><h2 id="pricing-title">Сколько стоит<br />ваша идея?</h2><p>Три отправные точки.</p><a href="#contact">Обсудим вашу задачу <ArrowUpRight size={16} /></a><div className="studio-object estimate-object" aria-hidden="true"><Image src="/images/satchel.webp" alt="" fill unoptimized sizes="(max-width: 760px) 26vw, 18vw" /></div></div>
      <div className="estimate-ledger">{packages.map(p => <details className="estimate-row" key={p.service} name="estimates"><summary><span className="estimate-name"><strong>{p.service}</strong><span>{p.duration}</span></span><span className="estimate-value"><small>от</small> ${p.price}</span><span className="estimate-toggle"><Plus className="plus" size={19} /><Minus className="minus" size={19} /></span></summary><div className="estimate-detail"><p>{p.caption}</p><ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul><button onClick={() => onService(p.service)}>Обсудить {p.service === 'Лендинг' ? 'лендинг' : p.service === 'Сервис / MVP' ? 'сервис' : 'сайт'} <ArrowUpRight size={15} /></button></div></details>)}<div className="estimate-note"><p>Цены в USD — ориентир. Точная смета — до старта работ.</p></div></div>
    </section>

    <section className="studio-process" id="process" aria-labelledby="process-title">
      <div className="process-portrait reveal"><Image className="film-image" src="/images/cloud.webp" alt="Свет пробивается сквозь облака" fill sizes="(max-width: 700px) 100vw, 50vw" /><h2 id="process-title">Вы видите<br />каждый шаг.</h2><span>От идеи — к запуску.</span></div>
      <div className="process-story"><ol>{[
        ['Разбираемся в задаче', 'Фиксируем объём, смету и сроки.'],
        ['Находим форму', 'Прототип и дизайн — до кода.'],
        ['Собираем и показываем', 'Работаем по этапам, показываем демо.'],
        ['Запускаем и передаём', 'Запуск, доступы и исходники.'],
      ].map(([title, description], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div>
    </section>

    <section className="studio-questions" aria-labelledby="faq-title"><div><h2 id="faq-title">Вопросы.</h2></div><div>{faqs.map(([q, a]) => <details className="studio-question" key={q} name="faq"><summary><h3>{q}</h3><Plus className="plus" size={17} /><Minus className="minus" size={17} /></summary><p>{a}</p></details>)}</div></section>
  </div>;
}
