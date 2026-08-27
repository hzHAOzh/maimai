<script setup lang="ts">
// ============================================================
// /experience —— 工作 & 项目经历（时间轴形式）
// 替换 experiences 数组为你的真实经历。
// ============================================================

const experiences = [
  {
    period: '2023 — 至今',
    role: '岗位名称',
    org: '公司 / 项目',
    desc: '一句话描述你的职责与成果（替换为真实内容）。',
  },
  {
    period: '2021 — 2023',
    role: '岗位名称',
    org: '公司 / 项目',
    desc: '一句话描述你的职责与成果（替换为真实内容）。',
  },
  {
    period: '2019 — 2021',
    role: '岗位名称',
    org: '公司 / 项目',
    desc: '一句话描述你的职责与成果（替换为真实内容）。',
  },
]

useSectionReveal()
</script>

<template>
  <section class="container-page page-section">
    <h1 class="page-title">经历</h1>
    <p class="page-subtitle">工作与项目经历。</p>

    <ol class="timeline">
      <li v-for="e in experiences" :key="e.period" data-reveal class="timeline__item">
        <span class="timeline__dot" />
        <p class="timeline__period">{{ e.period }}</p>
        <h3 class="timeline__title">{{ e.role }} · {{ e.org }}</h3>
        <p class="timeline__desc">{{ e.desc }}</p>
      </li>
    </ol>
  </section>
</template>
