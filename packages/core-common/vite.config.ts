import { defineConfig } from 'vite'
import { definePkgConfig } from '@ayu-mu/vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AyuBasicComponent',
    externalDeps: false,
    options: {
      plugins: [
        vue(),
        visualizer({
          open: true, // 自动打开分析页面
          filename: 'dist/stats.html', // 分析文件名
          gzipSize: true, // 显示 gzip 大小
          brotliSize: true, // 显示 brotli 大小
          template: 'treemap' // 视图类型: sunburst, treemap, network
        })
      ]
    }
  })
})
