<script setup lang="ts">
import { AyuButton } from '@ayu/common'
import { ElButton } from 'element-plus'
import { Icon } from '@iconify/vue'

const handleClick = (event: MouseEvent) => {
  console.log(event)
}
</script>
<template>
  <div>
    <Ayu-button circle aa>hello</Ayu-button>
    <Ayu-button type="success" @click="handleClick" loading size="large">
      <template #loading>
        <Icon icon="mdi:account" />
      </template>
      hello world
    </Ayu-button>
    <ayu-button type="success" icon="mdi:account">按钮</ayu-button>
    <el-button @click="handleClick" ref="btn" type="primary">hello</el-button>
  </div>
</template>

<style>
div {
  margin-left: 100px;
}
</style>
