// ============================================================
// useScroll —— 滚动状态
// 供「滚动触发 IP 动画切换 / 导航栏背景渐变」等场景复用。
// ============================================================
export function useScroll() {
  const y = ref(0)                        // 当前滚动距离
  const direction = ref<'up' | 'down'>('down') // 滚动方向
  const isTop = ref(true)                 // 是否在页面顶部

  let lastY = 0

  function onScroll() {
    y.value = window.scrollY
    direction.value = y.value > lastY ? 'down' : 'up'
    isTop.value = y.value < 8
    lastY = y.value
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { y, direction, isTop }
}
