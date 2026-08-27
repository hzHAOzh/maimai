<script setup lang="ts">
// ============================================================
// SkillCard —— 技能卡片
//
// 特性：鼠标悬停时切换对应 IP 表情（序列帧逐帧播放）。
// 插槽：
//   #media  —— 自定义 IP 序列帧/动图展示区（默认使用 ipFrames 序列帧播放）
//   #footer —— 卡片底部自定义内容
// 事件：@hover(hovering) / @select(title)
// ============================================================

const props = withDefaults(defineProps<{
  /** 技能名 */
  title: string
  /** 描述 */
  description?: string
  /** 熟练度 0-100（0 表示不展示进度条） */
  level?: number
  /** iconify 图标名（无序列帧时的兜底图标） */
  icon?: string
  /** IP 表情序列帧图片地址数组（悬停时按序循环播放） */
  ipFrames?: string[]
  /** 序列帧播放帧间隔（毫秒/帧） */
  frameInterval?: number
}>(), {
  description: '',
  level: 0,
  icon: 'mdi:star',
  ipFrames: () => [],
  frameInterval: 90,
})

const emit = defineEmits<{
  (e: 'hover', hovering: boolean): void
  (e: 'select', title: string): void
}>()

const hovering = ref(false)
const frameIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function onEnter() {
  hovering.value = true
  emit('hover', true)
  frameIndex.value = 0
  if (props.ipFrames.length > 1) {
    timer = setInterval(() => {
      frameIndex.value = (frameIndex.value + 1) % props.ipFrames.length
    }, props.frameInterval)
  }
}

function onLeave() {
  hovering.value = false
  emit('hover', false)
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  frameIndex.value = 0
}

onUnmounted(() => { if (timer) clearInterval(timer) })

// 当前应显示的帧
const currentFrame = computed(() => props.ipFrames[frameIndex.value] ?? props.ipFrames[0] ?? '')
</script>

<template>
  <article
    class="card card--hover skill-card"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @click="emit('select', title)"
  >
    <!-- 媒体区：默认序列帧播放，可用 #media 插槽替换 -->
    <div class="skill-card__media">
      <slot name="media" :hovering="hovering" :frame="currentFrame">
        <!-- 默认：序列帧图片 / 图标兜底 -->
        <img
          v-if="currentFrame"
          :src="currentFrame"
          class="skill-card__frame"
          alt=""
          loading="lazy"
        />
        <span v-else class="skill-card__icon">
          <Icon :name="icon" :size="48" />
        </span>
      </slot>
    </div>

    <h3 class="skill-card__title">{{ title }}</h3>
    <p v-if="description" class="skill-card__desc">{{ description }}</p>

    <!-- 熟练度进度条 -->
    <div v-if="level > 0" class="progress skill-card__progress">
      <div class="progress__bar" :style="{ width: `${level}%` }" />
    </div>

    <slot name="footer" />
  </article>
</template>
