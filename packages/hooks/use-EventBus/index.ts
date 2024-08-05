import { onUnmounted } from 'vue'
import mitt, { type Emitter, type EventType } from 'mitt'
import type { CustomEventBusCallbackType, CustomEventType, EventBusType } from '@ayu/model'

const emitter: Emitter<Record<EventType, unknown>> = mitt()
export const useEventBus = (eventNames?: CustomEventType[]): EventBusType => {
  /**
   * 触发器
   * @param { CustomEventType} eventName 事件名称
   * @param { *[]} args 参数
   */
  const emit = <T = any>(eventName: CustomEventType, ...args: T[]) => {
    emitter.emit(eventName, args)
  }

  /**
   * 接收器
   * @param {CustomEventType} eventName 事件名称
   * @param {CustomEventBusCallbackType} callback 回调函数
   */

  const on = (eventName: CustomEventType, callback: CustomEventBusCallbackType) => {
    emitter.on(eventName, callback)
  }

  /**
   * 取消订阅
   * @param {CustomEventBusCallbackType} eventName 事件名称
   */

  const off = (eventName: CustomEventType) => {
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
