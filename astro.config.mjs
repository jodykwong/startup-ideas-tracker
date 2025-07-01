import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // 我们将使用自定义的基础样式
    })
  ],
  output: 'hybrid', // 支持SSR和静态生成的混合模式
  // 部署配置
  site: process.env.SITE_URL || 'http://localhost:3000',
  // 对于 GitHub Pages 部署，取消注释下面的行
  // base: process.env.BASE_PATH || '/',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 3000,
    host: true
  },
  build: {
    assets: '_astro'
  },
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@supabase/supabase-js', '@google/generative-ai']
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@/components': path.resolve('./src/components'),
        '@/lib': path.resolve('./src/lib'),
        '@/types': path.resolve('./src/types'),
        '@/styles': path.resolve('./src/styles'),
        '@/utils': path.resolve('./src/utils')
      }
    }
  }
});
