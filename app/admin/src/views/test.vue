<script setup lang="ts">
import { formatDate } from '@ayu-mu/utils'
import { AyuButton } from '@ayu-mu/common'
// import { onMounted } from 'vue'
const date = new Date()
console.log(formatDate(date, 'HH:mm'), '日期格式')
console.log(formatDate, 'formatDate')
// onMounted(() => {
//   console.log(formatDate(date), '')
// })
</script>

<template>
  <div>this is a 1111test page</div>
  <div>
    <ayu-button type="success">hello world</ayu-button>
  </div>
</template>
