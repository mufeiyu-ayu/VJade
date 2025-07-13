<script setup lang="ts">
import type { Ref } from 'vue'
import type FormViewContent from './FormViewContent.vue'
import { useFormDialog } from '../hooks/useForm-dialog'

export interface FormDialogProps {
  /**  是否显示 */
  visible: boolean
  /**  标题 */
  title?: string
  /**  取消按钮文本 */
  cancelText?: string
  /**  确认按钮文本 */
  confirmText?: string
  /**  语言列表 */
  languageList?: string[]
  /**  高度 */
  height?: string
  /**  宽度 */
  width?: string
  /**  表单提交 */
  onSubmit?: (data: Record<string, unknown>) => void
  /**  打开弹窗 */
  handleOpen?: () => void
  /**  关闭弹窗 */
  handleClose?: () => void
  /**  表单实例 */
  formContentRef: Ref<InstanceType<typeof FormViewContent>>
}
defineProps<FormDialogProps>()
const { handleSubmit } = useFormDialog()
</script>

<template>
  <ElDialog
    :model-value="visible"
    :width
    :title
    overflow
    destroy-on-close
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="max-h-[40vh] overflow-y-auto overflow-x-hidden w-full">
      <slot />
    </div>
    <template #footer>
      <div class="flex justify-end">
        <ElButton type="default" @click="handleClose">
          {{ cancelText || '关闭' }}
        </ElButton>
        <ElButton type="primary" @click="handleSubmit">
          {{ confirmText || '确定' }}
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>
