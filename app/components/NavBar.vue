<script setup lang="ts">
// ============================================================
// NavBar —— 固定顶部导航栏（参考 tutti.sh）
// 白色圆角胶囊浮动条：左品牌 / 中导航 / 右操作区（联系 + 悬浮二维码）。
// 悬浮于深色/浅色背景之上，滚动仅增强阴影；移动端折叠为抽屉。
// ============================================================

// 导航项（中部链接，按需增删）
const navItems = [
  { label: "首页", to: "/" },
  { label: "关于我", to: "/about" },
  { label: "技能栈", to: "/skills" },
  { label: "经历", to: "/experience" },
];

const route = useRoute();

// 是否已滚动（用于增强导航栏阴影）
const scrolled = ref(false);
const menuOpen = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));

// 路由切换时自动关闭移动端菜单
watch(
  () => route.path,
  () => {
    menuOpen.value = false;
  },
);

// 判断当前路由是否激活（首页精确匹配，其它前缀匹配）
function isActive(to: string) {
  return route.path === to || (to !== "/" && route.path.startsWith(to));
}
</script>

<template>
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <nav class="container-page navbar__inner">
      <!-- 左侧：品牌文字 -->
      <NuxtLink to="/" class="navbar__logo"> MAIMAI </NuxtLink>

      <!-- 中间：桌面端导航链接 -->
      <ul class="navbar__links">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="navbar__link"
            :class="{ 'navbar__link--active': isActive(item.to) }"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- 右侧：桌面端操作区（联系 + 悬浮二维码） -->
      <div class="navbar__actions">
        <div class="navbar__contact">
          <NuxtLink to="/contact" class="navbar__cta-btn navbar__cta-btn--ink">
            联系
          </NuxtLink>

          <div class="navbar__contact-pop">
            <span class="navbar__qr"></span>
            <span class="navbar__qr-label">扫码加微信</span>
          </div>
        </div>
      </div>

      <!-- 移动端汉堡按钮 -->
      <button
        type="button"
        aria-label="打开菜单"
        class="navbar__menu-btn"
        @click="menuOpen = !menuOpen"
      >
        <Icon :name="menuOpen ? 'mdi:close' : 'mdi:menu'" :size="24" />
      </button>
    </nav>

    <!-- 移动端抽屉菜单（导航 + 联系按钮） -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="navbar__drawer">
        <ul class="container-page navbar__drawer-list">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="navbar__drawer-link"
              :class="{ 'navbar__drawer-link--active': isActive(item.to) }"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="container-page navbar__drawer-cta">
          <NuxtLink to="/contact" class="navbar__cta-btn navbar__cta-btn--ink">
            联系
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
