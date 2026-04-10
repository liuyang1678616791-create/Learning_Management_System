# Learning_Management_System

个人学习管理系统课程作业项目。

这个仓库使用 `monorepo + pnpm + turborepo + Next.js 15 + React 19 + Vite + Supabase + Tailwind CSS 4` 搭建，主目标是完成一个可部署、可演示、具备真实 CRUD 能力的全栈项目。

## 项目目标

- 展示学习任务列表
- 查看任务详情
- 创建、编辑、删除学习任务
- 使用 Supabase 持久化数据
- 提供 GitHub 仓库和线上部署地址

## 技术栈

| 技术 | 用途 |
|------|------|
| Monorepo | 多应用与共享配置管理 |
| pnpm | Workspace 包管理 |
| Turborepo | 多包任务编排与构建 |
| Next.js 15 | 主应用，使用 App Router |
| React 19 | 前端 UI |
| Vite | 辅助应用与技术栈展示 |
| Supabase | 数据库与后端服务 |
| Tailwind CSS 4 | 页面样式 |
| shadcn/ui 风格组件 | UI 组织方式 |

## 仓库结构

```text
.
├─ apps/
│  ├─ web/          # 主交付项目，部署到 Vercel
│  └─ playground/   # Vite 辅助应用，用于展示 monorepo 多应用结构
├─ packages/
│  ├─ ui/
│  ├─ eslint-config/
│  └─ typescript-config/
├─ supabase/
│  └─ tasks.sql     # 数据库初始化 SQL
├─ .github/
│  └─ workflows/ci.yml
└─ docs/
```

## 主交付说明

作业主交付在 `apps/web`。

主站包含：

- 首页任务列表
- 状态筛选
- 新建任务
- 详情页
- 编辑任务
- 删除任务
- 状态切换

## 本地运行

先在仓库根目录安装依赖：

```powershell
pnpm install
```

启动主项目：

```powershell
pnpm --filter web dev
```

访问：

```text
http://localhost:3000
```

如果要同时启动整个 monorepo：

```powershell
pnpm dev
```

## Supabase 配置

### 1. 本地环境变量

在 `apps/web/.env.local` 中填写：

```env
NEXT_PUBLIC_SUPABASE_URL=https://bandvboaymywvzqumjya.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_47gqz9dILYrN1D-EAtDGZg_xnmcdl_O
```

### 2. 初始化数据库

打开 Supabase 的 SQL Editor，执行：

`supabase/tasks.sql`

核心会创建一张 `tasks` 表，字段包括：

- `id`
- `title`
- `description`
- `status`
- `priority`
- `due_date`
- `created_at`
- `updated_at`

## 构建与检查

```powershell
pnpm lint
pnpm build
```

当前项目已经通过本地：

- `pnpm lint`
- `pnpm build`

## GitHub Actions

仓库已配置基础 CI：

`.github/workflows/ci.yml`

会在 `push` 和 `pull_request` 时执行：

- `pnpm install`
- `pnpm lint`
- `pnpm build`

## Vercel 部署

部署时请设置：

- Framework Preset: `Next.js`
- Root Directory: `apps/web`

并在 Vercel 中添加环境变量：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 我的作业信息

### GitHub 仓库

https://github.com/liuyang1678616791-create/Learning_Management_System.git

### Vercel 地址

https://learning-management-system-web-blush.vercel.app

## 当前完成情况

- 已完成 monorepo 初始化
- 已完成 Next.js 主站
- 已完成 Vite 辅助应用
- 已完成 Supabase 连接
- 已完成任务 CRUD
- 已完成本地构建验证
- 已完成基础 CI 配置
