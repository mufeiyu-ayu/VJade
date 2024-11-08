import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AyuDesign',
  description: '基于Vue3定制的UI',
  base: '/@ayu-mu/ayu-design/',
  base: '/',
  srcDir: '../',
  rewrites: {
    // 指南映射
    'docs/index.md': 'index.md'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/docs' },
      { text: 'Docs', link: '/docs/docs/projectStart.md' },
      { text: '包文件', link: '/packages/utils/markdown/index.md' },
      { text: 'components', link: '/components/button.md' }
    ],

    sidebar: {
      docs: [
        {
          text: 'start',
          items: [{ text: '前言', link: '/docs/docs/projectStart' }]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [{ text: 'button', link: '/components/button.md' }]
        }
      ],
      packages: [
        {
          text: 'utils',
          link: '/packages/utils/markdown/index.md'
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
