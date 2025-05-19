import type { App } from 'vue'

import { AntDesignContainer } from '@vitepress-demo-preview/component'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', AntDesignContainer)
  },
}
