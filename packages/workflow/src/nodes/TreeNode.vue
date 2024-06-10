<script lang="ts" setup>
import type { Recordable, FlowNode } from '../types'
import { type Component, defineProps } from 'vue'
import Start from './StartNode.vue'
import End from './End.vue'
import TreeNode from './TreeNode.vue'
import Approval from './ApprovalNode.vue'
defineProps<{
  node: FlowNode
}>()

const nodes: Recordable<Component> = {
  /** @description 起始节点 */
  start: Start,
  /** @description 审批节点 */
  approval: Approval,
  end: End
}
</script>

<template>
  <slot />
  <component :is="nodes[node.type]" :node="node" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </component>
  <TreeNode v-if="node.child" :node="node.child" v-bind="$attrs" />
</template>

<style scoped></style>
