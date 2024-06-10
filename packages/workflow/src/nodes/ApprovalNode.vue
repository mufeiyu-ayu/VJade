<script lang="ts" setup>
import Node from './Node.vue'

import { ElText } from 'element-plus'
import { approvalNodeActionHooks } from './hooks/approval-node-action-hooks.ts'
import type { ApprovalNode } from '../types'
const props = defineProps<{
  node: ApprovalNode
}>()

const { content } = approvalNodeActionHooks(props)
</script>

<template>
  <Node :node="node" color="linear-gradient(89.96deg, #FA6F32 .05%, #FB9337 79.83%)" icon="fs:Stamp" v-bind="$attrs">
    <ElText>{{ content }}</ElText>
  </Node>
</template>

<style lang="scss" scoped></style>
