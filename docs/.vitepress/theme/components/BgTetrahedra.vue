<template>
  <canvas ref="canvasEl" class="bg-tets" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import * as THREE from 'three'
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

const { isDark } = useData()
const canvasEl = ref<HTMLCanvasElement>()

const PALETTE = [0x1E6FD9, 0x2563EB, 0x3B82F6, 0x6366F1, 0x8B5CF6, 0x0EA5E9]

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let mat: LineMaterial
let composer: EffectComposer
let bloomPass: UnrealBloomPass
let rafId = 0
let lastTime = 0
let t = 0

interface Tet {
  mesh: LineSegments2
  base: THREE.Vector3
  phase: { x: number; y: number; z: number }
  speed: number
  rot: { x: number; y: number; z: number }
}
const tets: Tet[] = []

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function makeGeo(base: Float32Array): LineSegmentsGeometry {
  const shuffled = [...PALETTE].sort(() => Math.random() - 0.5)
  const posArr: number[] = [], colArr: number[] = []
  const c = new THREE.Color()
  for (let e = 0; e < 6; e++) {
    const i = e * 6
    posArr.push(
      base[i],     base[i + 1], base[i + 2],
      base[i + 3], base[i + 4], base[i + 5],
    )
    c.set(shuffled[e])
    colArr.push(c.r, c.g, c.b, c.r, c.g, c.b)
  }
  const geo = new LineSegmentsGeometry()
  geo.setPositions(posArr)
  geo.setColors(colArr)
  return geo
}

function init() {
  const w = window.innerWidth
  const h = window.innerHeight

  renderer = new THREE.WebGLRenderer({ canvas: canvasEl.value!, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.setClearColor(0x000000, 0)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
  camera.position.z = 9

  mat = new LineMaterial({
    vertexColors: true,
    linewidth: 1.4,
    resolution: new THREE.Vector2(w, h),
    transparent: true,
    opacity: 0.4,
  })

  // Faint dark-mode glow — kept very low so it never washes out the text.
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.28, 0.6, 0.0)
  composer.addPass(bloomPass)
  composer.addPass(new OutputPass())

  const base = (
    new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.22, 0))
  ).attributes.position.array as Float32Array

  for (let i = 0; i < 30; i++) {
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * 26,
      (Math.random() - 0.5) * 16,
      -(1 + Math.random() * 6),
    )
    const mesh = new LineSegments2(makeGeo(base), mat)
    mesh.position.copy(pos)
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    )
    mesh.frustumCulled = false
    scene.add(mesh)

    tets.push({
      mesh,
      base: pos.clone(),
      phase: { x: Math.random() * Math.PI * 2, y: Math.random() * Math.PI * 2, z: Math.random() * Math.PI * 2 },
      speed: 0.12 + Math.random() * 0.22,
      rot: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.028,
        z: (Math.random() - 0.5) * 0.012,
      },
    })
  }

  if (reducedMotion) {
    // Render a single static frame and stop — respect the user's preference.
    drawFrame(0)
    return
  }
  lastTime = performance.now()
  rafId = requestAnimationFrame(loop)
}

function drawFrame(f: number) {
  // Dark mode runs the bloom composer, so keep base lines a little dimmer to
  // offset the glow; light mode renders plain at slightly higher opacity.
  mat.opacity = isDark.value ? 0.42 : 0.36

  const AMP = 1.6
  tets.forEach(o => {
    o.mesh.position.x = o.base.x + Math.sin(t * o.speed + o.phase.x) * AMP
    o.mesh.position.y = o.base.y + Math.cos(t * o.speed * 0.8 + o.phase.y) * AMP
    o.mesh.position.z = o.base.z + Math.sin(t * o.speed * 0.5 + o.phase.z) * AMP * 0.4
    o.mesh.rotation.x += o.rot.x * f
    o.mesh.rotation.y += o.rot.y * f
    o.mesh.rotation.z += o.rot.z * f
  })

  // Dark → faint bloom glow; light → plain render (clean lines, max contrast).
  if (isDark.value) composer.render()
  else renderer.render(scene, camera)
}

function loop(now: number) {
  rafId = requestAnimationFrame(loop)
  let dt = (now - lastTime) / 1000
  lastTime = now
  if (dt > 0.1) dt = 0.1
  const f = dt * 60
  t += 0.005 * f
  drawFrame(f)
}

function onResize() {
  const w = window.innerWidth
  const h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  composer?.setSize(w, h)
  bloomPass?.setSize(w, h)
  mat.resolution.set(w, h)
}

function onVisibility() {
  if (reducedMotion) return
  if (document.hidden) {
    cancelAnimationFrame(rafId)
  } else {
    lastTime = performance.now()
    rafId = requestAnimationFrame(loop)
  }
}

onMounted(() => {
  init()
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('visibilitychange', onVisibility)
  composer?.dispose()
  renderer?.dispose()
})
</script>

<style scoped>
.bg-tets {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
