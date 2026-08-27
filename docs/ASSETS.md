# 素材存放与命名规范

所有 3D-IP 素材都放在 `public/` 下，运行时通过以 `/` 开头的 URL 访问。
素材路径在 `nuxt.config.ts` 的 `runtimeConfig.public` 中集中配置，替换素材只需改配置或覆盖同名文件。

## 1. 3D-IP 透明背景视频（WebM）

存放目录：`public/media/ip/`

| 文件 | 用途 | 默认配置键 |
| --- | --- | --- |
| `hero-intro.webm` | 首页首屏开屏动画 | `runtimeConfig.public.ipAssets.heroIntro` |
| `hero-wave.webm` | 鼠标悬浮时挥手动画 | `runtimeConfig.public.ipAssets.heroWave` |
| `hero-idle.webm` | 待机循环动画（预留） | `runtimeConfig.public.ipAssets.heroIdle` |

**视频规范建议：**
- 编码：WebM（VP9 / VP8），**透明背景**（Alpha 通道）用于叠加在页面上
- 建议尺寸：≤ 1080p，控制体积（首屏素材尽量 < 5MB）
- 必须 `muted` + `loop` + `playsinline` 才能自动播放（模板已处理）
- 命名请保持与上表一致，或修改 `nuxt.config.ts` 中的路径

## 2. IP 表情序列帧图片（技能卡片 hover）

存放目录：`public/media/ip-frames/`

```
public/media/ip-frames/
├── skill-01/          # 技能 1 的表情序列帧
│   ├── 0001.png
│   ├── 0002.png
│   └── 0003.png
├── skill-02/          # 技能 2（按需新建）
│   └── ...
```

- 命名：四位序号 `0001.png`、`0002.png` …（可换 jpg/webp）
- 在 `app/pages/skills.vue` 的 `skills` 数组中，用 `ipFrames` 字段绑定这些路径
- 目录前缀 `runtimeConfig.public.ipFrameDir` 默认指向 `/media/ip-frames`

## 3. 其它静态图片

存放目录：`public/images/`（头像、个人照片等）

推荐通过 **nuxt-image** 优化加载：
```vue
<NuxtImg src="/images/avatar.png" width="400" quality="80" format="webp" />
```

## 4. 更换素材路径的两种方式

1. **同名覆盖（推荐）**：直接把你导出的素材命名为上表文件名，覆盖到对应目录即可，代码零改动。
2. **改配置**：修改 `nuxt.config.ts` 中的 `runtimeConfig.public`，集中改路径。
