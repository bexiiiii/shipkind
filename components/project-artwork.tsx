import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Plus, MoreHorizontal, Play } from 'lucide-react';

export default function ProjectArtwork({ id, large = false }: { id: string; large?: boolean }) {
  if (id === 'aura') return <div className={`folio-art folio-aura ${large ? 'large' : ''}`}>
    <Image src="/images/aura-interior.webp" alt="Концепция магазина AURA: предметы интерьера в тёплом минималистичном пространстве" fill sizes="(max-width: 700px) 100vw, 85vw" />
    <div className="aura-masthead"><strong>aura.</strong><span>Предметы, с которыми хочется жить.</span><ArrowUpRight /></div>
    <div className="aura-statement">Больше,<br /><em>чем вещи.</em></div>
    <div className="aura-bottom"><span>Мебель / Свет / Объекты</span><span>Смотреть коллекцию <ArrowRight size={15} /></span></div>
  </div>;
  if (id === 'orbit') return <div className={`folio-art folio-orbit ${large ? 'large' : ''}`}>
    <div className="orbit-brand">orbit<span>Работа обретает порядок.</span></div>
    <div className="orbit-board" aria-label="Демонстрационный интерфейс доски проектов">
      <div className="board-top"><span>Пространство команды</span><MoreHorizontal size={18} /></div>
      <div className="board-heading"><strong>Запуск коллекции</strong><span><Plus size={12} /> Добавить задачу</span></div>
      <div className="board-tabs"><span>Доска</span><span>Список</span><span>Файлы</span></div>
      <div className="board-columns">{[
        { name: 'В планах', tasks: ['Каталог новой коллекции', 'Тексты для карточек'] },
        { name: 'В работе', tasks: ['Дизайн главной страницы', 'Съёмка предметов'] },
        { name: 'Готово', tasks: ['Структура магазина'] },
      ].map((column, i) => <div className="board-column" key={column.name}><div className="board-column-title"><i className={`status-${i}`} />{column.name}<span>{column.tasks.length}</span></div>{column.tasks.map((task, j) => <div className="board-task" key={task}><span>{task}</span><small>{['Дизайн', 'Контент'][j % 2]}<span>{['А', 'М'][j % 2]}</span></small></div>)}</div>)}</div>
      <div className="board-foot"><span>Всё важное — в одном пространстве.</span><span>Демо-данные</span></div>
    </div>
  </div>;
  return <div className={`folio-art folio-pulse ${large ? 'large' : ''}`}>
    <Image src="/images/runner.webp" alt="Спортивная визуальная концепция PULSE: движение бегуна на дорожке" fill sizes="(max-width: 700px) 100vw, 55vw" />
    <strong className="pulse-masthead">PULSE</strong><span className="pulse-caption">В твоём ритме.</span>
    <div className="pulse-session"><div><span>Твоя тренировка сегодня</span><strong>Лёгкий бег</strong><small>25 минут · Начальный уровень</small></div><span className="pulse-play"><Play size={17} fill="currentColor" /></span></div>
  </div>;
}
