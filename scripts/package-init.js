import console from 'node:console'
import chalk from 'chalk'
import { execa } from 'execa'

const buildPkg = ['@ayu-mu/utils']

async function buildSequentially() {
  for (const pkg of buildPkg) {
    try {
      await execa('pnpm', ['--filter', pkg, 'build:all'], {
        stdio: 'inherit',
      })
      console.log(chalk.blue(`编译包 ${pkg}成功！`))
    }
    catch (error) {
      console.error(chalk.red(`编译包 ${pkg}失败:`), error)
      throw error // 如果需要在任何包构建失败时停止整个过程
    }
  }
}

buildSequentially()
  .then(() => console.log(chalk.blue('恭喜你成功编译所有包!!!!')))
  .catch(error => console.error(chalk.red('编译失败，快去西天请如来佛祖！！！！'), error))
