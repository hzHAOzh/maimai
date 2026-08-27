# 目录结构说明

本模板采用 **Nuxt 4 的 `app/` 目录结构**。这是通过 `nuxt.config.ts` 中的
`future: { compatibilityVersion: 4 }` 开启的——开启后 Nuxt 会把 `app.vue`、`pages/`、
`layouts/`、`components/`、`composables/`、`plugins/` 等约定目录全部收敛到 `app/` 下。

> 如果你的 Nuxt 版本较旧、不支持 `compatibilityVersion: 4`，有两种替代方案：
> 1. 将 `nuxt.config.ts` 的 `future.compatibilityVersion` 改为 `srcDir: 'app/'`；
> 2. 把 `app/` 下的目录整体移动到项目根目录（即标准 Nuxt 3 结构）。

## 完整目录树

```
maimai/
├── nuxt.config.ts            # 主配置：模块、head、过渡动画、素材路径(runtimeConfig)
├── tsconfig.json             # 继承 .nuxt/tsconfig.json（首次运行后生成）
├── package.json              # 依赖与脚本
├── .gitignore
│
├── app/                      # ── 应用源码（约定目录）──
│   ├── app.vue               # 根入口：装载 <NuxtLayout> + <NuxtPage>
│   │
│   ├── layouts/              # 布局
│   │   └── default.vue       # 全局默认布局：NavBar + <slot /> + Footer
│   │
│   ├── pages/                # 路由页面（基于文件自动生成路由）
│   │   ├── index.vue         # /          首页 Hero（3D-IP 开屏）
│   │   ├── about.vue         # /about     关于我
│   │   ├── skills.vue        # /skills    技能栈
│   │   └── experience.vue    # /experience 经历
│   │
│   ├── components/           # 可复用组件（Nuxt 自动导入，无需手动 import）
│   │   ├── NavBar.vue        # 固定顶部导航（滚动渐变 + 移动端抽屉）
│   │   ├── Footer.vue        # 页脚
│   │   ├── HeroBanner.vue    # 3D-IP 视频容器（懒加载/自动播放/挥手/滚动暂停）
│   │   └── SkillCard.vue     # 技能卡片（hover 序列帧 + 插槽 + 熟练度条）
│   │
│   ├── composables/          # 组合式函数（自动导入）
│   │   ├── useScroll.ts      # 滚动状态（y / direction / isTop）
│   │   └── useSectionReveal.ts # 区块滚动渐入（GSAP ScrollTrigger）
│   │
│   ├── assets/               # 需要构建处理的资源（SCSS 样式，由 Vite 处理）
│   │   └── scss/             # main.scss 入口 + _variables/_mixins/_base/_utilities/_components/_pages
│   └── plugins/              # 插件
│       └── gsap.ts           # 注册并注入 gsap / ScrollTrigger
│
├── public/                   # 静态资源（原样拷贝，直接以 / 开头访问）
│   ├── favicon.svg
│   ├── media/
│   │   ├── ip/               # 3D-IP 透明背景 WebM 视频
│   │   └── ip-frames/        # IP 表情序列帧图片（按技能分子目录）
│   └── images/               # 其它静态图片（头像、个人照片等）
│
└── docs/                     # 本文档目录
    ├── DIRECTORY.md          # 本文件
    ├── ASSETS.md             # 素材存放与命名规范
    └── CUSTOMIZE.md          # 接入 3D-IP 素材的修改指引
```

## 关键约定

| 约定 | 说明 |
| --- | --- |
| 自动导入 | `app/components/` 下组件、`app/composables/` 下组合式函数、`app/utils/` 下工具函数均无需手动 import |
| 自动路由 | `app/pages/` 下的文件自动映射为路由（`index.vue` → `/`） |
| 自动布局 | 页面默认使用 `app/layouts/default.vue`，可用 `definePageMeta({ layout: 'xxx' })` 切换 |
| 静态资源 | `public/` 下的文件通过 `/xxx` 路径访问；`app/assets/` 下的文件通过 `~/assets/xxx` 引入并参与构建 |
