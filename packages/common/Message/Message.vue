<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '@ayu-mu/hooks'
import type { MessageOptions } from './types'
import AyuIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'AyuMessage'
})
const props = withDefaults(defineProps<MessageOptions>(), {
  type: 'success',
  message: '',
  dangerouslyUseHTMLString: false,
  duration: 3000,
  offset: 0,
  appendTo: document.body as any
})

const ns = useNamespace('message')
const visible = ref(false)
const top = ref(300)
console.log(top.value)
const classStyle = computed(() => {
  return [ns.b(), ns.m(props.type), ns.is('message', props.type === 'message'), props.customClass]
})
const setVisibility = (val: boolean): Promise<string> => {
  return new Promise((resolve) => {
    visible.value = val
    setTimeout(() => {
      resolve('')
    }, 300)
  })
}

const iconClass = computed(() => [ns.e('icon'), ns.bm('icon', props.type)])
const iconName = computed(() => {
  if (props.icon) return props.icon
  switch (props.type) {
    case 'success':
      return 'ep:success-filled'
    case 'warning':
      return 'ep:warning-filled'
    case 'error':
      return 'fluent-mdl2:status-error-full'
    case 'message':
      return 'bxs:message-alt-edit'
    default:
      return ''
  }
})
const setTop = (val: number) => {
  top.value = val + props.offset
}

defineExpose({
  setVisibility,
  setTop,
  height: 40,
  margin: 40,
  appendTo: props.appendTo
})
</script>

<template>
  <transition name="ayu-message-fade">
    <div v-show="visible" :class="classStyle" :style="{ top: top + 'px' }">
      <ayu-icon :class="iconClass" :icon="iconName"></ayu-icon>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">{{ message }}</p>
        <p v-else :class="ns.e('content')" v-html="message" />
      </slot>
    </div>
  </transition>
</template>

<style lang="scss">
@import '@ayu-mu/theme-chalk/src/message.scss';
</style>
