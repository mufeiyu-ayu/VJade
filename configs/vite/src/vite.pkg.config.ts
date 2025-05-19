import type { defineConfig, LibraryFormats, type UserConfig } from 'vite'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { cwd, env } from 'node:process'
import { findUp } from 'find-up'

interface Options {
  name: string
  entry?: string
  defaultFormats?: LibraryFormats[]
  externalDeps?: boolean
  options?: UserConfig
  modifyExternal?: Array<string>
}

const resolvePath = (path: string) => resolve(cwd(), path)

export async function definePkgConfig({
  name,
  entry = 'src/index.ts',
  defaultFormats = ['es'],
  externalDeps = true,
  options = {},
  modifyExternal = [],
}: Options) {
  const formats = (env.FORMATS?.split(',') ?? defaultFormats) as LibraryFormats[]
  const { peerDependencies = {}, dependencies = {} } = await getPackageJson(resolvePath('package.json'))
  const externals: string[] = [...Object.keys(peerDependencies)]
  const envFile = await getEnvFile(process.env.VITE_MODE as string)
  if (externalDeps) {
    externals.push(...Object.keys(dependencies))
  }
  return defineConfig({
    build: {
      lib: {
        entry: resolvePath(entry),
        name,
        fileName: camelCaseToKebabCase(name),
        formats,
      },
      minify: envFile.isProd ? 'esbuild' : false,
      sourcemap: envFile.isProd ? false : 'inline',
      rollupOptions: {
        external: [
          'vue',
          /^element-plus/,
          'crypto-js',
          /^crypto-js\/.*/,
          '@element-plus/icons-vue',
          '@iconify/vue',
          /^@ayu-mu\/.*/,
          /^lodash-es/,
          ...modifyExternal,
        ],
        output: {
          globals: {
            'vue': 'Vue',
            'element-plus': 'ElementPlus',
            'lodash-es': 'lodashEs',
            '@iconify/vue': 'IconifyVue',
          },
        },
      },
    },
    ...options,
  })
}

function camelCaseToKebabCase(str: string) {
  // 使用正则表达式匹配大写字母
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

async function getPackageJson(path: string) {
  const content = await readFile(path, 'utf-8')
  return JSON.parse(content)
}

async function getEnvFile(path = 'dev') {
  const filePath = await findUp('pnpm-lock.yaml')
  const envFilePath = join(dirname(filePath as string), `config.${path}.json`)
  const envFile = await readFile(envFilePath, 'utf-8')
  return JSON.parse(envFile)
}
