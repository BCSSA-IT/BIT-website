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
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { provide, nextTick } from 'vue'
import BitHome from './components/BitHome.vue'
import BgTetrahedra from './components/BgTetrahedra.vue'
import SiteFooter from './components/SiteFooter.vue'

const { frontmatter, isDark } = useData()

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

  // Mark the root so the theme-toggle CSS (custom clip, no default fade) applies.
  // Page-navigation transitions keep the default crossfade.
  const root = document.documentElement
  root.classList.add('vt-theme')

  const transition = (document as any).startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  try {
    await transition.ready
    // Grow the *incoming* theme as a circle on top of the outgoing one. It fully
    // covers the viewport before teardown, so the handoff is seamless — no flash.
    await root.animate(
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
    ).finished
  } finally {
    root.classList.remove('vt-theme')
  }
})
</script>
