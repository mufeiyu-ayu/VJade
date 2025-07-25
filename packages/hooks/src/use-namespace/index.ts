import type { InjectionKey, Ref } from 'vue'
import { computed, getCurrentInstance, inject, ref, unref } from 'vue'

export const defaultNamespace = 'ayu'
const statePrefix = 'is-'

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> = Symbol('namespaceContextKey')

interface BemOptions {
  namespace: string
  block: string
  blockSuffix?: string
  element?: string
  modifier?: string
}

function bem({ namespace, block, blockSuffix = '', element = '', modifier = '' }: BemOptions) {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

function getDerivedNamespace(namespaceOverrides?: Ref<string | undefined>) {
  const derivedNamespace
    = namespaceOverrides
      || (getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace))
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace
  })
  return namespace
}

/**
 * @description: 命名函数
 * @param block 块
 * @param namespaceOverrides 命名空间覆盖
 * @return: String
 */
export function useNamespace(block: string, namespaceOverrides?: Ref<string | undefined>) {
  const namespace = getDerivedNamespace(namespaceOverrides)

  const b = (blockSuffix = '') => bem({ namespace: namespace.value, block, blockSuffix })
  const e = (element?: string) => (element ? bem({ namespace: namespace.value, block, element }) : '')
  const m = (modifier?: string) => (modifier ? bem({ namespace: namespace.value, block, modifier }) : '')
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? bem({ namespace: namespace.value, block, blockSuffix, element }) : ''
  const em = (element?: string, modifier?: string) =>
    element && modifier ? bem({ namespace: namespace.value, block, element, modifier }) : ''
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? bem({ namespace: namespace.value, block, blockSuffix, modifier }) : ''
  const bemFn = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier ? bem({ namespace: namespace.value, block, blockSuffix, element, modifier }) : ''
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string) => `--${namespace.value}-${name}`
  const cssVarBlockName = (name: string) => `--${namespace.value}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem: bemFn,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}
export type UseNamespaceReturn = ReturnType<typeof useNamespace>
