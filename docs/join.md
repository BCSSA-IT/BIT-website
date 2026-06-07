---
title: 加入我们
description: BCSSA 信息技术部招新——每学期初开放报名，欢迎加入
---

# 加入我们

BCSSA 信息技术部（BIT）负责社团的**摄影摄像、海报设计、网站开发与活动直播**。如果你想学一门能用的手艺、做真实的项目、找到一群同好——欢迎加入我们。

还不了解我们做什么？先看看 [主页](/) 和 [计算机项目](/dev/projects)。

---

## 招新时间

::: tip 每学期初招新
我们在**每年秋季 / 春季学期开始时**进行招新。届时**报名表单（Google Form）会同步更新在本页**，留意这里即可，不会错过。
:::

## 报名方式

<div class="join-cta">
  <!-- TODO: 招新开放后，把按钮换成真实链接：
       <a class="join-cta__btn" href="GOOGLE_FORM_URL" target="_blank" rel="noopener">报名表单</a>
       并删除下面这个占位 span 与 --soon 态。 -->
  <span class="join-cta__btn join-cta__btn--soon" role="button" aria-disabled="true">报名表单 · 即将开放</span>
  <p class="join-cta__note">招新开放后，这里会更新为 Google Form 报名链接。</p>
</div>

## 招新流程

<div class="join-steps">
  <div class="join-step">
    <div class="join-step__num">01</div>
    <div class="join-step__title">填写报名表单</div>
    <p class="join-step__desc">招新开放后，在本页提交 Google Form 报名表，留下你的基本信息和感兴趣的方向。</p>
  </div>
  <div class="join-step">
    <div class="join-step__num">02</div>
    <div class="join-step__title">面试</div>
    <p class="join-step__desc">我们会安排一次轻松的面试，聊聊你的兴趣、经历和想做的事——不要求经验，有热情就好。</p>
  </div>
  <div class="join-step">
    <div class="join-step__num">03</div>
    <div class="join-step__title">加入 BIT</div>
    <p class="join-step__desc">通过后即正式加入，开始上手真实项目，和大家一起把作品做到最好。</p>
  </div>
</div>

---

不限年级、不限经验，只要你对影像或技术有热情，**欢迎报名**。有问题想先聊聊？联系方式即将更新。

---

[点我看这学期 61A final 答案 →](https://www.bilibili.com/video/BV1UT42167xb/)

<style scoped>
.join-cta {
  text-align: center;
  margin: 28px 0 8px;
}
.join-cta__btn {
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
.join-cta__btn:not(.join-cta__btn--soon):hover {
  background: var(--vp-button-brand-hover-bg);
  transform: translateY(-2px);
}
.join-cta__btn--soon {
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
  border-color: var(--vp-c-divider);
  cursor: not-allowed;
}
.join-cta__note {
  margin: 14px 0 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}
.join-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 24px 0;
}
.join-step {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 22px;
  background: var(--vp-c-bg-soft);
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.join-step:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
}
.join-step__num {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
}
.join-step__title {
  margin: 10px 0 6px;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.join-step__desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
</style>
