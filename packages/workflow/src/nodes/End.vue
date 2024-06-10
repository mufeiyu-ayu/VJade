<script lang="ts" setup>
import { ElText } from 'element-plus'
</script>

<template>
  <div class="end-node">
    <div class="end-node-circle" />
    <el-text>流程结束</el-text>
  </div>
</template>

<style lang="scss" scoped>
.end-node {
  padding: 0 0 30px;

  .end-node-circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--el-border-color);
    margin: auto;
  }
}
</style>
