import type { App, Directive, Plugin } from 'vue'
import { each, noop } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(component: T) {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as { name?: string })?.name || 'UnnamedComponent'
    app.component(name, component as SFCWithInstall<T>)
  }
  return component as SFCWithInstall<T>
}

export function withInstallFunction<T>(fn: T, name: string) {
  ;(fn as SFCWithInstall<T>).install = (app: App) => {
    app.config.globalProperties[name] = fn
  }
  return fn as SFCWithInstall<T>
}

export function withInstallDirective<T extends Directive>(directive: T, name: string): SFCWithInstall<T> {
  ;(directive as SFCWithInstall<T>).install = (app: App) => {
    app.directive(name, directive)
  }
  return directive as SFCWithInstall<T>
}

export function withNoopInstall<T>(component: T) {
  ;(component as SFCWithInstall<T>).install = noop
  return component as SFCWithInstall<T>
}

export function makeInstaller(components: Plugin[]) {
  return (app: App) =>
    each(components, (c) => {
      app.use(c)
    })
}
