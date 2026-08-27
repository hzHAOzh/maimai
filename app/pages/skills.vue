<script setup lang="ts">
// ============================================================
// /skills —— 技能栈
// 技能卡片 hover 切换 IP 序列帧表情（SkillCard + ipFrames 绑定素材）。
// 替换 skills 数组为你的真实技能；ipFrames 指向 public/media/ip-frames/ 下的序列帧。
// ============================================================

const config = useRuntimeConfig()
const frameDir = config.public.ipFrameDir as string

// 占位技能数据 —— 替换为你的真实技能
// 序列帧命名约定：public/media/ip-frames/skill-01/0001.png、0002.png ...
const skills = [
  {
    title: 'Vue / Nuxt',
    description: '前端框架与 SSR 工程化。',
    level: 90,
    icon: 'mdi:vuejs',
    // 示例：绑定 3 帧序列帧（替换成你的 IP 表情素材路径）
    ipFrames: [
      `${frameDir}/skill-01/0001.png`,
      `${frameDir}/skill-01/0002.png`,
      `${frameDir}/skill-01/0003.png`,
    ],
  },
  {
    title: 'TypeScript',
    description: '类型安全与工程实践。',
    level: 85,
    icon: 'mdi:language-typescript',
    ipFrames: [],
  },
  {
    title: 'SCSS / CSS',
    description: 'CSS 预处理与样式架构。',
    level: 88,
    icon: 'mdi:sass',
    ipFrames: [],
  },
  {
    title: 'Node.js',
    description: '服务端与工具链开发。',
    level: 75,
    icon: 'mdi:nodejs',
    ipFrames: [],
  },
]

useSectionReveal()
</script>

<template>
  <section class="container-page page-section">
    <h1 class="page-title">技能栈</h1>
    <p class="page-subtitle">（占位）悬停卡片可切换对应 IP 表情序列帧。</p>

    <div class="skills-grid">
      <SkillCard
        v-for="(s, i) in skills"
        :key="s.title"
        v-bind="s"
        data-reveal
        :style="{ transitionDelay: `${i * 60}ms` }"
        @select="(t: string) => console.log('选中技能：', t)"
      />
    </div>
  </section>
</template>
