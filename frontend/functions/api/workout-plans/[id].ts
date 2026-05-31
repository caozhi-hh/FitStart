import { workoutPlansData } from '../health';

export function onRequest(context: any) {
  const { id } = context.params;
  const item = workoutPlansData.find(w => w.id === id);

  if (!item) {
    return new Response(JSON.stringify({ error: 'Workout plan not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(item), {
    headers: { 'Content-Type': 'application/json' }
  });
}
