<template>
  <div class="nf">
    <div class="nf__code">404</div>
    <h1 class="nf__title">你来到了未被 FIAT LUX 照亮的角落</h1>
    <p class="nf__lead">这里什么也没有——也许页面搬家了，也许链接打错了。</p>
    <a class="nf__btn" :href="withBase('/')">← 回到有光的地方</a>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<style scoped>
.nf {
  max-width: 720px;
  margin: 0 auto;
  padding: 18vh 24px 24vh;
  text-align: center;
}
.nf__code {
  font-size: clamp(72px, 16vw, 140px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.04em;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.nf__title {
  margin: 18px 0 0;
  border: none;
  padding: 0;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.nf__lead {
  margin: 14px 0 32px;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.nf__btn {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-border);
  transition: background .2s, transform .2s;
}
.nf__btn:hover {
  background: var(--vp-button-brand-hover-bg);
  transform: translateY(-2px);
}
</style>
