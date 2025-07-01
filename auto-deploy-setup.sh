#!/bin/bash

# 🚀 Startup Ideas Tracker - 自动化部署设置脚本
# 此脚本将自动配置 GitHub 仓库和 Vercel 部署

set -e  # 遇到错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 图标定义
ROCKET="🚀"
CHECK="✅"
CROSS="❌"
WARNING="⚠️"
INFO="ℹ️"
GEAR="⚙️"
PACKAGE="📦"

echo -e "${BLUE}${ROCKET} Startup Ideas Tracker - 自动化部署设置${NC}"
echo "=============================================="
echo ""

# 检查必要的工具
check_requirements() {
    echo -e "${CYAN}${GEAR} 检查系统要求...${NC}"
    
    # 检查 Git
    if ! command -v git &> /dev/null; then
        echo -e "${RED}${CROSS} Git 未安装，请先安装 Git${NC}"
        exit 1
    fi
    echo -e "${GREEN}${CHECK} Git 已安装${NC}"
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}${CROSS} Node.js 未安装，请先安装 Node.js${NC}"
        exit 1
    fi
    echo -e "${GREEN}${CHECK} Node.js 已安装 ($(node --version))${NC}"
    
    # 检查 npm
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}${CROSS} npm 未安装，请先安装 npm${NC}"
        exit 1
    fi
    echo -e "${GREEN}${CHECK} npm 已安装 ($(npm --version))${NC}"
    
    echo ""
}

# 获取用户输入
get_user_input() {
    echo -e "${CYAN}${INFO} 请提供以下信息：${NC}"
    echo ""
    
    # GitHub 仓库名
    read -p "GitHub 仓库名 (默认: startup-ideas-tracker): " REPO_NAME
    REPO_NAME=${REPO_NAME:-startup-ideas-tracker}
    
    # GitHub 用户名
    read -p "GitHub 用户名: " GITHUB_USERNAME
    if [ -z "$GITHUB_USERNAME" ]; then
        echo -e "${RED}${CROSS} GitHub 用户名不能为空${NC}"
        exit 1
    fi
    
    echo ""
    echo -e "${GREEN}${CHECK} 配置信息：${NC}"
    echo "  - 仓库名: $REPO_NAME"
    echo "  - GitHub 用户名: $GITHUB_USERNAME"
    echo "  - 仓库 URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    
    read -p "确认以上信息正确吗？(y/N): " CONFIRM
    if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}${WARNING} 已取消设置${NC}"
        exit 0
    fi
}

# 初始化 Git 仓库
setup_git_repo() {
    echo -e "${CYAN}${GEAR} 初始化 Git 仓库...${NC}"
    
    # 初始化 Git
    git init
    echo -e "${GREEN}${CHECK} Git 仓库已初始化${NC}"
    
    # 设置默认分支为 main
    git branch -m main
    echo -e "${GREEN}${CHECK} 默认分支设置为 main${NC}"
    
    # 添加远程仓库
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    echo -e "${GREEN}${CHECK} 远程仓库已添加${NC}"
    
    # 配置 Git 用户信息（如果未配置）
    if [ -z "$(git config user.name)" ]; then
        read -p "Git 用户名: " GIT_USERNAME
        git config user.name "$GIT_USERNAME"
    fi
    
    if [ -z "$(git config user.email)" ]; then
        read -p "Git 邮箱: " GIT_EMAIL
        git config user.email "$GIT_EMAIL"
    fi
    
    echo ""
}

# 安装依赖
install_dependencies() {
    echo -e "${CYAN}${PACKAGE} 安装项目依赖...${NC}"
    
    if [ -f "package.json" ]; then
        npm install
        echo -e "${GREEN}${CHECK} 依赖安装完成${NC}"
    else
        echo -e "${RED}${CROSS} package.json 文件不存在${NC}"
        exit 1
    fi
    
    echo ""
}

# 创建环境变量模板
create_env_template() {
    echo -e "${CYAN}${GEAR} 创建环境变量模板...${NC}"
    
    cat > .env.example << EOF
# Supabase 配置
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI 配置
GEMINI_API_KEY=your_gemini_api_key

# 环境配置
NODE_ENV=development
EOF
    
    echo -e "${GREEN}${CHECK} 环境变量模板已创建 (.env.example)${NC}"
    echo ""
}

# 提交代码
commit_and_push() {
    echo -e "${CYAN}${GEAR} 提交代码到 GitHub...${NC}"
    
    # 添加所有文件
    git add .
    echo -e "${GREEN}${CHECK} 文件已添加到暂存区${NC}"
    
    # 提交代码
    git commit -m "🚀 Initial commit: Astro-based Startup Ideas Tracker with automated deployment"
    echo -e "${GREEN}${CHECK} 代码已提交${NC}"
    
    # 推送到 GitHub
    echo -e "${YELLOW}${WARNING} 正在推送到 GitHub，可能需要身份验证...${NC}"
    git push -u origin main
    echo -e "${GREEN}${CHECK} 代码已推送到 GitHub${NC}"
    
    echo ""
}

# 显示下一步指南
show_next_steps() {
    echo -e "${BLUE}${ROCKET} 设置完成！${NC}"
    echo "=============================================="
    echo ""
    echo -e "${GREEN}${CHECK} GitHub 仓库已创建并推送代码${NC}"
    echo -e "${GREEN}${CHECK} GitHub Actions 工作流已配置${NC}"
    echo -e "${GREEN}${CHECK} Vercel 配置文件已准备就绪${NC}"
    echo ""
    echo -e "${CYAN}${INFO} 下一步操作：${NC}"
    echo ""
    echo "1. ${YELLOW}访问 GitHub 仓库：${NC}"
    echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "2. ${YELLOW}连接 Vercel：${NC}"
    echo "   - 访问 https://vercel.com/dashboard"
    echo "   - 点击 'New Project'"
    echo "   - 选择您的 GitHub 仓库"
    echo "   - 框架选择 'Astro'"
    echo ""
    echo "3. ${YELLOW}配置环境变量（在 Vercel 项目设置中）：${NC}"
    echo "   - PUBLIC_SUPABASE_URL"
    echo "   - PUBLIC_SUPABASE_ANON_KEY"
    echo "   - GEMINI_API_KEY"
    echo ""
    echo "4. ${YELLOW}配置 GitHub Secrets（用于自动部署）：${NC}"
    echo "   - 访问 https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/secrets/actions"
    echo "   - 添加以下 Secrets："
    echo "     * VERCEL_TOKEN"
    echo "     * VERCEL_ORG_ID"
    echo "     * VERCEL_PROJECT_ID"
    echo "     * PUBLIC_SUPABASE_URL"
    echo "     * PUBLIC_SUPABASE_ANON_KEY"
    echo "     * GEMINI_API_KEY"
    echo ""
    echo "5. ${YELLOW}测试部署：${NC}"
    echo "   - 推送任何代码更改"
    echo "   - 查看 GitHub Actions 自动部署"
    echo ""
    echo -e "${GREEN}${ROCKET} 享受您的自动化部署流程！${NC}"
}

# 主函数
main() {
    check_requirements
    get_user_input
    setup_git_repo
    install_dependencies
    create_env_template
    commit_and_push
    show_next_steps
}

# 运行主函数
main
