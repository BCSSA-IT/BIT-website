<template>
  <div class="shutter-demo">
    <div class="shutter-demo__preview">
      <canvas ref="canvasEl" :width="W" :height="H" class="shutter-demo__canvas" />
    </div>

    <div class="shutter-demo__controls">
      <div class="shutter-demo__knob-wrap">
        <svg
          :width="KNOB_SIZE"
          :height="KNOB_SIZE"
          :viewBox="`0 0 ${KNOB_SIZE} ${KNOB_SIZE}`"
          class="shutter-demo__knob-svg"
          @mousedown="onKnobMouseDown"
          @touchstart.prevent="onKnobTouchStart"
        >
          <!-- Track arc background -->
          <circle
            :cx="KC" :cy="KC" :r="TRACK_R"
            fill="none"
            stroke="var(--vp-c-divider)"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="`${ARC_LEN} ${FULL_CIRC - ARC_LEN}`"
            stroke-dashoffset="0"
            :transform="`rotate(225, ${KC}, ${KC})`"
          />
          <!-- Track arc filled -->
          <circle
            :cx="KC" :cy="KC" :r="TRACK_R"
            fill="none"
            stroke="var(--vp-c-brand-1)"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="`${filledArcLen} ${FULL_CIRC}`"
            stroke-dashoffset="0"
            :transform="`rotate(225, ${KC}, ${KC})`"
          />

          <!-- Ticks + labels -->
          <g v-for="(_, i) in shutterLabels" :key="i">
            <line
              :x1="tickInner(i).x" :y1="tickInner(i).y"
              :x2="tickOuter(i).x" :y2="tickOuter(i).y"
              :stroke="i === shutterIdx ? 'var(--vp-c-brand-1)' : 'var(--vp-c-divider)'"
              stroke-width="2" stroke-linecap="round"
            />
            <text
              :x="tickLabel(i).x" :y="tickLabel(i).y"
              text-anchor="middle" dominant-baseline="middle"
              :fill="i === shutterIdx ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              :font-weight="i === shutterIdx ? '600' : '400'"
              font-size="8"
              style="cursor:pointer; user-select:none"
              @click.stop="setIdx(i)"
            >{{ shutterDenoms[i] }}</text>
          </g>

          <!-- Knob body -->
          <circle
            :cx="KC" :cy="KC" :r="KNOB_R"
            fill="var(--vp-c-bg-soft)"
            stroke="var(--vp-c-divider)"
            stroke-width="1.5"
            style="cursor:grab"
          />
          <!-- Pointer -->
          <line
            :x1="KC" :y1="KC"
            :x2="pointerTip.x" :y2="pointerTip.y"
            stroke="var(--vp-c-brand-1)"
            stroke-width="2.5" stroke-linecap="round"
          />
          <circle :cx="KC" :cy="KC" r="3" fill="var(--vp-c-brand-1)" />

          <!-- Center label -->
          <text
            :x="KC" :y="KC + KNOB_R * 0.30"
            text-anchor="middle" dominant-baseline="middle"
            fill="var(--vp-c-text-1)"
            font-size="11" font-weight="600"
            style="user-select:none"
          >{{ shutterLabels[shutterIdx] }}</text>
          <text
            :x="KC" :y="KC + KNOB_R * 0.30 + 14"
            text-anchor="middle" dominant-baseline="middle"
            fill="var(--vp-c-text-3)"
            font-size="8.5"
            style="user-select:none"
          >秒</text>
        </svg>
      </div>
    </div>

    <p class="shutter-demo__desc">{{ descMap[shutterLabels[shutterIdx]] }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const W = 640
const H = 240

const canvasEl = ref<HTMLCanvasElement>()

// ── Shutter data ─────────────────────────────────────────
const shutterLabels = ['1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15', '1/8']
const shutterDenoms = ['1000',   '500',   '250',   '125',   '60',   '30',   '15',   '8']
const shutterValues = [1/1000,   1/500,   1/250,   1/125,   1/60,   1/30,   1/15,   1/8]
const shutterIdx    = ref(4)  // default 1/60

function setIdx(i: number) {
  shutterIdx.value = i
}

const descMap: Record<string, string> = {
  '1/1000': '极高速快门，飞碟完全凝固，边缘锐利。夜间曝光严重不足，画面接近全黑。',
  '1/500':  '高速快门，运动清晰，暗部几乎不可见，需要强补光才能正常曝光。',
  '1/250':  '轻微运动模糊，曝光仍偏暗，适合光线较好环境中抓拍运动主体。',
  '1/125':  '运动有轻微拖尾，曝光偏暗，夜间需搭配大光圈或高 ISO 使用。',
  '1/60':   '可见运动模糊，曝光接近合理。手持时注意防抖，建议开启 IBIS。',
  '1/30':   '明显运动拖影，夜间曝光基本正常。静止场景清晰，运动主体模糊。',
  '1/15':   '强烈运动模糊，场景明亮，飞碟轨迹拉长，需三脚架拍摄静止主体。',
  '1/8':    '极长拖影，飞碟轨迹贯穿画面，场景趋于过曝，适合刻意的创意光绘效果。',
}

// ── Knob geometry ─────────────────────────────────────────
const KNOB_SIZE = 180
const KC        = KNOB_SIZE / 2
const TRACK_R   = 72
const KNOB_R    = 44
const TICK_IN   = TRACK_R - 8
const TICK_OUT  = TRACK_R + 2
const LABEL_R   = TRACK_R + 16

const TOTAL_DEG    = 270
const DEG_PER_STEP = TOTAL_DEG / (shutterLabels.length - 1)  // ≈38.57°

const FULL_CIRC = 2 * Math.PI * TRACK_R
const ARC_LEN   = (TOTAL_DEG / 360) * FULL_CIRC

function degToRad(d: number) { return d * Math.PI / 180 }
function angleForIdx(i: number) { return 225 + i * DEG_PER_STEP }
function polar(r: number, angleDeg: number) {
  const a = degToRad(angleDeg)
  return { x: KC + r * Math.cos(a), y: KC + r * Math.sin(a) }
}

const filledArcLen = computed(() =>
  (shutterIdx.value / (shutterLabels.length - 1)) * ARC_LEN
)
const pointerTip = computed(() => polar(KNOB_R - 10, angleForIdx(shutterIdx.value)))

function tickInner(i: number) { return polar(TICK_IN,  angleForIdx(i)) }
function tickOuter(i: number) { return polar(TICK_OUT, angleForIdx(i)) }
function tickLabel(i: number) { return polar(LABEL_R,  angleForIdx(i)) }

// ── Knob interaction ─────────────────────────────────────
function angleFromEvent(e: MouseEvent | Touch, svgEl: SVGElement): number {
  const rect  = svgEl.getBoundingClientRect()
  const scaleX = KNOB_SIZE / rect.width
  const scaleY = KNOB_SIZE / rect.height
  const x = (e.clientX - rect.left) * scaleX - KC
  const y = (e.clientY - rect.top)  * scaleY - KC
  let deg = Math.atan2(y, x) * 180 / Math.PI
  if (deg < 0) deg += 360
  return deg
}

function svgAngleToIdx(svgDeg: number): number {
  let rel = svgDeg - 225
  if (rel < 0) rel += 360
  if (rel > TOTAL_DEG) rel = rel > TOTAL_DEG + DEG_PER_STEP / 2 ? 0 : TOTAL_DEG
  return Math.max(0, Math.min(shutterLabels.length - 1, Math.round(rel / DEG_PER_STEP)))
}

function onKnobMouseDown(e: MouseEvent) {
  const svg = e.currentTarget as SVGElement
  const onMove = (ev: MouseEvent) => { shutterIdx.value = svgAngleToIdx(angleFromEvent(ev, svg)) }
  const onUp   = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  shutterIdx.value = svgAngleToIdx(angleFromEvent(e, svg))
}

function onKnobTouchStart(e: TouchEvent) {
  const svg = e.currentTarget as SVGElement
  const onMove = (ev: TouchEvent) => { shutterIdx.value = svgAngleToIdx(angleFromEvent(ev.touches[0], svg)) }
  const onEnd  = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
  window.addEventListener('touchmove', onMove, { passive: false })
  window.addEventListener('touchend', onEnd)
  shutterIdx.value = svgAngleToIdx(angleFromEvent(e.touches[0], svg))
}

// ── Scene ─────────────────────────────────────────────────
interface Star { x: number; y: number; r: number; a: number }
const stars: Star[] = []

// ── UFO ───────────────────────────────────────────────────
const UFO_SPEED  = 400   // px/s
const UFO_BASE_Y = H * 0.38

let ufoX   = W * 0.3
let ufoDir = 1

function drawUFO(ctx: CanvasRenderingContext2D, x: number, y: number, alpha: number) {
  ctx.save()
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
  ctx.translate(x, y)

  // Ambient glow
  const glow = ctx.createRadialGradient(0, 2, 4, 0, 2, 46)
  glow.addColorStop(0, 'rgba(80, 255, 140, 0.30)')
  glow.addColorStop(1, 'rgba(80, 255, 140, 0)')
  ctx.beginPath()
  ctx.ellipse(0, 2, 46, 28, 0, 0, Math.PI * 2)
  ctx.fillStyle = glow
  ctx.fill()

  // Tractor beam
  ctx.beginPath()
  ctx.moveTo(-9, 8)
  ctx.lineTo(-30, 58)
  ctx.lineTo(30, 58)
  ctx.lineTo(9, 8)
  ctx.closePath()
  const beam = ctx.createLinearGradient(0, 8, 0, 58)
  beam.addColorStop(0, 'rgba(140, 255, 140, 0.40)')
  beam.addColorStop(1, 'rgba(140, 255, 140, 0)')
  ctx.fillStyle = beam
  ctx.fill()

  // Main body
  ctx.beginPath()
  ctx.ellipse(0, 0, 34, 9, 0, 0, Math.PI * 2)
  ctx.fillStyle = '#8fa4ba'
  ctx.fill()

  // Metallic sheen
  const sheen = ctx.createLinearGradient(0, -9, 0, 9)
  sheen.addColorStop(0,   'rgba(220, 240, 255, 0.55)')
  sheen.addColorStop(0.4, 'rgba(200, 225, 255, 0.10)')
  sheen.addColorStop(1,   'rgba(0,   10,  30,  0.45)')
  ctx.beginPath()
  ctx.ellipse(0, 0, 34, 9, 0, 0, Math.PI * 2)
  ctx.fillStyle = sheen
  ctx.fill()
  ctx.strokeStyle = 'rgba(180, 210, 240, 0.70)'
  ctx.lineWidth = 1
  ctx.stroke()

  // Dome
  ctx.beginPath()
  ctx.ellipse(0, -2, 14, 12, 0, Math.PI, 0)
  ctx.fillStyle = 'rgba(130, 205, 255, 0.52)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(180, 235, 255, 0.55)'
  ctx.lineWidth = 0.8
  ctx.stroke()

  // Dome highlight
  ctx.beginPath()
  ctx.ellipse(-3, -8, 5, 3, -0.3, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.38)'
  ctx.fill()

  // Rim lights
  const rimColors = ['#3f3', '#ff3', '#3ff', '#f93', '#f33', '#39f']
  rimColors.forEach((color, i) => {
    const angle = (i / rimColors.length) * Math.PI * 2
    const lx    = Math.cos(angle) * 25
    const ly    = Math.sin(angle) * 6.5
    const lg    = ctx.createRadialGradient(lx, ly, 0, lx, ly, 5)
    lg.addColorStop(0, color)
    lg.addColorStop(1, color + '00')
    ctx.beginPath()
    ctx.arc(lx, ly, 5, 0, Math.PI * 2)
    ctx.fillStyle = lg
    ctx.fill()
    ctx.beginPath()
    ctx.arc(lx, ly, 2.2, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  })

  ctx.restore()
}

// ── Render ────────────────────────────────────────────────
function renderFrame(ts: number) {
  const canvas = canvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  // Sky — base color shifts with exposure so changes are unmistakable
  const expFactor = Math.pow(2, shutterIdx.value - 4)   // 1.0 at default 1/60s
  const skyBright = Math.max(5, Math.min(80, Math.round(expFactor * 8)))
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0,    `hsl(220,60%,${skyBright}%)`)
  sky.addColorStop(0.72, `hsl(215,55%,${Math.min(90, skyBright + 4)}%)`)
  sky.addColorStop(1,    `hsl(210,50%,${Math.min(95, skyBright + 8)}%)`)
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  // Moon
  ctx.beginPath()
  ctx.arc(W * 0.88, H * 0.14, 14, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 248, 220, 0.85)'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(W * 0.88 + 5, H * 0.14 - 2, 11, 0, Math.PI * 2)
  ctx.fillStyle = '#07090e'
  ctx.fill()

  // Stars
  stars.forEach(s => {
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${s.a})`
    ctx.fill()
  })

  // City silhouette
  ctx.fillStyle = 'rgba(6, 11, 20, 0.96)'
  const buildings: [number, number, number, number][] = [
    [W*0.00, H*0.70, W*0.06, H*0.30],
    [W*0.06, H*0.60, W*0.05, H*0.40],
    [W*0.11, H*0.75, W*0.07, H*0.25],
    [W*0.19, H*0.55, W*0.05, H*0.45],
    [W*0.25, H*0.65, W*0.06, H*0.35],
    [W*0.32, H*0.50, W*0.04, H*0.50],
    [W*0.37, H*0.72, W*0.08, H*0.28],
    [W*0.46, H*0.58, W*0.05, H*0.42],
    [W*0.52, H*0.68, W*0.07, H*0.32],
    [W*0.60, H*0.48, W*0.06, H*0.52],
    [W*0.67, H*0.62, W*0.05, H*0.38],
    [W*0.73, H*0.72, W*0.08, H*0.28],
    [W*0.82, H*0.56, W*0.06, H*0.44],
    [W*0.89, H*0.68, W*0.11, H*0.32],
  ]
  buildings.forEach(([x, y, w, h]) => ctx.fillRect(x, y, w, h))

  // Windows
  ctx.fillStyle = 'rgba(255, 200, 80, 0.65)'
  const wins: [number, number][] = [
    [W*0.02,H*0.73],[W*0.02,H*0.79],[W*0.08,H*0.63],[W*0.08,H*0.70],
    [W*0.21,H*0.58],[W*0.21,H*0.65],[W*0.34,H*0.53],[W*0.34,H*0.62],
    [W*0.48,H*0.61],[W*0.48,H*0.68],[W*0.62,H*0.51],[W*0.62,H*0.60],
    [W*0.69,H*0.65],[W*0.75,H*0.75],[W*0.84,H*0.60],[W*0.84,H*0.68],
    [W*0.92,H*0.71],
  ]
  wins.forEach(([x, y]) => ctx.fillRect(x, y, 4, 3))

  // ① Exposure overlay — applied to background only, before UFO
  if (expFactor < 1) {
    ctx.fillStyle = `rgba(0,0,0,${Math.min(0.92, 1 - expFactor)})`
    ctx.fillRect(0, 0, W, H)
  } else if (expFactor > 1) {
    ctx.fillStyle = `rgba(230,242,255,${Math.min(0.48, (expFactor - 1) / 9)})`
    ctx.fillRect(0, 0, W, H)
  }

  // ② UFO trail + main body — drawn AFTER exposure overlay so they stay visible
  const shutterTime = shutterValues[shutterIdx.value]
  const blurDist    = UFO_SPEED * shutterTime
  const wobble      = Math.sin(ts / 950) * 7
  const ufoY        = UFO_BASE_Y + wobble

  if (blurDist > 1.5) {
    const nSamples = Math.max(3, Math.min(32, Math.round(blurDist / 4)))
    for (let s = 0; s < nSamples - 1; s++) {
      const t  = s / (nSamples - 1)
      const bx = ufoX - blurDist * ufoDir * (1 - t)
      drawUFO(ctx, bx, ufoY, 0.65 * t)
    }
  }
  drawUFO(ctx, ufoX, ufoY, 1.0)

  // HUD strip
  ctx.fillStyle = 'rgba(0,0,0,0.32)'
  ctx.fillRect(0, H - 22, W, 22)
  ctx.font = '11px system-ui, -apple-system, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.62)'
  ctx.textAlign = 'left'
  ctx.fillText(`快门  ${shutterLabels[shutterIdx.value]}s`, 14, H - 7)
  ctx.textAlign = 'right'
  const blurPx = blurDist < 1.5 ? '< 2 px' : `~${Math.round(blurDist)} px`
  ctx.fillText(`运动拖影 ${blurPx}`, W - 14, H - 7)
}

// ── Loop ──────────────────────────────────────────────────
let rafId    = 0
let lastTime = 0
const FPS    = 30

function loop(ts: number) {
  rafId = requestAnimationFrame(loop)
  if (ts - lastTime < 1000 / FPS) return
  const dt = Math.min((ts - lastTime) / 1000, 0.05)
  lastTime = ts

  ufoX += UFO_SPEED * ufoDir * dt
  if (ufoX > W * 0.88) ufoDir = -1
  if (ufoX < W * 0.12) ufoDir =  1

  renderFrame(ts)
}

onMounted(() => {
  for (let i = 0; i < 65; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H * 0.70,
      r: Math.random() * 1.1 + 0.3,
      a: Math.random() * 0.55 + 0.30,
    })
  }
  rafId = requestAnimationFrame(loop)
  // Force immediate redraw whenever shutterIdx changes (in case RAF timing is unlucky)
  watch(shutterIdx, () => {
    renderFrame(performance.now())
  })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.shutter-demo {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.shutter-demo__canvas {
  display: block;
  width: 100%;
  height: auto;
}

.shutter-demo__controls {
  display: flex;
  justify-content: center;
  padding: 16px 0 8px;
}

.shutter-demo__knob-svg {
  cursor: grab;
  touch-action: none;
  user-select: none;
}

.shutter-demo__knob-svg:active {
  cursor: grabbing;
}

.shutter-demo__desc {
  margin: 0;
  padding: 10px 18px 14px;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  line-height: 1.6;
  text-align: center;
}
</style>
