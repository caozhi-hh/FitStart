# FitStart - 新手健身入门平台

专为健身新手打造的知识分享平台，帮助你快速上手健身！

## 功能特性

- **器械百科** - 30+ 健身器械使用教程
- **饮食推荐** - 增肌/减脂食谱推荐
- **训练计划** - 新手到进阶训练模板
- **经验分享** - 健身达人经验文章
- **AI 助手** - 智能问答 + 语音输入

## 技术栈

- **前端**: React + Vite + TypeScript + Tailwind CSS
- **后端**: Node.js + Express + SQLite
- **部署**: Vercel + Railway

## 本地开发

### 前端

```bash
cd frontend
npm install
npm run dev
```

### 后端

```bash
cd backend
npm install
npm run dev
```

## 部署

参见 [DEPLOY.md](./DEPLOY.md)

## 项目结构

```
FitStart/
├── frontend/          # React 前端
│   ├── src/
│   │   ├── pages/     # 页面组件
│   │   ├── components/# 通用组件
│   │   ├── api/       # API 客户端
│   │   └── types/     # TypeScript 类型
│   └── ...
├── backend/           # Node.js 后端
│   ├── src/
│   │   ├── routes/    # API 路由
│   │   ├── config/    # 配置
│   │   └── data/      # 数据和种子
│   └── ...
└── DEPLOY.md          # 部署指南
```

## License

MIT
