import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import App from './App.vue'
// import router from './router'
import './styles.css'
import 'ayu-design/dist/index.css'

const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.use(AyuDesign)

app.mount('#app')
