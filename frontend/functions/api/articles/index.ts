import { articlesData } from '../health';

export function onRequest(context: any) {
  const url = new URL(context.request.url);
  const category = url.searchParams.get('category');

  let data = articlesData;
  if (category) {
    data = articlesData.filter(a => a.category === category);
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
