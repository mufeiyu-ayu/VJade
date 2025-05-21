<script setup lang="ts">
import type { DraggableEvent } from 'vue-draggable-plus'
import { VueDraggable } from 'vue-draggable-plus'
import { computed } from 'vue'

const props = defineProps<{
  componentList: any[]
}>()

// 使用computed创建本地引用
const localComponentList = computed(() => props.componentList)

const emit = defineEmits(['start', 'end'])

// 复制组件方法，用于从左侧拖动到右侧时
function cloneComponent(original: any): any {
  return {
    ...original,
    id: Date.now(),
    children: [] // 确保新组件有 children 数组
  }
}1

function handleStart(e: DraggableEvent) {
  // console.log('handleStart 被触发 e:', e)
  emit('start', e)
}

function handleEnd(e: DraggableEvent) {
  // console.log('handleEnd 被触发 e:', e)
  emit('end', e)
}
</script>

<template>
  <div class="w-full h-full flex flex-col bg-white p-4 shadow-md overflow-y-auto">
    <h2 class="text-lg font-bold mb-4">
      组件列表
    </h2>
    <VueDraggable
      v-model="localComponentList"
      :group="{ name: 'components', pull: 'clone', put: true }"
      :sort="false"
      item-key="id"
      class="space-y-2"
      :animation="150"
      ghost-class="ghost"
      :clone="cloneComponent"
      @start="handleStart"
      @end="handleEnd"
    >
      <div
        v-for="element in localComponentList"
        :key="element.id"
        class="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 flex items-center"
      >
        <span class="mr-2">{{ element.icon }}</span>
        <span>{{ element.label }}</span>
      </div>
    </VueDraggable>
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
