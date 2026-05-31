import { equipmentData } from '../health';

export function onRequest(context: any) {
  const url = new URL(context.request.url);
  const category = url.searchParams.get('category');

  let data = equipmentData;
  if (category) {
    data = equipmentData.filter(e => e.category === category);
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
