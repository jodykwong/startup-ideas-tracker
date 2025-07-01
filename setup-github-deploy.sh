#!/bin/bash

# GitHub + Vercel 部署设置脚本
# Startup Ideas Tracker - Astro 版本

set -e

echo "🚀 Startup Ideas Tracker - GitHub 部署设置"
echo "============================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 Git 仓库
check_git() {
    if [ ! -d ".git" ]; then
        echo -e "${RED}❌ 当前目录不是 Git 仓库${NC}"
        echo "请先初始化 Git 仓库："
        echo "git init"
        echo "git remote add origin <your-repo-url>"
        exit 1
    fi
    echo -e "${GREEN}✅ Git 仓库检查通过${NC}"
}

# 检查 Node.js 和 npm
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js 未安装${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm 未安装${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Node.js 和 npm 检查通过${NC}"
}

# 安装 Vercel CLI
install_vercel() {
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}📦 安装 Vercel CLI...${NC}"
        npm install -g vercel
    else
        echo -e "${GREEN}✅ Vercel CLI 已安装${NC}"
    fi
}

# 设置 Vercel 项目
setup_vercel() {
    echo -e "${BLUE}🔐 请登录 Vercel...${NC}"
    vercel login
    
    echo -e "${BLUE}🔗 链接项目到 Vercel...${NC}"
    vercel link
    
    echo -e "${BLUE}📋 获取项目信息...${NC}"
    echo "请记录以下信息，稍后需要在 GitHub Secrets 中配置："
    echo ""
    
    # 获取项目信息
    PROJECT_INFO=$(vercel project ls --format json 2>/dev/null || echo "[]")
    echo -e "${YELLOW}项目列表：${NC}"
    echo "$PROJECT_INFO" | jq -r '.[] | "- \(.name) (ID: \(.id))"' 2>/dev/null || echo "请手动获取项目 ID"
}

# 创建环境变量模板
create_env_template() {
    echo -e "${BLUE}📝 创建环境变量模板...${NC}"
    
    cat > .env.example << EOF
# Supabase 配置
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini API 配置
GEMINI_API_KEY=your_gemini_api_key

# 开发配置
NODE_ENV=development
DISABLE_AUTH=false
EOF

    echo -e "${GREEN}✅ 环境变量模板已创建：.env.example${NC}"
}

# 显示 GitHub Secrets 配置说明
show_github_secrets() {
    echo ""
    echo -e "${YELLOW}🔧 GitHub Secrets 配置说明${NC}"
    echo "================================================"
    echo ""
    echo "请在您的 GitHub 仓库中配置以下 Secrets："
    echo "仓库 → Settings → Secrets and variables → Actions → New repository secret"
    echo ""
    echo -e "${BLUE}必需的 Secrets：${NC}"
    echo "1. VERCEL_TOKEN - 从 https://vercel.com/account/tokens 获取"
    echo "2. ORG_ID - 从 Vercel 项目设置获取"
    echo "3. PROJECT_ID - 从 Vercel 项目设置获取"
    echo "4. PUBLIC_SUPABASE_URL - 您的 Supabase 项目 URL"
    echo "5. PUBLIC_SUPABASE_ANON_KEY - 您的 Supabase 匿名密钥"
    echo "6. GEMINI_API_KEY - 您的 Google Gemini API 密钥"
    echo ""
    echo -e "${GREEN}配置完成后，推送代码即可自动部署！${NC}"
}

# 显示部署命令
show_deploy_commands() {
    echo ""
    echo -e "${YELLOW}🚀 部署命令${NC}"
    echo "========================"
    echo ""
    echo "1. 提交并推送代码："
    echo "   git add ."
    echo "   git commit -m \"Setup GitHub Actions deployment\""
    echo "   git push origin main"
    echo ""
    echo "2. 查看部署状态："
    echo "   访问 GitHub 仓库 → Actions 标签页"
    echo ""
    echo "3. 手动部署（可选）："
    echo "   vercel --prod"
}

# 主菜单
main_menu() {
    echo ""
    echo "请选择设置选项："
    echo "1) 完整设置（推荐）"
    echo "2) 仅安装 Vercel CLI"
    echo "3) 仅创建环境变量模板"
    echo "4) 显示配置说明"
    echo "5) 退出"
    echo ""
    read -p "请输入选择 (1-5): " choice
    
    case $choice in
        1)
            check_git
            check_node
            install_vercel
            setup_vercel
            create_env_template
            show_github_secrets
            show_deploy_commands
            ;;
        2)
            install_vercel
            echo -e "${GREEN}✅ Vercel CLI 安装完成${NC}"
            ;;
        3)
            create_env_template
            ;;
        4)
            show_github_secrets
            show_deploy_commands
            ;;
        5)
            echo -e "${BLUE}👋 退出设置脚本${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ 无效选择，请重新选择${NC}"
            main_menu
            ;;
    esac
}

# 显示欢迎信息
echo ""
echo -e "${GREEN}此脚本将帮助您设置 GitHub Actions + Vercel 自动部署${NC}"
echo ""

# 执行主程序
main_menu

echo ""
echo -e "${GREEN}🎉 设置完成！${NC}"
echo -e "${BLUE}📚 更多信息请查看 DEPLOYMENT_GUIDE.md${NC}"
