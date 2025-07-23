import type { UploadFile } from 'element-plus'
import { ref } from 'vue'

/**
 * 图片预览功能 Hook
 * @description 提供图片预览、下载等功能的统一管理
 * @returns 预览相关的状态和方法
 */
export function usePreview() {
  // 🔥 预览相关状态
  const previewVisible = ref(false)
  const previewImage = ref('')
  const previewTitle = ref('')

  /**
   * 预览图片
   * @param file - 上传文件对象
   */
  const handlePreview = (file: UploadFile) => {
    previewImage.value = file.url || ''
    previewTitle.value = file.name || '图片预览'
    previewVisible.value = true
  }

  /**
   * 关闭预览
   */
  const handlePreviewClose = () => {
    previewVisible.value = false
    previewImage.value = ''
    previewTitle.value = ''
  }

  /**
   * 下载图片
   * @description 通过创建临时链接下载当前预览的图片
   */
  const handleDownload = () => {
    if (previewImage.value) {
      const link = document.createElement('a')
      link.href = previewImage.value
      link.download = previewTitle.value
      link.click()
    }
  }

  return {
    // 状态
    previewVisible,
    previewImage,
    previewTitle,
    // 方法
    handlePreview,
    handlePreviewClose,
    handleDownload,
  }
}
