import { recipesData } from '../health';

export function onRequest(context: any) {
  const url = new URL(context.request.url);
  const type = url.searchParams.get('type');

  let data = recipesData;
  if (type) {
    data = recipesData.filter(r => r.type === type);
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
