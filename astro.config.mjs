import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // 我们将使用自定义的基础样式
    })
  ],
  output: 'server', // 服务器模式：支持API路由
  // 部署配置
  site: process.env.SITE_URL || 'https://startup-ideas-tracker.vercel.app',
  adapter: vercel({
    runtime: 'nodejs20.x'
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
