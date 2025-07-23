<script setup lang="ts">
import type { FormItemRule, UploadRawFile } from 'element-plus'
import { useUpLoadImg } from './hooks/upload-hooks'
import { usePreview } from './hooks/use-preview'

export interface UploadImageProps {
  /** 图片列表 */
  modelValue: unknown[]
  /** 上传函数 */
  uploadFn?: (file: UploadRawFile) => Promise<string>
  /** 最大大小 */
  maxSize?: number
  /** 接受类型 */
  accept?: string
  /** 图片数量 */
  imgNum: number
  /** 语言列表 */
  languageList?: {
    language: string
    label: string
    placeholder?: string
    rules: FormItemRule[]
    options?: {
      label: string
      value: string
      disabled?: boolean
    }[]
  }[]
  /** 提示语 */
  prompt?: string
  /** 大小 */
  size?: 'small' | 'medium' | 'large' | number
}
defineProps<UploadImageProps>()
defineEmits(['update:modelValue'])

// 🔥 使用上传 Hook
const {
  fileList,
  uploadRef,
  handleUpload,
  handleRemove,
  beforeUpload,
  isSelected,
  handleSelect,
  handleBlur,
  placeholderComp,
  accept,
} = useUpLoadImg()

// 🔥 使用预览 Hook
const {
  previewVisible,
  previewImage,
  previewTitle,
  handlePreview,
  handlePreviewClose,
  handleDownload,
} = usePreview()
</script>

<template>
  <div
    ref="uploadRef"
    class="w-full upload-container"
    :class="{ 'is-selected': isSelected }"
    tabindex="0"
    @click="handleSelect"
    @blur="handleBlur"
  >
    <ElUpload
      v-bind="$attrs"
      :key="fileList.length"
      class="avatar-uploader"
      :http-request="handleUpload"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :accept="accept"
      list-type="picture-card"
      multiple
      drag
      :on-remove="handleRemove"
      :on-preview="handlePreview"
    >
      <template #trigger>
        <div class="upload-content">
          <ElIcon size="20">
            <Plus />
          </ElIcon>
          <div class="el-upload__text text-center leading-5">
            <div class="text-gray-500">
              {{ placeholderComp }}
            </div>
            <!-- <div class="text-gray-500">
              点击上传 或 粘贴图片
            </div> -->
          </div>
        </div>
      </template>
    </ElUpload>

    <div v-if="prompt" class="mt-2 text-sm text-gray-500">
      {{ prompt }}
    </div>

    <!-- 🔥 预览弹窗 -->
    <ElDialog
      v-model="previewVisible"
      :title="previewTitle"
      width="60%"
      :before-close="handlePreviewClose"
      class="preview-dialog"
    >
      <div class="preview-content">
        <img
          :src="previewImage"
          :alt="previewTitle"
          class="preview-image"
        >
      </div>
      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="handlePreviewClose">
            关闭
          </ElButton>
          <ElButton
            type="primary"
            @click="handleDownload"
          >
            下载
          </ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped>
:deep(.el-upload) {
  --el-upload-dragger-padding-horizontal: 53px !important;
}
.upload-container {
  position: relative;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.upload-container.is-selected {
  border-color: var(--el-color-primary);
  box-shadow: 0 0 0 2px rgba(var(--el-color-primary-rgb), 0.2);
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.upload-content {
  color: #606266;
  height: 100%;
}

.el-upload__text {
  color: #606266;
  font-size: 10px;
  text-align: center;
  margin-top: -10px;
}

.el-upload__text em {
  color: var(--el-color-primary);
  font-style: normal;
}
:deep(.el-upload--picture-card) {
  --el-upload-picture-card-size: 120px;
  margin-top: 8px;
}
:deep(.el-upload-list--picture-card) {
  --el-upload-list-picture-card-size: 120px;
}
:deep(.el-upload-list__item) {
  margin: 8px 8px 0 0 !important;
}
:deep(.upload-content) {
  margin-top: -20px;
}

/* 🔥 预览弹窗样式 */
.preview-dialog {
  .preview-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }

  .preview-image {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
  margin-bottom: 8px;
}
</style>
