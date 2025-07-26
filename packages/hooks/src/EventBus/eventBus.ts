import type { Emitter } from 'mitt'
import type { CustomEventBusCallbackType, CustomEventType, EventBusType } from './types'
import mitt from 'mitt'
import { onUnmounted } from 'vue'

const emitter: Emitter<Record<string, unknown>> = mitt()

/**
 * Vue3 事件总线钩子函数，提供事件的发布订阅功能
 *
 * @param eventNames - 需要在组件卸载时自动解绑的事件名称数组
 * @returns {EventBusType} 返回包含 emit、on 和 off 方法的事件总线对象
 *
 * @example
 * ```typescript
 * // 基础用法 - 使用 EventTypeEnum
 * const { emit, on, off } = useEventBus(['user:UPDATE', 'user:DELETE'])
 *
 * // 订阅标准格式事件
 * on('user:UPDATE', (userData) => {
 *   console.log('User updated:', userData)
 * })
 *
 * // 发布标准格式事件
 * interface UserData {
 *   id: number
 *   name: string
 * }
 * emit<UserData>('user:UPDATE', { id: 1, name: 'John' })
 *
 * // 也支持自定义事件名
 * on('customEvent', (data) => {
 *   console.log('Custom event:', data)
 * })
 * ```
 */
export function useEventBus(eventNames: string[]): EventBusType {
  /**
   * 发布事件
   *
   * @template T - 事件数据的类型
   * @param eventName - 事件名称，可以是 `模块:事件类型` 格式或自定义字符串
   * @param args - 事件参数列表
   *
   * @example
   * ```typescript
   * // 使用标准格式发布事件
   * emit('order:CREATE', { orderId: '123', amount: 100 })
   * emit('product:UPDATE', { id: '456', stock: 50 })
   *
   * // 发布带类型的事件
   * interface OrderData {
   *   orderId: string
   *   status: 'pending' | 'completed'
   * }
   * emit<OrderData>('order:STATUS_CHANGE', {
   *   orderId: '123',
   *   status: 'completed'
   * })
   *
   * // 发布自定义事件
   * emit('refreshDashboard')
   * ```
   */
  const emit = <T = unknown>(eventName: CustomEventType, ...args: T[]) => {
    emitter.emit(eventName, args)
  }

  /**
   * 订阅事件
   *
   * @param eventName - 要订阅的事件名称，支持 `模块:事件类型` 格式或自定义字符串
   * @param callback - 事件回调函数，支持泛型类型参数
   *
   * @example
   * ```typescript
   * // 订阅标准格式事件
   * interface ProductData {
   *   id: string
   *   name: string
   *   price: number
   * }
   *
   * on('product:CREATE', <ProductData>(data) => {
   *   console.log(`New product ${data.name} created`)
   * })
   *
   * // 订阅状态变更事件
   * interface StatusChange {
   *   entityId: string
   *   oldStatus: string
   *   newStatus: string
   * }
   *
   * on('order:STATUS_CHANGE', <StatusChange>(change) => {
   *   console.log(`Order ${change.entityId} status changed from
   *     ${change.oldStatus} to ${change.newStatus}`)
   * })
   *
   * // 订阅自定义事件
   * on('globalRefresh', () => {
   *   console.log('Refreshing all components...')
   * })
   * ```
   */
  const on = (eventName: CustomEventType, callback: CustomEventBusCallbackType) => {
    emitter.on(eventName, callback)
  }

  /**
   * 解绑事件
   *
   * @param eventName - 要解绑的事件名称，支持 `模块:事件类型` 格式或自定义字符串
   *
   * @example
   * ```typescript
   * // 解绑标准格式事件
   * off('user:UPDATE')
   * off('product:DELETE')
   *
   * // 解绑自定义事件
   * off('customEventName')
   *
   * // 在组件中的完整使用示例
   * const { on, off } = useEventBus(['cart:UPDATE', 'cart:CLEAR'])
   *
   * // 订阅购物车更新事件
   * on('cart:UPDATE', <CartData>(data) => {
   *   updateCartUI(data)
   * })
   *
   * // 手动解绑购物车事件
   * off('cart:UPDATE')
   * // 注意：组件卸载时会自动解绑 eventNames 中指定的事件
   * ```
   */
  const off = (eventName: CustomEventType) => {
    emitter.off(eventName)
  }

  // 组件销毁时自动解绑事件
  onUnmounted(() => {
    if (eventNames && eventNames.length) {
      eventNames.forEach(eventName => emitter.off(eventName))
    }
  })

  return {
    emit,
    on,
    off,
  }
}
