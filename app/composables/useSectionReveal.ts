// ============================================================
// useSectionReveal —— 区块进入视口时的渐入动画（基于 GSAP ScrollTrigger）
//
// 用法：在页面 <script setup> 中调用一次 useSectionReveal()，
//       然后给任意元素加上 `data-reveal` 属性即可获得滚动渐入效果。
//       （配合 gsap.ts 插件注入的全局 gsap）
// ============================================================
export function useSectionReveal() {
  const { $gsap } = useNuxtApp()

  onMounted(() => {
    const gsap = $gsap as unknown as {
      fromTo: (...args: unknown[]) => unknown
      ScrollTrigger?: unknown
    } | null
    const ScrollTrigger = (gsap as { ScrollTrigger?: unknown } | null)?.ScrollTrigger

    if (!gsap || !ScrollTrigger) return

    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true, // 只触发一次
          },
        },
      )
    })
  })
}
