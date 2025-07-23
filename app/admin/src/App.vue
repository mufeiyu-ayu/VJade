<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 使用 ele 语言组件
import { RouterView } from 'vue-router'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
