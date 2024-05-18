import { makeInstaller } from '@ayu/utils'
import components from './components.ts'

const installer = makeInstaller(components)
export default installer
export * from '../common/index'
