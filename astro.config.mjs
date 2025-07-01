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
  output: 'hybrid', // 混合模式：静态页面 + 服务器API
  // 部署配置
  site: process.env.SITE_URL || 'https://startup-ideas-tracker.vercel.app',
  adapter: vercel(),
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
