<script setup lang="ts">
import { useNamespace } from '@ayu/hooks'
import { computed, ref } from 'vue'
import { throttle } from 'lodash-es'
import type { ButtonEmits, ButtonInstance, ButtonProps } from './Button.ts'
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'AyuButton'
})
const _ref = ref<HTMLButtonElement>()
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  throttleDuration: 1000,
  useThrottle: false
})

const emits = defineEmits<ButtonEmits>()
const handleBtnClick = (e: MouseEvent) => {
  emits('click', e)
}
const handleBtnCLickThrottle = throttle(handleBtnClick, props.throttleDuration)
const size = computed(() => props.size || '')
const disabled = computed(() => props.disabled || false)
const type = computed(() => props.type || '')
const ns = useNamespace('button')
const buttonKls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.size),
  ns.is('disabled', props.disabled),
  ns.is('loading', props.loading),
  ns.is('plain', props.plain),
  ns.is('circle', props.circle),
  ns.is('link', props.link)
])
defineExpose<ButtonInstance>({
  /** @description  获取当前组件的ref */
  ref: _ref,
  /** @description  获取当前组件的size */
  size,
  /** @description  获取当前组件的disabled */
  disabled,
  /** @description  获取当前组件的type */
  type
})
</script>
<template>
  <component
    :is="tag"
    ref="_ref"
    :class="buttonKls"
    @click="(e: MouseEvent) => (useThrottle ? handleBtnCLickThrottle(e) : handleBtnClick(e))"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <Icon v-else icon="line-md:loading-loop" :class="ns.is('loading')" />
    </template>
    <template v-else-if="icon">
      <Icon :icon="icon"></Icon>
    </template>
    <span v-if="$slots.default" :class="ns.em('text')">
      <slot />
    </span>
  </component>
</template>

<style lang="scss" scoped>
@import '@ayu/theme-chalk/src/button.scss';
</style>
