<script lang="ts" setup>
import Node from './Node.vue'
import type { ErrorInfo, Recordable, StartNode } from '../types'
import type { Ref } from 'vue'
import { inject, ref, watchEffect } from 'vue'

import { ElText } from 'element-plus'

const props = defineProps<{
  node: StartNode
}>()
const { nodesError } = inject<{
  nodesError: Ref<Recordable<ErrorInfo[]>>
}>('flowDesign', { nodesError: ref({}) })
watchEffect(() => {
  const errors: ErrorInfo[] = []
  const { id, name, child } = props.node
  if (child?.type === 'end') {
    errors.push({ id, name, message: '发起下节点为空' })
  }
  // 记录错误
  if (errors.length > 0) {
    nodesError.value[id] = errors
  } else {
    delete nodesError.value[id]
  }
})
</script>

<template>
  <div class="start-node">
    <Node :close="false" :node="node" color="#8c7cf3" icon="List" v-bind="$attrs">
      <el-text>发起人</el-text>
    </Node>
  </div>
</template>

<style scoped></style>
