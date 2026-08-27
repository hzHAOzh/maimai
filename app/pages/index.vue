<script setup lang="ts">
// ============================================================
// 首页 / Hero 首屏
// 目标：对齐设计稿的首屏排版，突出 3D-IP、超大背景字与左右信息栏。
// ============================================================

const config = useRuntimeConfig();
const ipAssets = config.public.ipAssets as {
  heroIntro: string;
  heroWave: string;
  heroIdle: string;
};

const introTags = ["独立创作者", "交互体验", "视觉作品"];

const profileItems = [
  { label: "姓名", value: "大暑会" },
  { label: "职业", value: "创意开发 / 设计探索" },
  { label: "风格", value: "3D IP / 作品展示 / 轻交互" },
  { label: "地区", value: "上海" },
];

// 区块滚动渐入动画（配合 data-reveal 属性）
useSectionReveal();
</script>

<template>
  <section class="container-page hero-section">
    <!-- <p data-reveal class="hero-section__eyebrow">DA SHUHUI</p> -->

    <div class="hero-stage">
      <h1 class="hero-stage__title" aria-label="DAISHUHUI">DAISHUHUI</h1>

      <aside data-reveal class="hero-stage__intro">
        <p class="hero-stage__kicker">你好 / HELLO</p>
        <h2 class="hero-stage__name">大暑会</h2>
        <p class="hero-stage__summary">
          这里是首页首屏展示区，主打 3D
          形象、轻交互与个人信息排版。整体布局会贴近设计稿的杂志式构图。
        </p>
        <ul class="hero-stage__tags" aria-label="首页标签">
          <li v-for="tag in introTags" :key="tag" class="hero-stage__tag">
            {{ tag }}
          </li>
        </ul>
      </aside>

      <div data-reveal class="hero-stage__figure">
        <HeroBanner
          :src="ipAssets.heroIntro"
          :wave-src="ipAssets.heroWave"
          aspect-ratio="4 / 5"
        />
      </div>

      <aside data-reveal class="hero-stage__meta">
        <dl class="hero-meta">
          <div
            v-for="item in profileItems"
            :key="item.label"
            class="hero-meta__item"
          >
            <dt class="hero-meta__label">{{ item.label }}</dt>
            <dd class="hero-meta__value">{{ item.value }}</dd>
          </div>
        </dl>
      </aside>
    </div>

    <div class="hero-scroll-hint">
      <Icon name="mdi:chevron-down" :size="24" />
    </div>
  </section>
</template>
