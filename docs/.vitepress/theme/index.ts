import DefaultTheme from 'vitepress/theme'
import ayuDesign from '@ayu-mu/ayu-design'
import '@ayu-mu/ayu-design/dist/index.css'
import { type App } from 'vue'
import './style.css'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', AntDesignContainer)
    app.use(ayuDesign)
  }
}
