import { fileURLToPath, URL } from 'node:url'
import {VitePWA} from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',  // 配置 service worker 的注册方式
      includeAssets: ['favicon.svg', 'robots.txt'],  // 指定需要包含的静态资源
      manifest: {
        name: 'My PWA App',
        short_name: 'My App',
        description: 'A progressive web app built with Vite',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'ball192.png',//像素尺寸一定要对应
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'ball512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*$/, // 匹配要缓存的接口请求
            handler: 'NetworkFirst', // 使用 NetworkFirst 策略
            options: {
              cacheName: 'api-cache', // 缓存名称
              expiration: {
                maxEntries: 50, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24, // 缓存有效期为一天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存状态码为 0 和 200 的响应
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
