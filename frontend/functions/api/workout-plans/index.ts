import { workoutPlansData } from '../health';

export function onRequest(context: any) {
  const url = new URL(context.request.url);
  const level = url.searchParams.get('level');

  let data = workoutPlansData;
  if (level) {
    data = workoutPlansData.filter(w => w.level === level);
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
