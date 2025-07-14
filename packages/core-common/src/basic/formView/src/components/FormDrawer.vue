<script setup lang="ts">
import type { Ref } from 'vue'
import type FormViewContent from './FormViewContent.vue'
import { useFormDialog } from '../hooks/useForm-dialog'

export interface FormDrawerProps {
  /* @description 标题 */
  title: string
  /* @description 是否显示 */
  visible: boolean
  /* @description 宽度 */
  width: string
  /* @description 取消按钮文本 */
  cancelText: string
  /* @description 确定按钮文本 */
  confirmText: string
  /* @description 打开 */
  handleOpen: () => void
  /* @description 关闭 */
  handleClose: () => void
  /* @description 容器高度 */
  height: string
  /* @description 表单提交 */
  onSubmit: (value: Record<string, unknown>) => void
  /* @description 表单内容 */
  formContentRef: Ref<InstanceType<typeof FormViewContent> | null>
}
defineProps<FormDrawerProps>()

const { handleSubmit } = useFormDialog()
</script>

<template>
  <ElDrawer
    class="form-drawer"
    destroy-on-close
    :model-value="visible"
    :width
    :title
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="max-h-[30vh] overflow-y-auto overflow-x-hidden w-full">
      <slot />
    </div>
    <template #footer>
      <ElButton type="primary" @click="handleClose">
        关闭
      </ElButton>
      <ElButton type="primary" @click="handleSubmit">
        确定
      </ElButton>
    </template>
  </ElDrawer>
</template>

<style>
.form-drawer {
  .el-drawer__header {
    margin-bottom: 0 !important;
  }
}
</style>
