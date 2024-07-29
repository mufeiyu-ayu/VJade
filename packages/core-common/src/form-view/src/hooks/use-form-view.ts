import {
  onMounted,
  type ComponentInternalInstance,
  reactive,
  getCurrentInstance,
  ref,
  toRaw,
  computed,
  useAttrs,
  provide,
  onActivated,
  onDeactivated
} from 'vue'
import { useEventBus } from '@ayu/hooks/use-EventBus'
import { EventTypeEnum } from '@ayu/model'
import { useFormStore } from './use-form-store'
import { FormStatusEnum } from '../types/enum.ts'
import type { FormViewProps } from '../types/props.ts'
import DialogContainer from '../component/form-dialog-container.vue'
import DivContainer from '../component/form-div-container.vue'
import DrawerContainer from '../component/form-drawer-container.vue'
import FormViewContent from '../component/form-view-content.vue'
import { ElMessageBox } from 'element-plus'

export const useFormView = () => {
  const { props } = getCurrentInstance() as ComponentInternalInstance & { props: FormViewProps }
  const emit = getCurrentInstance()?.emit
  const route = (props.context as any).meta
  const attrs = useAttrs()
  const EventBus = useEventBus([
    `${props?.voName}:${EventTypeEnum.FORM_VIEW_ADD}`,
    `${props?.voName}:${EventTypeEnum.FORM_VIEW_EDIT}`,
    `${props.voName}:${EventTypeEnum.FORM_VIEW_VIEW}`,
    `${props.voName}:${EventTypeEnum.TABLE_GRID_STATUS_HIDE}`,
    `${props?.voName}:${EventTypeEnum.ACTION_BAR_STATUS_HIDE}`
  ])

  const formStore = useFormStore()

  // 表单引用
  const formContainer = ref<InstanceType<typeof DialogContainer>>()

  // 表单内容引用
  const formContent = ref<InstanceType<typeof FormViewContent>>()

  //表单状态
  const state = reactive({
    visible: false, // 弹窗显示隐藏
    primaryKeyValue: 0,
    formStatus: FormStatusEnum.NEW // 编辑状态
  })

  // 暴露出组件状态
  provide('formViewState', state)

  /* @description 关闭弹窗 */
  const close = async (item = null) => {
    EventBus.emit(`${props?.voName}:${EventTypeEnum.ACTION_BAR_STATUS_HIDE}`, true)
    if (state.formStatus !== 'View' && props.layoutType === 'div' && !item) {
      await ElMessageBox.confirm('退出将丢失当前编辑内容，是否继续？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
    EventBus.emit(`${props?.voName}:${EventTypeEnum.TABLE_GRID_STATUS_HIDE}`, false)
    state.visible = false

    // 清空表单状态
    formContent?.value?.resetForm()
    formContainer?.value?.resetForm()
    formStore.state.disabled = false
  }

  /* @description 表单属性 */
  const formContentProps = computed(() => {
    return {
      voName: props.voName,
      formStatus: state.formStatus,
      ...attrs
    }
  })

  /* @description 容器绑定属性 */
  const containerBindValue = computed(() => {
    return {
      voName: props.voName,
      visible: state.visible,
      formStatus: state.formStatus,
      formTitle: toRaw(formTitle.value),
      onClose: close,
      ...attrs
    }
  })

  /* @description 表单类型 */
  const currentComponent = computed(() => {
    if (props.layoutType === 'div') return DivContainer
    if (props.layoutType === 'dialog') return DialogContainer
    if (props.layoutType === 'drawer') return DrawerContainer
  })

  /* @description 表单标题 */
  const formTitle = computed(() => {
    if (props.title) return props.title
    const title = route?.meta?.title || '表单'
    if (state.formStatus === FormStatusEnum.NEW) return title + '-添加'
    if (state.formStatus === FormStatusEnum.EDIT) return title + '-编辑'
    if (state.formStatus === FormStatusEnum.VIEW) return title + '-详情'
  })

  /* @description 根据 vo 生成字段数组 */
  const fields = computed(() => {
    return formStore.state.formItemsConfig.map((item) => {
      return item.property
    })
  })

  /* @description 表单改变事件 */
  const formChange = (formData: any) => {
    emit && emit('change', formData)
  }
  /* @description 初始化事件 */

  const isInitEvent = ref(false)

  const initEvent = () => {
    if (isInitEvent.value) return

    /* @description 当触发表单为添加状态时 */
    EventBus.on(`${props.voName}:${EventTypeEnum.FORM_VIEW_ADD}`, () => {
      EventBus.emit(`${props.voName}:${EventTypeEnum.TABLE_GRID_STATUS_HIDE}`, true)
      state.visible = !state.visible // 我认为直接写 true 即可
      state.formStatus = FormStatusEnum.NEW
    })

    /* @description 当触发表单为编辑状态时  */
    EventBus.on(`${props.voName}:${EventTypeEnum.FORM_VIEW_EDIT}`, (primaryKeyValue) => {
      EventBus.emit(`${props.voName}:${EventTypeEnum.ACTION_BAR_STATUS_HIDE}`, true)
      state.visible = !state.visible // 我认为直接写 true 即可
      state.primaryKeyValue = (primaryKeyValue as number[])[0]
      state.formStatus = FormStatusEnum.EDIT
    })

    /* @description 当触发表单为查看状态时 */
    EventBus.on(`${props.voName}:${EventTypeEnum.FORM_VIEW_VIEW}`, (primaryKeyValue) => {
      EventBus.emit(`${props.voName}:${EventTypeEnum.ACTION_BAR_STATUS_HIDE}`, true)
      state.visible = !state.visible // 我认为直接写 true 即可
      state.primaryKeyValue = (primaryKeyValue as number[])[0]
      state.formStatus = FormStatusEnum.VIEW
    })

    isInitEvent.value = true
  }

  onMounted(() => initEvent())

  onActivated(() => initEvent())

  onDeactivated(() => {
    EventBus.off(`${props.voName}:${EventTypeEnum.FORM_VIEW_ADD}`)
    EventBus.off(`${props.voName}:${EventTypeEnum.FORM_VIEW_EDIT}`)
    EventBus.off(`${props.voName}:${EventTypeEnum.FORM_VIEW_VIEW}`)
  })

  return {
    state,
    formContentProps,
    containerBindValue,
    currentComponent,
    formTitle,
    fields,
    formChange
  }
}
