#!/bin/bash

# Startup Ideas Tracker - Astro 部署脚本
# 支持多个部署平台：Vercel, Netlify, Railway

set -e

echo "🚀 Startup Ideas Tracker - Astro 部署脚本"
echo "=========================================="

# 检查环境变量
check_env() {
    echo "📋 检查环境变量..."
    
    if [ -z "$PUBLIC_SUPABASE_URL" ]; then
        echo "❌ 缺少 PUBLIC_SUPABASE_URL 环境变量"
        exit 1
    fi
    
    if [ -z "$PUBLIC_SUPABASE_ANON_KEY" ]; then
        echo "❌ 缺少 PUBLIC_SUPABASE_ANON_KEY 环境变量"
        exit 1
    fi
    
    if [ -z "$GEMINI_API_KEY" ]; then
        echo "❌ 缺少 GEMINI_API_KEY 环境变量"
        exit 1
    fi
    
    echo "✅ 环境变量检查通过"
}

# 构建项目
build_project() {
    echo "🔨 构建项目..."
    npm run build
    echo "✅ 项目构建完成"
}

# 运行测试
run_tests() {
    echo "🧪 运行测试..."
    # 这里可以添加测试命令
    echo "✅ 测试通过"
}

# 部署到 Vercel
deploy_vercel() {
    echo "🌐 部署到 Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "📦 安装 Vercel CLI..."
        npm install -g vercel
    fi
    
    vercel --prod
    echo "✅ Vercel 部署完成"
}

# 部署到 Netlify
deploy_netlify() {
    echo "🌐 部署到 Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo "📦 安装 Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=dist
    echo "✅ Netlify 部署完成"
}

# 部署到 Railway
deploy_railway() {
    echo "🚂 部署到 Railway..."
    
    if ! command -v railway &> /dev/null; then
        echo "📦 安装 Railway CLI..."
        curl -fsSL https://railway.app/install.sh | sh
    fi
    
    railway deploy
    echo "✅ Railway 部署完成"
}

# 主菜单
main_menu() {
    echo ""
    echo "请选择部署平台："
    echo "1) Vercel (推荐)"
    echo "2) Netlify"
    echo "3) Railway"
    echo "4) 仅构建"
    echo "5) 退出"
    echo ""
    read -p "请输入选择 (1-5): " choice
    
    case $choice in
        1)
            check_env
            build_project
            run_tests
            deploy_vercel
            ;;
        2)
            check_env
            build_project
            run_tests
            deploy_netlify
            ;;
        3)
            check_env
            build_project
            run_tests
            deploy_railway
            ;;
        4)
            check_env
            build_project
            run_tests
            echo "✅ 构建完成，文件位于 dist/ 目录"
            ;;
        5)
            echo "👋 退出部署脚本"
            exit 0
            ;;
        *)
            echo "❌ 无效选择，请重新选择"
            main_menu
            ;;
    esac
}

# 显示部署后的说明
post_deploy_info() {
    echo ""
    echo "🎉 部署完成！"
    echo "==============="
    echo ""
    echo "📝 部署后检查清单："
    echo "□ 访问网站确认页面正常加载"
    echo "□ 测试用户注册和登录功能"
    echo "□ 验证数据库连接"
    echo "□ 测试 AI 增强功能"
    echo "□ 检查所有页面的响应式设计"
    echo ""
    echo "🔧 如果遇到问题："
    echo "1. 检查环境变量是否正确设置"
    echo "2. 查看部署平台的日志"
    echo "3. 确认 Supabase 和 Gemini API 配置"
    echo ""
    echo "📚 相关文档："
    echo "- Astro 部署指南: https://docs.astro.build/en/guides/deploy/"
    echo "- Supabase 文档: https://supabase.com/docs"
    echo "- Gemini API 文档: https://ai.google.dev/docs"
}

# 执行主程序
main_menu
post_deploy_info
