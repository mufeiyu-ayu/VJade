<script lang="ts" setup>
import { ElButton, ElIcon, ElDialog } from 'element-plus'
import { type ClickType } from '../types/typing'
import { useDialogContainer } from '../hooks/use-dialog-container'
const { width, maxHeight } = withDefaults(
  defineProps<{
    /** @description 是否显示  */
    visible: boolean
    /** @description 表单标题  */
    formTitle: string
    /** @description 屏蔽的按钮  */
    excludes?: ClickType[]
    /** @description 弹出框宽度  */
    width?: `${number}vw` | number
    /** @description 弹出框最大高度  */
    maxHeight?: `${number}vh` | `${number}px` | `${number}%`
  }>(),
  {
    excludes: () => [],
    formTitle: '',
    width: '70vw',
    maxHeight: '100%'
  }
)

const { cancel, confirm, clear, disabled, store, fullScreenHandle, resetComp } = useDialogContainer()

defineExpose({
  /** @description 重置表单  */
  clear,
  /** @description 表单状态  */
  store,
  /** @description 重置组件  */
  resetComp
})
</script>

<template>
  <el-dialog
    top="40"
    class="form-view-dialog"
    destroy-on-close
    :close-on-click-modal="false"
    :width="width"
    overflow
    :draggable="true"
    :align-center="true"
    :model-value="visible"
    :fullscreen="store.isfullScreen"
    @close="cancel"
  >
    <template>
      <div class="flex justify-between items-center" style="height: 48px; margin-left: 20px; margin-right: 4rem">
        <span class="font-black text-xl">{{ formTitle || '表单-新增' }}</span>
        <el-icon style="cursor: pointer" @click="fullScreenHandle(false)" v-if="store.isfullScreen">
          <CopyDocument />
        </el-icon>
        <el-icon style="cursor: pointer" @click="fullScreenHandle(false)" v-else><FullScreen /></el-icon>
      </div>
    </template>

    <div class="ayu-dialog-content" :style="{ maxHeight, height: 'auto' }">
      <slot>
        <!--表单插槽 -->
      </slot>
    </div>
    <template #footer>
      <div class="flex justify-end" v-if="!disabled">
        <span>
          <slot name="button"></slot>
          <el-button v-if="!excludes.includes('clear')" icon="RefreshRight" @click="clear">清空</el-button>
          <el-button v-if="!excludes.includes('cancel')" icon="Close" @click="cancel">取消</el-button>
          <el-button v-if="!excludes.includes('confirm')" @click="confirm">保存</el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
:deep(.form-view-dialog) {
  border-radius: 8px;
  padding: 0;

  .el-dialog__header {
    background-color: var(--el-color-primary-light-9);
    margin-right: 0;
    border-radius: 8px 8px 0 0;
    padding-bottom: 0;
    padding-right: 0;

    .el-dialog__title,
    .el-dialog__headerbtn .el-dialog__close {
      color: #000;
      margin-top: 4px;
      font-weight: bolder;
    }
  }
}

:deep(.el-dialog__body) {
  padding: calc(var(--el-dialog-padding-primary) + 10px) var(--el-dialog-padding-primary);
  padding-bottom: 0;
}

:deep(.el-dialog__footer) {
  padding: var(--el-dialog-padding-primary);
}
</style>
