import { Router, Request, Response } from 'express';
import db from '../config/database';

const router = Router();

// 获取所有器械
router.get('/', (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM equipment';
    const params: string[] = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category as string);
    }

    const equipment = db.prepare(query).all(...params);
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

// 获取单个器械
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const equipment = db.prepare('SELECT * FROM equipment WHERE id = ?').get(id);

    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

// 获取器械分类列表
router.get('/categories/list', (req: Request, res: Response) => {
  try {
    const categories = db.prepare('SELECT DISTINCT category FROM equipment').all() as { category: string }[];
    res.json(categories.map(c => c.category));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;
