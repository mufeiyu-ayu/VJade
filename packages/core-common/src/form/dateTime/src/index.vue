<script setup lang="ts">
import type { AyuDateProps } from '../../date/src/types'
import { useDateTime } from './hooks/datetime-hooks.ts'

// 年月日时分秒
const { valueFormat = 'YYYY-MM-DD HH:mm:ss', type = 'datetime' } = defineProps<AyuDateProps>()
const { handleChange, date } = useDateTime()
</script>

<template>
  <div class="w-full">
    <ElDatePicker
      v-model="date"
      :type
      :value-format
      v-bind="$attrs"
      @change="handleChange"
    />
  </div>
</template>

<style scoped>
:deep(.el-date-editor) {
  width: 100% !important;
}
</style>
