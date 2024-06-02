import type { App } from 'vue'
import { createApp, ref, watch } from 'vue'
import MessageComponent from './Message.vue'
import { type MessageOptions, types } from './types'

type MessageType = InstanceType<typeof MessageComponent> & {
  timer?: any
}

const messageArr = ref([])
const AyuMessage = async (options: any) => {
  const messageApp = createApp(MessageComponent, options)

  await showMessage(messageApp, options)
}
Object.values(types).forEach((type: string) => {
  AyuMessage[type] = (options: any): any => {
    options.type = type
    return AyuMessage(options)
  }
})

const showMessage = async (app: App, options: MessageOptions) => {
  const container = document.createElement('div')
  const vm: any = <MessageType>app.mount(container)

  messageArr.value.push(vm)
  console.log(vm, 3333333)
  vm.appendTo.appendChild(container)
  setTop(vm)
  await vm.setVisibility(true)
  watch(messageArr, () => setTop(vm))
  hideMessage(app, vm, options.duration!)
}

const hideMessage = (app: App, vm: MessageType, duration: number) => {
  vm.timer = setTimeout(async () => {
    await vm.setVisibility(false)
    app.unmount()
    messageArr.value = messageArr.value.filter((item) => item !== vm)
    clearTimeout(vm.timer)
    vm.timer = null
  }, duration || 3000)
}

const setTop = (vm: MessageType) => {
  const { setTop, height, margin } = vm
  const currentIndex = messageArr.value.findIndex((item) => item === vm)
  console.log(currentIndex, 'currentIndex')
  console.log(height, 'height')
  setTop(margin * (currentIndex + 1) + height * currentIndex, currentIndex)
}
export { AyuMessage as Message }
