import { Router, Request, Response } from 'express';
import db from '../config/database';

const router = Router();

// 获取所有食谱
router.get('/', (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM recipes';
    const params: string[] = [];

    if (type) {
      query += ' WHERE type = ?';
      params.push(type as string);
    }

    const recipes = db.prepare(query).all(...params);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// 获取单个食谱
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// 获取食谱类型列表
router.get('/types/list', (req: Request, res: Response) => {
  try {
    const types = db.prepare('SELECT DISTINCT type FROM recipes').all() as { type: string }[];
    res.json(types.map(t => t.type));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe types' });
  }
});

export default router;
