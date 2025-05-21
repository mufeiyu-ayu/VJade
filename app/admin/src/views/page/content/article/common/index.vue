<script setup lang="ts">

import type { DraggableEvent } from 'vue-draggable-plus'
import {
  ElCol,
  ElInput,
  ElRow,
  ElSelect,
} from 'element-plus'
import { ref } from 'vue'
import MaterialsPanel from './components/materials/index.vue'
import DesignerPanel from './components/designer/index.vue'
import PropertiesPanel from './components/panels/index.vue'

interface ComponentItem {
  type: string
  label: string
  icon: string
  id: number
  component: typeof ElInput | typeof ElSelect | typeof ElRow | typeof ElCol
  props: Record<string, unknown>
  children: ComponentItem[]
}

// 组件列表
const componentList = ref<ComponentItem[]>([
 {
  type: 'el-row',
  label: '行容器',
  icon: '📊',
  id: 101,
  component: ElRow,
  props: {
    gutter: 20,
  },
  children: [],
 },
  {
    type: 'el-col',
    label: '列容器',
    icon: '📊',
    id: 10,
    component: ElCol,
    props: {
      span: 12,
    },
    children: [],
  },
  {
    type: 'el-input',
    label: '输入框',
    icon: '📝',
    id: 1,
    component: ElInput,
    props: {
      placeholder: '请输入内容',
      clearable: true,
    },
    children: [],
  },
  {
    type: 'el-select',
    label: '下拉选择',
    icon: '📋',
    id: 2,
    component: ElSelect,
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    children: [],
  },
 
])

// 设计区域的表单组件
const formComponents = ref<ComponentItem[]>([])

// 当前选中的组件
const selectedComponent = ref<ComponentItem | null>(null)

// 事件处理函数
function handleStart(e: DraggableEvent) {
  // console.log('Material handleStart 被触发 e:', e)
}

function handleEnd(e: DraggableEvent) {
  // console.log('Material handleEnd 被触发 e:', e)
}

function handleAdd(e: DraggableEvent) {
  // console.log('Designer handleAdd 被触发 e:', e)
}

function handleUpdate(e: DraggableEvent) {
  // console.log('Designer handleUpdate 被触发 e:', e)
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- 左侧组件列表 -->
    <div class="w-64 h-full">
      <MaterialsPanel 
        :component-list="componentList" 
        @start="handleStart" 
        @end="handleEnd" 
      />
    </div>

    <!-- 中间设计区域 -->
    <div class="flex-1 h-full">
      <DesignerPanel 
        v-model:form-components="formComponents"
        v-model:selected-component="selectedComponent"
        @add="handleAdd"
        @update="handleUpdate"
      />
    </div>

    <!-- 右侧属性面板 -->
    <div class="w-64 h-full">
      <PropertiesPanel 
        v-model:selected-component="selectedComponent" 
      />
    </div>
  </div>
</template>

<style scoped>
.el-input,
.el-select,
.el-date-picker,
.el-time-picker,
.el-cascader,
.el-row,
.el-col {
  width: 100%;
}
</style>
