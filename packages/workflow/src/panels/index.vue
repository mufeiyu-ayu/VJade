<script lang="ts" setup>
import { ClickOutside as vClickOutside, ElDrawer, ElInput, ElLink } from 'element-plus'
import { type Component, ref } from 'vue'
import Start from './StartPanel.vue'
import type { FlowNode, Recordable } from '../types'

defineProps<{
  activeData: FlowNode
}>()
const penalVisible = defineModel<boolean>({ required: true })
const panels: Recordable<Component> = {
  start: Start
}
const showInput = ref(false)
const onClickOutside = () => {
  if (showInput.value) {
    showInput.value = false
  }
}
</script>

<template>
  <el-drawer v-model="penalVisible" size="35%">
    <template #header="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass">
        <el-input
          v-show="showInput"
          v-model="activeData.name"
          v-click-outside="onClickOutside"
          maxlength="30"
          @blur="onClickOutside"
        ></el-input>
        <el-link v-show="!showInput" icon="EditPen" @click="showInput = true">
          {{ activeData?.name || '节点配置' }}
        </el-link>
      </span>
    </template>
    <component :is="panels[activeData.type]" :activeData="activeData" />
  </el-drawer>
</template>
<style lang="scss" scoped>
:deep(.el-tabs__content) {
  margin-top: 10px;
}
</style>
