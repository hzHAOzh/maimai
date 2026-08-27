<script setup lang="ts">
// ============================================================
// 首页 —— 单页滚动展示
// 所有模块合并到一页，顶部导航点击平滑滚动定位到对应模块：
//   #home(首屏) / #about(关于我) / #skills(技能栈) / #experience(经历) / #contact(联系)
// ============================================================

const config = useRuntimeConfig();
const ipAssets = config.public.ipAssets as {
  heroIntro: string;
  heroWave: string;
  heroIdle: string;
};
const frameDir = config.public.ipFrameDir as string;

// ---- 首屏 Hero ----
const introTags = ["独立创作者", "交互体验", "视觉作品"];
const hero = {
  kicker: "你好 / HELLO",
  name: "大暑会",
  role: "创意开发 / 设计探索",
  summary:
    "热衷于 3D 形象、轻交互与信息排版。把技术当作表达媒介，让作品像人物一样有性格。",
  now: { kicker: "NOW", title: "3D IP / 轻交互", desc: "正在创作探索…" },
};

// ---- 关于我 ----
const aboutTags = ["前端工程", "3D 交互动效", "Nuxt", "Vue", "TypeScript"];
const aboutCards = [
  { title: "教育背景", desc: "（占位）替换为你的真实教育背景。" },
  { title: "职业方向", desc: "（占位）替换为你的真实职业方向。" },
  { title: "个人兴趣", desc: "（占位）替换为你的真实个人兴趣。" },
];

// ---- 技能栈（悬停切换 IP 序列帧表情）----
const skills = [
  {
    title: "Vue / Nuxt",
    description: "前端框架与 SSR 工程化。",
    level: 90,
    icon: "mdi:vuejs",
    ipFrames: [
      `${frameDir}/skill-01/0001.png`,
      `${frameDir}/skill-01/0002.png`,
      `${frameDir}/skill-01/0003.png`,
    ],
  },
  {
    title: "TypeScript",
    description: "类型安全与工程实践。",
    level: 85,
    icon: "mdi:language-typescript",
    ipFrames: [],
  },
  {
    title: "SCSS / CSS",
    description: "CSS 预处理与样式架构。",
    level: 88,
    icon: "mdi:sass",
    ipFrames: [],
  },
  {
    title: "Node.js",
    description: "服务端与工具链开发。",
    level: 75,
    icon: "mdi:nodejs",
    ipFrames: [],
  },
];

// ---- 经历（时间轴）----
const experiences = [
  {
    period: "2023 — 至今",
    role: "岗位名称",
    org: "公司 / 项目",
    desc: "一句话描述你的职责与成果（替换为真实内容）。",
  },
  {
    period: "2021 — 2023",
    role: "岗位名称",
    org: "公司 / 项目",
    desc: "一句话描述你的职责与成果（替换为真实内容）。",
  },
  {
    period: "2019 — 2021",
    role: "岗位名称",
    org: "公司 / 项目",
    desc: "一句话描述你的职责与成果（替换为真实内容）。",
  },
];

// ---- 联系 ----
const contactEmail = "you@example.com";

// 区块滚动渐入动画（配合 data-reveal 属性）
useSectionReveal();
</script>

<template>
  <!-- #home：首屏 Hero -->
  <section id="home" class="container-page hero-section hero-section--home">
    <div class="hero-stage">
      <!-- 背景装饰：超大标题水印 -->
      <span class="hero-stage__watermark" aria-hidden="true">MAIMAI</span>

      <!-- 左：信息栏 -->
      <aside data-reveal class="hero-stage__intro">
        <p class="hero-stage__kicker">
          <span class="hero-stage__kicker-dot" aria-hidden="true" />
          {{ hero.kicker }}
        </p>
        <h1 class="hero-stage__name">
          Hi, 我是<span class="hero-stage__name-accent">{{ hero.name }}</span>
        </h1>
        <p class="hero-stage__role">{{ hero.role }}</p>

        <p class="hero-stage__summary">{{ hero.summary }}</p>

        <ul class="hero-stage__tags" aria-label="首页标签">
          <li v-for="tag in introTags" :key="tag" class="hero-stage__tag">
            {{ tag }}
          </li>
        </ul>

        <div class="hero-stage__actions">
          <a href="/resume.pdf" class="btn btn--primary" download>下载简历</a>
          <a href="#contact" class="btn btn--outline">联系我</a>
        </div>
      </aside>

      <!-- 右：人物视频 -->
      <div data-reveal class="hero-stage__figure">
        <div class="hero-stage__disc">
          <HeroBanner
            :src="ipAssets.heroIntro"
            :wave-src="ipAssets.heroWave"
            aspect-ratio="4 / 5"
          />
        </div>

        <div class="hero-stage__now">
          <span class="hero-stage__now-kicker">{{ hero.now.kicker }}</span>
          <strong class="hero-stage__now-title">{{ hero.now.title }}</strong>
          <span class="hero-stage__now-desc">{{ hero.now.desc }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- #about：关于我 -->
  <section id="about" class="container-page page-section">
    <h1 class="page-title">关于我</h1>
    <p class="page-subtitle">
      （占位）在这里填写你的个人简介：教育背景、职业方向、个人标签、兴趣等。
    </p>

    <div data-reveal class="tags">
      <span v-for="t in aboutTags" :key="t" class="tag tag--outline">{{
        t
      }}</span>
    </div>

    <div class="info-grid">
      <div
        v-for="(item, i) in aboutCards"
        :key="item.title"
        data-reveal
        :style="{ transitionDelay: `${i * 60}ms` }"
        class="card card--hover info-card"
      >
        <h3 class="info-card__title">{{ item.title }}</h3>
        <p class="info-card__desc">{{ item.desc }}</p>
      </div>
    </div>
  </section>

  <!-- #skills：技能栈 -->
  <section id="skills" class="container-page page-section">
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

  <!-- #experience：经历 -->
  <section id="experience" class="container-page page-section">
    <h1 class="page-title">经历</h1>
    <p class="page-subtitle">工作与项目经历。</p>

    <ol class="timeline">
      <li
        v-for="e in experiences"
        :key="e.period"
        data-reveal
        class="timeline__item"
      >
        <span class="timeline__dot" />
        <p class="timeline__period">{{ e.period }}</p>
        <h3 class="timeline__title">{{ e.role }} · {{ e.org }}</h3>
        <p class="timeline__desc">{{ e.desc }}</p>
      </li>
    </ol>
  </section>
</template>
