<script setup lang="ts">
import { AyuButton } from '@ayu/common'
import { AyuMessage } from '@ayu/common'
// import TestMessage from '@ayu/common/ele-com/message/src/message.vue'
// import { ElMessage } from 'element-plus'
const handleClick1 = () => {
  // ElMessage.warning('this is a success message')
  AyuMessage.success({
    message: 'this is a success message'
  })
}
const handleClick2 = () => {
  AyuMessage.warning({
    message: 'this is a success message'
  })
}
const handleClick3 = () => {
  AyuMessage({
    message: 'this is a success message',
    type: 'error'
  })
}
const handleClick4 = () => {
  AyuMessage({
    message: 'this is a success message',
    type: 'message'
  })
}
</script>
<template>
  <div>
    <!--    <TestMessage type="warning" message="this is a message" :duration="5000" />-->
  </div>
  <div class="container">
    <ayu-button type="primary" class="btn" @click="handleClick1">show success</ayu-button>
    <ayu-button type="primary" class="btn" @click="handleClick2">show warning</ayu-button>
    <ayu-button type="primary" class="btn" @click="handleClick3">show error</ayu-button>
    <ayu-button type="primary" class="btn" @click="handleClick4">show message</ayu-button>
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
