import { cases, offerings, questions, site, steps } from '@/lib/studio-v3-content';

export const dynamic = 'force-static';

// Plain-text summary of the site for AI assistants (llms.txt convention).
export function GET() {
  const body = [
    `# ${site.name} — студия разработки`,
    '',
    `> ${site.description}`,
    '',
    `Сайт: ${site.url}`,
    `Регион: ${site.region}, работаем удалённо`,
    `Связь: WhatsApp ${site.phone} (${site.whatsapp})`,
    '',
    '## Услуги и цены',
    ...offerings.map(item => `- [${item.title}](${site.url}/services/${item.id}): от ${item.price} ₸, срок ${item.time}. ${item.description}`),
    '',
    'Цены в тенге — ориентир. Хостинг, подписки и платные API, включая токены AI-моделей, оплачиваются отдельно.',
    '',
    '## Как идёт работа',
    ...steps.map((step, i) => `${i + 1}. ${step.title}. ${step.text} Результат: ${step.result}`),
    '',
    '## Работы',
    ...cases.map(item => `- [${item.name}](${site.url}/work/${item.id}) (${item.kind}): ${item.teaser} ${item.approach}`),
    '',
    '## Частые вопросы',
    ...questions.flatMap(([question, answer]) => [`### ${question}`, answer, '']),
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
