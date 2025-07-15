import type { UploadFile, UploadRawFile, UploadRequestOptions, UploadUserFile } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import type { UploadImageProps } from '../index.vue'
import { ElLoading, ElMessage } from 'element-plus'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue'

export function useUpLoadImg() {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const props = instance.props as unknown as UploadImageProps
  const emit = instance.emit
  const fileList = ref<(UploadUserFile)[]>([])
  const uploadRef = ref()
  const maxSize = props.maxSize || 4 * 1024 * 1024
  const accept = props.accept || 'image/png,image/jpeg,image/jpg'
  const imgNum = props.imgNum || 4
  const isSelected = ref(false)

  // 处理选中状态
  const handleSelect = () => {
    isSelected.value = true
  }

  // 处理失焦状态
  const handleBlur = () => {
    isSelected.value = false
  }

  // 🔥 提取 emit 函数，传递 file 对象集合
  const emitFileChange = () => {
    const files = fileList.value.map((file) => {
      if (props?.uploadFn) {
        return file.url
      }
      else {
        return file.raw
      }
    }).filter(Boolean) as unknown as string[]
    emit('update:modelValue', files)
  }

  // 初始化fileList
  const initFileList = (urls: string[]) => {
    if (!urls || !Array.isArray(urls))
      return
    fileList.value = urls.map((url, index) => ({
      name: `image-${index + 1}`,
      url,
      status: 'success',
      uid: Date.now() + index,
    }))
  }

  const handleUpload = async (options: UploadRequestOptions) => {
    const { file } = options

    // 🔥 使用 FileReader 创建 data URL（与粘贴保持一致）
    const reader = new FileReader()
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string

      const uploadFile: UploadFile = {
        name: file.name,
        size: file.size,
        // @ts-ignore
        type: file.type,
        uid: file.uid || Date.now(),
        url: dataUrl, // 🔥 使用 data URL
        status: 'success',
        raw: file,
      }

      if (props?.uploadFn) {
        const loading = ElLoading.service({
          lock: true,
          text: 'uploading...',
          background: 'rgba(0, 0, 0, 0.7)',
          target: uploadRef.value,
        })
        try {
          const url = await props.uploadFn(file)
          if (url) {
            fileList.value.push({
              url,
              name: file.name,
            })
          }
        }
        catch (error) {
          console.log(error, 'error----')
        }
        finally {
          loading.close()
        }
      }
      else {
        fileList.value.push(uploadFile)
      }
      // 🔥 使用提取的函数
      emitFileChange()
    }

    reader.readAsDataURL(file)
    return Promise.resolve(file)
  }

  const handleRemove = (file: UploadFile) => {
    const index = fileList.value.findIndex(item => item.url === file.url)
    console.log(index, 'index----')
    if (index !== -1) {
      fileList.value.splice(index, 1)
      // 🔥 使用提取的函数
      emitFileChange()
    }
  }

  // 处理文件上传前的校验
  const isDuplicateFile = (file: File) => {
    return fileList.value.some((item) => {
      // 只检查文件名是否相同即可，因为即使是同一个文件重新上传，size 可能会不同
      // @ts-ignore
      return item.name === file.name
    })
  }

  const beforeUpload = (file: UploadRawFile) => {
    if (fileList.value.length >= imgNum) {
      ElMessage.error(`图片数量不能超过${imgNum}`)
      return false
    }
    // 检查重复文件
    if (isDuplicateFile(file)) {
      ElMessage.error(`文件 ${file.name} 已存在，请不要重复上传`)
      return false
    }
    // 检查文件类型
    if (!accept.includes(file.type)) {
      ElMessage.error(`文件类型不支持`)
      return false
    }
    // 检查文件大小
    if (file.size > maxSize) {
      ElMessage.error(`文件大小不能超过${maxSize / 1024 / 1024}MB`)
      return false
    }
    return true
  }

  const handlePasteImage = (event: ClipboardEvent) => {
    // 如果组件未被选中，直接返回
    if (!isSelected.value)
      return

    // 检查剪贴板数据是否存在
    if (event.clipboardData && event.clipboardData.items) {
      // 遍历剪贴板中的数据项
      for (let i = 0; i < event.clipboardData.items.length; i++) {
        const item = event.clipboardData.items[i]
        // 检查是否是图片类型
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile() // 获取图片文件
          if (file) {
            // 进行文件校验
            if (beforeUpload(file as unknown as UploadRawFile)) {
              // 生成唯一的文件名
              const timestamp = Date.now()
              const randomNum = Math.floor(Math.random() * 10000)
              const fileExtension = file.name.split('.').pop() || 'png'
              const uniqueName = `paste_image_${timestamp}_${randomNum}.${fileExtension}`

              // 🔥 使用 FileReader 创建 data URL
              const reader = new FileReader()
              reader.onload = async (e) => {
                const dataUrl = e.target?.result as string

                // 创建完整的 UploadFile 对象
                const enhancedFile: UploadFile = {
                  name: uniqueName,
                  size: file.size,
                  type: file.type,
                  uid: timestamp,
                  url: dataUrl, // 🔥 使用 data URL
                  status: 'success',
                  // @ts-ignore
                  raw: file,
                }

                if (props.uploadFn) {
                  const loading = ElLoading.service({
                    lock: true,
                    text: 'uploading...',
                    background: 'rgba(0, 0, 0, 0.7)',
                    target: uploadRef.value,
                  })
                  try {
                    const url = await props.uploadFn(file as unknown as UploadRawFile)
                    fileList.value.push({
                      url,
                      name: uniqueName,
                    })
                  }
                  catch (error) {
                    console.log(error, 'error----')
                  }
                  finally {
                    loading.close()
                  }
                }
                else {
                  fileList.value.push(enhancedFile)
                }
                // 🔥 使用提取的函数
                emitFileChange()
              }

              // 读取文件为 data URL
              reader.readAsDataURL(file)
            }
          }
        }
      }
    }
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (!val || !val.length) {
        fileList.value = []
      }
      else if (Array.isArray(val) && val.length > 0) {
        // 只在fileList为空时初始化，避免重复设置
        if (fileList.value.length === 0) {
          initFileList(val as string[])
        }
      }
    },
    { immediate: true },
  )

  const placeholderComp = computed(() => {
    const language = localStorage.getItem('userLanguage') || 'zh'
    const languageItem = props.languageList?.find(item => item.language === language)
    return languageItem?.placeholder || '支持拖曳,点击,粘贴等操作'
  })
  onMounted(() => {
    if (props.modelValue) {
      initFileList(Array.isArray(props.modelValue) ? props.modelValue as string[] : [props.modelValue as string])
    }
    // 添加粘贴事件监听器
    document.addEventListener('paste', handlePasteImage)
  })

  onUnmounted(() => {
    // 移除粘贴事件监听器
    document.removeEventListener('paste', handlePasteImage)
  })

  return {
    fileList,
    handleUpload,
    handleRemove,
    beforeUpload,
    isSelected,
    handleSelect,
    handleBlur,
    placeholderComp,
    accept,
    uploadRef,
  }
}
