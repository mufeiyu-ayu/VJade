<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  selectedComponent: any | null
}>()

const emit = defineEmits(['update:selectedComponent'])

// 本地选中组件
const localSelectedComponent = computed({
  get: () => props.selectedComponent,
  set: (value) => {
    emit('update:selectedComponent', value)
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col bg-white p-4 shadow-md">
    <h2 class="text-lg font-bold mb-4">
      属性配置
    </h2>
    <div v-if="localSelectedComponent" class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">标签</label>
        <input
          v-model="localSelectedComponent.label"
          type="text"
          class="w-full px-3 py-2 border rounded-md"
        >
      </div>
      <!-- 可以根据不同组件类型添加更多的属性配置项 -->
      <div v-if="localSelectedComponent.type === 'el-input'" class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">占位符</label>
        <input
          v-model="localSelectedComponent.props.placeholder"
          type="text"
          class="w-full px-3 py-2 border rounded-md"
        >
      </div>
    </div>
    <div v-else class="text-gray-500 text-center py-4">
      请选择一个组件进行配置
    </div>
  </div>
</template>

<style scoped>
/* 属性面板样式 */
</style>
