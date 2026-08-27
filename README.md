# 3D-IP 交互式个人简历官网

基于 **Nuxt 3 + Vue 3 + TypeScript + SCSS** 的求职向交互式个人简历 / 作品集官网初始模板。

- **SSR 开启**（服务端渲染，利于 SEO 与首屏秒开）
- **3D-IP 透明背景 WebM 视频**首屏开屏动画
- **鼠标悬浮挥手 / 滚动暂停 / 悬停切换序列帧**等交互动效
- **浅色主题**
- **4 个路由页面 + 4 个可复用组件**，全部为骨架占位，替换文案与素材即可运行

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器（默认 http://localhost:3000）
pnpm dev

# 3. 生产构建 / 预览
pnpm build
pnpm preview

# 4. 静态生成（可选，输出到 .output/public）
pnpm generate
```

> 首次运行会执行 `postinstall: nuxt prepare` 生成 `.nuxt/` 目录与类型文件。

> 若使用 corepack 管理包管理器版本，先执行 `corepack enable`（`package.json` 已声明 `pnpm@10.6.5`）。

## 目录结构

采用 **Nuxt 4 的 `app/` 目录结构**（通过 `nuxt.config.ts` 中 `future.compatibilityVersion: 4` 开启）。

```
maimai/
├── app/                      # 应用源码
│   ├── app.vue               # 根入口
│   ├── layouts/
│   │   └── default.vue       # 全局布局（NavBar + 内容 + Footer）
│   ├── pages/                # 4 个路由页面
│   │   ├── index.vue         # / 首页 Hero
│   │   ├── about.vue         # /about 关于我
│   │   ├── skills.vue        # /skills 技能栈
│   │   └── experience.vue    # /experience 经历
│   ├── components/           # 可复用组件
│   │   ├── NavBar.vue        # 导航栏
│   │   ├── Footer.vue        # 页脚
│   │   ├── HeroBanner.vue    # 首页 3D-IP 视频容器
│   │   └── SkillCard.vue     # 技能卡片（序列帧 hover）
│   ├── composables/          # 组合式函数
│   │   ├── useScroll.ts      # 滚动状态
│   │   └── useSectionReveal.ts # 区块渐入（GSAP）
│   ├── assets/               # 需要构建处理的资源（SCSS 样式）
│   │   └── scss/             # main.scss 入口 + _variables/_mixins/_base/_utilities/_components/_pages
│   └── plugins/
│       └── gsap.ts           # GSAP + ScrollTrigger 注册
├── public/                   # 静态资源（直接以 / 访问）
│   ├── media/ip/             # 3D-IP WebM 视频素材
│   ├── media/ip-frames/      # 序列帧图片素材
│   └── images/               # 其它静态图片
├── docs/                     # 文档
├── nuxt.config.ts            # 主配置
└── tsconfig.json
```

## 文档

- 📁 [目录结构说明](./docs/DIRECTORY.md)
- 🎬 [素材存放与命名规范](./docs/ASSETS.md)
- 🎨 [接入你自己的 3D-IP 素材指南](./docs/CUSTOMIZE.md)

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Nuxt 3（`app/` 目录，SSR） |
| 语言 | Vue 3 Composition API + `<script setup lang="ts">` |
| 样式 | SCSS（无其它 UI 组件库） |
| 动画 | GSAP + ScrollTrigger |
| 图标 | @nuxt/icon（Iconify，`<Icon name="mdi:xxx" />`） |
| 图片 | @nuxt/image（优化 / 懒加载） |
| 状态 | `useState` / `useAsyncData`（未引入 Pinia） |

## 注意事项

- 视频自动播放需要 `muted`，模板已处理。
- 视频/序列帧素材默认通过 `nuxt.config.ts` 的 `runtimeConfig.public` 集中配置路径。
- 离线使用图标时，可 `pnpm add -D @iconify-json/mdi`（已默认加入依赖）。
