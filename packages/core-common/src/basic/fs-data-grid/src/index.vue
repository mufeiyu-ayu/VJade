<script setup lang="ts">
import { type ChildTableConfig, type TableSlotConfig, type InterfaceConfig } from './types/props'
import { useSplitTable } from './hooks/use-split-table'
import { useDataGrid } from './hooks/use-data-grid'
import SplitterBox from '../../../other/fs-splitters-box/index'
import FsTableBasic from './components/fs-table-basic.vue'

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
console.log(childTableColumns, 'childTableColumns')
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
    <!-- TODO 主表 -->
    <template #leftPart>
      <fs-table-basic
        ref="tableBasicRef"
        v-bind="attrs"
        :vo-name="voName"
        :child-table="{
          ...childTable,
          isShowSubTable: isShowSubTable
        }"
        :interface-config="{
          ...(attrs?.interfaceConfig ?? []),
          height: `calc(${isShowSubTable ? '100%' : '100vh'} - ${isShowSubTable ? '50px' : '226px'} - ${
            queryBarHeight + 'px'
          } + ${(modifyHeight ?? '0') + 'px'} + ${(attrs?.interfaceConfig as InterfaceConfig)?.layoutConfig?.showPagination === false ? '30px' : '0px'})`,
          queryBarIsShow: queryBarIsShow
        }"
        @selectChange="selectChange"
        @openSubTable="openSubTable"
      >
        <!--     TODO   /* @description 自定义插槽 */-->
        <template v-for="child in tableSlotConfig?.slotList" #[child]="{ item, tableData, columns }">
          <slot :name="child" :item="item" :columns="columns" :tableData="tableData"></slot>
        </template>
      </fs-table-basic>
    </template>
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
