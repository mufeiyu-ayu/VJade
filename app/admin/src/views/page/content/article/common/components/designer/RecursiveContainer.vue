<script setup lang="ts">
import { computed } from 'vue'
import { ElRow } from 'element-plus'
import { VueDraggable } from 'vue-draggable-plus'
import type { DraggableEvent } from 'vue-draggable-plus'

defineOptions({ name: 'recursive-container' })

const props = defineProps<{
  modelValue: any[]
  selectedComponent: any | null
}>()

const emit = defineEmits(['update:modelValue', 'select', 'add', 'update'])

const list = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

function onSelectComponent(component: any) {
  emit('select', component)
}

function onAdd(e: DraggableEvent) {
  emit('add', e)
}

function onUpdate(e: DraggableEvent) {
  emit('update', e)
}
</script>

<template>
  <VueDraggable 
    v-model="list" 
    group="components"
    item-key="id"
    class="drag-area"

    :animation="150"
    ghost-class="ghost"
    @add="onAdd"
    @update="onUpdate"
  >
    <div
      v-for="element in list"
      :key="element.id + Math.random()"
      class="p-4 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 mb-2"
      :class="{ 'border-blue-500': selectedComponent?.id === element.id }"
      @click.stop="onSelectComponent(element)"
    >
  
      <component :is="element.component" v-bind="element.props">
        <recursive-container
          v-model="element.children"
          :selected-component="selectedComponent"
          @select="onSelectComponent"
          @add="onAdd"
          @update="onUpdate"
        />     
      </component>
    </div>
  </VueDraggable>
</template>

<style scoped>
.drag-area {
  width: 100%;
  min-height: 50px;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.02);
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.sortable-chosen {
  background-color: #e8f4fd;
  border: 1px dashed #60a5fa;
}
</style> 
