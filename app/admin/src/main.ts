import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './styles.css'
import { setupComponents } from '@/init/setupCommonState'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
setupComponents(app)
app.use(router)
// app.use(AyuDesign)

app.mount('#app')
