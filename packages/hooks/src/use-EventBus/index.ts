import { onUnmounted } from 'vue'
import mitt, { type Emitter, type EventType } from 'mitt'

const emitter: Emitter<Record<EventType, unknown>> = mitt()
export const useEventBus = (eventNames?: string[]) => {
  /**
   * 触发器
   * @param { string} eventName 事件名称
   * @param { *[]} args 参数
   */
  const emit = <T = any>(eventName: string, ...args: T[]) => {
    emitter.emit(eventName, args)
  }

  /**
   * 接收器
   * @param {CustomEventType} eventName 事件名称
   * @param {CustomEventBusCallbackType} callback 回调函数
   */

  const on = (eventName: string, callback: (...args: any[]) => void) => {
    emitter.on(eventName, callback)
  }

  /**
   * 取消订阅
   * @param {CustomEventBusCallbackType} eventName 事件名称
   */

  const off = (eventName: string) => {
    emitter.off(eventName)
  }

  /* @description 取消所有事件总线 */
  onUnmounted(() => {
    if (eventNames && eventNames.length > 0) {
      eventNames.forEach((eventName) => emitter.off(eventName))
    }
  })

  return {
    emit,
    on,
    off
  }
}
