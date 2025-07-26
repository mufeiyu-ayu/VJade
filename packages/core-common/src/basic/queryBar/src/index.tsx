import type { PropType } from 'vue'
import type { QueryBarExposeInstance, QueryBarProps } from './types'
import { Refresh, Search } from '@element-plus/icons-vue'
import { ElButton, ElCol, ElDivider, ElForm, ElFormItem, ElRow } from 'element-plus'
import { defineComponent } from 'vue'
import { useComponentRender } from '../../../componentRender'
import { useQueryBar } from './hooks/queryBar'
import './styles/index.css'

export default defineComponent({
  name: 'QueryBar',
  props: {
    /** 唯一标识 */
    uid: {
      type: String,
      default: '',
      required: true,
    },
    /** 表单配置 */
    fieldConfig: {
      type: Array as PropType<QueryBarProps['fieldConfig']>,
      default: () => [],
      required: true,
    },
    /** 是否显示 */
    visible: {
      type: Boolean,
      default: false,
    },

    /** 搜索回调 */
    onSearch: {
      type: Function as PropType<QueryBarProps['onSearch']>,
      default: () => {},
    },
  },
  setup(_props, { slots, expose }) {
    const { formRef, formData, formList, showQueryBar, throttledSearch, throttledReset, getColSize, setFormData, isHorizontal, lookupChange } = useQueryBar()
    const { componentRender } = useComponentRender()
    expose({
      formData: formData.value,
      setFormData,
      queryReset: throttledReset,
    }) as unknown as QueryBarExposeInstance
    return () => (
      <>
        {showQueryBar.value && (
          <>
            <div class="w-full flex flex-col">
              <div class="w-full flex flex-col  p-6 pt-3 pb-0">
                <ElForm
                  class="ayu-form"
                  status-icon
                  scroll-to-error
                  label-position="right"
                  label-width="auto"
                  model={formData.value}
                  ref={formRef}
                >
                  <ElRow gutter={20}>
                    {formList.value.map(item => (
                      <ElCol key={item.field} span={getColSize(item.colSize || 6)}>
                        <ElFormItem label={item.label} prop={item.field}>
                          {slots[item.field]?.({
                            data: {
                              custom: item.custom,
                              formData: formData.value,
                              field: item.field,
                            },
                          }) || componentRender(item.type!, true, {
                            'modelValue': formData.value[item.field],
                            'onUpdate:modelValue': (val: unknown) => {
                              formData.value[item.field] = val
                            },
                            // 键盘回车事件
                            'onKeydown': (e: KeyboardEvent) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                throttledSearch() // 直接调用查询方法
                              }
                            },
                            'onLookupChange': lookupChange,
                            'defaultValue': item.defaultValue,
                            'placeholder': item.placeholder,
                            ...item.custom,
                            'gsName': item.label,
                          })}
                        </ElFormItem>
                      </ElCol>
                    ))}
                    {isHorizontal.value && (
                      <ElCol span={6}>
                        <div class="h-full flex items-start">
                          <ElButton icon={Search} type="primary" onClick={throttledSearch}>查询</ElButton>
                          <ElButton
                            icon={Refresh}
                            type="default"
                            plain
                            onClick={throttledReset}
                            class="ml-2"
                          >
                            重置
                          </ElButton>
                        </div>
                      </ElCol>
                    )}
                  </ElRow>
                </ElForm>
                {!isHorizontal.value && (
                  <div class="w-full flex justify-end mt-4">
                    <div>
                      <ElButton icon={Search} type="primary" onClick={throttledSearch}>查询</ElButton>
                      <ElButton
                        icon={Refresh}
                        type="default"
                        plain
                        onClick={throttledReset}
                        class="ml-2"
                      >
                        重置
                      </ElButton>
                    </div>
                  </div>
                )}
              </div>
              <ElDivider />
            </div>
          </>
        )}
      </>
    )
  },
})
