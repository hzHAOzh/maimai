<script setup lang="ts">
// ============================================================
// HeroBanner —— 首页 3D-IP 视频容器
//
// 职责：
//   1. 懒加载：进入视口前不加载视频（IntersectionObserver）
//   2. 自动播放透明背景 WebM 开屏动画（muted + loop + playsinline）
//   3. 鼠标悬浮 → 切换为「挥手」视频
//   4. 滚出视口 → 暂停（省性能）
//
// 所有视频路径通过 props 注入（父组件用 runtimeConfig 传），替换素材无需改本组件。
// 事件钩子：@play / @pause / @hover / @ready / @error
// ============================================================

const props = withDefaults(defineProps<{
  /** 开屏/待机视频地址 */
  src?: string
  /** 鼠标悬浮时切换的挥手视频地址（可选，不传则悬浮不切视频） */
  waveSrc?: string
  /** 视频封面（可选） */
  poster?: string
  /** 是否自动播放 */
  autoplay?: boolean
  /** 视频容器宽高比 */
  aspectRatio?: string
  /** 标题（可选） */
  title?: string
  /** 副标题（可选） */
  subtitle?: string
}>(), {
  src: '/media/ip/hero-intro.webm',
  waveSrc: '/media/ip/hero-wave.webm',
  poster: '',
  autoplay: true,
  aspectRatio: '16 / 10',
  title: '',
  subtitle: '',
})

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'hover', hovering: boolean): void
  (e: 'ready'): void
  (e: 'error'): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

// 当前播放模式：idle(待机) / wave(挥手)
const mode = ref<'idle' | 'wave'>('idle')
const currentSrc = computed(() =>
  mode.value === 'wave' && props.waveSrc ? props.waveSrc : props.src,
)

const hovering = ref(false)
const failed = ref(false)

// —— 懒加载 + 视口控制 ——
const shouldLoad = ref(false) // 进入视口附近才真正加载视频
const inView = ref(false)

let observer: IntersectionObserver | null = null

async function tryPlay() {
  const v = videoRef.value
  if (!v || !props.autoplay) return
  try {
    v.muted = true // 自动播放必须静音
    await v.play()
    emit('play')
  } catch {
    // 部分浏览器要求用户先交互：等待首次指针事件后重试
    const retry = () => {
      v.play().catch(() => {})
      emit('play')
      window.removeEventListener('pointerdown', retry)
    }
    window.addEventListener('pointerdown', retry, { once: true })
  }
}

function onLoaded() {
  emit('ready')
  if (inView.value) tryPlay()
}

function onError() {
  failed.value = true
  emit('error')
}

// 悬浮切换挥手动画
function onEnter() {
  hovering.value = true
  emit('hover', true)
  if (props.waveSrc) {
    mode.value = 'wave'
    nextTick(() => videoRef.value?.play().catch(() => {}))
  }
}
function onLeave() {
  hovering.value = false
  emit('hover', false)
  mode.value = 'idle'
  nextTick(() => videoRef.value?.play().catch(() => {}))
}

onMounted(() => {
  if (!containerRef.value) return
  observer = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (!e) return
      if (e.isIntersecting) {
        shouldLoad.value = true // 懒加载：首次进入视口附近才加载 src
        inView.value = true
        nextTick(() => { if (videoRef.value?.readyState >= 2) tryPlay() })
      } else {
        inView.value = false
        videoRef.value?.pause()
        emit('pause')
      }
    },
    { rootMargin: '200px 0px', threshold: 0 },
  )
  observer.observe(containerRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="containerRef" class="hero">
    <div
      class="hero__frame"
      :style="{ aspectRatio }"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <!-- 透明背景 WebM 视频（懒加载：shouldLoad 前不设置 src；key 绑定切换时强制重建） -->
      <video
        v-if="shouldLoad"
        :key="currentSrc"
        ref="videoRef"
        :src="currentSrc"
        :poster="poster"
        muted
        playsinline
        preload="auto"
        class="hero__video"
        @loadeddata="onLoaded"
        @error="onError"
      />

      <!-- 加载失败 / 未提供素材时的兜底占位 -->
      <div v-if="!shouldLoad || failed" class="hero__placeholder">
        <div class="hero__placeholder-inner">
          <Icon name="mdi:video-outline" :size="40" />
          <p>将 hero-intro.webm 放入 public/media/ip/</p>
        </div>
      </div>

      <!-- 悬浮交互提示标签 -->
      <div class="hero__badge" :style="{ opacity: hovering ? 1 : 0 }">
        挥手交互 👋
      </div>
    </div>

    <!-- 说明文字 -->
    <div v-if="title || subtitle" class="hero__content">
      <h1 v-if="title" class="page-title">{{ title }}</h1>
      <p v-if="subtitle" class="hero__subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>
