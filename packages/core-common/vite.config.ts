import { resolve } from 'node:path'
import { definePkgConfig } from '@ayu-mu/vite'
// import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'
// @ts-ignore
export default defineConfig(async () => {
  return definePkgConfig({
    name: 'ayu-core-components',
    externalDeps: false,
    defaultFormats: ['es'],
    options: {
      plugins: [
        // @ts-ignore
        vue(),
        vueJsx(),
        // @ts-ignore
        dts({
          // 指定 tsconfig.json 的路径
          // 使用 resolve(__dirname, 'tsconfig.json') 确保能正确找到配置文件
          tsconfigPath: resolve(__dirname, 'tsconfig.json'),
          // 将 .vue.d.ts 文件名转换为 .d.ts
          cleanVueFileName: true,
          // 类型文件输出目录
          // 这里会输出到项目根目录下的 dist 文件夹
          outDir: 'dist',
          // 指定要包含的文件
          include: ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.tsx'],
          // 覆盖 TypeScript 编译器选项
          compilerOptions: {
            declaration: true,
            declarationMap: false,
          },

        }),

        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          dirs: ['src/components'],
          extensions: ['vue'],
          resolvers: [ElementPlusResolver()],
          dts: true,
        }),
        lazyImport({
          resolvers: [
            VxeResolver({
              libraryName: 'vxe-table',
              importStyle: true,
            }),
            VxeResolver({
              libraryName: 'vxe-pc-ui',
              importStyle: true,
            }),
          ],
        }),
        // visualizer({
        //   open: false, // 自动打开分析页面
        //   filename: 'dist/stats.html', // 分析文件名
        //   gzipSize: true, // 显示 gzip 大小
        //   brotliSize: true, // 显示 brotli 大小
        //   template: 'treemap', // 视图类型: sunburst, treemap, network
        // }),
        // terser({
        //   compress: {
        //     drop_console: true, // 移除 console
        //     drop_debugger: true, // 移除 debugger
        //     pure_funcs: ['console.log'], // 移除 console.log
        //   },
        //   format: {
        //     comments: false, // 删除注释
        //     beautify: false, // 不美化输出
        //     indent_level: 0, // 缩进级别为 0
        //     width: 0,
        //   },
        //   mangle: {
        //     properties: false, // 不压缩属性名
        //   },
        // }),
      ],
    },
  })
})
