# GitHub 部署指南

## 🚀 部署选项

### 选项 1：GitHub Actions + Vercel（推荐）
**优势**：保持完整功能，包括API端点和服务器功能

### 选项 2：GitHub Pages 静态部署
**优势**：完全免费，但需要移除服务器端功能

## 📋 方案 1：GitHub Actions + Vercel 自动部署

### 步骤 1：准备 Vercel 账户
1. 访问 [vercel.com](https://vercel.com) 注册账户
2. 连接您的 GitHub 账户
3. 获取 Vercel Token：
   - 访问 https://vercel.com/account/tokens
   - 创建新的 token
   - 复制 token 值

### 步骤 2：获取项目信息
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并链接项目
vercel login
vercel link

# 获取项目信息
vercel env ls
```

### 步骤 3：配置 GitHub Secrets
在您的 GitHub 仓库中设置以下 Secrets：

1. 进入 GitHub 仓库 → Settings → Secrets and variables → Actions
2. 添加以下 secrets：

```
VERCEL_TOKEN=your_vercel_token
ORG_ID=your_org_id
PROJECT_ID=your_project_id
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### 步骤 4：推送代码
```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

## 📋 方案 2：GitHub Pages 静态部署

### 限制说明
- ❌ 无法使用 API 端点
- ❌ 无法使用服务器端功能
- ✅ 完全免费托管
- ✅ 自动 HTTPS

### 配置步骤

1. **修改 Astro 配置**
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/startup-ideas-tracker',
  output: 'static', // 强制静态输出
  integrations: [
    tailwind(),
    react()
  ]
})
```

2. **创建静态版本分支**
```bash
git checkout -b gh-pages
# 移除 API 相关代码
# 修改为纯前端应用
git add .
git commit -m "Static version for GitHub Pages"
git push origin gh-pages
```

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 选择 "Deploy from a branch" → gh-pages

## 🔧 快速设置脚本

### Vercel 部署脚本
```bash
#!/bin/bash
echo "🚀 设置 GitHub + Vercel 自动部署"

# 检查是否已安装 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

# 登录并链接项目
echo "🔐 请登录 Vercel..."
vercel login

echo "🔗 链接项目..."
vercel link

echo "📋 获取项目信息..."
vercel project ls

echo "✅ 设置完成！请在 GitHub 中配置 Secrets"
echo "需要的 Secrets："
echo "- VERCEL_TOKEN"
echo "- ORG_ID" 
echo "- PROJECT_ID"
echo "- PUBLIC_SUPABASE_URL"
echo "- PUBLIC_SUPABASE_ANON_KEY"
echo "- GEMINI_API_KEY"
```

## 🌐 访问您的网站

### Vercel 部署
- 生产环境：`https://your-project.vercel.app`
- 预览环境：每个 PR 都会生成预览链接

### GitHub Pages 部署
- 网站地址：`https://yourusername.github.io/startup-ideas-tracker`

## 🔍 故障排除

### 常见问题

1. **GitHub Actions 失败**
   - 检查 Secrets 是否正确设置
   - 确认 Vercel token 有效
   - 查看 Actions 日志获取详细错误

2. **环境变量问题**
   - 确保所有必需的环境变量都已设置
   - 检查变量名称是否正确（区分大小写）

3. **构建失败**
   - 检查 package.json 中的构建脚本
   - 确认所有依赖都已正确安装

### 获取帮助
- GitHub Actions 文档：https://docs.github.com/en/actions
- Vercel 文档：https://vercel.com/docs
- Astro 部署指南：https://docs.astro.build/en/guides/deploy/

## 📊 部署对比

| 特性 | GitHub Pages | Vercel | Netlify |
|------|-------------|---------|---------|
| 价格 | 免费 | 免费层 | 免费层 |
| API 支持 | ❌ | ✅ | ✅ |
| 自定义域名 | ✅ | ✅ | ✅ |
| HTTPS | ✅ | ✅ | ✅ |
| 构建时间 | 中等 | 快 | 快 |
| 全球 CDN | ✅ | ✅ | ✅ |

## 🎯 推荐选择

**对于您的项目**，我推荐使用 **GitHub Actions + Vercel**：
- ✅ 保持完整功能
- ✅ 自动化部署
- ✅ 免费使用
- ✅ 优秀的性能
- ✅ 简单的设置过程
