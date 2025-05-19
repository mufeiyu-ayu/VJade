import { definePkgConfig } from '@ayu-mu/vite'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AyuWebBuildUtils',
    defaultFormats: ['es', 'cjs'],
    externalDeps: false,
  })
})
