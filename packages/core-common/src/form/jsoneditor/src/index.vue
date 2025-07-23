<script setup lang="ts">
import type JSONEditor from 'jsoneditor'
import { ElMessage } from 'element-plus'
import { nextTick, ref } from 'vue'
// 样式已全局引入，无需在此 import

const props = defineProps<{
  modelValue: object | string
  returnType?: 'json' | 'object'
}>()
const jsonEditorVueRef = ref<HTMLDivElement | null>(null)
const jsonEditorInstance = ref<JSONEditor | null>(null)
const jsonValueModel = defineModel()
const visible = ref(false)

// 动态导入 JSONEditor
async function loadJSONEditor() {
  if (!jsonEditorInstance.value) {
    const { default: JSONEditor } = await import('jsoneditor')
    // 引入 css
    import('jsoneditor/dist/jsoneditor.min.css')
    if (jsonEditorVueRef.value) {
      jsonEditorInstance.value = new JSONEditor(jsonEditorVueRef.value, {
        mode: 'code',
        indentation: 2,
      })
    }
  }
}

function handleOpen(res: object | string) {
  visible.value = true

  nextTick(async () => {
    await loadJSONEditor()

    if (jsonEditorInstance.value) {
      if (props.returnType === 'json') {
        jsonEditorInstance.value.set(JSON.parse(res as string))
      }
      else {
        jsonEditorInstance.value.set(res)
      }
    }
  })
}

function handleClose() {
  visible.value = false

  // 销毁 JSONEditor 实例
  if (jsonEditorInstance.value) {
    jsonEditorInstance.value.destroy()
    jsonEditorInstance.value = null
  }
}

// 验证 JSON 格式并获取值
function handleConfirm() {
  try {
    if (jsonEditorInstance.value) {
      // 获取编辑器中的值
      const editorValue = jsonEditorInstance.value.get()

      if (props.returnType === 'json') {
        jsonValueModel.value = JSON.stringify(editorValue)
      }
      else {
        jsonValueModel.value = editorValue
      }

      // 验证成功后关闭弹窗
      handleClose()
    }
  }
  catch {
    ElMessage.error('json 格式错误')
  }
}

defineExpose({
  open: handleOpen,
  visible,
})
</script>

<template>
  <div>
    <slot />
    <ElDialog
      v-model="visible"
      :close-on-click-modal="false"
      width="40vw"
      destroy-on-close

      @close="handleClose"
    >
      <template #header="{ titleId, titleClass }">
        <div class="flex items-center justify-between w-full">
          <h4 :id="titleId" :class="titleClass">
            属性设置
          </h4>
        </div>
      </template>

      <div
        ref="jsonEditorVueRef"
        class="w-full h-[400px]"
      />

      <template #footer>
        <ElButton @click="handleClose">
          关闭
        </ElButton>
        <ElButton type="primary" @click="handleConfirm">
          确定
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>
