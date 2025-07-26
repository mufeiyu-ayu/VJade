<script setup lang="ts">
import type { QueryBarExposeInstance, TableExposeInstance } from '@ayu-mu/core-common'
import { ActionBar, DataGrid, QueryBar } from '@ayu-mu/core-common'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useActionBar } from './hooks/actionbar'
import { useDataGrid } from './hooks/dataGrid'
import { useQueryBar } from './hooks/querybar'

const uid = uuidv4()
const tableRef = ref<TableExposeInstance>()
const actionBarRef = ref<InstanceType<typeof ActionBar>>()
const queryBarRef = ref<QueryBarExposeInstance>()
const { tableBind } = useDataGrid({
  uid,
})
const { actionBarBind } = useActionBar(uid)
const { queryBarBind } = useQueryBar(uid)
</script>

<template>
  <div class="w-full flex flex-col h-full overflow-y-auto">
    <div class="flex w-full items-center shrink-0">
      <QueryBar v-bind="queryBarBind" ref="queryBarRef" />
    </div>
    <div class="my-2 shrink-0">
      <ActionBar v-bind="actionBarBind" ref="actionBarRef" />
    </div>
    <div class="flex-1 min-h-0">
      <DataGrid v-bind="tableBind" ref="tableRef" />
    </div>
  </div>
</template>
