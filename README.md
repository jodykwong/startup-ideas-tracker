# 🚀 Startup Ideas Tracker

一个基于 Astro 的创业想法管理平台，集成 Supabase 数据库和 Gemini AI 智能增强功能。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jodykwong/startup-ideas-tracker)
[![GitHub Actions](https://github.com/jodykwong/startup-ideas-tracker/workflows/🚀%20自动部署到%20Vercel/badge.svg)](https://github.com/jodykwong/startup-ideas-tracker/actions)

## ✨ 特性

- 🎯 **创业想法管理**: 添加、编辑、删除和组织您的创业想法
- 🤖 **AI 智能增强**: 使用 Gemini AI 优化和扩展您的想法
- 📊 **数据可视化**: 直观的图表和统计信息
- 🔐 **用户认证**: 安全的用户注册和登录系统
- 📱 **响应式设计**: 完美适配桌面和移动设备
- ⚡ **高性能**: 基于 Astro 的静态站点生成
- 🚀 **一键部署**: 自动化 GitHub + Vercel 部署流程

## 🛠 技术栈

- **框架**: Astro 4.16
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Supabase
- **AI**: Google Gemini API
- **部署**: Vercel / Netlify / Railway

## 📦 安装和运行

### 环境要求
- Node.js 18+
- npm 或 yarn

### 1. 克隆项目
```bash
git clone <repository-url>
cd startup-ideas-tracker-astro
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境变量配置
创建 `.env` 文件：
```env
# Supabase 配置
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini API 配置
GEMINI_API_KEY=your_gemini_api_key

# 开发配置
NODE_ENV=development
DISABLE_AUTH=false
```

### 4. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

## 🧪 测试

### API 功能测试
访问 http://localhost:3000/test-api 进行完整的 API 功能测试：

- 数据库连接测试
- 用户注册/登录测试
- Gemini AI 连接测试
- AI 增强功能测试

### 手动测试
```bash
# 测试数据库连接
curl http://localhost:3000/api/test/db

# 测试 Gemini AI
curl http://localhost:3000/api/test/gemini

# 测试用户注册
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

## 🚀 部署

### 使用部署脚本（推荐）
```bash
./deploy.sh
```

### 手动部署

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

#### Railway
```bash
curl -fsSL https://railway.app/install.sh | sh
railway deploy
```

## 📁 项目结构

```
startup-ideas-tracker-astro/
├── src/
│   ├── components/          # 可复用组件
│   ├── layouts/            # 页面布局
│   ├── pages/              # 页面和 API 路由
│   │   ├── api/            # API 端点
│   │   ├── auth.astro      # 认证页面
│   │   ├── dashboard.astro # 控制台
│   │   └── index.astro     # 主页
│   ├── lib/                # 工具库
│   │   ├── supabase.ts     # Supabase 客户端
│   │   └── gemini.ts       # Gemini AI 服务
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数
│   └── styles/             # 样式文件
├── public/                 # 静态资源
├── .env                    # 环境变量
├── astro.config.mjs        # Astro 配置
├── tailwind.config.mjs     # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
├── deploy.sh               # 部署脚本
└── README.md               # 项目说明
```

## 🔧 API 端点

### 认证
- `POST /api/auth/signup` - 用户注册
- `POST /api/auth/signin` - 用户登录
- `POST /api/auth/signout` - 用户登出

### 想法管理
- `GET /api/ideas` - 获取想法列表
- `POST /api/ideas` - 创建新想法
- `PUT /api/ideas/[id]` - 更新想法
- `DELETE /api/ideas/[id]` - 删除想法

### AI 功能
- `POST /api/ai/enhance` - AI 增强想法
- `POST /api/ai/suggestions` - 获取智能建议

### 测试
- `GET /api/test/db` - 数据库连接测试
- `GET /api/test/gemini` - Gemini AI 连接测试

## 🎨 设计系统

项目采用 adaline.ai 设计系统，包含：

- **颜色**: 现代化的色彩搭配
- **字体**: Inter 字体系列
- **组件**: 一致的 UI 组件库
- **响应式**: 移动优先的设计理念

## 🔒 安全性

- **认证**: Supabase Auth 提供安全的用户认证
- **授权**: 行级安全策略 (RLS)
- **API**: 服务器端 API 密钥保护
- **HTTPS**: 生产环境强制 HTTPS

## 📈 性能优化

- **静态生成**: Astro 的静态站点生成
- **代码分割**: 自动的 JavaScript 代码分割
- **图片优化**: 自动图片优化和懒加载
- **缓存**: 智能缓存策略

## 🐛 故障排除

### 常见问题

1. **API 连接失败**
   - 检查环境变量是否正确设置
   - 确认 Supabase 和 Gemini API 密钥有效

2. **构建失败**
   - 清除 node_modules 并重新安装
   - 检查 TypeScript 类型错误

3. **部署问题**
   - 确认所有环境变量在部署平台上正确设置
   - 检查构建日志中的错误信息

### 获取帮助

- 查看 [Astro 文档](https://docs.astro.build/)
- 查看 [Supabase 文档](https://supabase.com/docs)
- 查看 [Gemini API 文档](https://ai.google.dev/docs)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题，请通过 GitHub Issues 联系。
