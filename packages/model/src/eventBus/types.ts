import { EventTypeEnum } from './enums'

/**
 * 全局事件总线类型
 */
export interface EventBusType {
  emit: <T = any>(eventName: CustomEventType, ...args: T[]) => void
  on: (eventName: CustomEventType, callback: CustomEventBusCallbackType) => void
  off: (eventName: CustomEventType) => void
}

/**
 * 全局事件总线事件类型
 */
export type CustomEventType = `${string}:${EventTypeEnum}` | string

/**
 * 全局事件总线回调函数类型
 */
export type CustomEventBusCallbackType = <T = any>(...args: T[]) => void
