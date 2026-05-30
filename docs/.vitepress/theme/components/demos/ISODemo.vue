<template>
  <div class="iso-demo">
    <div class="iso-demo__preview">
      <canvas ref="canvasEl" :width="W" :height="H" class="iso-demo__canvas" />
    </div>

    <div class="iso-demo__controls">
      <!-- Rotary knob -->
      <div class="iso-demo__knob-wrap">
        <svg
          :width="KNOB_SIZE"
          :height="KNOB_SIZE"
          :viewBox="`0 0 ${KNOB_SIZE} ${KNOB_SIZE}`"
          class="iso-demo__knob-svg"
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
          <!-- Track arc filled (progress) -->
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

          <!-- Tick marks + labels for each ISO stop -->
          <g v-for="(iso, i) in isoStops" :key="iso">
            <line
              :x1="tickInner(i).x" :y1="tickInner(i).y"
              :x2="tickOuter(i).x" :y2="tickOuter(i).y"
              :stroke="i === isoIdx ? 'var(--vp-c-brand-1)' : 'var(--vp-c-divider)'"
              stroke-width="2"
              stroke-linecap="round"
            />
            <text
              :x="tickLabel(i).x" :y="tickLabel(i).y"
              text-anchor="middle" dominant-baseline="middle"
              :fill="i === isoIdx ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'"
              :font-weight="i === isoIdx ? '600' : '400'"
              font-size="9.5"
              style="cursor:pointer; user-select:none"
              @click.stop="isoIdx = i"
            >{{ iso }}</text>
          </g>

          <!-- Knob body -->
          <circle
            :cx="KC" :cy="KC" :r="KNOB_R"
            fill="var(--vp-c-bg-soft)"
            stroke="var(--vp-c-divider)"
            stroke-width="1.5"
            style="cursor:grab"
          />

          <!-- Pointer line -->
          <line
            :x1="KC" :y1="KC"
            :x2="pointerTip.x" :y2="pointerTip.y"
            stroke="var(--vp-c-brand-1)"
            stroke-width="2.5"
            stroke-linecap="round"
          />

          <!-- Center dot -->
          <circle :cx="KC" :cy="KC" r="3" fill="var(--vp-c-brand-1)" />

          <!-- ISO value label in center -->
          <text
            :x="KC" :y="KC + KNOB_R * 0.42"
            text-anchor="middle" dominant-baseline="middle"
            fill="var(--vp-c-text-1)"
            font-size="13"
            font-weight="600"
            style="user-select:none"
          >{{ isoStops[isoIdx] }}</text>
          <text
            :x="KC" :y="KC + KNOB_R * 0.42 + 15"
            text-anchor="middle" dominant-baseline="middle"
            fill="var(--vp-c-text-3)"
            font-size="8.5"
            style="user-select:none"
          >ISO</text>
        </svg>
      </div>
    </div>

    <p class="iso-demo__desc">{{ descMap[isoStops[isoIdx]] }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ── Canvas ──────────────────────────────────────────
const W = 640
const H = 240

const canvasEl = ref<HTMLCanvasElement>()

let baseData: ImageData | null = null
let rafId = 0
let lastTime = 0
const FPS = 15

// ── ISO data ─────────────────────────────────────────
const isoStops = [100, 200, 400, 800, 1600, 3200, 6400]
const isoIdx   = ref(0)

const descMap: Record<number, string> = {
  100:  '画质纯净，噪点几乎不可见。适合室外晴天等光线充足的场景。',
  200:  '极低噪点，与 ISO 100 差异微小，日常使用无感知。',
  400:  '暗部开始出现轻微亮度噪点，整体画质仍然干净。',
  800:  '暗部噪点可见，以亮度噪点（颗粒感）为主，整体仍可接受。',
  1600: '全区域噪点明显，暗部开始出现色彩噪点（彩色色斑）。',
  3200: '明显噪点与色斑，暗部细节损失较大，建议后期降噪处理。',
  6400: '严重噪点，仅在极端弱光下迫不得已使用，画质损失显著。',
}

// ── Knob geometry ────────────────────────────────────
const KNOB_SIZE = 180      // SVG viewport size
const KC        = KNOB_SIZE / 2   // center
const TRACK_R   = 72       // track arc radius
const KNOB_R    = 44       // inner knob circle radius
const TICK_IN   = TRACK_R - 8
const TICK_OUT  = TRACK_R + 2
const LABEL_R   = TRACK_R + 16

// 270° arc: starts at -135° (-3π/4) going clockwise to +135°
const START_DEG = -135
const TOTAL_DEG = 270
const DEG_PER_STEP = TOTAL_DEG / (isoStops.length - 1)  // 45°

const FULL_CIRC = 2 * Math.PI * TRACK_R
const ARC_LEN   = (TOTAL_DEG / 360) * FULL_CIRC
// Arc starts at 225° from SVG 0° (east). We use transform="rotate(225, cx, cy)" on the circles
// so stroke naturally starts there; no dashoffset needed.

function degToRad(d: number) { return d * Math.PI / 180 }

// Angle for ISO index i, measured from SVG "right" (0°), clockwise positive
// Our -135° from top = 90° + 135° = 225° from SVG 0°
function angleForIdx(i: number): number {
  return 225 + i * DEG_PER_STEP  // degrees from SVG 0
}

function polar(r: number, angleDeg: number) {
  const a = degToRad(angleDeg)
  return { x: KC + r * Math.cos(a), y: KC + r * Math.sin(a) }
}

const filledArcLen = computed(() =>
  (isoIdx.value / (isoStops.length - 1)) * ARC_LEN
)

const pointerTip = computed(() => polar(KNOB_R - 10, angleForIdx(isoIdx.value)))

function tickInner(i: number) { return polar(TICK_IN,  angleForIdx(i)) }
function tickOuter(i: number) { return polar(TICK_OUT, angleForIdx(i)) }
function tickLabel(i: number) { return polar(LABEL_R,  angleForIdx(i)) }

// ── Knob interaction ─────────────────────────────────
let dragging = false

function angleFromEvent(e: MouseEvent | Touch, svgEl: SVGElement): number {
  const rect = svgEl.getBoundingClientRect()
  const scaleX = KNOB_SIZE / rect.width
  const scaleY = KNOB_SIZE / rect.height
  const x = (e.clientX - rect.left) * scaleX - KC
  const y = (e.clientY - rect.top)  * scaleY - KC
  // Angle from SVG 0° (right), clockwise
  let deg = Math.atan2(y, x) * 180 / Math.PI
  if (deg < 0) deg += 360
  return deg
}

function svgAngleToIsoIdx(svgDeg: number): number {
  // Map SVG angle → arc position (-135° to +135° from top = 225° to 135° SVG)
  // arc occupies 225° → 225° + 270° = 495° (mod 360 = 135°)
  // Normalise svgDeg relative to start (225°) within the 270° arc
  let rel = svgDeg - 225
  if (rel < 0) rel += 360
  if (rel > TOTAL_DEG) rel = rel > TOTAL_DEG + 45 ? 0 : TOTAL_DEG  // snap ends
  const idx = Math.round(rel / DEG_PER_STEP)
  return Math.max(0, Math.min(isoStops.length - 1, idx))
}

function onKnobMouseDown(e: MouseEvent) {
  dragging = true
  const svg = (e.currentTarget as SVGElement)
  const onMove = (ev: MouseEvent) => {
    if (!dragging) return
    isoIdx.value = svgAngleToIsoIdx(angleFromEvent(ev, svg))
  }
  const onUp = () => { dragging = false; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  isoIdx.value = svgAngleToIsoIdx(angleFromEvent(e, svg))
}

function onKnobTouchStart(e: TouchEvent) {
  const svg = e.currentTarget as SVGElement
  const onMove = (ev: TouchEvent) => {
    isoIdx.value = svgAngleToIsoIdx(angleFromEvent(ev.touches[0], svg))
  }
  const onEnd = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
  window.addEventListener('touchmove', onMove, { passive: false })
  window.addEventListener('touchend', onEnd)
  isoIdx.value = svgAngleToIsoIdx(angleFromEvent(e.touches[0], svg))
}

// ── Canvas rendering ─────────────────────────────────
function drawBase(ctx: CanvasRenderingContext2D) {
  const hGrad = ctx.createLinearGradient(0, 0, W, 0)
  hGrad.addColorStop(0,    '#bfccd8')
  hGrad.addColorStop(0.35, '#6e7c88')
  hGrad.addColorStop(0.62, '#313b44')
  hGrad.addColorStop(1,    '#0b0d10')
  ctx.fillStyle = hGrad
  ctx.fillRect(0, 0, W, H)

  const vGrad = ctx.createLinearGradient(0, 0, 0, H)
  vGrad.addColorStop(0,   'rgba(0,0,0,0.18)')
  vGrad.addColorStop(0.4, 'rgba(0,0,0,0)')
  vGrad.addColorStop(0.6, 'rgba(0,0,0,0)')
  vGrad.addColorStop(1,   'rgba(0,0,0,0.30)')
  ctx.fillStyle = vGrad
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = 'rgba(6, 8, 10, 0.92)'
  const bx = W * 0.46
  const buildings: [number, number, number, number][] = [
    [bx,              H * 0.20, W * 0.07, H * 0.80],
    [bx + W * 0.09,   H * 0.08, W * 0.06, H * 0.92],
    [bx + W * 0.17,   H * 0.30, W * 0.08, H * 0.70],
    [bx + W * 0.27,   H * 0.14, W * 0.07, H * 0.86],
    [bx + W * 0.36,   H * 0.35, W * 0.10, H * 0.65],
    [bx + W * 0.48,   H * 0.11, W * 0.08, H * 0.89],
  ]
  buildings.forEach(([x, y, w, h]) => ctx.fillRect(x, y, w, h))

  ctx.fillStyle = 'rgba(255, 210, 90, 0.80)'
  const lights: [number, number][] = [
    [bx + 10,              H * 0.38],
    [bx + 20,              H * 0.54],
    [bx + W * 0.09 + 8,   H * 0.24],
    [bx + W * 0.09 + 18,  H * 0.40],
    [bx + W * 0.27 + 10,  H * 0.28],
    [bx + W * 0.48 + 12,  H * 0.22],
    [bx + W * 0.48 + 22,  H * 0.38],
  ]
  lights.forEach(([x, y]) => ctx.fillRect(x, y, 5, 4))

  drawZoneLabels(ctx)
}

function drawZoneLabels(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgba(0,0,0,0.28)'
  ctx.fillRect(0, H - 22, W, 22)
  ctx.font = '11px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.fillText('亮部', W * 0.13, H - 7)
  ctx.fillText('中间调', W * 0.44, H - 7)
  ctx.fillText('暗部', W * 0.78, H - 7)
}

function renderFrame(iso: number) {
  const canvas = canvasEl.value
  if (!canvas || !baseData) return
  const ctx = canvas.getContext('2d')!
  ctx.putImageData(baseData, 0, 0)

  if (iso > 100) {
    const id = ctx.getImageData(0, 0, W, H)
    const d  = id.data
    const luma   = Math.log2(iso / 100) * 9
    const chroma = Math.max(0, Math.log2(iso / 800) * 7)
    const brightnessFactor = Math.pow(iso / 100, 0.28)
    for (let i = 0; i < d.length; i += 4) {
      const n  = (Math.random() - 0.5) * luma * 2
      const br = Math.min(255, d[i]     * brightnessFactor)
      const bg = Math.min(255, d[i + 1] * brightnessFactor)
      const bb = Math.min(255, d[i + 2] * brightnessFactor)
      d[i]     = Math.max(0, Math.min(255, br + n + (Math.random() - 0.5) * chroma))
      d[i + 1] = Math.max(0, Math.min(255, bg + n + (Math.random() - 0.5) * chroma))
      d[i + 2] = Math.max(0, Math.min(255, bb + n + (Math.random() - 0.5) * chroma * 1.3))
    }
    ctx.putImageData(id, 0, 0)
  }
  drawZoneLabels(ctx)
}

function loop(ts: number) {
  rafId = requestAnimationFrame(loop)
  if (ts - lastTime < 1000 / FPS) return
  lastTime = ts
  renderFrame(isoStops[isoIdx.value])
}

onMounted(() => {
  const canvas = canvasEl.value!
  const ctx = canvas.getContext('2d')!
  drawBase(ctx)
  baseData = ctx.getImageData(0, 0, W, H)
  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.iso-demo {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.iso-demo__canvas {
  display: block;
  width: 100%;
  height: auto;
}

.iso-demo__controls {
  display: flex;
  justify-content: center;
  padding: 16px 0 8px;
}

.iso-demo__knob-svg {
  cursor: grab;
  touch-action: none;
  user-select: none;
}

.iso-demo__knob-svg:active {
  cursor: grabbing;
}

.iso-demo__desc {
  margin: 0;
  padding: 10px 18px 14px;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  line-height: 1.6;
  text-align: center;
}
</style>
