import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BIT-DOCs",
  description: "Workflow documentation and project setup guides for the BCSSA IT Department.",
  // Deployed to GitHub Pages at https://bcssa-it.github.io/BIT-website/
  base: '/BIT-website/',

  // 🥚 查看源码彩蛋：给会看页面源代码的人留个口信（构建时注入每页 head）
  transformHtml: (code) =>
    code.replace(
      '<head>',
      `<head>
  <!--
    你在看源码？我们就喜欢这种好奇心。
    BCSSA 信息技术部（摄影 / 设计 / 开发 / 直播）常年招新 —— /BIT-website/join
    会写代码的你，这里有你的位置。FIAT LUX.
  -->`,
    ),
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '快速参考', link: '/reference' },
      {
        text: '摄影摄像',
        items: [
          { text: '相机使用',     link: '/photography/camera' },
          { text: '视频照片格式', link: '/photography/formats' },
        ]
      },
      {
        text: '后期制作',
        items: [
          { text: '照片后期', link: '/post/photo' },
          { text: '视频后期', link: '/post/video' },
        ]
      },
      {
        text: '技术开发',
        items: [
          { text: '计算机项目', link: '/dev/projects' },
          { text: '环境搭建',   link: '/dev/setup' },
        ]
      },
      { text: '加入我们', link: '/join' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/BCSSA-IT/BIT-website' }
    ]
  }
})
