import console from 'node:console'
import { existsSync, readdirSync } from 'node:fs'
import { argv, env, exit } from 'node:process'
import { join } from 'node:path'
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'
import { execa } from 'execa'
import { rimraf } from 'rimraf'
import chalk from 'chalk'
//当前目录路径
const libPath = env.PWD || process.cwd()
// 获取当前路径下 temp 目录下所有文件名
const packages = readdirSync(join(libPath, 'temp'))

const apiExtratorPath = argv?.find((i) => i.includes('rollup-dts'))?.replace('rollup-dts.js', 'api-extractor.json')
// console.log(apiExtratorPath, 'apiExtratorPath')

// 获取 temp 目录下的 src 下的 index.d.ts
const typeTempIndexPath = join(
  libPath,
  'temp',
  packages.find((i) => i === 'src'),
  'index.d.ts'
)

//如果没有则退出进程
if (!existsSync(typeTempIndexPath)) {
  console.error(chalk.red('🚨未在 temp 目录下找到 src 下的 index.d.ts文件哦'))
  exit(1)
}

//如果没有则退出进程
if (!existsSync(apiExtratorPath)) {
  console.error(chalk.red('🚨未在指定 目录下找到 api-extractor.json 文件哦'))
  exit(1)
}

async function run() {
  const configObj = ExtractorConfig.loadFile(apiExtratorPath)
  // console.log(configObj.mainEntryPointFilePath, 333) // <projectFolder>/temp/index.d.ts
  // 自定义类型入口地址
  // console.log(typeTempIndexPath, 'path')
  configObj.mainEntryPointFilePath = typeTempIndexPath

  // 设置配置对象
  const extractorConfig = ExtractorConfig.prepare({
    // 指定配置
    configObject: configObj,
    // 指定项目根路径
    projectFolderLookupToken: libPath,
    // 指定 package.json 路径
    packageJsonFullPath: join(libPath, 'package.json')
  })
  const extractorResult = Extractor.invoke(extractorConfig, {
    // 本地构建
    localBuild: true,
    // 开启详细日志
    showVerboseMessages: true
  })

  if (extractorResult.succeeded) {
    console.log(chalk.blue(`🎉类型声明文件生成成功！`))
    await execa('npx', ['api-documenter', 'markdown', '-i', 'temp'], {
      stdio: 'inherit'
    })
    await rimraf(join(libPath, 'temp'))
  } else {
    console.error(
      chalk.red(
        `🚨类型声明文件生成失败：${+`\n\t${extractorResult.errorCount} errors`}\n\tand ${extractorResult.warningCount} warnings`
      )
    )
    exit(1)
  }
}

await run()
