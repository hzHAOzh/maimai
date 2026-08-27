<template>
  <!-- 全局默认布局：顶部导航 + 内容区 + 底部页脚 -->
  <div class="app-shell">
    <NavBar />
    <main class="app-shell__main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// ============================================================
// layouts/default.vue —— 全局默认布局
// 每个页面默认都会套用该布局（除非页面内用 definePageMeta 指定其它 layout）。
// ============================================================

// 预留：全站级逻辑
onMounted(() => {
  // TODO: 需要「切换路由时滚动回顶部」等全站行为，可在此扩展：
  // const route = useRoute()
  // watch(() => route.path, () => window.scrollTo({ top: 0 }))
})
</script>
