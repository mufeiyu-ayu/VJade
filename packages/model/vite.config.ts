import { definePkgConfig } from '@ayu-mu/vite'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AyuModelType',
    externalDeps: false,
    options: {
      plugins: [],
    },
  })
})
