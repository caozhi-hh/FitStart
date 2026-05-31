import { equipmentData } from '../health';

export function onRequest(context: any) {
  const { id } = context.params;
  const item = equipmentData.find(e => e.id === id);

  if (!item) {
    return new Response(JSON.stringify({ error: 'Equipment not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(item), {
    headers: { 'Content-Type': 'application/json' }
  });
}
