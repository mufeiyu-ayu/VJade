import type FormViewContent from '../components/FormViewContent.vue'
import type { FormProps } from '../types'
import { isMobile } from '@ayu-mu/utils'
import { computed, getCurrentInstance, ref } from 'vue'
import FormDialog from '../components/FormDialog.vue'
import FormDiv from '../components/FormDiv.vue'

export function useFormHooks() {
  const instance = getCurrentInstance()
  const props = instance?.props as unknown as FormProps
  const modelVisivle = ref(props?.visible || false)
  const formContentRef = ref<InstanceType<typeof FormViewContent>>()

  /**   打开弹窗/抽屉 */
  function handleOpen() {
    modelVisivle.value = true
  }

  /**   关闭弹窗/抽屉 */
  function handleClose() {
    modelVisivle.value = false
  }

  /**   根据表单类型渲染表单类型组件 */
  const formContainerType = computed(() => {
    switch (props.componentType) {
      case 'dialog':
        return FormDialog
      case 'drawer':
        return FormDialog
      case 'div':
        return FormDiv
      default:
        return FormDialog
    }
  })

  const formContainerProps = computed(() => {
    switch (props.componentType) {
      case 'dialog':
      case 'drawer':
        return {
          modelValue: modelVisivle.value,
          width: isMobile() ? '80vw' : props.width,
          title: props.title,
          cancelText: props.cancelText,
          confirmText: props.confirmText,
          languageList: props.languageList,
          height: props.height,
          onSubmit: props.onSubmit,
          handleOpen,
          handleClose,
        }
      case 'div':
        return {
          modelValue: modelVisivle.value,
        }
      default:
        return {}
    }
  })
  return {
    formContainerType,
    formContainerProps,
    formContentRef,
    handleOpen,
    handleClose,
  }
}
