import { definePkgConfig } from '@ayu-mu/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AyuHook',
    externalDeps: false,
    options: {
      plugins: [vue()],
    },
  })
})
