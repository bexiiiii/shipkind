import Image from 'next/image';
import { ArrowUpRight, Check, ChevronRight, Play } from 'lucide-react';

export default function ArtworkV3({ id, large = false }: { id: string; large?: boolean }) {
  if (id === 'aura') return <div className={`art art-aura ${large ? 'art-large' : ''}`}>
    <Image src="/images/aura-interior.webp" alt="Концепт AURA: интерьерный магазин с предметами для дома" fill sizes="(max-width: 720px) 100vw, 70vw" />
    <div className="aura-ui-top"><b>aura.</b><span>Коллекции &nbsp;&nbsp; Пространства &nbsp;&nbsp; О нас</span><span>Каталог <ArrowUpRight size={14} /></span></div>
    <div className="aura-ui-message"><span>ПРЕДМЕТЫ ДЛЯ ЖИЗНИ</span><strong>Дом начинается<br /><i>с деталей.</i></strong></div>
    <div className="aura-ui-bottom"><span>Новая коллекция / 01</span><span>Смотреть предметы <ChevronRight size={14} /></span></div>
  </div>;

  if (id === 'orbit') return <div className={`art art-orbit ${large ? 'art-large' : ''}`}>
    <div className="orbit-ambient" /><div className="orbit-title">orbit<span>Дела — на своих местах.</span></div>
    <div className="orbit-screen"><div className="orbit-side"><b>o<span>·</span></b><i>Обзор</i><i>Проекты</i><i>Команда</i><i>Файлы</i></div><div className="orbit-body"><div className="orbit-top"><span>Рабочее пространство / Проекты</span><span className="orbit-avatar">A</span></div><div className="orbit-screen-title"><b>Запуск коллекции</b><small>Обновлено сегодня</small></div><div className="orbit-columns">{[
      ['Запланировано', 'Каталог предметов', 'Тексты и структура'],
      ['В работе', 'Дизайн главной', 'Фотосъёмка'],
      ['Готово', 'Прототип магазина', ''],
    ].map(([status,a,b]) => <div className="orbit-column" key={status}><div><i />{status}</div><p>{a}<small>Задача проекта</small></p>{b && <p>{b}<small>Задача проекта</small></p>}</div>)}</div><div className="orbit-foot">Демонстрационный интерфейс <span>Проектов: 1</span></div></div></div>
  </div>;

  if (id === 'flow') return <div className={`art art-flow ${large ? 'art-large' : ''}`}>
    <Image src="/images/portrait.webp" alt="Редакционная фотография для концепта финансового приложения FLOW" fill sizes="(max-width: 720px) 100vw, 70vw" />
    <div className="flow-copy"><span>ФИНАНСЫ БЕЗ ШУМА</span><strong>Ваши деньги.<br />Ваши правила.</strong><span className="flow-pill">Смотреть концепт <ArrowUpRight size={13} /></span></div>
    <div className="flow-widget"><div><span>Сегодня доступно</span><b>24 600 ₽</b><small>Демо-данные</small></div><div className="flow-widget-row"><span><i /> Регулярные платежи</span><span>2 впереди</span></div></div>
  </div>;

  return <div className={`art art-pulse ${large ? 'art-large' : ''}`}>
    <Image src="/images/runner.webp" alt="Концепт PULSE: движение бегуна на стадионе" fill sizes="(max-width: 720px) 100vw, 70vw" />
    <div className="pulse-brand">PULSE<span>Твой ритм.</span></div>
    <div className="pulse-app"><div className="pulse-app-top"><b>pulse<span>®</span></b><span>09:41</span></div><small>СЕГОДНЯ</small><strong>Двигаться<br />легко.</strong><div className="pulse-task"><div><span>Тренировка дня</span><b>Лёгкий бег</b><small>25 минут · стартовый уровень</small></div><span className="pulse-play"><Play size={16} fill="currentColor" /></span></div><div className="pulse-history"><Check size={12} /> Вчерашняя цель выполнена</div></div>
  </div>;
}
