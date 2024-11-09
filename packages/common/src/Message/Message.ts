import type { App, ComponentPublicInstance } from 'vue'
import { createApp, ref, watch } from 'vue'
import MessageComponent from './Message.vue'
import { types } from './types'

// 消息基础选项接口
export interface MessageOptions {
  type?: keyof typeof types
  message?: string
  duration?: number
  appendTo?: string | HTMLElement
}

// 消息实例接口
interface MessageMethods {
  setVisibility: (visible: boolean) => Promise<void>
  setTop: (top: number, index: number) => void
  height: number
  margin: number
  appendTo: HTMLElement
  timer?: NodeJS.Timeout | null
}

// 组合消息实例类型
type MessageInstance = ComponentPublicInstance & MessageMethods

// 定义消息函数类型
type MessageFn = {
  (options: MessageOptions): Promise<void>
  [key: string]: (options: MessageOptions) => Promise<void>
}

// 消息数组
const messageArr = ref<MessageInstance[]>([])

// 创建消息函数
const AyuMessage = ((options: MessageOptions) => {
  const messageApp = createApp(MessageComponent, options as any)
  return showMessage(messageApp, options)
}) as MessageFn

// 添加类型方法
Object.values(types).forEach((type) => {
  AyuMessage[type] = (options: MessageOptions): Promise<void> => {
    return AyuMessage({
      ...options,
      type: type as keyof typeof types
    })
  }
})

// 显示消息
const showMessage = async (app: App, options: MessageOptions): Promise<void> => {
  const container = document.createElement('div')
  const vm = app.mount(container) as MessageInstance

  messageArr.value.push(vm)
  vm.appendTo.appendChild(container)
  setTop(vm)
  await vm.setVisibility(true)

  watch(messageArr, () => setTop(vm))
  hideMessage(app, vm, options.duration ?? 3000)
}

// 隐藏消息
const hideMessage = (app: App, vm: MessageInstance, duration: number): void => {
  vm.timer = setTimeout(async () => {
    await vm.setVisibility(false)
    app.unmount()
    messageArr.value = messageArr.value.filter((item) => item !== vm)
    if (vm.timer) {
      clearTimeout(vm.timer)
      vm.timer = null
    }
  }, duration)
}

// 设置消息位置
const setTop = (vm: MessageInstance): void => {
  const { setTop: setPosition, height, margin } = vm
  const currentIndex = messageArr.value.findIndex((item) => item === vm)
  setPosition(margin * (currentIndex + 1) + height * currentIndex, currentIndex)
}

export { AyuMessage as Message }
