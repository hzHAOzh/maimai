<script setup lang="ts">
// ============================================================
// /about —— 关于我
// 替换：个人简介、教育背景、标签、兴趣等信息。
// ============================================================

// 占位：个人标签（替换为你的真实标签）
const tags = ['前端工程', '3D 交互动效', 'Nuxt', 'Vue', 'TypeScript']

useSectionReveal()
</script>

<template>
  <section class="container-page page-section">
    <h1 class="page-title">关于我</h1>
    <p class="page-subtitle">
      （占位）在这里填写你的个人简介：教育背景、职业方向、个人标签、兴趣等。
    </p>

    <!-- 个人标签 -->
    <div data-reveal class="tags">
      <span v-for="t in tags" :key="t" class="tag tag--outline">{{ t }}</span>
    </div>

    <!-- 信息卡片占位 -->
    <div class="info-grid">
      <div
        v-for="(item, i) in ['教育背景', '职业方向', '个人兴趣']"
        :key="item"
        data-reveal
        :style="{ transitionDelay: `${i * 60}ms` }"
        class="card card--hover info-card"
      >
        <h3 class="info-card__title">{{ item }}</h3>
        <p class="info-card__desc">（占位）替换为你的真实内容。</p>
      </div>
    </div>
  </section>
</template>
