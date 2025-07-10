<script setup lang="ts">
import Fullscreen from './fullscreen/index.vue'
import Language from './language/index.vue'
import User from './user/index.vue'
</script>

<template>
  <!-- 逆向排序 -->
  <div class="w-full flex flex-1 items-center h-full gap-4 justify-end">
    <!-- 语言 -->
    <Language />
    <!-- 全屏 -->
    <Fullscreen />
    <!-- 用户 -->
    <User />
  </div>
</template>
