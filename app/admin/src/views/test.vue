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
  <ayu-button>hello world</ayu-button>
</template>
