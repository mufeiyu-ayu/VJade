import { createApp, ref, watch } from 'vue'
import MessageComponent from './message.vue'
import { types } from './types'
const messageArr = ref([])
const AyuMessage = (options: any) => {
  const messageApp = createApp(MessageComponent, options)

  showMessage(messageApp, options.duration)
}
Object.values(types).forEach((type) => {
  AyuMessage[type] = (options: any) => {
    options.type = type
    return AyuMessage(options)
  }
})

const showMessage = (app: any, duration) => {
  const container = document.createElement('div')
  const vm = app.mount(container)
  messageArr.value.push(vm)
  document.body.appendChild(container)
  setTop(vm)
  vm.setVisibility(true)
  watch(messageArr, () => setTop(vm))
  hideMessage(app, vm, duration)
}

const hideMessage = (app, vm, duration) => {
  vm.timer = setTimeout(async () => {
    await vm.setVisibility(false)
    app.unmount()
    messageArr.value = messageArr.value.filter((item) => item !== vm)
    clearTimeout(vm.timer)
    vm.timer = null
  }, duration || 3000)
}

const setTop = (vm) => {
  const { setTop, height, margin } = vm
  const currentIndex = messageArr.value.findIndex((item) => item === vm)
  setTop(margin * (currentIndex + 1) + height * currentIndex)
}
export { AyuMessage }
