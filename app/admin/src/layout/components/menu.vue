<script setup lang="ts">
import menuList from './data'
import subMenu from './appMenu/subMenu.vue'
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
</script>
<template>
  <div class="w-full h-full">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <subMenu :menuList="menuList" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped></style>
