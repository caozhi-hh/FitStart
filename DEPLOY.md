# FitStart 部署指南

本文档说明如何将 FitStart 部署到 Vercel（前端）和 Railway（后端）。

## 架构

```
┌─────────────────┐     ┌─────────────────┐
│    Vercel       │     │    Railway      │
│   (前端 React)  │────▶│  (后端 Node.js) │
│                 │     │                 │
│   静态托管      │     │   Express API   │
│   CDN 分发      │     │   SQLite 数据库 │
└─────────────────┘     └─────────────────┘
```

## 一、部署后端到 Railway

### 1. 准备工作

1. 注册 [Railway](https://railway.app/) 账号
2. 安装 Railway CLI（可选）：
   ```bash
   npm install -g @railway/cli
   ```

### 2. 创建新项目

1. 登录 Railway Dashboard
2. 点击 **New Project**
3. 选择 **Deploy from GitHub repo**
4. 选择你的 FitStart 仓库
5. 选择 `backend` 目录

### 3. 配置环境变量

在 Railway 项目设置中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `PORT` | `5000` | 服务端口（Railway 自动设置） |
| `JWT_SECRET` | `your-random-secret-key` | JWT 密钥 |
| `DATA_DIR` | `/app/data` | 数据持久化目录 |

### 4. 添加 Volume（持久化存储）

1. 在项目中点击 **Add Service**
2. 选择 **Volume**
3. 挂载路径设置为 `/app/data`
4. 将 Volume 连接到后端服务

### 5. 获取后端 URL

部署完成后，Railway 会提供一个域名，如：
```
https://fitstart-backend-production.up.railway.app
```

## 二、部署前端到 Vercel

### 1. 准备工作

1. 注册 [Vercel](https://vercel.com/) 账号
2. 安装 Vercel CLI（可选）：
   ```bash
   npm install -g vercel
   ```

### 2. 导入项目

1. 登录 Vercel Dashboard
2. 点击 **New Project**
3. 选择 **Import Git Repository**
4. 选择你的 FitStart 仓库
5. 设置 **Root Directory** 为 `frontend`
6. Framework Preset 选择 **Vite**

### 3. 配置环境变量

在 Vercel 项目设置中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `VITE_API_URL` | `https://your-backend.railway.app/api` | 后端 API 地址 |

### 4. 更新 vercel.json

修改 `frontend/vercel.json` 中的 rewrites 目标为你的 Railway 后端地址：

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend.railway.app/api/:path*"
    }
  ]
}
```

### 5. 部署

点击 **Deploy**，等待部署完成。

## 三、验证部署

### 1. 检查后端健康状态

```bash
curl https://your-backend.railway.app/api/health
```

应返回：
```json
{"status":"ok","message":"FitStart API is running"}
```

### 2. 检查前端

访问 Vercel 分配的域名，确认页面正常加载。

### 3. 测试 API 连接

在前端页面测试各个功能：
- 器械列表
- 食谱列表
- 训练计划
- AI 助手

## 四、常见问题

### Q: 数据库数据丢失？

A: 确保 Railway 的 Volume 已正确挂载到 `/app/data` 目录。

### Q: API 请求跨域错误？

A: 检查后端 CORS 配置，确保允许前端域名。

### Q: 前端页面空白？

A: 检查浏览器控制台错误，确认环境变量配置正确。

## 五、自动化部署

配置 GitHub Actions 实现自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: aws-actions/configure-aws-credentials@v1
      # Railway 部署...

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 六、监控与日志

- **Railway**: 项目页面查看实时日志
- **Vercel**: 部署页面查看构建和运行日志

---

部署完成后，你的 FitStart 健身网站就可以公开访问了！ 🎉
