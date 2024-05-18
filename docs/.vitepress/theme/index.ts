import DefaultTheme from 'vitepress/theme'
import { type App } from 'vue'

import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    console.log(111)
    app.component('demo-preview', AntDesignContainer)
  }
}
