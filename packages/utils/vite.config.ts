import { defineConfig } from 'vite'
import { definePkgConfig } from '@ayu-mu/vite'

export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AyuWebBuildUtils',
    defaultFormats: ['es', 'cjs'],
    externalDeps: false
  })
})
