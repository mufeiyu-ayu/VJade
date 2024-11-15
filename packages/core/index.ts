import { makeInstaller } from '@ayu-mu/utils'
import components from './components.ts'

const installer = makeInstaller(components)
export default installer
export * from '../common/src/index.ts'
