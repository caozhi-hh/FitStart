import { Router, Request, Response } from 'express';
import db from '../config/database';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// 获取所有文章
router.get('/', (req: Request, res: Response) => {
  try {
    const { category, limit = 20, offset = 0 } = req.query;
    let query = 'SELECT * FROM articles ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const params: any[] = [Number(limit), Number(offset)];

    if (category) {
      query = 'SELECT * FROM articles WHERE category = ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.unshift(category);
    }

    const articles = db.prepare(query).all(...params);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// 获取单个文章
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 更新浏览量
    db.prepare('UPDATE articles SET views = views + 1 WHERE id = ?').run(id);

    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// 创建文章（需要认证）
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, content, category, tags, cover_image_url } = req.body;
    const id = uuidv4();

    db.prepare(`
      INSERT INTO articles (id, title, content, category, tags, cover_image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, title, content, category, JSON.stringify(tags || []), cover_image_url);

    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// 点赞文章
router.post('/:id/like', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    db.prepare('UPDATE articles SET likes = likes + 1 WHERE id = ?').run(id);
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like article' });
  }
});

export default router;
