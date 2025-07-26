import type { PropType } from 'vue'
import type { ActionBarProps } from './types/actionbar'
import { isMobile } from '@ayu-mu/utils'
import { ElButton, ElTooltip } from 'element-plus'
import { defineComponent, toRefs } from 'vue'
import { useActionBar } from './hooks/actionBar'
import { useActionBarButton } from './hooks/actionBar-action.ts'

export default defineComponent({
  name: 'ActionBar',
  props: {
    uid: {
      type: String as PropType<ActionBarProps['uid']>,
      required: true,
    },
    isHideDelete: {
      type: Boolean as PropType<ActionBarProps['isHideDelete']>,
      default: false,
    },
    isHideRightButton: {
      type: Boolean as PropType<ActionBarProps['isHideRightButton']>,
      default: false,
    },
    deleteAllParams: {
      type: String as PropType<ActionBarProps['deleteAllParams']>,
      default: '',
    },
    handleDeleteAll: {
      type: Function as PropType<ActionBarProps['handleDeleteAll']>,
      required: false,
    },
    leftButtons: {
      type: Function as PropType<ActionBarProps['leftButtons']>,
    },
  },
  setup(props, { slots }) {
    const { isHideRightButton } = toRefs(props)
    const { selectedRows, handleDeleteAll } = useActionBar()
    const { rightButtonsGather, onClick } = useActionBarButton()

    return () => (
      <div
        class={`
        w-full h-full
        ${isMobile() ? 'flex flex-col space-y-4' : 'flex items-center justify-between'}
      `}
      >
        {/* 左侧按钮区域 */}
        <div
          class={`
          ${isMobile() ? 'w-full overflow-x-auto pb-3' : 'flex-1'}
        `}
        >
          <div
            class={`
            inline-flex items-center space-x-2
            ${isMobile() ? 'px-2 py-1.5 min-w-full' : ''}
          `}
          >
            {props.leftButtons && props.leftButtons(selectedRows.value)}
            {!props.isHideDelete && (
              <ElButton
                onClick={handleDeleteAll}
                type="danger"
                disabled={selectedRows.value.length === 0}
                class="whitespace-nowrap flex-shrink-0"
              >
                批量删除
              </ElButton>
            )}
          </div>
        </div>

        {/* 右侧按钮区域 */}
        <div
          class={`
          ${isMobile() ? 'w-full overflow-x-auto pb-3' : 'pr-4'}
        `}
        >
          <div
            class={`
            inline-flex items-center space-x-2
            ${isMobile() ? 'px-2 py-1.5 min-w-full' : ''}
          `}
          >
            {!isHideRightButton.value && rightButtonsGather.map(item => (
              slots[item.code]?.({ selectedRows }) || (
                <ElTooltip
                  content={item.title}
                  placement="top"
                  key={item.code}
                >
                  <ElButton
                    {...item}
                    onClick={() => onClick(item)}
                    class="whitespace-nowrap flex-shrink-0"
                  />
                </ElTooltip>
              )
            ))}
            {slots.rightButton?.({ selectedRows })}
          </div>
        </div>
      </div>
    )
  },
})
