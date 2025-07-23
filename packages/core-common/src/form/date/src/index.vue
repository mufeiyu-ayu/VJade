<script setup lang="ts">
import type { AyuDateProps } from './types'
import { useDate } from './hooks/date-hooks'

// 年月日时分秒
const { valueFormat = 'YYYY-MM-DD', type = 'date' } = defineProps<AyuDateProps>()
const { handleChange, date } = useDate()
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
