<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const isFullScreen = ref(false)
function handleFullScreen() {
  if (isFullScreen.value) {
    document.exitFullscreen()
  }
  else {
    document.documentElement.requestFullscreen()
  }
  isFullScreen.value = !isFullScreen.value
}
</script>

<template>
  <TipIcon v-if="!isFullScreen" content="全屏">
    <Icon
      icon="ic:twotone-fullscreen"
      width="28"
      height="28"
      class="cursor-pointer focus:outline-none"
      @click="handleFullScreen"
    />
  </TipIcon>
  <TipIcon v-else content="退出全屏">
    <Icon
      icon="ic:twotone-fullscreen-exit"
      width="28"
      height="28"
      class="cursor-pointer focus:outline-none"
      @click="handleFullScreen"
    />
  </TipIcon>
</template>
