import { ref } from 'vue'

/**
 * Vue3 节流函数钩子，支持异步函数，并提供加载状态
 *
 * @remarks
 * 这个钩子函数提供以下特性：
 * - 函数在 delay 时间内只能执行一次
 * - loading 状态会在函数执行期间为 true
 * - 支持异步函数，会等待 Promise 完成
 * - 即使函数执行出错，loading 状态也会被正确重置
 *
 * @example
 * 基础用法：
 * ```typescript
 * const { throttled, loading } = useThrottle(() => {
 *   console.log('Throttled function called')
 * }, 2000)
 * ```
 *
 * @example
 * 异步请求示例：
 * ```typescript
 * interface SearchParams {
 *   keyword: string
 *   page: number
 * }
 *
 * const searchApi = async (params: SearchParams) => {
 *   const response = await fetch(`/api/search?q=${params.keyword}&page=${params.page}`)
 *   return response.json()
 * }
 *
 * const { throttled: throttledSearch, loading: searching } = useThrottle(searchApi, 1000)
 *
 * // 在模板中使用
 * <template>
 *   <button @click="() => throttledSearch({ keyword: 'test', page: 1 })"
 *           :disabled="searching">
 *     {{ searching ? '搜索中...' : '搜索' }}
 *   </button>
 * </template>
 * ```
 *
 * @throws
 * 原始函数抛出的任何错误都会被向上传播，但 loading 状态会被正确重置
 *
 * @param fn - 需要节流的函数
 * @param delay - 节流延迟时间（毫秒），默认为 1000ms
 * @typeParam T - 需要节流的函数类型
 * @returns 包含节流函数和加载状态的对象
 * @public
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 1000,
) {
  /**
   * 当前是否正在执行函数的状态标志
   * @internal
   */
  const loading = ref(false)

  /**
   * 上次成功执行的时间戳
   * @internal
   */
  const lastTime = ref(0)

  /**
   * 节流后的函数
   * @param args - 原函数的参数
   * @returns 返回一个 Promise
   */
  const throttled = async (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastTime.value >= delay && !loading.value) {
      try {
        loading.value = true
        await fn(...args)
        lastTime.value = now
      }
      finally {
        loading.value = false
      }
    }
  }

  return {
    throttled,
    loading,
  }
}
