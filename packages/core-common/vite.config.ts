import { defineConfig } from 'vite'
import { definePkgConfig } from '@ayu-mu/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AyuBasicComponent',
    externalDeps: false,
    options: {
      plugins: [vue()]
    }
  })
})
