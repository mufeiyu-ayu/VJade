<script lang="ts" setup="">
import { AyuButton, AyuMessage } from '@ayu/common'

console.log(typeof AyuMessage)
const handleClick = () => {
  AyuMessage({
    type: 'success',

    message: '<h1>这是一条成功的提示消息</h1>'
  })
}
</script>
<template>
  <div>
    <ayu-button type="success" @click="handleClick">message</ayu-button>
  </div>
</template>

<style scoped></style>
