import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'
import ISODemo from './components/demos/ISODemo.vue'
import ShutterDemo from './components/demos/ShutterDemo.vue'
import ApertureDemo from './components/demos/ApertureDemo.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app, router }: { app: any; router: any }) {
    app.component('ISODemo', ISODemo)
    app.component('ShutterDemo', ShutterDemo)
    app.component('ApertureDemo', ApertureDemo)

    // 🥚 控制台招新彩蛋：给打开开发者工具的人留个口信
    if (typeof window !== 'undefined') {
      const joinUrl = `${location.origin}${import.meta.env.BASE_URL}join`
      console.log(
        '%c BCSSA · 信息技术部 %c\n会按 F12 的你，正是我们要找的人 👀\n我们在招新 → %c' + joinUrl + ' ',
        'font-size:18px;font-weight:800;color:#fff;background:#003262;padding:6px 12px;border-radius:6px;',
        'font-size:13px;color:#888;line-height:1.9;',
        'font-size:13px;color:#FDB515;font-weight:700;',
      )
    }

    // Animated page-to-page navigation: replay a subtle fade-up entrance on the
    // content each time the route changes. Hooks onAfterRouteChange (the method
    // VitePress actually calls on link clicks and back/forward).
    if (typeof window !== 'undefined') {
      const prev = router.onAfterRouteChange
      router.onAfterRouteChange = (href: string) => {
        prev?.(href)
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        requestAnimationFrame(() => {
          const el = document.querySelector('.VPContent') as HTMLElement | null
          if (!el) return
          el.classList.remove('route-enter')
          void el.offsetWidth          // force reflow so the animation restarts
          el.classList.add('route-enter')
        })
      }
    }
  },
}
