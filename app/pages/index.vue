<script setup lang="ts">
// ============================================================
// 首页 —— 单页滚动展示
// 所有模块合并到一页，顶部导航点击平滑滚动定位到对应模块：
//   #home(首屏) / #about(关于我) / #skills(技能栈) / #experience(经历)
//   / #projects(项目经历) / #contact(联系)
// ============================================================

// ---- 首屏 Hero ----
const introTags = ["新媒体运营", "AI 视频创作", "内容策划"];
const hero = {
  kicker: "你好 / HELLO",
  name: "麦锐玲",
  role: "AI创作 / 新媒体运营",
  summary:
    "一年新媒体运营经验，专注短视频内容策划与 AI 视频制作，熟悉抖音、视频号、公众号、小红书等平台玩法。用内容表达，让作品被看见。",
  now: {
    kicker: "NOW",
    title: "AI 视频 / 短视频内容",
    desc: "正在探索 AI 视频制作与内容增长…",
  },
};

// ---- 关于我 ----
const aboutTags = ["平台运营", "视频创作", "AI 能力", "内容创作", "数据分析"];
const aboutCards = [
  {
    title: "教育背景",
    desc: "广东财经大学 · 数字媒体艺术（本科，2021—2025）。主修影视摄影与剪辑、数字影视特效与合成、交互产品开发、微电影创作。",
  },
  {
    title: "职业方向",
    desc: "新媒体运营 / AI 视频创作。专注短视频内容策划、制作与多平台运营，熟悉抖音、视频号、公众号、小红书。",
  },
  {
    title: "个人兴趣",
    desc: "影视摄影、短视频创作、AI 工具探索，热衷把热点与创意转化为有传播力的内容。",
  },
];

// ---- 技能栈（无序列帧素材，走 SkillCard 图标兜底）----
const skills = [
  {
    title: "平台运营",
    description:
      "熟练运营抖音、视频号、公众号、小红书等平台，了解账号搭建、流量规则与算法逻辑。",
    level: 90,
    icon: "mdi:bullhorn",
    ipFrames: [],
  },
  {
    title: "视频创作 / AI",
    description:
      "掌握拍摄、剪辑、字幕包装全流程，熟练使用剪映、Canva；可借助 AI 完成脚本生成、素材与智能剪辑。",
    level: 88,
    icon: "mdi:video-outline",
    ipFrames: [],
  },
  {
    title: "内容创作",
    description: "擅长文案撰写、脚本创作与选题策划，能结合热点与平台调性挖掘选题。",
    level: 85,
    icon: "mdi:pen",
    ipFrames: [],
  },
  {
    title: "数据分析",
    description: "擅长后台数据分析，根据数据复盘优化内容、调整方向。",
    level: 80,
    icon: "mdi:chart-line",
    ipFrames: [],
  },
];

// ---- 经历（时间轴 · 工作经历）----
const experiences = [
  {
    period: "2026-04 — 至今",
    role: "宣传专员",
    org: "深圳市公安局交通警察支队南山大队侨城中队",
    desc: "负责交警支队官方公众号全流程运营，独立撰写推文 20 篇，阅读量稳定在几千至数万；独立完成宣传物料拍摄、剪辑、字幕包装全流程，每周产出多条宣传视频。",
  },
  {
    period: "2025-07 — 2026-02",
    role: "新媒体运营",
    org: "广州市箐北文化服务有限公司",
    desc: "负责抖音、小红书、视频号、公众号四大平台从 0-1 搭建与全流程运营；主导视频号内容产出（近 1 个月 23 条短视频、总浏览 2.3W+），独立产出公众号推文 16 篇、小红书内容 22 篇。",
  },
];

// ---- 项目经历 ----
const projects = [
  {
    period: "2026-07 — 至今",
    role: "AI 视频制作",
    org: "AI短剧带货视频",
    desc: "对标抖音高收藏爆款，拆解脚本叙事逻辑、开篇钩子、内容节奏与高留存结构；用 AI 工具辅助脚本生成、画面素材与剪辑包装，沉淀可复用的短视频内容生产方法论。",
  },
  {
    period: "2023-04 — 2023-06",
    role: "制片",
    org: "《这，就是广财》",
    desc: "参与学校官方宣传片全流程制片，负责拍摄排期规划、场地协调与人员调度，对接编剧、摄像、演员及后期团队，助力宣传片顺利成片并公开展示。",
  },
];

// ---- 联系 ----
const contactEmail = "1037111360@qq.com";
const contactPhone = "13714294135";

// 区块滚动渐入动画（配合 data-reveal 属性）
useSectionReveal();
</script>

<template>
  <!-- #home：首屏 Hero -->
  <section id="home" class="container-page hero-section hero-section--home">
    <div class="hero-stage">
      <!-- 背景装饰：超大标题水印 -->
      <span class="hero-stage__watermark" aria-hidden="true">MAIMAI</span>

      <!-- 背景装饰：漂浮泡泡 -->
      <span class="hero-bubble hero-bubble--1" aria-hidden="true" />
      <span class="hero-bubble hero-bubble--2" aria-hidden="true" />
      <span class="hero-bubble hero-bubble--3" aria-hidden="true" />
      <span class="hero-bubble hero-bubble--4" aria-hidden="true" />

      <!-- 左：信息栏 -->
      <aside data-reveal class="hero-stage__intro">
        <p class="hero-stage__kicker">
          <span class="hero-stage__kicker-dot" aria-hidden="true" />
          {{ hero.kicker }}
        </p>
        <h1 class="hero-stage__name">Hi, 我是{{ hero.name }}</h1>
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

      <!-- 右：人物图片 -->
      <div data-reveal class="hero-stage__figure">
        <div class="hero-stage__disc">
          <img
            class="hero-stage__img"
            src="/media/ip/ip.png"
            alt="麦锐玲"
            width="720"
            height="900"
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
      一年新媒体运营经验，独立运营过政务公众号与多平台账号，擅长内容策划、视频制作与数据分析。
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
    <p class="page-subtitle">覆盖平台运营、视频创作与 AI 内容生产，专注打造有传播力的内容。</p>

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

  <!-- #projects：项目经历 -->
  <section id="projects" class="container-page page-section">
    <h1 class="page-title">项目经历</h1>
    <p class="page-subtitle">代表性项目与作品。</p>

    <ol class="timeline">
      <li
        v-for="p in projects"
        :key="p.period"
        data-reveal
        class="timeline__item"
      >
        <span class="timeline__dot" />
        <p class="timeline__period">{{ p.period }}</p>
        <h3 class="timeline__title">{{ p.role }} · {{ p.org }}</h3>
        <p class="timeline__desc">{{ p.desc }}</p>
      </li>
    </ol>
  </section>

  <!-- #contact：联系我 -->
  <section id="contact" class="container-page page-section contact-section">
    <h1 class="page-title">联系我</h1>
    <p class="page-subtitle">有合作意向或想聊聊内容创作，欢迎联系。</p>

    <div data-reveal class="contact-section__panel">
      <img
        src="/images/wechat.png"
        alt="微信二维码"
        loading="lazy"
        class="contact-section__qr"
      />
      <span class="contact-section__qr-label">微信扫码 · 添加好友</span>
      <a :href="`mailto:${contactEmail}`" class="contact-section__email">
        <Icon name="mdi:email-outline" :size="18" />
        {{ contactEmail }}
      </a>
      <a :href="`tel:${contactPhone}`" class="contact-section__email">
        <Icon name="mdi:phone-outline" :size="18" />
        {{ contactPhone }}
      </a>
    </div>
  </section>
</template>
