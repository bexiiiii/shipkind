import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ error: 'Отправка пока не подключена. Сохраните бриф и вернитесь позже.' }, { status: 503 });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'Недопустимый источник запроса.' }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 12000) return NextResponse.json({ error: 'Слишком большой запрос.' }, { status: 413 });
  let data: Record<string, unknown>;
  try { data = JSON.parse(raw); } catch { return NextResponse.json({ error: 'Проверьте данные формы.' }, { status: 400 }); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return NextResponse.json({ error: 'Проверьте данные формы.' }, { status: 400 });
  if (data.website) return NextResponse.json({ ok: true });
  const str = (key: string) => typeof data[key] === 'string' ? (data[key] as string).trim() : '';
  if (str('name').length < 2 || str('name').length > 100 || str('contact').length < 5 || str('contact').length > 200 || str('message').length < 10 || str('message').length > 4000 || data.consent !== true) {
    return NextResponse.json({ error: 'Укажите имя, контакт, описание задачи и согласие на обработку данных.' }, { status: 400 });
  }
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:') throw new Error('HTTPS required');
    const response = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json', ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ name: str('name'), contact: str('contact'), message: str('message'), service: str('service').slice(0, 100), budget: str('budget').slice(0, 100), consent: true, source: 'forma-website', createdAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Delivery failed');
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'Не получилось отправить заявку. Ваши данные остались в форме — попробуйте ещё раз.' }, { status: 502 }); }
}
