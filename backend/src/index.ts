import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { initDatabase, setInitializedDb } from './config/database';
import equipmentRoutes from './routes/equipment';
import recipeRoutes from './routes/recipes';
import workoutPlanRoutes from './routes/workoutPlans';
import articleRoutes from './routes/articles';
import authRoutes from './routes/auth';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);
app.use('/api/articles', articleRoutes);

// 健康检查
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'FitStart API is running' });
});

// 404处理
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// 错误处理
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 初始化数据库并启动服务器
async function startServer() {
  try {
    const db = await initDatabase();
    setInitializedDb(db);
    console.log('✅ Database initialized');

    app.listen(PORT, () => {
      console.log(`🚀 FitStart API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
