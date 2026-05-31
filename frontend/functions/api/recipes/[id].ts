import { recipesData } from '../health';

export function onRequest(context: any) {
  const { id } = context.params;
  const item = recipesData.find(r => r.id === id);

  if (!item) {
    return new Response(JSON.stringify({ error: 'Recipe not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(item), {
    headers: { 'Content-Type': 'application/json' }
  });
}
