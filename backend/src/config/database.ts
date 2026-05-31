import initSqlJs, { Database, QueryExecResult } from 'sql.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

let db: Database | null = null;

// 兼容 better-sqlite3 API 的包装器
class StatementWrapper {
  private sql: string;
  private db: Database;

  constructor(sql: string, database: Database) {
    this.sql = sql;
    this.db = database;
  }

  all(...params: any[]): any[] {
    const result = this.db.exec(this.sql, params);
    if (result.length === 0) return [];
    const columns = result[0].columns;
    return result[0].values.map(row => {
      const obj: Record<string, any> = {};
      columns.forEach((col, i) => {
        obj[col] = row[i];
      });
      return obj;
    });
  }

  get(...params: any[]): any | undefined {
    const result = this.db.exec(this.sql, params);
    if (result.length === 0 || result[0].values.length === 0) return undefined;
    const columns = result[0].columns;
    const row = result[0].values[0];
    const obj: Record<string, any> = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  }

  run(...params: any[]): { changes: number; lastInsertRowid: number } {
    this.db.run(this.sql, params);
    return {
      changes: this.db.getRowsModified(),
      lastInsertRowid: Number(this.db.exec("SELECT last_insert_rowid() as id")[0]?.values[0]?.[0] || 0)
    };
  }
}

class DatabaseWrapper {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  prepare(sql: string): StatementWrapper {
    return new StatementWrapper(sql, this.database);
  }

  exec(sql: string): void {
    this.database.run(sql);
  }

  close(): void {
    this.database.close();
  }
}

let dbWrapper: DatabaseWrapper | null = null;

export async function initDatabase(): Promise<DatabaseWrapper> {
  if (dbWrapper) return dbWrapper;

  const SQL = await initSqlJs();
  // 支持环境变量指定的数据目录（用于 Railway 持久化存储）
  const dataDir = process.env.DATA_DIR || join(__dirname, '../../data');
  const dbPath = join(dataDir, 'fitstart.db');

  // 确保 data 目录存在
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // 加载或创建数据库
  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  dbWrapper = new DatabaseWrapper(db);

  // 创建表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      avatar_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS equipment (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      target_muscle TEXT NOT NULL,
      description TEXT,
      instructions TEXT,
      common_mistakes TEXT,
      image_url TEXT,
      video_url TEXT,
      difficulty TEXT DEFAULT 'beginner',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      ingredients TEXT NOT NULL,
      steps TEXT NOT NULL,
      calories INTEGER,
      protein REAL,
      carbs REAL,
      fat REAL,
      image_url TEXT,
      prep_time INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS workout_plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      level TEXT DEFAULT 'beginner',
      duration_weeks INTEGER,
      days_per_week INTEGER,
      schedule TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS workout_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      plan_id TEXT,
      date DATE NOT NULL,
      exercises TEXT NOT NULL,
      duration_minutes INTEGER,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (plan_id) REFERENCES workout_plans(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT,
      cover_image_url TEXT,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      article_id TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (article_id) REFERENCES articles(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      article_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (article_id) REFERENCES articles(id),
      UNIQUE(user_id, article_id)
    )
  `);

  // 创建索引
  db.run(`CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment(category)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_recipes_type ON recipes(type)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_workout_logs_user ON workout_logs(user_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id)`);

  saveDatabase();

  return dbWrapper;
}

export function getDatabase(): DatabaseWrapper {
  if (!dbWrapper) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return dbWrapper;
}

export function saveDatabase(): void {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  // 使用与 initDatabase 相同的数据目录逻辑
  const dataDir = process.env.DATA_DIR || join(__dirname, '../../data');
  const dbPath = join(dataDir, 'fitstart.db');
  writeFileSync(dbPath, buffer);
}

// 默认导出一个 Proxy，在使用时自动初始化
let initializedDb: DatabaseWrapper | null = null;

const dbProxy = new Proxy({} as DatabaseWrapper, {
  get(target, prop) {
    if (!initializedDb) {
      throw new Error('Database not initialized. Make sure to call initDatabase() at startup.');
    }
    return (initializedDb as any)[prop];
  }
});

export const setInitializedDb = (db: DatabaseWrapper) => {
  initializedDb = db;
};

export default dbProxy;
