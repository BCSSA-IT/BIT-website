import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BIT-DOCs",
  description: "Workflow documentation and project setup guides for the BCSSA IT Department.",
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
