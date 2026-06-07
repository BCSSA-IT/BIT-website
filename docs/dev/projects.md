---
title: 计算机项目
description: BIT 进行中与规划中的开发项目橱窗
---

# 计算机项目

BIT 负责开发并维护社团的网站、工具与数字基础设施。这里是我们的**项目橱窗**——记录正在做的和计划中的东西。

---

## 进行中

<div class="proj-card">
  <div class="proj-card__head">
    <h3 class="proj-card__title">BIT 文档 &amp; 宣传网站</h3>
    <span class="proj-card__status proj-card__status--in">进行中</span>
  </div>
  <p class="proj-card__desc">
    你正在看的这个站点——把 BIT 的<strong>工作流文档</strong>和<strong>招新宣传</strong>合在一起，既是内部手册，也是对外橱窗。
  </p>
  <div class="proj-tags">
    <span>VitePress</span><span>Vue 3</span><span>Three.js</span><span>TypeScript</span><span>GitHub Pages</span>
  </div>
  <ul class="proj-card__notes">
    <li>首页用 <strong>Three.js 正四面体</strong>拼出部门四大职能的叙事动画</li>
    <li>成体系的摄影 / 后期 / 开发工作流文档</li>
    <li>GitHub Actions <strong>推送即自动部署</strong>到 Pages</li>
  </ul>
  <div class="proj-card__links">
    <a href="https://github.com/BCSSA-IT/BIT-website" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
      GitHub 仓库
    </a>
    <a href="https://bcssa-it.github.io/BIT-website/" target="_blank" rel="noopener">↗ 在线访问</a>
  </div>
</div>

---

## 规划中

<div class="proj-card">
  <div class="proj-card__head">
    <h3 class="proj-card__title">BCSSA 社团官网</h3>
    <span class="proj-card__status proj-card__status--plan">规划中</span>
  </div>
  <p class="proj-card__desc">
    面向<strong>整个 BCSSA 社团</strong>（不止信息技术部）的官方网站——活动预告与回顾、各部门介绍、招新入口、公告新闻等，把社团的线上门面统一起来。
  </p>
  <div class="proj-tags">
    <span>技术栈待定</span>
  </div>
  <ul class="proj-card__notes">
    <li>覆盖全社团，由 BIT 牵头开发与维护</li>
    <li>方案待定：可能沿用 VitePress，或采用更便于多人维护内容的方案</li>
  </ul>
  <p class="proj-card__hint">筹备中，敬请期待。</p>
</div>

---

## 项目流程

项目协作遵循一套**精简版 GitHub 规范**——仓库只保留两类分支：

- **`main`**：正式、稳定分支，对应线上已部署的版本，**永远保持可用**。
- **`feature/*`**：你自己的开发分支，所有改动都先在这里做，不直接动 `main`。

开发一个功能的完整流程：

1. **切分支** —— 从最新的 `main` 切出你的 `feature` 分支。
2. **开发 + 本地自测** —— 在分支上写代码，本地 `npm run docs:dev` 跑起来确认没问题。
3. **推送** —— 把 `feature` 分支 push 到 GitHub。
4. **发起 Pull Request** —— 在 GitHub 上对该分支提 PR，说明你改了什么。
5. **Review 后合并** —— 经 review 通过后合并进 `main`，成为正式功能，CI 自动部署上线。

```bash
git checkout main && git pull               # 1. 从最新 main 出发
git checkout -b feature/your-feature        # 1. 切出你的 feature 分支
# … 开发，并用 npm run docs:dev 本地自测 …
git push -u origin feature/your-feature      # 3. 推到 GitHub
# 4. 到 GitHub 对该分支发起 Pull Request，等待 review
```

::: tip 更多 Git 用法
分支、提交、解决冲突等 Git 的详细使用，会整理在[环境搭建](/dev/setup)里。
:::

---

## 想参与？

这些项目都由 BIT 自己从零做起。想上手开发，先照 [环境搭建](/dev/setup) 把本站在本地跑起来；想加入我们，见 [加入我们](/#join)。

<style scoped>
.proj-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  margin: 24px 0;
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.proj-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
}
.proj-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.proj-card__title {
  margin: 0;
  border: none;
  padding: 0;
  font-size: 1.15rem;
}
.proj-card__status {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  padding: 3px 10px;
  border-radius: 999px;
  line-height: 1.4;
}
.proj-card__status--in {
  color: #fff;
  background: var(--vp-c-brand-1);
}
.proj-card__status--plan {
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-divider);
}
.proj-card__desc {
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}
.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 4px;
}
.proj-tags > span {
  font-size: 12px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 2px 9px;
}
.proj-card__notes {
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.proj-card__notes li { margin: 2px 0; }
.proj-card__hint {
  margin: 14px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.proj-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 18px;
}
.proj-card__links a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color .2s;
}
.proj-card__links a:hover { color: var(--vp-c-brand-1); }
</style>
