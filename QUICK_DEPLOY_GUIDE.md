# 🚀 快速部署指南 - GitHub + Vercel

## 📋 部署步骤

### 1. 推送代码到 GitHub

```bash
# 代码已经提交，现在推送到 GitHub
git push -u origin main
```

### 2. 登录 Vercel 并连接项目

访问 [Vercel Dashboard](https://vercel.com/dashboard)

1. 点击 "New Project"
2. 选择 "Import Git Repository"
3. 选择您的 `startup-ideas-tracker` 仓库
4. 配置项目设置：
   - **Framework Preset**: Astro
   - **Root Directory**: `./` (默认)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

### 4. 配置 GitHub Secrets（用于 GitHub Actions）

在 GitHub 仓库中设置以下 Secrets：

1. 访问 GitHub 仓库 → Settings → Secrets and variables → Actions
2. 添加以下 Repository secrets：

```
VERCEL_TOKEN=your_vercel_token
ORG_ID=your_vercel_org_id
PROJECT_ID=your_vercel_project_id
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

#### 获取 Vercel 信息：

**VERCEL_TOKEN**:
1. 访问 [Vercel Tokens](https://vercel.com/account/tokens)
2. 创建新的 Token
3. 复制 Token 值

**ORG_ID 和 PROJECT_ID**:
1. 在项目根目录运行：
```bash
vercel link
```
2. 查看生成的 `.vercel/project.json` 文件
3. 复制 `orgId` 和 `projectId` 值

### 5. 测试部署

推送任何更改到 main 分支，GitHub Actions 将自动部署：

```bash
git add .
git commit -m "Test deployment"
git push origin main
```

### 6. 验证部署

1. 检查 GitHub Actions 状态：仓库 → Actions 标签页
2. 检查 Vercel 部署状态：Vercel Dashboard
3. 访问部署的网站 URL

## 🔧 故障排除

### 构建失败
- 检查环境变量是否正确设置
- 查看 Vercel 构建日志
- 确保所有依赖都在 package.json 中

### API 端点问题
- 确保 Vercel 支持 Astro API 路由
- 检查 vercel.json 配置
- 验证环境变量在运行时可用

### GitHub Actions 失败
- 检查 GitHub Secrets 是否正确设置
- 验证 VERCEL_TOKEN 权限
- 查看 Actions 日志详细信息

## 📞 获取帮助

如果遇到问题，请检查：
1. [Vercel Astro 文档](https://vercel.com/docs/frameworks/astro)
2. [GitHub Actions 文档](https://docs.github.com/en/actions)
3. 项目的 `DEPLOYMENT_GUIDE.md` 详细指南

## 🎉 部署成功后

您的应用将在以下地址可用：
- **生产环境**: `https://your-project.vercel.app`
- **预览环境**: 每个 PR 都会生成预览链接

享受您的自动化部署流程！🚀
