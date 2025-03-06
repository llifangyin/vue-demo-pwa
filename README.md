## 概念
1. 什么是PWA

PWA（Progressive Web App）是一种能够提供类似于原生应用体验的网页应用。它结合了网页和移动应用的优点，具有离线访问、推送通知、快速加载等特性。

2. 有什么用

PWA 可以提升用户体验，增加用户留存率。它们可以在没有网络连接的情况下工作，并且可以像原生应用一样被添加到主屏幕。 


## demo步骤
1. 先创建一个默认的vue项目
```bash
npm create vue@latest
```

2. 安装 **vite-plugin-pwa** 依赖
```bash
npm install vite-plugin-pwa --save-dev
```
3. vite.config.ts里配置
```ts
import { defineConfig } from 'vite';
import VitePWA from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
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
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
```



## 缓存接口的情况
### PWA 对接口缓存的情况

PWA 可以通过 Service Worker 对接口请求进行缓存，从而在网络断开的情况下依然能够提供数据。具体实现方式如下：

### 网络断开时的接口请求情况

当网络断开时，PWA 会使用缓存的数据来响应接口请求。具体流程如下：

1. **首次请求**: 当用户首次访问应用时，Service Worker 会缓存接口的响应数据。
2. **离线访问**: 当用户在离线状态下访问应用时，Service Worker 会从缓存中读取数据并返回，确保应用能够正常运行。
3. **缓存更新**: 当网络恢复时，Service Worker 会自动更新缓存的数据，确保用户始终获得最新的数据。

通过这种方式，PWA 能够在网络断开的情况下依然提供良好的用户体验。
### 示例


```ts
import { defineConfig } from 'vite';
import VitePWA from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'My PWA App',
        short_name: 'My App',
        description: 'A progressive web app built with Vite',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 300,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
```

在这个示例中，我们使用 `vite-plugin-pwa` 插件来配置 PWA，并添加了对接口请求的缓存策略。具体来说，我们对匹配 `https://api.example.com/` 的请求使用 `CacheFirst` 策略，并设置了缓存的最大条目数和最大缓存时间。
