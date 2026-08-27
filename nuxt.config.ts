// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // —— 版本兼容日期（锁定 Nuxt 行为，设为最新日期即可）——
  compatibilityDate: '2026-08-27',

  // —— 启用 Nuxt 4 的 app/ 目录结构 ——
  // 开启后：app.vue / pages / layouts / components / composables / plugins 都放在 app/ 下。
  // 若你的 Nuxt 版本较旧不支持该选项，可改为 `srcDir: 'app/'` 或把目录整体上移到项目根。
  future: {
    compatibilityVersion: 4,
  },

  // —— SSR 开启（求职官网需要 SEO / 首屏秒开，服务端渲染输出 HTML）——
  ssr: true,

  devtools: { enabled: true },

  // —— 模块 ——
  modules: [
    '@nuxt/image', // 图片优化 / 懒加载
    '@nuxt/icon',  // 图标（Iconify 图标集，<Icon> 组件）
  ],

  // —— 全局样式入口（SCSS）——
  css: ['~/assets/scss/main.scss'],

  // —— 图片优化模块配置 ——
  image: {
    format: ['webp', 'avif'], // 自动转 webp/avif
    quality: 80,
    screens: {
      xs: 480,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  // —— 图标模块配置：自动扫描源码中 <Icon> 用到的图标并打包 ——
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },

  // —— 应用全局配置 ——
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' }, // 浅色主题
      title: '麦锐玲 | 个人简历',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '交互式个人简历 / 作品集官网 —— 替换为你的个人简介' },
        { name: 'theme-color', content: '#f7f7fb' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },

    // —— 页面 / 布局过渡动画（路由切换渐入，对应 assets/scss/_utilities.scss 中的 .page-* / .layout-*）——
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // —— 运行时公共配置：素材路径集中管理，替换素材只需改这里 ——
  runtimeConfig: {
    public: {
      // 3D-IP 透明背景视频素材（对应 public/media/ip/）
      ipAssets: {
        heroIntro: '/media/ip/hero-intro.webm', // 首屏开屏动画
        heroWave: '/media/ip/hero-wave.webm',   // 鼠标悬浮挥手动画
        heroIdle: '/media/ip/hero-idle.webm',   // 待机循环动画
      },
      // 序列帧图片目录（技能卡片 hover 切换 IP 表情）
      ipFrameDir: '/media/ip-frames',
    },
  },

  // —— TypeScript ——
  typescript: {
    strict: true,
    // 注意：默认 typeCheck 关闭，避免构建因类型细节失败。需要时运行 `pnpm run typecheck`。
  },
})
