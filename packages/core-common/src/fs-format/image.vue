<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { ElDialog, ElImage } from 'element-plus'
// import 'video./js/dist/video-js.css'
import { createFileUrl } from '../form/fs-file-upload'

const props = withDefaults(
  defineProps<{
    modelValue: string | any
    formData?: any
    // 文件上传字段
    uploadField?: string
    showField?: string
    options?: Record<string, any>
    column?: Record<string, any>
    row?: Record<string, any>
  }>(),
  {
    modelValue: []
  }
)
const value = ref(props.modelValue)
const showVideoViewer = ref(false)
watchEffect(() => {
  let files = props.formData?.[props?.uploadField || 'files'] ?? props.modelValue
  //过滤得到要显示的字段
  if (props.showField) {
    files = files?.filter && files?.filter((item) => item.busiType === props.showField)
  }
  // files = isJsonStringTryCatch(props.formData?.['files'])
  //   ? JSON.parse(props.formData?.['files'])
  //   : isArray(props.formData?.['files'])
  //     ? props.formData?.['files']
  //     : []
  if (files?.length)
    files?.forEach((file: any) => {
      file.url = createFileUrl(file)
    })
  value.value = files
})
</script>

<template>
  <div class="flex flex-row">
    <div v-for="item in value" class="mr-2">
      <el-image
        v-if="item?.type?.includes('image')"
        style="width: 40px; height: 40px"
        :src="item.url"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :initial-index="4"
        :preview-src-list="[item.url]"
        fit="cover"
      />
      <video
        v-if="item?.type?.includes('video')"
        style="width: 40px; height: 40px"
        :src="item.url"
        @click="showVideoViewer = !showVideoViewer"
      ></video>

      <el-dialog
        v-if="item?.type?.includes('video')"
        v-model="showVideoViewer"
        class="h-[600px]"
        :close-on-click-modal="true"
      >
        <div class="flex justify-center items-center pb-10 h-[560px]">
          <!--          <video-player :src="item.url" controls width="500" />-->
          <video :src="item.url" controls class="w-full h-full"></video>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
