// ============================================================
// GSAP 插件：注册并注入 gsap / ScrollTrigger
// 组件中通过 const { $gsap, $ScrollTrigger } = useNuxtApp() 使用，
// 或直接用 useSectionReveal() 完成滚动渐入。
// ============================================================
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
