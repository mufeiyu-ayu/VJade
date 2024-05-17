<script setup lang="ts">
import { AyuButton } from '@ayu/common'
import { onMounted, ref } from 'vue'

const btn = ref<InstanceType<typeof AyuButton> | null>(null)
const handleClick = (e: Event) => {
  console.log('hello', e)
}
onMounted(() => {
  console.log(btn.value?.size)
})
</script>
<template>
  <div></div>
  <div class="container">
    <ayu-button @click="handleClick($event)" useThrottle ref="btn" type="primary" size="small">show success</ayu-button>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.btn {
  margin: 10px;
}
</style>
