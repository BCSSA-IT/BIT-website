<template>
  <!-- Decorative drifting tetrahedra behind every non-home page -->
  <BgTetrahedra v-if="!frontmatter.bit3d" />
  <DefaultTheme.Layout>
    <template v-if="frontmatter.bit3d" #home-hero-before>
      <BitHome />
    </template>
    <template #layout-bottom>
      <SiteFooter v-if="!frontmatter.bit3d" />
    </template>
    <template #not-found>
      <NotFound404 />
    </template>
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { provide, nextTick, onMounted, onUnmounted } from 'vue'
import BitHome from './components/BitHome.vue'
import BgTetrahedra from './components/BgTetrahedra.vue'
import SiteFooter from './components/SiteFooter.vue'
import NotFound404 from './NotFound.vue'

const { frontmatter, isDark } = useData()

// 🥚 Konami 秘籍：↑↑↓↓←→←→ B A → Go Bears!
const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
]
let konamiPos = 0

function onKonamiKey(e: KeyboardEvent) {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
  konamiPos = k === KONAMI[konamiPos] ? konamiPos + 1 : (k === KONAMI[0] ? 1 : 0)
  if (konamiPos === KONAMI.length) {
    konamiPos = 0
    goBears()
  }
}

function goBears() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const layer = document.createElement('div')
  layer.style.cssText =
    'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;'

  const flash = document.createElement('div')
  flash.textContent = 'GO BEARS 🐻 · FIAT LUX ✨'
  flash.style.cssText =
    'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
    'font-size:clamp(28px,7vw,64px);font-weight:800;white-space:nowrap;' +
    'color:#003262;text-shadow:0 2px 0 #FDB515,0 0 24px rgba(253,181,21,.6);'
  layer.appendChild(flash)
  document.body.appendChild(layer)
  flash.animate(
    [{ opacity: 0, transform: 'translate(-50%,-50%) scale(.7)' },
     { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
     { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
     { opacity: 0, transform: 'translate(-50%,-50%) scale(1.1)' }],
    { duration: 2600, easing: 'ease-out', fill: 'forwards' },   // 保持末帧(透明)，别回弹露馅
  )

  if (!reduce) {
    const bits = ['🐻', '✨', '🐻', '💙', '💛']
    const colors = ['#003262', '#FDB515']
    for (let i = 0; i < 80; i++) {
      const p = document.createElement('div')
      const emoji = Math.random() < 0.5
      p.textContent = emoji ? bits[(Math.random() * bits.length) | 0] : ''
      p.style.cssText =
        `position:absolute;top:-40px;left:${Math.random() * 100}%;` +
        (emoji
          ? 'font-size:' + (16 + Math.random() * 20) + 'px;'
          : `width:10px;height:10px;border-radius:2px;background:${colors[(Math.random() * 2) | 0]};`)
      layer.appendChild(p)
      p.animate(
        [{ transform: `translateY(0) rotate(0deg)`, opacity: 1 },
         { transform: `translateY(${window.innerHeight + 80}px) rotate(${(Math.random() * 720 - 360) | 0}deg)`, opacity: 1 }],
        { duration: 2200 + Math.random() * 1400, easing: 'cubic-bezier(.3,.6,.5,1)', delay: Math.random() * 500, fill: 'forwards' },  // 停在屏外，别回弹到顶部
      )
    }
  }

  setTimeout(() => layer.remove(), 4200)
}

onMounted(() => window.addEventListener('keydown', onKonamiKey))
onUnmounted(() => window.removeEventListener('keydown', onKonamiKey))

// Animated day ⇄ night toggle: a circular reveal expanding from the switch.
// Falls back to an instant toggle when the View Transitions API is unavailable
// or the user prefers reduced motion.
const enableTransitions = () =>
  typeof document !== 'undefined' &&
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  await (document as any).startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  // Grow the *incoming* theme as a circle on top of the outgoing one. It fully
  // covers the viewport before teardown, so the handoff is seamless — no flash.
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: 420,
      easing: 'ease-out',
      pseudoElement: '::view-transition-new(root)',
    },
  )
})
</script>
