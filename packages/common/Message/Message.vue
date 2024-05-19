<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '@ayu/hooks'
import type { MessageOptions } from './types'
import AyuIcon from '../Icon/Icon.vue'

console.log(AyuIcon)
defineOptions({
  name: 'AyuMessage'
})
const props = withDefaults(defineProps<MessageOptions>(), {
  type: 'success',
  message: '',
  dangerouslyUseHTMLString: false,
  duration: 3000
})

const ns = useNamespace('message')
const visible = ref(false)
const top = ref(0)

const classStyle = computed(() => {
  return [ns.b(), ns.m(props.type), ns.is('message', props.type === 'message')]
})
const setVisibility = (val: boolean): Promise<string> => {
  return new Promise((resolve) => {
    visible.value = val
    setTimeout(() => {
      resolve('')
    }, 300)
  })
}
// <Icon icon="ooui:success" width="24" height="24"  style="color: #529b2e" /
const iconClass = computed(() => [ns.e('icon'), ns.bm('icon', props.type)])
const setTop = (val: number) => {
  top.value = val
  return top.value
}

defineExpose({
  setVisibility,
  setTop,
  height: 40,
  margin: 20
})
</script>

<template>
  <transition name="ayu-message-fade">
    <div v-show="visible" :class="classStyle" :style="{ top: top + 'px' }">
      <ayu-icon :class="iconClass" icon="ep:success-filled"></ayu-icon>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">{{ message }}</p>
        <p v-else :class="ns.e('content')" v-html="message" />
      </slot>
    </div>
  </transition>
</template>

<style lang="scss">
.ayu-message__icon {
  font-size: 33px;
}

@import '@ayu/theme-chalk/src/message.scss';
</style>
