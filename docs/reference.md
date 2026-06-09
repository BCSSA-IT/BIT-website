---
title: 快速参考
description: 部门拍摄时所需的照片与视频格式速查卡
---

# 速查卡

部门活动从拍摄到交付，按下面的卡片快速核对设置即可：拍摄前对相机格式，后期导出时对命名与格式。详细原理见[视频照片格式](/photography/formats)与[照片后期](/post/photo)。

<div class="ref-cards">

<div class="ref-card">
  <div class="ref-card__icon">📷</div>
  <div class="ref-card__title">照片</div>
  <div class="ref-card__main">RAW</div>
  <ul class="ref-card__notes">
    <li>一律拍摄 <strong>RAW</strong>，保留最大后期空间</li>
    <li>机身支持可开 <strong>RAW + JPEG</strong> 双格式，方便现场选片</li>
  </ul>
</div>

<div class="ref-card">
  <div class="ref-card__icon">🎬</div>
  <div class="ref-card__title">视频</div>
  <div class="ref-card__main">MOV · 1080p · 60fps</div>
  <ul class="ref-card__notes">
    <li>每场活动<strong>务必至少记录 5 分钟视频</strong>——没相机时<strong>手机拍也行</strong></li>
    <li>封装统一用 <strong>MOV</strong></li>
    <li>分辨率 <strong>1080p</strong>，帧率 <strong>60fps</strong></li>
    <li>机器 <strong>支持 Log → 开启 Log</strong>，后期套 LUT 调色</li>
    <li>不支持 Log → 编码选 <strong>H.265</strong>（省体积）或 <strong>H.264</strong>（最兼容）</li>
  </ul>
</div>

<div class="ref-card">
  <div class="ref-card__icon">🖼️</div>
  <div class="ref-card__title">照片后期 · 导出</div>
  <div class="ref-card__main">JPEG · sRGB · 长边 2048</div>
  <ul class="ref-card__notes">
    <li>命名 <strong>日期_活动名_序号</strong>，如 <code>20260601_校庆_001</code></li>
    <li>格式 <strong>JPEG</strong>，色彩空间 <strong>sRGB</strong></li>
    <li>社媒 / 公众号：长边 <strong>2048</strong>，画质 <strong>80</strong></li>
    <li>存档 / 印刷：<strong>原尺寸</strong>，画质 <strong>100</strong></li>
  </ul>
</div>

<div class="ref-card">
  <div class="ref-card__icon">🎞️</div>
  <div class="ref-card__title">视频后期 · 导出</div>
  <div class="ref-card__main">MP4 · H.264 · 1080p 60fps</div>
  <ul class="ref-card__notes">
    <li>封装 <strong>MP4</strong>，编码 <strong>H.264</strong>（兼容）或 <strong>H.265</strong>（省体积）</li>
    <li>分辨率 / 帧率 <strong>1080p / 60fps</strong>（跟拍摄一致）</li>
    <li>码率：1080p 约 <strong>16–24 Mbps</strong></li>
    <li>音频 <strong>AAC</strong>，约 <strong>320 kbps</strong></li>
  </ul>
</div>

</div>

<style scoped>
.ref-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin: 28px 0;
}
.ref-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.ref-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
}
.ref-card__icon {
  font-size: 32px;
  line-height: 1;
}
.ref-card__title {
  margin-top: 12px;
  font-size: 14px;
  letter-spacing: .08em;
  color: var(--vp-c-text-2);
}
.ref-card__main {
  margin: 6px 0 16px;
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.ref-card__notes {
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.ref-card__notes li { margin: 2px 0; }
</style>
