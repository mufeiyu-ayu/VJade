import type { Preview } from '@storybook/vue3'
import { http, HttpResponse } from 'msw'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '@ayu-mu/common/style'

initialize()
const preview: Preview = {
  parameters: {
    msw: {
      // 提取到全局
      handlers: [
        http.get('/api/button-types', async () => {
          return HttpResponse.json({
            code: 0,
            data: [
              { label: '默认11', value: '' },
              { label: '主要11', value: 'primary' },
              { label: '成功111', value: 'success' },
              { label: '警告111', value: 'warning' },
              { label: '危险11', value: 'danger' },
              { label: '信息111', value: '我发请求获取的' },
            ],
          })
        }),
      ],
    },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [
    mswLoader,
    async ({ args, argTypes }) => {
      console.log(args)
      try {
        const response = await fetch('/api/button-types')
        const { data } = await response.json()

        // 更新 type 的可选项
        argTypes.type!.options = data.map(item => item.value)

        return {}
      }
      catch (error) {
        console.error('Failed to load button types:', error)
        return {}
      }
    },
  ],
}

export default preview
