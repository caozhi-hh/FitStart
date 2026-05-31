import { Router, Request, Response } from 'express';
import db from '../config/database';

const router = Router();

// 获取所有训练计划
router.get('/', (req: Request, res: Response) => {
  try {
    const { level } = req.query;
    let query = 'SELECT * FROM workout_plans';
    const params: string[] = [];

    if (level) {
      query += ' WHERE level = ?';
      params.push(level as string);
    }

    const plans = db.prepare(query).all(...params);

    // 解析 schedule JSON
    const parsedPlans = plans.map((plan: any) => ({
      ...plan,
      schedule: JSON.parse(plan.schedule)
    }));

    res.json(parsedPlans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout plans' });
  }
});

// 获取单个训练计划
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plan = db.prepare('SELECT * FROM workout_plans WHERE id = ?').get(id) as any;

    if (!plan) {
      return res.status(404).json({ error: 'Workout plan not found' });
    }

    // 解析 schedule JSON
    plan.schedule = JSON.parse(plan.schedule);

    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout plan' });
  }
});

export default router;
