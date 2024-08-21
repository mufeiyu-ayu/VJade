<!-- <script setup lang="ts">
import { type ChildTableConfig, type TableSlotConfig } from './types/props'
import { useSplitTable } from './hooks/use-split-table'
import { useDataGrid } from './hooks/use-data-grid'
import SplitterBox from '../../other/fs-splitters-box/index'
/* @description dataGrid props 配置 */
export interface DataGridProps {
  /* @description vo 名称 */
  voName: string
  /* @description  自定义表格计算高度 */
  modifyHeight?: number
  /* @description  子表配置 */
  childTable?: ChildTableConfig
  /* @description 表格插槽配置 */
  tableSlotConfig?: TableSlotConfig
  /* @description  是否开启子表 */
  enableChildTable?: boolean
  /* @description  子表绑定参数 */
  children?: Record<string, any>
}

/* @description  注册 props */
defineProps<DataGridProps>()

/* @description  分割子表 */

const { selectChange, splitRef, openSubTable, closeSubTable } = useSplitTable()

/* @description  获取表格 hook */
const { childTableColumns, attrs, voFields, tableBasicRef, isShowSubTable, queryBarHeight, queryBarIsShow } =
  useDataGrid(closeSubTable)

defineExpose({
  /* @description  表格 ref */
  tableBasicRef,
  queryBarIsShow,
  isShowSubTable,
  voFields
})
</script>

<template>
  <splitter-box :safe-distance="[50, 50]" :percent-a="50" direction="y" ref="splitRef">
    <template #leftPart>this is a basic component</template>
    <template #rightPart>
      <div class="mt-1 h-full child-table" v-if="isShowSubTable">
        <div class="flex justify-end"></div>
      </div>
    </template>
  </splitter-box>
</template>

<style>
.child-table .el-tabs__content {
  height: 100%;
  padding: 0 10px 10px;
}

.child-table .el-tab-pane {
  height: 100%;
}
</style>
 -->
