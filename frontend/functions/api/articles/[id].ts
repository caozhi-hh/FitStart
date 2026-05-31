import { articlesData } from '../health';

export function onRequest(context: any) {
  const { id } = context.params;
  const item = articlesData.find(a => a.id === id);

  if (!item) {
    return new Response(JSON.stringify({ error: 'Article not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(item), {
    headers: { 'Content-Type': 'application/json' }
  });
}
