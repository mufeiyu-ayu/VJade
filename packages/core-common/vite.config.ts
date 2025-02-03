import { defineConfig } from 'vite'
import { definePkgConfig } from '@ayu-mu/vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// import terser from '@rollup/plugin-terser'
export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AyuBasicComponent',
    externalDeps: false,
    options: {
      plugins: [
        vue(),
        visualizer({
          open: false, // 自动打开分析页面
          filename: 'dist/stats.html', // 分析文件名
          gzipSize: true, // 显示 gzip 大小
          brotliSize: true, // 显示 brotli 大小
          template: 'treemap' // 视图类型: sunburst, treemap, network
        })
        // terser({
        //   compress: {
        //     drop_console: true, // 移除 console
        //     drop_debugger: true, // 移除 debugger
        //     pure_funcs: ['console.log'] // 移除 console.log
        //   },
        //   format: {
        //     comments: false, // 删除注释
        //     beautify: false, // 不美化输出
        //     indent_level: 0, // 缩进级别为 0
        //     width: 0
        //   },
        //   mangle: {
        //     properties: false // 不压缩属性名
        //   }
        // })
      ]
    }
  })
})
