import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

export function makeInstaller(components: Plugin[]) {
  return (app: App) =>
    each(components, (c) => {
      app.use(c)
    })
}
export * from './install'
