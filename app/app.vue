<template>
  <div>
    <!-- 顶部加载进度条 -->
    <NuxtLoadingIndicator color="#6366f1" :height="3" />

    <!-- 页面 + 布局过渡已在 nuxt.config.ts 的 app.pageTransition / layoutTransition 中配置 -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// ============================================================
// app.vue —— 应用根入口
// 只负责装载「布局 + 页面」两件事。
// 全局逻辑分散在：
//   - app/plugins/gsap.ts       → 注册并注入 GSAP
// 页面级逻辑分别写在 app/pages/* 下。
// ============================================================
</script>
