<script setup lang="ts">
import type { TableExposeInstance } from '@ayu-mu/core-common'
import { DataGrid } from '@ayu-mu/core-common'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useDataGrid } from './hooks'

const uid = uuidv4()
const tableRef = ref<TableExposeInstance>()
const { tableBind } = useDataGrid({
  uid,
})
</script>

<template>
  <div class="w-full flex flex-col h-full overflow-y-auto">
    <div class="flex-1 min-h-0">
      <DataGrid v-bind="tableBind" ref="tableRef" />
    </div>
  </div>
</template>
