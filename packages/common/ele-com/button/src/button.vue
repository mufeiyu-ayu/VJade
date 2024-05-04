<template>
  <component is="button" :class="buttonKls">
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <Icon v-else icon="line-md:loading-loop" :class="ns.is('loading')" />
    </template>
    <span v-if="$slots.default">
      <slot />
    </span>
    <span v-else>内容不存在</span>
  </component>
</template>
<script setup lang="ts">
import { useNamespace } from '@ayu/hooks'
import { computed } from 'vue'
import { buttonProps } from './button'
import { Icon } from '@iconify/vue'
defineOptions({
  name: 'AyButton'
})

const props = defineProps(buttonProps)
console.log(props)
const ns = useNamespace('button')
const buttonKls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.size),
  ns.is('disabled', props.disabled),
  ns.is('loading', props.loading),
  ns.is('plain', props.plain),
  ns.is('round', props.round),
  ns.is('circle', props.circle),
  ns.is('text', props.text),
  ns.is('link', props.link)
])
console.log(buttonKls, 'buttonKls')
console.log(props, 'props')
</script>

<style lang="scss" scoped>
@use '@ayu/theme-chalk/button.scss';
</style>
