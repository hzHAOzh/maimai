<script setup lang="ts">
// ============================================================
// 首页 —— 单页滚动展示
// 所有模块合并到一页，顶部导航点击平滑滚动定位到对应模块：
//   #home(首屏) / #experience(经历) / #projects(AIGC 创作) / #contact(联系)
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

// ---- AIGC 创作：AIGC 创作视频（纵向滚动驱动横向位移）----
interface VideoItem {
  id: string;
  src: string;
  title: string;
  platform: string;
  /** image = 静态图卡片，video（默认）= 视频卡片 */
  kind?: "image" | "video";
  cover?: string;
  duration?: string;
  /** 宽/高比：横屏 > 1，竖屏 < 1；视频由元数据回填，静态图直接写死 */
  ratio?: number;
  /** 懒加载状态：进视口前不设 src；"metadata" = 正在加载截帧；截完回 undefined 释放下载 */
  preload?: "metadata";
}

// AIGC 创作墙：既有横屏也有竖屏；IMG 为横屏实拍，收纳盒/变装为竖屏 AI 作品，
// 另含 4 张 AI 生成静态图（16:9 横屏，ratio 已知）
const videos = ref<VideoItem[]>([
  {
    id: "v1",
    src: "https://zo6rkj6mgncf4uot.public.blob.vercel-storage.com/big/IMG_5412_small.mp4",
    title: "短片 · IMG_5412",
    platform: "横屏",
    ratio: 16 / 9, // 7680×4320
  },
  {
    id: "v2",
    src: "https://zo6rkj6mgncf4uot.public.blob.vercel-storage.com/big/IMG_5534%281%29_small.mp4",
    title: "短片 · IMG_5534",
    platform: "横屏",
    ratio: 16 / 9, // 3840×2160
  },
  {
    id: "v3",
    src: "https://zo6rkj6mgncf4uot.public.blob.vercel-storage.com/jimeng-2026-03-24-3777-%E9%95%9C%E5%A4%B41%EF%BC%880-2s%EF%BC%89%E6%8A%93%E4%BA%BA%EF%BC%88%E6%89%BE%E4%B8%8D%E5%88%B0%E4%B8%9C%E8%A5%BF%EF%BC%89%20%E9%A6%96%E5%B8%A7%E6%8F%90%E7%A4%BA%E8%AF%8D%EF%BC%9A%20%E5%87%8C%E4%B9%B1%E6%8A%BD%E5%B1%89%E5%86%85%E9%83%A8%EF%BC%8C%E5%8C%96%E5%A6%86%E5%93%81%E3%80%81%E9%9B%B6%E9%A3%9F%E3%80%81....mp4",
    title: "AI 收纳好物 · 镜头一",
    platform: "竖屏",
    ratio: 720 / 1280, // 0.5625
  },
  {
    id: "v4",
    src: "https://zo6rkj6mgncf4uot.public.blob.vercel-storage.com/%E5%8F%98%E8%A3%85ai%E8%A7%86%E9%A2%91.mp4",
    title: "AI 变装 · 一键换装",
    platform: "竖屏",
    ratio: 834 / 1112, // 0.75
  },
  {
    id: "w1",
    kind: "image",
    src: "/media/aigc/aigc-bridge.jpg",
    title: "暮色廊桥映湖光",
    platform: "AIGC 静帧",
    ratio: 16 / 9,
  },
  {
    id: "w2",
    kind: "image",
    src: "/media/aigc/aigc-ruin-city.jpg",
    title: "末世绿都",
    platform: "AIGC 静帧",
    ratio: 16 / 9,
  },
  {
    id: "w3",
    kind: "image",
    src: "/media/aigc/aigc-night-bridge.jpg",
    title: "夜谷星环之桥",
    platform: "AIGC 静帧",
    ratio: 16 / 9,
  },
  {
    id: "w4",
    kind: "image",
    src: "/media/aigc/aigc-cloud-city.jpg",
    title: "云崖未来之城",
    platform: "AIGC 静帧",
    ratio: 16 / 9,
  },
]);

// ---- 剪辑作品（真实拍摄 · 剪辑/包装成片）----
// 素材：public/media/cut/*.mp4（本地真实视频）。标题与实际内容相关，可按需调整
const cuts = ref<VideoItem[]>([
  {
    id: "cut1",
    src: "https://zo6rkj6mgncf4uot.public.blob.vercel-storage.com/big/cut/mmexport1787848446777.mp4",
    title: "剪辑作品 01",
    platform: "竖屏",
  },
  {
    id: "cut2",
    src: "https://zo6rkj6mgncf4uot.public.blob.vercel-storage.com/big/cut/mmexport1787848493049.mp4",
    title: "剪辑作品 02",
    platform: "竖屏",
  },
  {
    id: "cut3",
    src: "https://zo6rkj6mgncf4uot.public.blob.vercel-storage.com/big/cut/mmexport1787848520356.mp4",
    title: "剪辑作品 03",
    platform: "竖屏",
  },
  {
    id: "cut4",
    src: "https://zo6rkj6mgncf4uot.public.blob.vercel-storage.com/big/cut/mmexport1787848529611.mp4",
    title: "剪辑作品 04",
    platform: "竖屏",
  },
]);

// 正在灯箱展示的作品（视频或静态图）
const active = ref<VideoItem | null>(null);

// 视频卡片 DOM 引用：读取真实时长 + 抽取封面帧
const videoEls: Record<string, HTMLVideoElement> = {};
const setVideoRef = (id: string, el: unknown) => {
  if (el) videoEls[id] = el as HTMLVideoElement;
};

// 按 id 在「AIGC 墙」与「剪辑作品」两个列表里统一查找作品
const findWork = (id: string): VideoItem | undefined =>
  videos.value.find((x: VideoItem) => x.id === id) ??
  cuts.value.find((x: VideoItem) => x.id === id);

const fmtDur = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// 用真实分辨率回填比例（仅当宽高可信时，避免 loadedmetadata 尚未解码出尺寸时算成 0/NaN）。
// 比例到达后卡片宽度变化，需等 Vue 应用到内联样式再重算横向位移。
const syncVideoRatio = (v: VideoItem, el: HTMLVideoElement) => {
  if (!el.videoWidth || !el.videoHeight) return;
  const r = el.videoWidth / el.videoHeight;
  if (Math.abs(r - (v.ratio || 0)) < 0.001) return;
  v.ratio = r;
  nextTick(resizeWall);
};

// loadedmetadata：回填真实时长（比例改在 loadeddata 里回填，此时尺寸才可靠）
const onVideoMeta = (id: string, e: Event) => {
  const el = e.target as HTMLVideoElement;
  const v = findWork(id);
  if (!v) return;
  if (el.duration && Number.isFinite(el.duration))
    v.duration = fmtDur(el.duration);
};

// loadeddata：回填比例 + 跳到片中一点，canvas 抽取封面帧
// 素材走 CDN（Vercel Blob 返回 Access-Control-Allow-Origin:*），配合 <video crossorigin> 后画布不被污染、可导出
// 8K/4K 视频按比例缩到最长边 1280 再截，避免生成超大画布/超大 dataURL
const onVideoFrame = (id: string, e: Event) => {
  const el = e.target as HTMLVideoElement;
  const v = findWork(id);
  if (!v) return;
  syncVideoRatio(v, el);
  if (v.cover) return;
  el.currentTime = Math.min(1.5, (el.duration || 2) * 0.2);
  el.onseeked = () => {
    el.onseeked = null;
    try {
      const c = document.createElement("canvas");
      const scale = Math.min(1, 1280 / (el.videoWidth || 1280));
      c.width = Math.round((el.videoWidth || 640) * scale);
      c.height = Math.round((el.videoHeight || 360) * scale);
      c.getContext("2d")!.drawImage(el, 0, 0, c.width, c.height);
      v.cover = c.toDataURL("image/jpeg", 0.72);
      // —— 封面已生成：preload 降回 none 并 abort，避免整段视频继续下载 ——
      v.preload = undefined;
      nextTick(() => {
        const ve = videoEls[v.id];
        if (ve) {
          ve.pause();
          ve.preload = "none";
          ve.load();
        }
      });
    } catch {
      /* 截帧失败则保留视频默认画面 */
    }
  };
};

// 打开作品灯箱：视频播放 / 静态图放大
const openWork = (v: VideoItem) => {
  active.value = v;
};

// 静态图加载后读取真实宽高比对（避免被数据里硬编码的 16/9 裁剪），
// 比例到达后卡片宽度变化，需重算横向位移距离
const onImageLoad = (v: VideoItem, e: Event) => {
  if (v.kind !== "image") return;
  const el = e.target as HTMLImageElement;
  if (el.naturalWidth && el.naturalHeight) {
    v.ratio = el.naturalWidth / el.naturalHeight;
    nextTick(resizeWall);
  }
};

// 卡片媒体框尺寸：高度固定，宽度 = 高度 × 真实比例
// 显式写死宽度，避免 .vcard (width:max-content) 下从比例解析不出确定宽度
const mediaStyle = (v: VideoItem) => {
  const h = "min(56vh, 22rem)";
  const r = v.ratio || 9 / 16;
  return { height: h, width: `calc(${h} * ${r})` };
};

// ---- 纵向滚动驱动横向滚动（首尾水平居中）----
const wallTrack = ref<HTMLElement | null>(null);
const wallStage = ref<HTMLElement | null>(null);
const wallStrip = ref<HTMLElement | null>(null);

// 横向位移参数：起步时第一张卡片居中，滚动到底最后一张居中
let wallT0 = 0;
let wallTravel = 0;

const resizeWall = () => {
  const track = wallTrack.value;
  const stage = wallStage.value;
  const strip = wallStrip.value;
  if (!track || !stage || !strip) return;
  const vh = window.innerHeight;
  const stageW = stage.clientWidth;
  const stripW = strip.scrollWidth;
  const cs = getComputedStyle(strip);
  const padL = parseFloat(cs.paddingLeft) || 0;
  const padR = parseFloat(cs.paddingRight) || 0;
  const first = strip.firstElementChild as HTMLElement | null;
  const last = strip.lastElementChild as HTMLElement | null;
  const w1 = first ? first.offsetWidth : 0;
  const wN = last ? last.offsetWidth : 0;

  if (stripW <= stageW) {
    // 内容不足一屏：整体居中，无需横向滚动
    wallT0 = Math.max(0, (stageW - stripW) / 2);
    wallTravel = 0;
    track.style.height = `${vh + 2}px`;
    paintWall();
    return;
  }

  // 首卡居中所需位移（向右为正）
  wallT0 = Math.max(0, stageW / 2 - (padL + w1 / 2));
  // 末卡居中时条的左缘位置
  const tend = stageW / 2 - (stripW - padR - wN / 2);
  wallTravel = tend - wallT0; // 恒为负：从首卡居中滑向末卡居中
  track.style.height = `${vh - wallTravel}px`;
  paintWall();
};

const paintWall = () => {
  const track = wallTrack.value;
  const strip = wallStrip.value;
  if (!track || !strip) return;
  const rect = track.getBoundingClientRect();
  const vh = window.innerHeight;
  const total = rect.height - vh;
  const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
  strip.style.transform = `translate3d(${(wallT0 + wallTravel * progress).toFixed(2)}px, 0, 0)`;
};

let wallRaf = 0;
const onWallScroll = () => {
  if (wallRaf) return;
  wallRaf = requestAnimationFrame(() => {
    wallRaf = 0;
    paintWall();
  });
};

// —— 视频卡片懒加载：进视口附近才给 <video> 设 src 并截封面帧（首屏零视频下载）——
let mediaObserver: IntersectionObserver | null = null;
const mediaEls = new Set<HTMLElement>();
const observeMedia = (el: unknown) => {
  if (el instanceof HTMLElement) {
    mediaEls.add(el);
    mediaObserver?.observe(el);
  }
};

const onMediaVisible = (entries: IntersectionObserverEntry[]) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const id = (entry.target as HTMLElement).dataset.vid;
    if (!id) continue;
    const v = findWork(id);
    // 静态图走原生 loading=lazy；已有封面 / 正在加载的跳过
    if (!v || v.kind === "image" || v.cover || v.preload) continue;
    v.preload = "metadata";
    nextTick(() => videoEls[id]?.load());
  }
};

onMounted(() => {
  resizeWall();
  mediaObserver = new IntersectionObserver(onMediaVisible, {
    rootMargin: "400px 0px",
    threshold: 0,
  });
  mediaEls.forEach((el) => mediaObserver!.observe(el));
  window.addEventListener("scroll", onWallScroll, { passive: true });
  window.addEventListener("resize", resizeWall);
});
onBeforeUnmount(() => {
  mediaObserver?.disconnect();
  window.removeEventListener("scroll", onWallScroll);
  window.removeEventListener("resize", resizeWall);
});

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
      <h1 class="experience__title">工作经历</h1>
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

  <!-- #projects：AIGC 创作（AIGC 视频墙，纵向滚动驱动横向位移） -->
  <section
    id="projects"
    class="container-page page-section experience video-wall"
  >
    <div ref="wallTrack" class="video-wall__track">
      <div ref="wallStage" class="video-wall__stage">
        <header class="experience__head">
          <p class="experience__kicker">02 / THE PROJECTS</p>
          <h1 class="experience__title">AIGC 创作</h1>
          <!-- <p class="experience__subtitle">
            代表性项目与作品。
          </p> -->
          <span class="experience__bar" aria-hidden="true" />
        </header>

        <div ref="wallStrip" class="video-wall__strip">
          <figure
            v-for="v in videos"
            :key="v.id"
            :data-vid="v.id"
            :ref="(el) => observeMedia(el)"
            class="vcard"
            @click="openWork(v)"
          >
            <div class="vcard__media" :style="mediaStyle(v)">
              <!-- 视频：进视口懒加载截封面帧；静态图：直接展示原图 -->
              <video
                v-if="v.kind !== 'image'"
                :ref="(el) => setVideoRef(v.id, el)"
                :src="v.preload ? v.src : undefined"
                :preload="v.preload ?? 'none'"
                crossorigin="anonymous"
                muted
                playsinline
                @loadedmetadata="onVideoMeta(v.id, $event)"
                @loadeddata="onVideoFrame(v.id, $event)"
              />
              <img
                v-if="v.kind === 'image' || v.cover"
                class="vcard__cover"
                :src="v.kind === 'image' ? v.src : v.cover"
                :alt="v.title"
                loading="lazy"
                @load="onImageLoad(v, $event)"
              />
              <span v-if="v.kind !== 'image'" class="vcard__play">
                <Icon name="mdi:play" :size="30" />
              </span>
              <span v-if="v.duration" class="vcard__dur">{{ v.duration }}</span>
            </div>
            <figcaption class="vcard__meta">
              <span class="vcard__plat">{{ v.platform }}</span>
              <h3 class="vcard__title">{{ v.title }}</h3>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <!-- #cut：剪辑作品（真实拍摄 · 剪辑成片画廊） -->
  <section id="cut" class="container-page page-section experience cut-section">
    <header data-reveal class="experience__head">
      <p class="experience__kicker">03 / THE CUTS</p>
      <h1 class="experience__title">剪辑作品</h1>
      <!-- <p class="experience__subtitle">
        一线拍摄与后期剪辑包装成片。
      </p> -->
      <span class="experience__bar" aria-hidden="true" />
    </header>

    <div class="cut-grid">
      <figure
        v-for="c in cuts"
        :key="c.id"
        :data-vid="c.id"
        :ref="(el) => observeMedia(el)"
        data-reveal
        class="cut-card"
        @click="openWork(c)"
      >
        <div class="cut-card__media">
          <video
            :ref="(el) => setVideoRef(c.id, el)"
            :src="c.preload ? c.src : undefined"
            :preload="c.preload ?? 'none'"
            crossorigin="anonymous"
            muted
            playsinline
            @loadedmetadata="onVideoMeta(c.id, $event)"
            @loadeddata="onVideoFrame(c.id, $event)"
          />
          <img
            v-if="c.cover"
            class="cut-card__cover"
            :src="c.cover"
            :alt="c.title"
            loading="lazy"
          />
          <span class="cut-card__play">
            <Icon name="mdi:play" :size="30" />
          </span>
          <span v-if="c.duration" class="cut-card__dur">{{ c.duration }}</span>
        </div>
        <figcaption class="cut-card__meta">
          <span class="cut-card__plat">{{ c.platform }}</span>
          <h3 class="cut-card__title">{{ c.title }}</h3>
        </figcaption>
      </figure>
    </div>
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

  <!-- AIGC 作品灯箱：视频播放 / 静态图放大 -->
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="active"
        class="lightbox lightbox--video"
        role="dialog"
        aria-modal="true"
        :aria-label="active.title"
        @click.self="active = null"
      >
        <button
          type="button"
          class="lightbox__close"
          aria-label="关闭"
          @click="active = null"
        >
          <Icon name="mdi:close" :size="22" />
        </button>
        <figure class="lightbox__frame lightbox__frame--video">
          <video
            v-if="active.kind !== 'image'"
            :src="active.src"
            class="lightbox__video"
            controls
            autoplay
            playsinline
          />
          <img
            v-else
            :src="active.src"
            :alt="active.title"
            class="lightbox__video lightbox__still"
          />
          <figcaption class="lightbox__foot">
            <span class="lightbox__name">{{ active.title }}</span>
            <span class="lightbox__link">{{ active.platform }}</span>
          </figcaption>
        </figure>
      </div>
    </Transition>
  </Teleport>
</template>
