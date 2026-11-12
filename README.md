# Shipkind

Сайт-портфолио студии разработки на Next.js 16, React 19 и TypeScript. Название студии — Shipkind.

## Запуск

```sh
npm install
npm run dev
```

Откройте http://127.0.0.1:3000. Для проверки: `npm run lint`, `npm run typecheck`, `npm run build`.

## Содержание и дизайн

- Тексты услуг, концептов, цен, этапов и FAQ: `lib/studio-v3-content.ts`.
- Страница и действия: `components/studio-v3.tsx`.
- Стили и адаптивность: `app/v3.css`.
- Изображения: `public/images/`; локальные шрифты: `public/fonts/`.
- Сопоставление с референсами: `docs/reference-map.md` и `.impeccable/briefs/home.md`.
- Исследование структуры и контента: `docs/research-and-content.md`.
- Визуальная система: `DESIGN.md` и `.impeccable/design.json`.

Кнопки обсуждения открывают WhatsApp по номеру +7 706 426 7143 с подготовленным сообщением. Форма и серверная отправка заявок не используются.

## Перед публикацией

Подтвердите название студии, цены и сроки, проверьте номер WhatsApp. Работы AURA, ORBIT, FLOW и PULSE — авторские концепты, не клиентские кейсы. Показатели демонстрационного интерфейса иллюстративны. Метаданные пока содержат `noindex`.

В hero используется исходный PNG, предоставленный пользователем, на чёрной подложке. Портрет и предметные 3D-ассеты созданы для проекта. Движение картинок услуг при наведении отключено; прочие эффекты учитывают `prefers-reduced-motion`.

## SEO и AI-поиск (обновлено 12 ноября 2026)

- Цены теперь в тенге и заданы в `lib/studio-v3-content.ts` (`offerings`, `plans`, `questions`); оттуда же строятся JSON-LD (`app/page.tsx`), `app/llms.txt/route.ts`, `app/robots.ts`, `app/sitemap.ts`.
- Пока `NEXT_PUBLIC_SITE_URL` указывает на localhost, сайт отдаёт `noindex`, а robots.txt закрывает всё. Для публикации задайте реальный домен; коды подтверждения — `GOOGLE_SITE_VERIFICATION`, `YANDEX_VERIFICATION`.
- Копии файлов до правок: `.backup-before-seo/`.
