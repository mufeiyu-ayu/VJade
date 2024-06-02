<script lang="ts" setup="">
import { AyuButton, AyuMessage } from '@ayu/common'

const handleClick = (type: string) => {
  AyuMessage({
    type,
    message: '信息保存打就嗲家打开了骄傲快乐到',
    icon: 'devicon:sqldeveloper',
    customClass: 'aa',
    offset: 100
  })
}
</script>
<template>
  <div>
    <ayu-button type="primary" @click="handleClick('success')">success</ayu-button>
    <ayu-button type="primary" @click="handleClick('warning')">warning</ayu-button>
    <ayu-button type="primary" @click="handleClick('error')">error</ayu-button>
    <ayu-button type="primary" @click="handleClick('message')">message</ayu-button>
  </div>
</template>

<style></style>
