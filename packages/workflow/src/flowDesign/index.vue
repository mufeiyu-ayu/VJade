<script lang="ts" setup>
import type { Field, FlowNode } from '../types'
import { ElButton, ElTooltip } from 'element-plus'
import { computed, provide, ref } from 'vue'
import { attrHooks } from './flowHooks.ts'
import Panel from '../panels/index.vue'
import TreeNode from '../nodes/TreeNode.vue'
import { workflowStore } from '@ayu-mu/common-state'
const store = workflowStore()
const props = withDefaults(
  defineProps<{
    fields: Field[]
    readOnly?: boolean
    defaultZoom?: number
    bgColor?: string
  }>(),
  {
    readOnly: false,
    defaultZoom: 100,
    bgColor: 'var(--el-bg-color-page)'
  }
)

const { addNode, nodesError, validate } = attrHooks(props)
const readOnly = computed(() => props.readOnly)

const zoom = ref(props.defaultZoom)
const getScale = computed(() => zoom.value / 100)

const activeData = ref<FlowNode>({
  id: '',
  name: '',
  type: 'start'
})

const flatFields = computed(() => {
  if (!props.fields || props.fields.length <= 0 || !Array.isArray(props.fields)) return []
  return props.fields
})

const penalVisible = ref(false)

const openPenal = (node: FlowNode) => {
  activeData.value = node
  penalVisible.value = true
}
provide('flowDesign', {
  readOnly,
  fields: flatFields,
  nodesError
})

defineExpose({
  validate
})
</script>

<template>
  <div class="designer-container">
    <div class="tool">
      <slot></slot>
    </div>

    <!--    放大-缩小-->
    <div class="zoom">
      <el-tooltip content="放大" placement="bottom-start">
        <el-button :disabled="zoom >= 170" circle icon="plus" @click="zoom += 10"></el-button>
      </el-tooltip>
      <span>{{ zoom }}%</span>
      <el-tooltip content="缩小" placement="bottom-start">
        <el-button :disabled="zoom <= 50" circle icon="minus" @click="zoom -= 10"></el-button>
      </el-tooltip>
    </div>

    <!--    流程树-->
    <div class="node-container">
      <TreeNode :node="store.processState" @activeNode="openPenal" @addNode="addNode" />
    </div>
    <!--    属性面板-->
    <Panel v-model="penalVisible" :active-data="activeData" />
  </div>
</template>

<style lang="scss" scoped>
.designer-container {
  --flow-bg-color: v-bind(bgColor);
  position: relative;
  display: flex;
  flex-direction: row;
  min-height: 100%;
  min-width: 100%;
  overflow: auto;
  background-color: var(--flow-bg-color);

  .zoom {
    position: absolute;
    z-index: 999;
    top: 30px;
    right: 40px;

    span {
      margin: 0 10px;
    }
  }
  .tool {
    position: absolute;
    z-index: 999;
    top: 5px;
    left: 5px;
    display: flex;
    gap: 5px;
  }

  .node-container {
    margin: 0 auto;
    transform: scale(v-bind(getScale));
    transform-origin: 50% 0 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
