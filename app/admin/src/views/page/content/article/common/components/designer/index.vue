<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import type { DraggableEvent } from 'vue-draggable-plus'
import RecursiveContainer from './RecursiveContainer.vue'

const props = defineProps<{
  formComponents: any[]
  selectedComponent: any | null
}>()

watch(() => props.formComponents, (newVal) => {
  console.log('watch------------------- 被触发 newVal:', newVal)
}, { deep: true })

const emit = defineEmits(['update:formComponents', 'update:selectedComponent', 'add', 'update'])

// 本地响应式数据，用于接收拖拽项目
const localFormComponents = computed({
  get: () => props.formComponents,
  set: (value) => {
    emit('update:formComponents', value)
  }
})

// 本地选中组件
const localSelectedComponent = computed({
  get: () => props.selectedComponent,
  set: (value) => {
    emit('update:selectedComponent', value)
  }
})

function handleAdd(e: DraggableEvent) {
  // console.log('handleAdd 被触发 e:', e)
  emit('add', e)
}

function handleUpdate(e: DraggableEvent) {
  // console.log('handleUpdate 被触发 e:', e)
  emit('update', e)
}

function handleSelectComponent(component: any) {
  localSelectedComponent.value = component
}


</script>

<template>
  <div class="w-full h-full flex flex-col bg-white rounded-lg shadow-md p-4">
    <h2 class="text-lg font-bold mb-4">
      设计区域
    </h2>
    <div class="flex-1 overflow-y-auto">
      <RecursiveContainer
        v-model="localFormComponents"
        :selected-component="localSelectedComponent"
        @select="handleSelectComponent"
        @add="handleAdd"
        @update="handleUpdate"
      />
    </div>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.sortable-chosen {
  background-color: #e8f4fd;
  border: 1px dashed #60a5fa;
}
</style>
