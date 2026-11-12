'use client';

// Header, footer and contact button for the inner pages. Markup and class names mirror the
// home page (components/studio-v3.tsx) so both share the exact same styles from app/v3.css.
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { offerings, site } from '@/lib/studio-v3-content';

const message = (topic?: string) => topic ? `Здравствуйте! Хочу обсудить проект: ${topic}.` : 'Здравствуйте! Хочу обсудить проект.';
export const whatsappLink = (topic?: string) => `${site.whatsapp}?text=${encodeURIComponent(message(topic))}`;

export function ContactButton({ topic, className, children }: { topic?: string; className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={() => window.open(whatsappLink(topic), '_blank', 'noopener,noreferrer')}>{children}</button>;
}

const menu = [['Услуги', 'services'], ['Работы', 'work'], ['Цены', 'pricing'], ['Процесс', 'process'], ['Вопросы', 'faq']] as const;

export function SiteHeader({ topic }: { topic?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    addEventListener('keydown', close);
    return () => removeEventListener('keydown', close);
  }, [menuOpen]);

  return <header className="v-header v-pill-header">
    <nav className="v-pill-nav" aria-label="Основная навигация"><Link href="/" className="v-pill-brand" aria-label={`${site.name} — на главную`}>{site.name.toUpperCase()}<span>.</span></Link><div className="v-pill-links"><Link href="/#services">Услуги</Link><Link href="/#work">Работы</Link><Link href="/#pricing">Цены</Link><Link href="/#faq">Вопросы</Link></div><div className="v-pill-actions"><a href={whatsappLink(topic)} target="_blank" rel="noopener noreferrer" className="v-pill-primary">Обсудить проект <ArrowUpRight size={17} /></a></div></nav>
    <button className="v-menu-button" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-controls="v-mobile-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X /> : <Menu />}</button>
    {menuOpen && <nav className="v-mobile-menu" id="v-mobile-menu" aria-label="Мобильная навигация">{menu.map(([label, id]) => <Link key={id} href={`/#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={18} /></Link>)}<a href={whatsappLink(topic)} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Обсудить проект<ArrowUpRight size={18} /></a></nav>}
  </header>;
}

export function SiteFooter({ topic }: { topic?: string }) {
  return <footer className="v-footer v-footer-reference" id="contact"><div className="v-footer-shell">
    <div className="v-footer-banner"><Image src="/images/blue.webp" alt="" fill unoptimized sizes="100vw" /><div><h2>Есть идея?<br />Давайте придадим ей форму.</h2><ContactButton topic={topic}>Начать разговор <ArrowRight size={17} /></ContactButton></div></div>
    <div className="v-footer-links"><div className="v-footer-intro"><Link href="/" className="v-footer-logo" aria-label={`${site.name} — на главную`}><span aria-hidden="true">◆</span> {site.name}</Link><p>Сайты, приложения и AI-агенты<br />для бизнеса. Казахстан.</p></div><div><h3>Услуги</h3>{offerings.map(item => <Link key={item.id} href={`/services/${item.id}`}>{item.title}</Link>)}</div><div><h3>Навигация</h3><Link href="/#work">Работы</Link><Link href="/#pricing">Стоимость</Link><Link href="/#process">Процесс</Link><Link href="/#faq">Вопросы</Link></div><div><h3>Начать</h3><p>Расскажите о задаче — поможем определить первый шаг.</p><a href={whatsappLink(topic)} target="_blank" rel="noopener noreferrer" className="v-footer-link-cta">Обсудить проект <ArrowRight size={16} /></a></div></div>
    <div className="v-footer-bottom"><span>© 2026 {site.name}</span><span>Сайты, приложения и AI-агенты</span><a href={whatsappLink(topic)} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
  </div></footer>;
}
