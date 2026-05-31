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
