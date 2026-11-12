'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, X, Check, Menu, Download, CheckCircle2, LoaderCircle } from 'lucide-react';
import { type Project } from '@/lib/content';
import Editorial from './editorial';
import ProjectArtwork from './project-artwork';

export default function Studio({ inquiryEnabled }: { inquiryEnabled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState('Сайт для бизнеса');
  const [budget, setBudget] = useState('$1 000–3 000');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [briefText, setBriefText] = useState('');
  const projectDialog = useRef<HTMLDialogElement>(null);
  const privacyDialog = useRef<HTMLDialogElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const hero = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    let frame = 0;
    const scroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
        header.current?.classList.toggle('scrolled', window.scrollY > 20);
        if (hero.current && !reduced && window.scrollY < 1000) hero.current.style.setProperty('--scroll', `${window.scrollY * 0.1}px`);
        frame = 0;
      });
    };
    window.addEventListener('scroll', scroll, { passive: true });
    scroll();
    return () => { observer.disconnect(); window.removeEventListener('scroll', scroll); cancelAnimationFrame(frame); document.documentElement.classList.remove('motion-ready'); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  function moveHero(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${(e.clientX - bounds.left - bounds.width / 2) * 0.024}px`);
    e.currentTarget.style.setProperty('--my', `${(e.clientY - bounds.top - bounds.height / 2) * 0.024}px`);
  }

  function selectPackage(service: string) {
    setSelectedService(service);
    setFormState('idle');
    document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  function downloadBrief(text: string) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'FORMA-project-brief.txt'; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formState === 'sending') return;
    const form = new FormData(e.currentTarget);
    const data = { name: String(form.get('name') || '').trim(), contact: String(form.get('contact') || '').trim(), message: String(form.get('message') || '').trim(), service: selectedService, budget, consent: form.get('consent') === 'on', website: String(form.get('website') || '') };
    if (data.name.length < 2 || data.contact.length < 5 || data.message.length < 10) { setFormError('Добавьте имя, контакт и хотя бы 10 символов о задаче.'); setFormState('error'); return; }
    const text = `FORMA / Бриф проекта\n\nИмя: ${data.name}\nКонтакт: ${data.contact}\nТип проекта: ${data.service}\nБюджет: ${data.budget}\n\nЗадача:\n${data.message}\n\nЭто локально подготовленный бриф. Он не отправлен студии.\n`;
    setBriefText(text);
    if (!inquiryEnabled) { downloadBrief(text); setFormState('success'); return; }
    setFormState('sending');
    try {
      const result = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error || 'Не удалось отправить заявку. Попробуйте ещё раз.');
      setFormState('success');
    } catch (error) { setFormError(error instanceof Error ? error.message : 'Ошибка сети. Попробуйте ещё раз.'); setFormState('error'); }
  }


  return <>
    <div className="reading-progress" ref={progress} />
    <a className="skip-link" href="#main">Перейти к содержанию</a>
    <header className="site-header" ref={header}><div className="reference-nav">
      <a href="#work" className="reference-nav-link">РАБОТЫ</a><a href="#about" className="reference-nav-link">О СТУДИИ</a>
      <a className="reference-logo" href="#" aria-label="FORMA — на главную"><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M31 17a12 12 0 0 0-22-3l-4-3v12h12l-4-4a7 7 0 0 1 13-2h5Zm-22 6a12 12 0 0 0 22 3l4 3V17H23l4 4a7 7 0 0 1-13 2H9Z" fill="currentColor" /></svg></a>
      <a href="#pricing" className="reference-nav-link">СТОИМОСТЬ</a><a href="#contact" className="reference-nav-link reference-contact">НАЧНЁМ ПРОЕКТ <ArrowUpRight size={12} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </div>{menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="Мобильная навигация">{[['Что делаем', 'services'], ['Работы', 'work'], ['Стоимость', 'pricing'], ['Подход', 'process'], ['Обсудить проект', 'contact']].map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight /></a>)}</nav>}</header>

    <main id="main">
      <section className="reference-hero" aria-labelledby="hero-title" ref={hero} onPointerMove={moveHero} onPointerLeave={e => { e.currentTarget.style.setProperty('--mx', '0px'); e.currentTarget.style.setProperty('--my', '0px'); }}>
        <div className="depth-object object-rock" aria-hidden="true"><Image src="/images/rock.webp" alt="" fill unoptimized priority sizes="(max-width: 640px) 40vw, 24vw" /></div>
        <div className="depth-object object-flag" aria-hidden="true"><Image src="/images/flag.webp" alt="" fill unoptimized priority sizes="(max-width: 640px) 38vw, 23vw" /></div>
        <div className="depth-object object-satchel" aria-hidden="true"><Image src="/images/satchel.webp" alt="" fill unoptimized priority sizes="(max-width: 640px) 36vw, 22vw" /></div>
        <div className="depth-object object-coil" aria-hidden="true"><Image src="/images/coil.webp" alt="" fill unoptimized priority sizes="(max-width: 640px) 38vw, 23vw" /></div>
        <h1 id="hero-title" className="reference-title"><span>FORMA</span><span>STUDIO</span></h1>
        <p className="reference-side reference-side-left">САЙТЫ И ПРИЛОЖЕНИЯ.<br />ОТ ИДЕИ ДО ЗАПУСКА.</p>
        
        <div className="reference-hero-bottom"><a href="#contact" className="reference-start"><span className="contact-switch"><i /></span> ОБСУДИТЬ ВАШУ ИДЕЮ <ArrowUpRight size={12} /></a><a className="reference-scroll" href="#about">ЛИСТАЙТЕ ДАЛЬШЕ <ArrowDown size={12} /></a></div>
      </section>
      <Editorial onProject={p => { setProject(p); projectDialog.current?.showModal(); }} onService={selectPackage} />

      <section id="contact" className="inquiry" aria-labelledby="inquiry-title">
        <div className="inquiry-heading"><h2 id="inquiry-title" className="inquiry-title">Начнём<br />с вашей идеи.</h2><div className="studio-object inquiry-object" aria-hidden="true"><Image src="/images/flag.webp" alt="" fill unoptimized sizes="(max-width: 760px) 32vw, 23vw" /></div></div>
        <div className="inquiry-grid">
          <div className="inquiry-copy"><p>Расскажите, что хотите создать. ТЗ не обязательно.</p></div>
          <div className="form-shell">{formState === 'success' ?
            <div className="form-success" role="status"><CheckCircle2 size={38} /><h3>{inquiryEnabled ? 'Спасибо за вашу идею.' : 'Бриф готов.'}</h3><p>{inquiryEnabled ? 'Свяжемся с вами в ближайшее время.' : 'Бриф скачан файлом.'}</p>{!inquiryEnabled && <button className="button button-orange" onClick={() => downloadBrief(briefText)}>Скачать бриф ещё раз <Download size={18} /></button>}<button className="text-link" onClick={() => setFormState('idle')}>Вернуться к форме <ArrowRight size={17} /></button></div>
            : <form onSubmit={submitForm}>
              <div className="form-row"><label>Что будем создавать?<select aria-label="Что будем создавать?" value={selectedService} onChange={e => setSelectedService(e.target.value)}>{['Лендинг', 'Сайт для бизнеса', 'Сервис / MVP', 'Приложение', 'Бот / интеграция', 'Пока не знаю'].map(s => <option key={s}>{s}</option>)}</select></label><label>Ориентир по бюджету<select aria-label="Ориентир по бюджету" value={budget} onChange={e => setBudget(e.target.value)}>{['до $1 000', '$1 000–3 000', '$3 000–7 000', '$7 000+', 'Обсудим'].map(b => <option key={b}>{b}</option>)}</select></label></div>
              <div className="form-row contact-fields"><label>Как вас зовут<input name="name" autoComplete="name" placeholder="Ваше имя" minLength={2} maxLength={100} required /></label><label>Как с вами связаться<input name="contact" autoComplete="email" placeholder="Email, телефон или @telegram" minLength={5} maxLength={200} required /></label></div>
              <label>Пару слов о задаче<textarea name="message" placeholder="Что хотите сделать? Для кого? Что важно учесть?" minLength={10} maxLength={4000} required rows={3} /></label>
              <label className="honeypot" aria-hidden="true">Ваш сайт<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <label className="consent"><input type="checkbox" name="consent" required /><span>{inquiryEnabled ? 'Соглашаюсь на обработку данных для связи по заявке. ' : 'Согласен включить эти данные в скачиваемый бриф. '}<button type="button" onClick={() => privacyDialog.current?.showModal()}>О данных</button></span></label>
              {formState === 'error' && <p className="form-error" role="alert">{formError}</p>}
              <button type="submit" className="button form-submit" disabled={formState === 'sending'}>{formState === 'sending' ? <>Отправляем <LoaderCircle className="spinner" size={18} /></> : <>{inquiryEnabled ? 'Обсудить мой проект' : 'Подготовить бриф проекта'}<ArrowUpRight size={20} /></>}</button>
              
            </form>}
          </div>
        </div>
      </section>
    </main>

    <footer className="landscape-footer"><Image src="/images/dunes.webp" alt="" fill sizes="100vw" /><div className="footer-panel"><div className="footer-identity"><a className="footer-symbol" href="#" aria-label="FORMA — наверх"><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M31 17a12 12 0 0 0-22-3l-4-3v12h12l-4-4a7 7 0 0 1 13-2h5Zm-22 6a12 12 0 0 0 22 3l4 3V17H23l4 4a7 7 0 0 1-13 2H9Z" fill="currentColor" /></svg></a><div><span className="pixel-signature">Forma Studio</span><p>© 2026 FORMA</p></div></div><div className="footer-column"><h3>Что делаем</h3><a href="#services">Сайты</a><a href="#services">Приложения</a><a href="#services">Сервисы</a></div><div className="footer-column"><h3>Студия</h3><a href="#about">О нас</a><a href="#process">Подход</a><a href="#pricing">Стоимость</a><button onClick={() => privacyDialog.current?.showModal()}>О ваших данных</button></div><div className="footer-column"><h3>Начнём</h3><a href="#contact">Обсудить проект</a><a href="#">Вернуться наверх <ArrowUpRight size={12} /></a></div></div><div className="landscape-wordmark" aria-hidden="true"><span>Forma</span><span className="wordmark-reflection">Forma</span></div></footer>

    <dialog ref={projectDialog} className="project-dialog" onClose={() => setProject(null)} onClick={e => { if (e.target === e.currentTarget) projectDialog.current?.close(); }} aria-labelledby="project-title"><div className="dialog-inner"><button className="dialog-close" onClick={() => projectDialog.current?.close()} aria-label="Закрыть проект"><X /></button>{project && <><h2 id="project-title">{project.name}<span>{project.type}</span></h2><p className="dialog-intro">{project.description}</p><ProjectArtwork id={project.id} large /><div className="dialog-details"><div><h3>Задача</h3><p>{project.challenge}</p></div><div><h3>Решение</h3><p>{project.solution}</p></div></div><div className="dialog-scope"><div><h3>Что можно реализовать</h3><ul>{project.scope.map(s => <li key={s}><Check size={16} />{s}</li>)}</ul></div><div><span>Ориентир для похожего проекта</span><strong>{project.price}</strong><span>{project.timeline}</span></div></div><p className="dialog-disclaimer">Авторский концепт, не клиентский кейс.</p><button className="button button-orange" onClick={() => { projectDialog.current?.close(); selectPackage(project.id === 'aura' ? 'Сайт для бизнеса' : project.id === 'pulse' ? 'Приложение' : 'Сервис / MVP'); }}>Хочу обсудить похожий проект <ArrowUpRight size={19} /></button></>}</div></dialog>
    <dialog ref={privacyDialog} className="privacy-dialog" aria-labelledby="privacy-title" onClick={e => { if (e.target === e.currentTarget) privacyDialog.current?.close(); }}><div className="dialog-inner"><button className="dialog-close" onClick={() => privacyDialog.current?.close()} aria-label="Закрыть информацию о данных"><X /></button><h2 id="privacy-title">Без лишнего.</h2><p>{inquiryEnabled ? 'Имя, контакт и описание задачи нужны только для связи по проекту.' : 'Данные формы остаются в вашем браузере и никуда не отправляются.'}</p><button className="button button-outline" onClick={() => privacyDialog.current?.close()}>Понятно <Check size={18} /></button></div></dialog>
  </>;
}
