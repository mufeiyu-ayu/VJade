<script setup lang="ts">
import { AyuButton } from '@ayu/common'
import { ElButton } from 'element-plus'

const handleClick = (event: MouseEvent) => {
  console.log(event)
}
</script>
<template>
  <div>
    <Ayu-button circle aa>hello</Ayu-button>
    <Ayu-button type="success" @click="handleClick">hello</Ayu-button>
    <el-button @click="handleClick" ref="btn" type="primary">hello</el-button>
  </div>
</template>

<style>
div {
  margin-left: 100px;
}
</style>
