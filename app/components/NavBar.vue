<script setup lang="ts">
// ============================================================
// NavBar —— 固定顶部导航栏（单页锚点导航）
// 白色圆角胶囊浮动条：左品牌 / 中导航 / 右操作区（联系 + 悬浮二维码）。
// 点击导航平滑滚动到对应模块；滚动时高亮当前所在模块（scrollspy）。
// ============================================================

// 导航项（对应单页模块锚点）
const navItems = [
  { label: "首页", anchor: "#home" },
  { label: "经历", anchor: "#experience" },
  { label: "项目", anchor: "#projects" },
];

// 单页模块 id（用于 scrollspy 判定）
const sectionIds = ["home", "experience", "projects", "contact"];

// 是否已滚动（用于增强导航栏阴影）
const scrolled = ref(false);
const menuOpen = ref(false);
const activeAnchor = ref("#home");

function onScroll() {
  scrolled.value = window.scrollY > 24;

  // scrollspy：最后一个顶部进入视口的模块为当前模块
  const offset = 140;
  let current = "home";
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= offset) {
      current = id;
    }
  }
  activeAnchor.value = `#${current}`;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));

// 点击导航后关闭移动端菜单（滚动交给原生锚点 + 全局 smooth）
function onNavigate() {
  menuOpen.value = false;
}

// 判断当前模块是否激活
function isActive(anchor: string) {
  return activeAnchor.value === anchor;
}
</script>

<template>
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <nav class="container-page navbar__inner">
      <!-- 左侧：品牌文字，点击回到顶部 -->
      <a href="#home" class="navbar__logo" @click="onNavigate"> MAIMAI </a>

      <!-- 中间：桌面端导航链接 -->
      <ul class="navbar__links">
        <li v-for="item in navItems" :key="item.anchor">
          <a
            :href="item.anchor"
            class="navbar__link"
            :class="{ 'navbar__link--active': isActive(item.anchor) }"
            @click="onNavigate"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- 右侧：桌面端操作区（联系 + 悬浮二维码） -->
      <div class="navbar__actions">
        <div class="navbar__contact">
          <a
            href="#contact"
            class="navbar__cta-btn navbar__cta-btn--ink"
            @click="onNavigate"
          >
            联系
          </a>

          <div class="navbar__contact-pop">
            <img
              src="/images/wechat.png"
              alt="微信二维码"
              loading="lazy"
              class="navbar__qr"
            />
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
          <li v-for="item in navItems" :key="item.anchor">
            <a
              :href="item.anchor"
              class="navbar__drawer-link"
              :class="{ 'navbar__drawer-link--active': isActive(item.anchor) }"
              @click="onNavigate"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <div class="container-page navbar__drawer-cta">
          <a
            href="#contact"
            class="navbar__cta-btn navbar__cta-btn--ink"
            @click="onNavigate"
          >
            联系
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
