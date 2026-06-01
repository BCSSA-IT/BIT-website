---
title: 快速参考
description: 部门拍摄时所需的照片与视频格式速查卡
---

# 拍摄速查卡

部门活动拍摄前，按下面的卡片快速核对相机设置即可。详细原理见[视频照片格式](/photography/formats)。

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
    <li>封装统一用 <strong>MOV</strong></li>
    <li>分辨率 <strong>1080p</strong>，帧率 <strong>60fps</strong></li>
    <li>机器 <strong>支持 Log → 开启 Log</strong>，后期套 LUT 调色</li>
    <li>不支持 Log → 编码选 <strong>H.265</strong>（省体积）或 <strong>H.264</strong>（最兼容）</li>
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
