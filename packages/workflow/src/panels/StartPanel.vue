<script lang="ts" setup>
import type { Field, StartNode } from '../types'
import { inject, ref, type Ref } from 'vue'
import { ElCheckbox, ElTable, ElTableColumn } from 'element-plus'
import { startPanelActionHooks } from './hooks/start-panel-action-hooks.ts'

const { fields } = inject<{ fields: Ref<Field[]> }>('flowDesign', { fields: ref([]) })
defineProps<{
  activeData: StartNode
}>()
const { allReadonly, allHidden, allRequired, changeReadonly, changeRequired, changeHidden } =
  startPanelActionHooks(fields)
</script>

<template>
  <el-table :data="activeData.formProperties">
    <el-table-column label="字段" prop="name" />
    <el-table-column prop="readonly">
      <template #header>
        <el-checkbox v-model="allReadonly" label="只读" />
      </template>
      <template #default="{ row }">
        <el-checkbox v-model="row.readonly" @change="changeReadonly(row)" />
      </template>
    </el-table-column>
    <el-table-column prop="required">
      <template #header>
        <el-checkbox v-model="allRequired" label="必填" />
      </template>
      <template #default="{ row }">
        <el-checkbox v-model="row.required" @change="changeRequired(row)" />
      </template>
    </el-table-column>
    <el-table-column prop="hidden">
      <template #header>
        <el-checkbox v-model="allHidden" label="隐藏" />
      </template>
      <template #default="{ row }">
        <el-checkbox v-model="row.hidden" @change="changeHidden(row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped></style>
