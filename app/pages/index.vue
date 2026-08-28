<script setup lang="ts">
// ============================================================
// 首页 —— 单页滚动展示
// 所有模块合并到一页，顶部导航点击平滑滚动定位到对应模块：
//   #home(首屏) / #experience(经历) / #projects(项目经历) / #contact(联系)
// ============================================================

// ---- 首屏 Hero ----
const introTags = ["新媒体运营", "AIGC 创作", "内容策划"];
const hero = {
  kicker: "你好 / HELLO",
  name: "麦锐玲",
  role: "AIGC 创作 / 新媒体运营",
  summary:
    "一年新媒体运营经验，AIGC 赋能的内容创作者，精通抖音、小红书、视频号等平台从 0-1 搭建与运营，擅长以数据驱动内容增长。用内容表达，让作品被看见。",
  now: {
    kicker: "NOW",
    title: "AIGC 短视频 / 内容增长",
    desc: "正在探索 AIGC 内容生产与流量增长…",
  },
};

// ---- 经历（时间轴 · 工作经历）----
// 字段说明：
//   tag：卡片顶部彩色胶囊；accent：粉/紫主题色；imageSide：图片卡放在左还是右
//   photos：照片墙（多张错落叠放的拍立得）；cardTag：图片下方绿色角色标签；note：右下角提示
const experiences = [
  {
    period: "2026-04 — 至今",
    org: "深圳市公安局交通警察支队南山大队侨城中队",
    role: "宣传专员",
    tag: "政务 · 一线宣传",
    accent: "pink",
    imageSide: "right",
    note: "点击卡片阅读原文",
    cardTag: "宣传专员 / 政务新媒体",
    articles: [
      {
        title: "持续严查地铁口“拉客”带篷车！一男子阻碍执法被拘留→",
        url: "https://mp.weixin.qq.com/s/VagLnUTZkZ2nLyW_0d-vQA",
      },
      {
        title: "溯源追责，公司4名负责人被拘！货车安全警示，专项整治持续→",
        url: "https://mp.weixin.qq.com/s/KKh7uBjjUMggFtiaAybb_Q",
      },
      {
        title: "高速上的低速车，抓拍曝光！行车有节奏，慢驶≠安全！→",
        url: "https://mp.weixin.qq.com/s/xyuulzgo_ue7wSNEfh-xkw",
      },
    ],
    descList: [
      "负责交警支队官方公众号运营，独立撰写并发布推文 20 篇，内容涵盖科普、节日及专题报道，单篇阅读量稳定达数千至数万。",
      "承担内部视频物料全流程制作(拍摄/剪辑/包装)，保持每周稳定更新。",
      "对接多业务科室，统筹活动纪实素材的拍摄与归档。",
    ],
  },
  {
    period: "2025-07 — 2026-02",
    org: "广州市箐北文化服务有限公司",
    role: "新媒体运营",
    tag: "内容 · 一线运营",
    accent: "purple",
    imageSide: "left",
    note: "点击图标跳转对应账号 · 账号截图可放大预览",
    cardTag: "新媒体运营 / 内容策划",
    platforms: [
      {
        name: "抖音",
        img: "https://upload.wikimedia.org/wikipedia/en/8/85/Douyin_logo.svg",
        bg: "linear-gradient(135deg, #e9f8f7, #fdeef2)",
        url: "https://www.douyin.com/user/MS4wLjABAAAAOCt2khhqtKEpUiLfbqe1LKkZPBXRRxEl4bLN0PDtGoKX_Of60Q_MgvFufe7jYbOo?from_tab_name=main",
      },
      {
        name: "小红书",
        img: "https://cdn.simpleicons.org/xiaohongshu/ff2442",
        bg: "linear-gradient(135deg, #fff0f3, #ffe3e9)",
        url: "https://www.xiaohongshu.com/user/profile/674d648c000000001d02e5d0?xsec_token=ABm85EAu5aQFTMZp56K7szgRCHSdr_x1b4yrriotckC9w%3D&xsec_source=pc_search",
      },
      {
        name: "各平台账号截图",
        img: "/images/platforms/accounts.png",
        label: "抖音 / 小红书 / 视频号",
        preview: true,
        url: "https://channels.weixin.qq.com/",
      },
    ],
    descList: [
      "主导抖音、小红书、视频号、公众号四大平台从 0-1 搭建与运营，完成账号定位、视觉包装及内容体系搭建。",
      "独立产出公众号推文 16 篇、小红书官方笔记 20 篇（单篇浏览量破 5000+）；近 1 个月为视频号产出短视频 23 条，累计曝光 2.3W+、新增关注 100+。",
      "定期开展平台算法调研与竞品分析，根据完播率、互动率等数据反向指导内容迭代。",
    ],
  },
];

// ---- 项目经历 ----
const projects = [
  {
    period: "2026-07 — 至今",
    role: "AI 视频制作",
    org: "AIGC赋能短视频带货项目（抖音电商方向）",
    desc: "深度拆解抖音高收藏、高转化爆款带货视频，针对黄金 3 秒钩子、脚本结构及节奏卡点进行模型提炼；基于拆解模型，利用 AI 工具完成脚本生成、AI 配音及画面素材的智能匹配，独立完成从策划到成片的全流程，打造出可批量复制的短视频内容生产线，极大降低内容试错成本。",
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

// ---- 平台账号截图放大预览（灯箱）----
interface PlatformItem {
  name: string;
  img: string;
  bg?: string;
  label?: string;
  url: string;
  preview?: boolean;
}

const preview = ref<{ img: string; name: string; url: string } | null>(null);

// 点击拍立得：抖音/小红书默认新标签页跳转账号；视频号截图打开放大预览
const onPolaroidClick = (e: MouseEvent, p: PlatformItem) => {
  if (p.preview) {
    e.preventDefault();
    preview.value = { img: p.img, name: p.label ?? p.name, url: p.url };
  }
};

// 拍立得悬浮提示：抖音/小红书跳转账号；视频号放大预览
const polaroidTitle = (p: PlatformItem) =>
  p.preview ? `点击放大预览${p.label ?? p.name}` : `跳转 ${p.name} 账号主页`;

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
          <a href="/麦锐玲.pdf" class="btn btn--primary" download>下载简历</a>
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

  <!-- #experience：经历 -->
  <section id="experience" class="container-page page-section experience">
    <header class="experience__head">
      <p class="experience__kicker">01 / THE PRACTITIONER</p>
      <h1 class="experience__title">我在真实现场做过什么</h1>
      <!-- <p class="experience__subtitle">
        以设计师的眼光走入真实商业现场，让每一次定义都经由真实经验与成果发生。
      </p> -->
      <span class="experience__bar" aria-hidden="true" />
    </header>

    <ol class="timeline timeline--design">
      <li
        v-for="(e, i) in experiences"
        :key="e.period"
        data-reveal
        class="timeline__item"
        :class="`timeline__item--${e.imageSide}`"
      >
        <span class="timeline__node">{{ i + 1 }}</span>

        <article class="timeline__card timeline__card--text">
          <p class="timeline__period">{{ e.period }}</p>
          <h3 class="timeline__title">{{ e.org }}</h3>
          <span class="timeline__pill" :class="`timeline__pill--${e.accent}`">
            {{ e.tag }}
          </span>
          <div class="timeline__desc">
            <p v-for="d in e.descList" :key="d">{{ d }}</p>
          </div>
        </article>

        <figure
          v-if="e.articles?.length || e.platforms?.length"
          class="timeline__card timeline__card--media"
        >
          <div v-if="e.articles?.length" class="timeline__articles">
            <p class="timeline__articles-title">
              <Icon name="mdi:newspaper-variant-outline" :size="14" />
              精选推文 · 公众号作品
            </p>
            <a
              v-for="a in e.articles"
              :key="a.url"
              :href="a.url"
              target="_blank"
              rel="noopener"
              class="timeline__article-card"
            >
              <span class="timeline__article-card-title">{{ a.title }}</span>
              <Icon
                name="mdi:open-in-new"
                :size="16"
                class="timeline__article-card-icon"
              />
            </a>
          </div>
          <div v-else-if="e.platforms?.length" class="photo-wall">
            <a
              v-for="p in e.platforms"
              :key="p.name"
              :href="p.url"
              target="_blank"
              rel="noopener"
              :class="[
                'photo-wall__polaroid',
                p.preview
                  ? 'photo-wall__polaroid--shot'
                  : 'photo-wall__polaroid--logo',
              ]"
              :title="polaroidTitle(p)"
              :data-caption="p.name"
              @click="onPolaroidClick($event, p)"
            >
              <img
                :src="p.img"
                :alt="p.label ?? p.name"
                :style="p.bg ? { background: p.bg } : undefined"
                loading="lazy"
              />
            </a>
          </div>
          <figcaption class="timeline__media-foot">
            <span class="timeline__card-tag">{{ e.cardTag }}</span>
            <span class="timeline__note">{{ e.note }}</span>
          </figcaption>
        </figure>
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

  <!-- 平台账号截图放大预览灯箱 -->
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="preview"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`${preview.name} 账号主页`"
        @click.self="preview = null"
      >
        <button
          type="button"
          class="lightbox__close"
          aria-label="关闭预览"
          @click="preview = null"
        >
          <Icon name="mdi:close" :size="22" />
        </button>
        <figure class="lightbox__frame">
          <img
            :src="preview.img"
            :alt="`${preview.name} 账号主页`"
            class="lightbox__img"
          />
          <figcaption class="lightbox__foot">
            <span class="lightbox__name">{{ preview.name }} 账号主页</span>
            <!-- <a
              :href="preview.url"
              target="_blank"
              rel="noopener"
              class="lightbox__link"
            >
              前往主页
              <Icon name="mdi:open-in-new" :size="14" />
            </a> -->
          </figcaption>
        </figure>
      </div>
    </Transition>
  </Teleport>
</template>
