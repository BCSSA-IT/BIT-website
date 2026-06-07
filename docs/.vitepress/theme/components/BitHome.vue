<template>
  <div ref="container" class="bit-home">
    <!-- ── 固定舞台：3D canvas + 叙事文案覆盖层（纯装饰，pointer-events:none） ── -->
    <div ref="stage" class="bit-home__stage">
      <canvas ref="canvas" />

      <div ref="docLabel" class="doc-label">BCSSA · 信息技术部</div>

      <!-- 四大职能：每个形态对应一段招募文案，桌面左右交替 -->
      <div ref="cameraCopy" class="phase-copy phase-copy--right">
        <span class="phase-copy__tag">PHOTO · VIDEO</span>
        <h2 class="phase-copy__headline"><span>记录每一个</span><span>高光时刻</span></h2>
        <p class="phase-copy__body">活动摄影&nbsp;&nbsp;·&nbsp;&nbsp;视频拍摄&nbsp;&nbsp;·&nbsp;&nbsp;直播导播</p>
      </div>

      <div ref="designCopy" class="phase-copy phase-copy--left">
        <span class="phase-copy__tag">DESIGN</span>
        <h2 class="phase-copy__headline"><span>用设计</span><span>传递信息</span></h2>
        <p class="phase-copy__body">海报&nbsp;&nbsp;·&nbsp;&nbsp;视觉物料&nbsp;&nbsp;·&nbsp;&nbsp;品牌视觉</p>
      </div>

      <div ref="codeCopy" class="phase-copy phase-copy--right">
        <span class="phase-copy__tag">DEV</span>
        <h2 class="phase-copy__headline"><span>搭建数字</span><span>基础设施</span></h2>
        <p class="phase-copy__body">网站开发&nbsp;&nbsp;·&nbsp;&nbsp;系统维护&nbsp;&nbsp;·&nbsp;&nbsp;自动化</p>
      </div>

      <div ref="liveCopy" class="phase-copy phase-copy--left">
        <span class="phase-copy__tag">LIVE</span>
        <h2 class="phase-copy__headline"><span>让现场</span><span>传得更远</span></h2>
        <p class="phase-copy__body">活动直播&nbsp;&nbsp;·&nbsp;&nbsp;导播&nbsp;&nbsp;·&nbsp;&nbsp;技术支持</p>
      </div>

      <div ref="fiatLuxSub" class="fiat-lux-sub">要有光</div>
    </div>

    <!-- 占位：给固定舞台撑出滚动行程（取代 body.minHeight） -->
    <div class="bit-home__spacer" :style="{ height: STORY_VH + 'vh' }" />

    <!-- ── 常规流内容区：招新宣传 ── -->
    <div ref="content" class="bit-home__content">
      <section class="home-sec home-intro">
        <p class="home-intro__eyebrow">BCSSA · INFORMATION TECHNOLOGY</p>
        <h2 class="home-intro__title">我们是 BCSSA 信息技术部</h2>
        <p class="home-intro__lead">
          用镜头、设计、代码与直播，把社团的每一次活动<strong>记录好、呈现好、传播好</strong>。
          这里既是我们的工作流文档，也是我们做过什么的橱窗。
        </p>
      </section>

      <section class="home-sec">
        <h3 class="home-sec__title">我们做什么</h3>
        <div class="home-cards">
          <div class="home-card">
            <div class="home-card__icon">📷</div>
            <div class="home-card__title">摄影摄像</div>
            <p class="home-card__desc">活动摄影、视频拍摄与直播导播，记录每一个高光时刻。</p>
            <div class="home-card__links">
              <a :href="withBase('/photography/camera')">相机使用</a>
              <a :href="withBase('/reference')">拍摄速查</a>
            </div>
          </div>

          <div class="home-card">
            <div class="home-card__icon">🎨</div>
            <div class="home-card__title">海报设计</div>
            <p class="home-card__desc">海报、视觉物料与品牌视觉，让信息既好看也好懂。</p>
            <div class="home-card__links">
              <a :href="withBase('/post/photo')">照片后期</a>
            </div>
          </div>

          <div class="home-card">
            <div class="home-card__icon">💻</div>
            <div class="home-card__title">网站开发与维护</div>
            <p class="home-card__desc">开发并维护部门的网站、工具与数字基础设施。</p>
            <div class="home-card__links">
              <a :href="withBase('/dev/projects')">计算机项目</a>
              <a :href="withBase('/dev/setup')">环境搭建</a>
            </div>
          </div>

          <div class="home-card">
            <div class="home-card__icon">📡</div>
            <div class="home-card__title">直播与活动技术</div>
            <p class="home-card__desc">活动直播、导播与现场技术支持，让现场传得更远。</p>
            <div class="home-card__links">
              <a :href="withBase('/reference')">拍摄速查</a>
            </div>
          </div>
        </div>
      </section>

      <section class="home-sec">
        <h3 class="home-sec__title">加入你能得到</h3>
        <div class="home-reasons">
          <div class="home-reason">
            <div class="home-reason__num">01</div>
            <div class="home-reason__title">学真技术</div>
            <p class="home-reason__desc">从相机到剪辑、从设计到代码，系统地把一门手艺练到能用。</p>
          </div>
          <div class="home-reason">
            <div class="home-reason__num">02</div>
            <div class="home-reason__title">做真实项目</div>
            <p class="home-reason__desc">真实活动、真实上线、真实观众，作品直接进作品集。</p>
          </div>
          <div class="home-reason">
            <div class="home-reason__num">03</div>
            <div class="home-reason__title">找到同好</div>
            <p class="home-reason__desc">一群同样热爱影像与技术的人，一起把事情做漂亮。</p>
          </div>
        </div>
      </section>

      <section id="join" class="home-sec home-cta">
        <h2 class="home-cta__title">加入 BCSSA 信息技术部</h2>
        <p class="home-cta__lead">
          无论你想拿起相机、打磨设计、写代码还是做直播 —— 这里都有你的位置。
        </p>
        <!-- TODO: 把下方链接换成真实联系方式（招新表单 / 群号 / 邮箱） -->
        <a class="home-cta__btn" href="#join">加入我们</a>
        <p class="home-cta__note">联系方式即将更新</p>
      </section>

      <SiteFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useData, withBase } from 'vitepress'
import * as THREE from 'three'
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import SiteFooter from './SiteFooter.vue'

// Dark-mode bloom: tetrahedra get a faint fluorescent glow only at night.
const { isDark } = useData()

const container = ref<HTMLDivElement>()
const stage     = ref<HTMLDivElement>()
const canvas    = ref<HTMLCanvasElement>()
const content   = ref<HTMLDivElement>()
const docLabel  = ref<HTMLDivElement>()
const cameraCopy = ref<HTMLDivElement>()
const designCopy = ref<HTMLDivElement>()
const codeCopy   = ref<HTMLDivElement>()
const liveCopy   = ref<HTMLDivElement>()
const fiatLuxSub = ref<HTMLDivElement>()

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let mat: LineMaterial
let bgMat: LineMaterial
let rafId: number
let t = 0
let contextLost = false   // WebGL 上下文丢失期间暂停渲染，restored 后重启
let frozenBaked = false   // 进内容区后：FIAT LUX 已快照成静态背景图，仅渲染漂浮的背景四面体
let bakedDark = false      // 快照时的明暗模式，主题切换后需重拍

let composer: EffectComposer
let bloomPass: UnrealBloomPass

const PALETTE = [0x1E6FD9, 0x2563EB, 0x3B82F6, 0x6366F1, 0x8B5CF6, 0x0EA5E9]

const FOV = 45

// 占位高度（vh）：给固定舞台撑出整段叙事的滚动行程。
const STORY_VH = 1950

// 手机竖屏走「竖向堆叠」布局：加载时一次性判断（与 custom.css 的 767px 断点一致）。
const MOBILE_MQ = '(max-width: 767px)'
let isMobile = false

/** 反算「刚好装下目标包围盒」所需的相机 z 距离（取宽/高较大值）。 */
function fitCameraZ(aspect: number) {
  const fitW = isMobile ? 8 : 13
  const fitH = isMobile ? 11 : 8
  const halfV = Math.tan((FOV * Math.PI) / 180 / 2)
  return Math.max(fitH / 2 / halfV, fitW / 2 / (halfV * aspect))
}

let letterGroups: THREE.Vector3[][] = []
let neighbours:   number[][][]      = []
let centroids:    THREE.Vector3[]   = []

// One independent Group per letter — each rotates around its own centroid
const letterMeshGroups: THREE.Group[] = []

interface FgTetData {
  mesh:         LineSegments2
  pos:          THREE.Vector3   // local neighbour-walk position (letters "home" state)
  target:       THREE.Vector3   // current neighbour-walk target
  repulse:      THREE.Vector3
  // 相位目标序列（交替）：scatter₁, 形态₁, scatter₂, 形态₂, … —— 链式 lerp 折叠
  phaseTargets: THREE.Vector3[]
  targetIdx:    number
  groupIdx:     number
  lerpSpeed:    number
  rotSpeed:     { x: number; y: number; z: number }
}

interface BgTetData {
  mesh:     LineSegments2
  base:     THREE.Vector3
  phase:    { x: number; y: number; z: number }
  speed:    number
  rotSpeed: { x: number; y: number; z: number }
}

const fgTets: FgTetData[] = []
const bgTets: BgTetData[] = []

// ── 叙事形态序列（letters 为初始 home 态，不在此列） ──────────────────
// 顺序即滚动叙事顺序：相机 → 海报 → 浏览器</> → 直播 → FIAT LUX。
const FORMATIONS: { name: string; build: (count: number) => THREE.Vector3[] }[] = [
  { name: 'camera',  build: buildCameraTargets  },
  { name: 'design',  build: buildDesignTargets  },
  { name: 'code',    build: buildCodeTargets    },
  { name: 'live',    build: buildLiveTargets    },
  { name: 'fiatlux', build: buildFiatLuxTargets },
]

// ── 相位区间（按滚动百分比 pct = scrollY/innerHeight） ────────────────
// 每个形态 = 一段 scatter（散开）+ 一段 reform（成形），交替排布，留少量停顿。
const SCATTER_LEN = 1.2
const REFORM_LEN  = 1.6
const HOLD_AFTER_SCATTER = 0.4
const HOLD_AFTER_REFORM  = 0.3
const PHASES: { start: number; len: number }[] = (() => {
  const out: { start: number; len: number }[] = []
  let cur = 0.30
  for (let i = 0; i < FORMATIONS.length; i++) {
    out.push({ start: cur, len: SCATTER_LEN }); cur += SCATTER_LEN + HOLD_AFTER_SCATTER
    out.push({ start: cur, len: REFORM_LEN  }); cur += REFORM_LEN  + HOLD_AFTER_REFORM
  }
  return out
})()
// reform 相位在 PHASES 中的下标：第 fi 个形态 → 1 + fi*2
const reformIdx = (fi: number) => 1 + fi * 2
const FIAT_IDX  = reformIdx(FORMATIONS.length - 1)   // 最后一个形态（FIAT LUX）的 reform 下标
const CONTENT_START = PHASES[FIAT_IDX].start + PHASES[FIAT_IDX].len   // FIAT LUX 成形末尾
const CONTENT_LEN   = 0.8

const phaseProgress: number[] = new Array(PHASES.length).fill(0)
let contentReveal = 0

let targetRotY = 0, targetRotX = 0
let currentRotY = 0, currentRotX = 0
let mouseNx = 0, mouseNy = 0

// Smoothed scroll: onScroll records the target, render() eases toward it.
let targetScrollPct = 0
let smoothScrollPct = 0
let lastTime = 0

const raycaster = new THREE.Raycaster()
const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const mouseWorld3D = new THREE.Vector3()

function onMouseMove(e: MouseEvent) {
  if (!stage.value) return
  const rect = stage.value.getBoundingClientRect()
  const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
  const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
  targetRotY = nx * 0.45
  targetRotX = ny * 0.25
  mouseNx = nx
  mouseNy = ny
}

function onScroll() {
  targetScrollPct = window.scrollY / window.innerHeight
}

// ── 移动端：用设备朝向（陀螺仪/加速度计）驱动形态倾斜，替代鼠标视差 ──
// 桌面用 onMouseMove 写 targetRotX/Y；手机改用 deviceorientation，避免触摸/滑动
// 派发的合成 mousemove 把形态带偏。复用同一条缓动→group.rotation 链路。
let orientBaseBeta: number | null = null   // 首帧 beta 作为「静止持握角」基准
let pendingTiltAsk: (() => void) | null = null

function onDeviceOrientation(e: DeviceOrientationEvent) {
  if (e.gamma == null || e.beta == null) return
  if (orientBaseBeta == null) orientBaseBeta = e.beta
  const c1 = (x: number) => Math.max(-1, Math.min(1, x))
  targetRotY = c1(e.gamma / 35) * 0.45                       // 左右倾（绕 Y），与鼠标同幅度
  targetRotX = c1((e.beta - orientBaseBeta) / 35) * 0.25     // 前后倾相对静止角（绕 X）
}

function enableTilt() {
  window.addEventListener('deviceorientation', onDeviceOrientation, true)
}

function setupMobileTilt() {
  const DOE: any = (window as any).DeviceOrientationEvent
  if (!DOE) return
  if (typeof DOE.requestPermission === 'function') {         // iOS 13+：需用户手势授权
    pendingTiltAsk = () => DOE.requestPermission()
      .then((s: string) => { if (s === 'granted') enableTilt() })
      .catch(() => {})
    window.addEventListener('touchend', pendingTiltAsk, { once: true })
  } else {
    enableTilt()                                             // Android 等：HTTPS 下直接可用
  }
}

const easeInOut = (x: number) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

/** 让一段职能文案随其成形相位淡入、随下一段散开相位淡出（沿用原 bulb-copy 写法）。 */
function driveServiceCopy(el: HTMLElement | undefined, ri: number) {
  if (!el) return
  const eased   = easeInOut(phaseProgress[ri])
  const fadeOut = Math.max(0, 1 - phaseProgress[ri + 1] * 3)
  el.style.opacity = String(eased * fadeOut)
  el.style.transform = `translateY(${(1 - eased) * 24}px)`
}

/** Map a (smoothed) scroll percentage to every phase progress + DOM overlay. */
function applyProgress(pct: number) {
  const clamp = (x: number) => Math.max(0, Math.min(1, x))
  for (let i = 0; i < PHASES.length; i++) {
    phaseProgress[i] = clamp((pct - PHASES[i].start) / PHASES[i].len)
  }
  contentReveal = clamp((pct - CONTENT_START) / CONTENT_LEN)

  // 开场标语：第一段散开时淡出
  if (docLabel.value) {
    docLabel.value.style.opacity = String(Math.max(0, 0.5 - phaseProgress[0] * 1.5))
  }

  // 四大职能文案（camera/design/code/live 的 reform 下标 1/3/5/7）
  driveServiceCopy(cameraCopy.value, reformIdx(0))
  driveServiceCopy(designCopy.value, reformIdx(1))
  driveServiceCopy(codeCopy.value,   reformIdx(2))
  driveServiceCopy(liveCopy.value,   reformIdx(3))

  // FIAT LUX 副标题：随成形淡入，随内容区揭示淡出
  if (fiatLuxSub.value) {
    const e = easeInOut(phaseProgress[FIAT_IDX])
    fiatLuxSub.value.style.opacity = String(e * (1 - contentReveal))
    fiatLuxSub.value.style.transform = `translateX(-50%) translateY(${(1 - e) * 20}px)`
  }

  // 舞台始终可见：进内容区后定格的 FIAT LUX + 背景四面体作为半透明内容区的装饰背景。
  // （前景 FIAT LUX 的压暗在 render 里通过 mat.opacity 完成。）
}

function buildLetterData() {
  const W = 1000, H = 200, STEP = 6
  const off = document.createElement('canvas')
  off.width = W; off.height = H
  const ctx = off.getContext('2d')!
  ctx.font = 'bold 140px Arial, sans-serif'
  ctx.textBaseline = 'middle'

  const TEXT   = isMobile ? 'BIT' : 'BCSSA IT'
  const totalW = ctx.measureText(TEXT).width
  const drawX  = (W - totalW) / 2

  // Compute x-boundary for each non-space character
  const charBounds: { xStart: number; xEnd: number; gi: number }[] = []
  let gi = 0
  for (let i = 0; i < TEXT.length; i++) {
    if (TEXT[i] === ' ') continue
    const xStart = drawX + ctx.measureText(TEXT.slice(0, i)).width
    const xEnd   = drawX + ctx.measureText(TEXT.slice(0, i + 1)).width
    charBounds.push({ xStart, xEnd, gi: gi++ })
  }

  ctx.textAlign = 'left'
  ctx.fillStyle = '#fff'
  ctx.fillText(TEXT, drawX, H / 2)

  const px = ctx.getImageData(0, 0, W, H).data
  const groups: THREE.Vector3[][] = Array.from({ length: gi }, () => [])

  for (let y = 0; y < H; y += STEP) {
    for (let x = 0; x < W; x += STEP) {
      if (px[(y * W + x) * 4 + 3] > 128) {
        let assignedGi = -1
        for (const b of charBounds) {
          if (x >= b.xStart && x < b.xEnd) { assignedGi = b.gi; break }
        }
        if (assignedGi === -1) continue
        groups[assignedGi].push(new THREE.Vector3(
          (x / W - 0.5) * 16,
          -(y / H - 0.5) * 5 + 1.5,
          0,
        ))
      }
    }
  }

  const xStep  = (STEP / W) * 16
  const yStep  = (STEP / H) * 5
  const radius = Math.sqrt(xStep * xStep + yStep * yStep) * 2.0

  letterGroups = groups
  neighbours   = groups.map(pool =>
    pool.map((p, i) =>
      pool.reduce<number[]>((acc, q, j) => {
        if (i !== j) {
          const dx = p.x - q.x, dy = p.y - q.y
          if (dx * dx + dy * dy < radius * radius) acc.push(j)
        }
        return acc
      }, [])
    )
  )

  centroids = groups.map(pool => {
    const c = new THREE.Vector3()
    pool.forEach(p => c.add(p))
    return c.divideScalar(pool.length || 1)
  })
}

/** Pick a neighbour target in local space (relative to the letter's centroid). */
function pickTarget(groupIdx: number, fromIdx: number): { target: THREE.Vector3; idx: number } {
  const pool = letterGroups[groupIdx]
  const nbrs = neighbours[groupIdx][fromIdx]
  const c    = centroids[groupIdx]
  const idx  = nbrs.length > 0
    ? nbrs[Math.floor(Math.random() * nbrs.length)]
    : Math.floor(Math.random() * pool.length)
  const p = pool[idx]
  return {
    target: new THREE.Vector3(p.x - c.x, p.y - c.y, (Math.random() - 0.5) * 1.2),
    idx,
  }
}

function makeLineSegGeo(basePositions: Float32Array): LineSegmentsGeometry {
  const shuffled = [...PALETTE].sort(() => Math.random() - 0.5)
  const posArr: number[] = [], colArr: number[] = []
  const c = new THREE.Color()
  for (let e = 0; e < 6; e++) {
    const i = e * 6
    posArr.push(
      basePositions[i],   basePositions[i+1], basePositions[i+2],
      basePositions[i+3], basePositions[i+4], basePositions[i+5],
    )
    c.set(shuffled[e])
    colArr.push(c.r, c.g, c.b, c.r, c.g, c.b)
  }
  const geo = new LineSegmentsGeometry()
  geo.setPositions(posArr)
  geo.setColors(colArr)
  return geo
}

/** 通用：把离屏 canvas 描出的白色像素采样成 count 个世界坐标点。
 *  worldW = 世界宽度（高度按画布宽高比推算，保持图形不变形）；ox/oy = 世界偏移。 */
function sampleCanvas(
  off: HTMLCanvasElement, count: number, z: number,
  worldW: number, ox: number, oy: number, step = 3, alpha = 64,
): THREE.Vector3[] {
  const W = off.width, H = off.height
  const worldH = worldW * (H / W)
  const px = off.getContext('2d')!.getImageData(0, 0, W, H).data
  const pts: THREE.Vector3[] = []
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (px[(y * W + x) * 4 + 3] > alpha) {
        pts.push(new THREE.Vector3(
          (x / W - 0.5) * worldW + ox,
          -(y / H - 0.5) * worldH + oy,
          z,
        ))
      }
    }
  }
  if (pts.length === 0) return Array.from({ length: count }, () => new THREE.Vector3(ox, oy, z))
  return Array.from({ length: count }, () => pts[Math.floor(Math.random() * pts.length)].clone())
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y,     x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x,     y + h, r)
  ctx.arcTo(x,     y + h, x,     y,     r)
  ctx.arcTo(x,     y,     x + w, y,     r)
  ctx.closePath()
}

/** 📷 相机：机身 + 取景器凸起 + 镜头大圆 + 快门/闪光点 */
function buildCameraTargets(count: number): THREE.Vector3[] {
  const W = 360, H = 260
  const off = document.createElement('canvas'); off.width = W; off.height = H
  const ctx = off.getContext('2d')!
  ctx.strokeStyle = '#fff'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'

  ctx.lineWidth = 6
  roundRect(ctx, 38, 78, 284, 150, 18); ctx.stroke()         // body
  ctx.beginPath()                                            // viewfinder hump
  ctx.moveTo(130, 78); ctx.lineTo(150, 52); ctx.lineTo(230, 52); ctx.lineTo(250, 78); ctx.stroke()
  ctx.lineWidth = 6
  ctx.beginPath(); ctx.arc(180, 156, 56, 0, Math.PI * 2); ctx.stroke()  // lens outer
  ctx.lineWidth = 4
  ctx.beginPath(); ctx.arc(180, 156, 34, 0, Math.PI * 2); ctx.stroke()  // lens inner
  ctx.beginPath(); ctx.arc(180, 156, 14, 0, Math.PI * 2); ctx.stroke()  // lens core
  ctx.lineWidth = 5
  ctx.beginPath(); ctx.arc(286, 104, 7, 0, Math.PI * 2); ctx.stroke()   // shutter/flash dot
  ctx.beginPath(); ctx.arc(70, 104, 5, 0, Math.PI * 2); ctx.stroke()    // small dot

  // 文案在右 → 形态偏左
  return sampleCanvas(off, count, -0.3, isMobile ? 4.4 : 5.6, isMobile ? 0 : -3.2, isMobile ? 2.0 : 0.4)
}

/** 🖼️ 海报/画框：外框 + 太阳 + 山（海报/视觉设计） */
function buildDesignTargets(count: number): THREE.Vector3[] {
  const W = 240, H = 300
  const off = document.createElement('canvas'); off.width = W; off.height = H
  const ctx = off.getContext('2d')!
  ctx.strokeStyle = '#fff'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'

  ctx.lineWidth = 6
  roundRect(ctx, 34, 28, 172, 244, 14); ctx.stroke()         // poster frame
  ctx.lineWidth = 5
  ctx.beginPath(); ctx.arc(150, 92, 20, 0, Math.PI * 2); ctx.stroke()        // sun
  ctx.lineWidth = 6
  ctx.beginPath()                                            // mountains (two peaks)
  ctx.moveTo(46, 244)
  ctx.lineTo(96, 168)
  ctx.lineTo(128, 206)
  ctx.lineTo(160, 156)
  ctx.lineTo(194, 244)
  ctx.stroke()

  // 文案在左 → 形态偏右
  return sampleCanvas(off, count, -0.3, isMobile ? 2.8 : 3.4, isMobile ? 0 : 3.1, isMobile ? 1.6 : 0)
}

/** </> 浏览器窗口：外框 + 标题栏三点 + 代码尖括号（网站开发） */
function buildCodeTargets(count: number): THREE.Vector3[] {
  const W = 360, H = 260
  const off = document.createElement('canvas'); off.width = W; off.height = H
  const ctx = off.getContext('2d')!
  ctx.strokeStyle = '#fff'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'

  ctx.lineWidth = 6
  roundRect(ctx, 28, 38, 304, 186, 16); ctx.stroke()         // window frame
  ctx.lineWidth = 4
  ctx.beginPath(); ctx.moveTo(28, 80); ctx.lineTo(332, 80); ctx.stroke()    // title bar
  for (const dx of [56, 82, 108]) { ctx.beginPath(); ctx.arc(dx, 59, 5, 0, Math.PI * 2); ctx.stroke() }
  ctx.lineWidth = 6
  ctx.beginPath(); ctx.moveTo(150, 110); ctx.lineTo(120, 152); ctx.lineTo(150, 194); ctx.stroke()  // <
  ctx.beginPath(); ctx.moveTo(210, 104); ctx.lineTo(170, 200); ctx.stroke()                         // /
  ctx.beginPath(); ctx.moveTo(230, 110); ctx.lineTo(260, 152); ctx.lineTo(230, 194); ctx.stroke()  // >

  // 文案在右 → 形态偏左
  return sampleCanvas(off, count, -0.3, isMobile ? 4.4 : 5.6, isMobile ? 0 : -3.2, isMobile ? 2.0 : 0.4)
}

/** ▶ 直播：屏幕 + 播放键 + REC 点 + 两侧信号波（直播/导播） */
function buildLiveTargets(count: number): THREE.Vector3[] {
  const W = 360, H = 260
  const off = document.createElement('canvas'); off.width = W; off.height = H
  const ctx = off.getContext('2d')!
  ctx.strokeStyle = '#fff'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'

  ctx.lineWidth = 6
  roundRect(ctx, 90, 64, 180, 132, 16); ctx.stroke()         // screen
  ctx.beginPath()                                            // play triangle
  ctx.moveTo(160, 100); ctx.lineTo(160, 160); ctx.lineTo(212, 130); ctx.closePath(); ctx.stroke()
  ctx.lineWidth = 5
  ctx.beginPath(); ctx.arc(244, 88, 7, 0, Math.PI * 2); ctx.stroke()   // REC dot
  // 信号波：左右各两道弧，像广播信号向外扩散
  ctx.lineWidth = 5
  for (const r of [26, 46]) {
    ctx.beginPath(); ctx.arc(90, 130, r, Math.PI * 0.72, Math.PI * 1.28); ctx.stroke()   // left
    ctx.beginPath(); ctx.arc(270, 130, r, -Math.PI * 0.28, Math.PI * 0.28); ctx.stroke() // right
  }

  // 文案在左 → 形态偏右
  return sampleCanvas(off, count, -0.3, isMobile ? 4.6 : 5.8, isMobile ? 0 : 3.0, isMobile ? 1.6 : 0)
}

/** Rasterise "FIAT LUX" — same style as the initial letters formation. */
function buildFiatLuxTargets(count: number): THREE.Vector3[] {
  const W = 1000, H = 200, STEP = 6
  const off = document.createElement('canvas')
  off.width = W; off.height = H
  const ctx = off.getContext('2d')!
  ctx.font = 'bold 140px Arial, sans-serif'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillStyle = '#fff'

  const TEXT  = 'FIAT LUX'
  const totalW = ctx.measureText(TEXT).width
  ctx.fillText(TEXT, (W - totalW) / 2, H / 2)

  const px = ctx.getImageData(0, 0, W, H).data
  const pts: THREE.Vector3[] = []

  for (let y = 0; y < H; y += STEP) {
    for (let x = 0; x < W; x += STEP) {
      if (px[(y * W + x) * 4 + 3] > 128) {
        pts.push(new THREE.Vector3(
          (x / W - 0.5) * (isMobile ? 9 : 16),
          -(y / H - 0.5) * 5 + (isMobile ? 2.2 : 1.5),
          0,
        ))
      }
    }
  }

  if (pts.length === 0) return Array.from({ length: count }, () => new THREE.Vector3(0, 0, 0))
  return Array.from({ length: count }, () =>
    pts[Math.floor(Math.random() * pts.length)].clone()
  )
}

/** 从字母 home 位置炸开（向外放大 + 朝相机方向抬升）。 */
function scatterFromLetters(local: THREE.Vector3): THREE.Vector3 {
  return new THREE.Vector3(
    local.x * 4 + (Math.random() - 0.5) * 6,
    local.y * 4 + (Math.random() - 0.5) * 6,
    5 + Math.random() * 6,
  )
}

/** 从某个形态位置沿径向外炸（再朝相机方向抬升）。 */
function scatterFromFormation(p: THREE.Vector3): THREE.Vector3 {
  const len = Math.hypot(p.x, p.y)
  const dx = len > 0.01 ? p.x / len : (Math.random() * 2 - 1)
  const dy = len > 0.01 ? p.y / len : (Math.random() * 2 - 1)
  return new THREE.Vector3(
    p.x + dx * 7 + (Math.random() - 0.5) * 5,
    p.y + dy * 7 + (Math.random() - 0.5) * 5,
    p.z + 5 + Math.random() * 6,
  )
}

function init() {
  const w = stage.value!.clientWidth
  const h = stage.value!.clientHeight

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value!, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.setClearColor(0x000000, 0)

  // WebGL 上下文丢失兜底：丢失时阻止默认（允许恢复）并暂停；恢复后重启渲染。
  // three 会在 restored 时自动重建 GL 资源，故重启 render() 即可。
  canvas.value!.addEventListener('webglcontextlost', (e) => {
    e.preventDefault()
    contextLost = true
    cancelAnimationFrame(rafId)
  }, false)
  canvas.value!.addEventListener('webglcontextrestored', () => {
    contextLost = false
    lastTime = performance.now()
    render()
  }, false)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(FOV, w / h, 0.1, 100)
  camera.position.z = fitCameraZ(w / h)

  // Post-processing chain for the dark-mode glow (subtle bloom).
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.38, 0.45, 0.0)
  composer.addPass(bloomPass)
  composer.addPass(new OutputPass())

  const res = new THREE.Vector2(w, h)
  mat   = new LineMaterial({ vertexColors: true, linewidth: 3, resolution: res, transparent: false, opacity: 1 })
  bgMat = new LineMaterial({ vertexColors: true, linewidth: 2, resolution: res.clone(), transparent: true, opacity: 0.35 })

  const basePositions = (
    new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.08, 0))
  ).attributes.position.array as Float32Array

  buildLetterData()

  // One Group per letter, placed at its centroid so rotation is self-centred
  letterGroups.forEach((pool, gi) => {
    const c = centroids[gi]
    const g = new THREE.Group()
    g.position.set(c.x, c.y, 0)
    scene.add(g)
    letterMeshGroups.push(g)

    pool.forEach((worldPos, startIdx) => {
      const localStart = new THREE.Vector3(
        worldPos.x - c.x,
        worldPos.y - c.y,
        (Math.random() - 0.5) * 1.2,
      )
      const { target, idx } = pickTarget(gi, startIdx)

      const mesh = new LineSegments2(makeLineSegGeo(basePositions), mat)
      mesh.position.copy(localStart)
      mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
      mesh.frustumCulled = false
      g.add(mesh)

      fgTets.push({
        mesh,
        pos: localStart.clone(),
        target,
        repulse: new THREE.Vector3(),
        phaseTargets: [],   // filled below, once all tets exist
        targetIdx: idx,
        groupIdx: gi,
        lerpSpeed: 0.004 + Math.random() * 0.005,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.025,
          y: (Math.random() - 0.5) * 0.035,
          z: (Math.random() - 0.5) * 0.015,
        },
      })
    })
  })

  // Background — free sinusoidal drift, direct children of scene
  for (let i = 0; i < 70; i++) {
    const base = new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 14,
      -(0.5 + Math.random() * 3.5),
    )
    const mesh = new LineSegments2(makeLineSegGeo(basePositions), bgMat)
    mesh.position.copy(base)
    mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
    mesh.frustumCulled = false
    scene.add(mesh)

    bgTets.push({
      mesh,
      base: base.clone(),
      phase: { x: Math.random() * Math.PI * 2, y: Math.random() * Math.PI * 2, z: Math.random() * Math.PI * 2 },
      speed: 0.15 + Math.random() * 0.3,
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.025,
        y: (Math.random() - 0.5) * 0.035,
        z: (Math.random() - 0.5) * 0.015,
      },
    })
  }

  // ── 为每个 tet 计算相位目标序列 ───────────────────────────────────
  // 各形态的世界采样点 → 转成相对各自字母 centroid 的局部坐标
  const formationLocals: THREE.Vector3[][] = FORMATIONS.map(f => {
    const world = f.build(fgTets.length)
    return fgTets.map((tet, i) => {
      const c = centroids[tet.groupIdx]
      const wp = world[i]
      return new THREE.Vector3(wp.x - c.x, wp.y - c.y, wp.z)
    })
  })

  fgTets.forEach((tet, i) => {
    const seq: THREE.Vector3[] = [scatterFromLetters(tet.pos)]   // phase 0: 从字母炸开
    FORMATIONS.forEach((_, fi) => {
      const local = formationLocals[fi][i]
      seq.push(local.clone())                                    // reform → 形态
      if (fi < FORMATIONS.length - 1) seq.push(scatterFromFormation(local))  // scatter（最后一个形态后无）
    })
    tet.phaseTargets = seq
  })

  render()
}

/** mat.opacity：成形时回满、散开时压暗（最新激活相位决定）。 */
function matOpacityFor(): number {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    const p = phaseProgress[i]
    if (p > 0) {
      if (i % 2 === 1) return (i === PHASES.length - 1 ? 0.35 + p * 0.65 : 0.35 + p * 0.6)  // reform
      return (i === 0 ? 1 - p * 0.65 : 0.9 - p * 0.55)                                       // scatter
    }
  }
  return 1
}

/** 背景小四面体的正弦漂浮 + 自转（前景定格后仍持续，作为装饰）。 */
function driftBackground(f: number) {
  const bgAmp = 2.0
  bgTets.forEach(({ mesh, base, phase, speed, rotSpeed }) => {
    mesh.position.x = base.x + Math.sin(t * speed + phase.x) * bgAmp
    mesh.position.y = base.y + Math.cos(t * speed * 0.8 + phase.y) * bgAmp
    mesh.position.z = base.z + Math.sin(t * speed * 0.5 + phase.z) * bgAmp * 0.4
    mesh.rotation.x += rotSpeed.x * f
    mesh.rotation.y += rotSpeed.y * f
    mesh.rotation.z += rotSpeed.z * f
  })
}

/** 进内容区：把当前「暗淡 FIAT LUX（仅前景）」渲染一帧并快照成 stage 背景图，然后隐藏前景、
 *  之后每帧只渲染 ~70 个背景四面体（无 bloom，开销极小）→ FIAT LUX 定格、背景仍灵动漂浮。
 *  toDataURL 在 render 同一 tick 内紧跟一次渲染调用，drawingBuffer 仍有效，无需 preserveDrawingBuffer。 */
function bakeFreeze() {
  letterMeshGroups.forEach(g => (g.visible = true))
  bgTets.forEach(b => (b.mesh.visible = false))
  mat.opacity = matOpacityFor() * (1 - contentReveal * 0.82)   // 前景压暗成底纹
  mat.transparent = true
  if (isDark.value) composer.render()
  else renderer.render(scene, camera)

  stage.value!.style.backgroundImage = `url(${canvas.value!.toDataURL()})`
  stage.value!.style.backgroundSize = 'cover'
  stage.value!.style.backgroundPosition = 'center'

  letterMeshGroups.forEach(g => (g.visible = false))   // 之后只画背景四面体
  bgTets.forEach(b => (b.mesh.visible = true))
  frozenBaked = true
  bakedDark = isDark.value
}

/** 离开内容区：清掉快照背景、恢复前景显示，回到完整动画。 */
function unbakeFreeze() {
  stage.value!.style.backgroundImage = ''
  letterMeshGroups.forEach(g => (g.visible = true))
  bgTets.forEach(b => (b.mesh.visible = true))
  frozenBaked = false
}

function render() {
  rafId = requestAnimationFrame(render)
  if (contextLost) return   // WebGL 上下文丢失：等待 restored 再恢复

  const now = performance.now()
  let dt = (now - lastTime) / 1000
  lastTime = now
  if (dt > 0.1) dt = 0.1
  const f = dt * 60

  if (document.hidden) return   // 后台标签页：停渲染降负载（回前台自动续）

  const SMOOTH_TAU = 0.12
  smoothScrollPct += (targetScrollPct - smoothScrollPct) * (1 - Math.exp(-dt / SMOOTH_TAU))
  applyProgress(smoothScrollPct)

  // 内容区：前景 FIAT LUX 定格成静态背景图，仅背景小四面体继续漂浮（开销极小，不卡）。
  if (contentReveal >= 1) {
    if (!frozenBaked || isDark.value !== bakedDark) bakeFreeze()
    t += 0.005 * f
    driftBackground(f)
    renderer.render(scene, camera)   // 只剩背景四面体可见，不走 bloom
    return
  }
  if (frozenBaked) unbakeFreeze()   // 滚回叙事段：恢复完整动画

  t += 0.005 * f

  if (!isMobile) {   // 手机无指针，跳过鼠标排斥（否则射线打在屏幕中心，形态中心被挖洞）
    raycaster.setFromCamera(new THREE.Vector2(mouseNx, -mouseNy), camera)
    raycaster.ray.intersectPlane(mousePlane, mouseWorld3D)
  }

  const REPULSE_RADIUS = 0.8
  const REPULSE_STRENGTH = 0.022
  const REPULSE_DECAY = 0.92

  mat.opacity = matOpacityFor() * (1 - contentReveal * 0.82)   // 进内容区时前景(FIAT LUX)渐暗成底纹
  mat.transparent = true

  // Foreground — neighbour-graph walk in local space + chained phase lerp
  fgTets.forEach(tet => {
    tet.pos.lerp(tet.target, Math.min(1, tet.lerpSpeed * f))

    if (!isMobile) {
      const mouseLocal = letterMeshGroups[tet.groupIdx].worldToLocal(mouseWorld3D.clone())
      const dx = tet.pos.x - mouseLocal.x
      const dy = tet.pos.y - mouseLocal.y
      const dist2D = Math.sqrt(dx * dx + dy * dy)
      if (dist2D < REPULSE_RADIUS && dist2D > 0.001) {
        const force = (1 - dist2D / REPULSE_RADIUS) * REPULSE_STRENGTH * f
        tet.repulse.x += (dx / dist2D) * force
        tet.repulse.y += (dy / dist2D) * force
      }
    }
    tet.repulse.multiplyScalar(Math.pow(REPULSE_DECAY, f))

    let px = tet.pos.x + tet.repulse.x
    let py = tet.pos.y + tet.repulse.y
    let pz = tet.pos.z

    for (let i = 0; i < tet.phaseTargets.length; i++) {
      const e = easeInOut(phaseProgress[i])
      if (e <= 0) break   // 后续相位都为 0（顺序不重叠），可提前结束
      const tgt = tet.phaseTargets[i]
      px += (tgt.x - px) * e
      py += (tgt.y - py) * e
      pz += (tgt.z - pz) * e
    }
    tet.mesh.position.set(px, py, pz)

    if (tet.pos.distanceTo(tet.target) < 0.05) {
      const { target, idx } = pickTarget(tet.groupIdx, tet.targetIdx)
      tet.target    = target
      tet.targetIdx = idx
    }

    tet.mesh.rotation.x += tet.rotSpeed.x * f
    tet.mesh.rotation.y += tet.rotSpeed.y * f
    tet.mesh.rotation.z += tet.rotSpeed.z * f
  })

  // Mouse rotation: suppressed through the story, restored as FIAT LUX forms
  let anyActive = 0
  for (let i = 0; i < PHASES.length - 1; i++) anyActive = Math.max(anyActive, phaseProgress[i])
  const fiat = phaseProgress[PHASES.length - 1]
  const rotSuppression = anyActive * (1 - fiat)
  const rotEase = 0.06 * (1 - rotSuppression * 0.9) * f
  currentRotY += (targetRotY - currentRotY) * rotEase
  currentRotX += (targetRotX - currentRotX) * rotEase
  letterMeshGroups.forEach(g => {
    g.rotation.y = currentRotY
    g.rotation.x = currentRotX
  })

  driftBackground(f)

  if (isDark.value) composer.render()
  else renderer.render(scene, camera)
}

function onResize() {
  const w = stage.value!.clientWidth
  const h = stage.value!.clientHeight
  camera.aspect = w / h
  camera.position.z = fitCameraZ(w / h)
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  composer?.setSize(w, h)
  bloomPass?.setSize(w, h)
  mat.resolution.set(w, h)
  bgMat.resolution.set(w, h)

  // 已定格时 setSize 会清空画布并令快照尺寸失配 → 按新尺寸重拍 FIAT LUX 静态背景图
  if (!contextLost && frozenBaked) bakeFreeze()
}

// 内容区进入视口时淡入上移（仅在允许动效时启用；SSR/无 JS 时默认可见）
let io: IntersectionObserver | undefined
function setupContentReveal() {
  if (!content.value) return
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return
  content.value.classList.add('js-anim')
  io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        en.target.classList.add('in-view')
        io!.unobserve(en.target)
      }
    }
  }, { threshold: 0.15 })
  content.value.querySelectorAll('.home-sec').forEach(el => io!.observe(el))
}

onMounted(() => {
  isMobile = window.matchMedia(MOBILE_MQ).matches
  targetScrollPct = smoothScrollPct = window.scrollY / window.innerHeight
  lastTime = performance.now()
  applyProgress(smoothScrollPct)
  init()
  setupContentReveal()
  window.addEventListener('resize', onResize)
  if (isMobile) setupMobileTilt()                       // 手机：朝向驱动倾斜
  else window.addEventListener('mousemove', onMouseMove) // 桌面：鼠标视差
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  io?.disconnect()
  window.removeEventListener('resize', onResize)
  if (isMobile) {
    window.removeEventListener('deviceorientation', onDeviceOrientation, true)
    if (pendingTiltAsk) window.removeEventListener('touchend', pendingTiltAsk)
  } else {
    window.removeEventListener('mousemove', onMouseMove)
  }
  window.removeEventListener('scroll', onScroll)
  composer?.dispose()
  renderer?.dispose()
})
</script>

<style scoped>
.bit-home {
  position: relative;
  background: var(--vp-c-bg);
}

/* 固定舞台：3D canvas + 叙事覆盖层 */
.bit-home__stage {
  position: fixed;
  top: var(--vp-nav-height);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: var(--vp-c-bg);
  pointer-events: none;   /* 纯装饰；鼠标交互走 window 监听 */
  will-change: opacity;
}

canvas {
  position: absolute;
  inset: 0;
}

.bit-home__spacer {
  position: relative;
  z-index: 0;
}

.doc-label {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(1.2rem, 2.8vw, 2.2rem);
  font-weight: 300;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  opacity: 0.5;
  user-select: none;
  white-space: nowrap;
}

.dark .doc-label {
  color: var(--vp-c-text-1);
  text-shadow:
    0 0 8px rgba(96, 165, 250, 0.45),
    0 0 18px rgba(96, 165, 250, 0.28);
}

/* ── 职能文案（桌面左右交替） ── */
.phase-copy {
  position: absolute;
  top: 34%;
  max-width: min(46%, 560px);
  opacity: 0;
  user-select: none;
  will-change: opacity, transform;
}
.phase-copy--left  { left: 6%; }
.phase-copy--right { right: 6%; text-align: right; }

.phase-copy__tag {
  display: block;
  font-size: clamp(0.8rem, 1.4vw, 1.1rem);
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 1.6rem;
}
/* 标签下的品牌色短线锚点 */
.phase-copy__tag::after {
  content: '';
  display: block;
  width: 32px;
  height: 2px;
  margin-top: 0.9rem;
  border-radius: 2px;
  background: var(--vp-c-brand-1);
}
.phase-copy--right .phase-copy__tag::after { margin-left: auto; }

.phase-copy__headline {
  margin: 0 0 1.6rem;
  font-size: clamp(2.4rem, 5vw, 4.4rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-1);
}
.phase-copy__headline > span {
  display: block;
  white-space: nowrap;
}

.phase-copy__body {
  margin: 0;
  font-size: clamp(0.9rem, 1.6vw, 1.3rem);
  font-weight: 300;
  letter-spacing: 0.16em;
  color: var(--vp-c-text-2);
  opacity: 0.8;
}

/* ── FIAT LUX subtitle ── */
.fiat-lux-sub {
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  white-space: nowrap;
  font-size: clamp(1.1rem, 2.2vw, 1.8rem);
  font-weight: 300;
  letter-spacing: 0.55em;
  color: var(--vp-c-text-2);
  user-select: none;
  will-change: opacity, transform;
}

/* ── 招新内容区 ── */
/* 半透明背景：让进入内容区后「定格的 FIAT LUX + 背景四面体」作为装饰透出来。
   旧浏览器回退到实色（背景不透出，但仍可读）。卡片/CTA 自带实色底，保证可读性。 */
.bit-home__content {
  position: relative;
  z-index: 2;
  background: var(--vp-c-bg);
  background: color-mix(in srgb, var(--vp-c-bg) 88%, transparent);
}

.home-sec {
  max-width: 1152px;
  margin: 0 auto;
  padding: 80px 24px;
}

.bit-home__content.js-anim .home-sec {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.bit-home__content.js-anim .home-sec.in-view {
  opacity: 1;
  transform: none;
}

.home-sec__title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 32px;
  color: var(--vp-c-text-1);
  border: none;
}

/* 部门简介 */
.home-intro {
  text-align: center;
  padding-top: 120px;
}
.home-intro__eyebrow {
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin: 0 0 20px;
}
.home-intro__title {
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 24px;
  color: var(--vp-c-text-1);
}
.home-intro__lead {
  max-width: 720px;
  margin: 0 auto;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.8;
  color: var(--vp-c-text-2);
}
.home-intro__lead strong { color: var(--vp-c-text-1); }

/* 四大职能卡片 */
.home-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
.home-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 28px 24px;
  background: var(--vp-c-bg-soft);
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.home-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, .09);
}
.home-card__icon { font-size: 34px; line-height: 1; }
.home-card__title {
  margin: 16px 0 10px;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.home-card__desc {
  margin: 0 0 16px;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.home-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
}
.home-card__links a {
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color .2s;
}
.home-card__links a:hover { color: var(--vp-c-brand-2); }

/* 为什么加入 */
.home-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 28px;
}
.home-reason__num {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  opacity: 0.5;
}
.home-reason__title {
  margin: 10px 0 8px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.home-reason__desc {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

/* 招新 CTA */
.home-cta {
  text-align: center;
  padding-top: 64px;
  padding-bottom: 96px;
}
.home-cta__title {
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: var(--vp-c-text-1);
}
.home-cta__lead {
  max-width: 640px;
  margin: 0 auto 36px;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.8;
  color: var(--vp-c-text-2);
}
.home-cta__btn {
  display: inline-block;
  padding: 14px 40px;
  border-radius: 24px;
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-border);
  transition: background .2s, transform .2s;
}
.home-cta__btn:hover {
  background: var(--vp-button-brand-hover-bg);
  transform: translateY(-2px);
}
.home-cta__note {
  margin: 20px 0 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

/* ── 手机竖屏：职能文案移到下半部整行居中（断点同 JS isMobile / custom.css） ── */
@media (max-width: 767px) {
  .phase-copy {
    left: 0;
    right: 0;
    top: auto;
    bottom: 10%;
    max-width: none;
    transform: none;
    text-align: center;
    padding: 0 6%;
  }
  .phase-copy__headline {
    font-size: clamp(2rem, 8.5vw, 2.8rem);
    line-height: 1.2;
    margin-bottom: 1.2rem;
  }
  .phase-copy__tag { margin-bottom: 1rem; }
  /* 短线居中（覆盖右对齐规则） */
  .phase-copy__tag::after { margin-left: auto; margin-right: auto; }

  .doc-label { bottom: 34%; }

  .home-sec { padding: 56px 22px; }
  .home-intro { padding-top: 80px; }
}
</style>
