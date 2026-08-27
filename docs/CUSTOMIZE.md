# 接入你自己的 3D-IP 素材与文案指南

本模板为「骨架」，所有文案均为占位。按下面步骤替换即可运行，无需大范围重构。

## 一、替换 3D-IP 视频素材

1. 导出**透明背景 WebM** 视频（开屏 / 挥手 / 待机三个，或至少一个开屏）。
2. 放入 `public/media/ip/`，命名为：
   - `hero-intro.webm`（开屏）
   - `hero-wave.webm`（挥手，可选）
   - `hero-idle.webm`（待机，可选）
3. 若命名不同，改 `nuxt.config.ts` → `runtimeConfig.public.ipAssets`。

> 首页视频容器组件 `app/components/HeroBanner.vue` 已内置：
> 懒加载、自动播放、悬浮切换挥手视频、滚出视口暂停。
> 它通过 props 接收视频路径，替换素材后**无需改组件**。

## 二、替换技能序列帧

1. 将每个技能的表情序列帧放入 `public/media/ip-frames/skill-0X/`（`0001.png`…）。
2. 在 `app/pages/skills.vue` 的 `skills` 数组中，给对应技能填 `ipFrames` 路径数组。
3. 未填 `ipFrames` 的技能会显示 `icon` 兜底图标。

## 三、替换文案

| 位置 | 内容 |
| --- | --- |
| `app/components/NavBar.vue` | Logo 姓名、`navItems` 导航项 |
| `app/components/Footer.vue` | 版权姓名、社交链接 |
| `app/pages/index.vue` | Hero 标题 / 副标题 / CTA |
| `app/pages/about.vue` | 个人简介、标签、信息卡片 |
| `app/pages/skills.vue` | `skills` 技能数组 |
| `app/pages/experience.vue` | `experiences` 经历数组 |
| `nuxt.config.ts` | 站点 title / description（SEO） |

## 四、交互事件钩子（预留）

| 组件 / 函数 | 钩子 | 说明 |
| --- | --- | --- |
| `HeroBanner` | `@play` / `@pause` / `@hover` / `@ready` / `@error` | 视频播放 / 暂停 / 悬浮 / 就绪 / 出错 |
| `SkillCard` | `@hover` / `@select` | 悬浮 / 选中 |
| `SkillCard` | `#media` / `#footer` 插槽 | 自定义序列帧展示 / 卡片底部 |
| `useScroll` | `y` / `direction` / `isTop` | 滚动位置 / 方向 / 是否顶部 |

## 五、常用自定义

- **品牌色**：改 `app/assets/scss/_variables.scss` 中的 `$brand-*` 变量（`$brand-500`/`$brand-700` 用于渐变与强调色）。
- **字体**：改 `app/assets/scss/_variables.scss` 中的 `$font-*` 变量（建议在 `app.vue` 的 head 中引入对应字体）。
- **页面过渡**：改 `app/assets/scss/_utilities.scss` 中的 `.page-*` 动画；过渡名在 `nuxt.config.ts` 的 `app.pageTransition`。
- **新增全局样式**：写到 `app/assets/scss/_*.scss` 对应分区，并在 `main.scss` 中 `@use`。
- **SEO**：改 `nuxt.config.ts` 的 `app.head`（title / description / meta）。

## 六、离线图标

模板已内置 `@iconify-json/mdi` 依赖，`mdi:` 前缀图标可离线使用。
如需其它图标集（如 `simple-icons:`、`tabler:`），安装对应 `@iconify-json/*` 包即可。

## 七、接入真实数据（进阶）

模板用 `useState` 做轻量全局状态。后续需要服务端数据时，可直接用 `useAsyncData`/`useFetch`
请求接口，无需引入 Pinia。例如：

```ts
const { data } = await useAsyncData('profile', () => $fetch('/api/profile'))
```
