import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AyuDesign',
  description: '基于Vue3定制的UI',
  base: '/@ayu-mu/ayu-design/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/docs/projectStart' },
      { text: 'components', link: '/components/button.md' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'start',
          items: [{ text: '前言', link: '/docs/projectStart' }]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [{ text: 'button', link: '/components/button.md' }]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/mufeiyu-ayu/web-build' }]
  },
  vite: {
    server: {
      port: 5179
    },
    plugins: []
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  }
})
