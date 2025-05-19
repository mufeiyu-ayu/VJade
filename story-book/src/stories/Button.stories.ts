import type { Meta, StoryObj } from '@storybook/vue3'
import { AyuButton } from '@ayu-mu/common'
import { fn } from '@storybook/test'
// import { http, HttpResponse, delay } from 'msw'
// import { computed, onMounted, ref, watch } from 'vue'
// 模拟异步获取按钮类型选项

const meta: Meta<typeof AyuButton> = {
  title: '基础组件/Button', // 改为更规范的路径
  component: AyuButton,
  tags: ['autodocs'],
  argTypes: {
    // 完善每个属性的描述和配置
    type: {
      description: '按钮类型',
      control: 'select',
      options: [],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'success' },
        category: '外观',
      },
    },
    size: {
      description: '按钮尺寸',
      control: 'select',
      options: ['large', 'default', 'small', ''],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: '外观',
      },
    },
    plain: {
      description: '是否为朴素按钮',
      control: 'boolean',
      table: {
        category: '外观',
        defaultValue: { summary: 'false' },
      },
    },
    bg: {
      description: '是否显示背景色',
      control: 'boolean',
      table: {
        category: '外观',
        defaultValue: { summary: 'false' },
      },
    },
    link: {
      description: '是否为链接按钮',
      control: 'boolean',
      table: {
        category: '外观',
        defaultValue: { summary: 'false' },
      },
    },
    round: {
      description: '是否为圆角按钮',
      control: 'boolean',
      table: {
        category: '外观',
        defaultValue: { summary: 'false' },
      },
    },
    circle: {
      description: '是否为圆形按钮',
      control: 'boolean',
      table: {
        category: '外观',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '是否禁用',
      control: 'boolean',
      table: {
        category: '状态',
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description: '是否显示加载状态',
      control: 'boolean',
      table: {
        category: '状态',
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      description: '图标类名',
      control: 'text',
      table: {
        category: '内容',
        defaultValue: { summary: '' },
      },
    },
    color: {
      description: '自定义颜色',
      control: 'color',
      table: {
        category: '外观',
        defaultValue: { summary: '' },
      },
    },
    tag: {
      description: '自定义元素标签',
      control: 'text',
      table: {
        category: '高级',
        defaultValue: { summary: 'button' },
      },
    },
    nativeType: {
      description: '原生 type 属性',
      control: 'select',
      options: ['button', 'submit', 'reset'],
      table: {
        category: '高级',
        defaultValue: { summary: 'button' },
      },
    },
    throttleDuration: {
      description: '节流时长(ms)',
      control: 'number',
      table: {
        category: '高级',
        defaultValue: { summary: '300' },
      },
    },
    onClick: {
      description: '点击事件',
      action: 'clicked',
      table: {
        category: '事件',
      },
    },
  },
  args: {
    onClick: fn(),
    type: 'success',
  },
  // msw: {
  //   handlers: [
  //     http.get('/api/button-types', async () => {
  //       return HttpResponse.json({
  //         code: 0,
  //         data: [
  //           { label: '默认11', value: '' },
  //           { label: '主要11', value: 'primary' },
  //           { label: '成功111', value: 'success' },
  //           { label: '警告111', value: 'warning' },
  //           { label: '危险11', value: 'danger' },
  //           { label: '信息111', value: '我发请求获取的' }
  //         ]
  //       })
  //     })
  //   ]
  // },
  // loaders: [
  //   async ({ args, argTypes }) => {
  //     try {
  //       const response = await fetch('/api/button-types')
  //       const { data } = await response.json()
  //
  //       // 更新 type 的可选项
  //       argTypes.type!.options = data.map((item) => item.value)
  //
  //       return {}
  //     } catch (error) {
  //       console.error('Failed to load button types:', error)
  //       return {}
  //     }
  //   }
  // ],
  // play: async ({ argTypes }) => {
  //   // const response = await fetch('/api/button-types')
  //   // const { data } = await response.json()
  //   console.log(2222)
  //   // 更新 type 的可选项
  //   // argTypes.type!.options = data.map((item) => item.value)
  //   argTypes.type!.options = ['primary', 'success', 'warning', 'danger', '自定义接口']
  // },
  // 添加组件描述
  parameters: {
    docs: {
      description: {
        component: 'AyuButton 按钮组件，用于触发操作和事件。支持多种类型、尺寸和状态。',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    type: 'error',
  },
  render: args => ({
    components: { AyuButton },
    setup() {
      return { args }
    },
    template: '<ayu-button  v-bind="args" >基础按钮</ayu-button>',
  }),
}

// 按钮类型
export const Types: Story = {
  args: {
    type: 'primary', // 设置默认值
  },
  render: args => ({
    components: { AyuButton },
    setup() {
      return { args }
    },
    template: '<ayu-button v-bind="args">基础按钮</ayu-button>',
  }),
}
// 按钮尺寸
export const Sizes: Story = {
  render: () => ({
    components: { AyuButton },
    template: `
      <div class="space-y-2">
        <div class="space-x-2">
          <ayu-button size="small" type="primary">小号按钮</ayu-button>
          <ayu-button type="primary">默认按钮</ayu-button>
          <ayu-button size="large" type="primary">大号按钮</ayu-button>
        </div>
      </div>
    `,
  }),
}

// 朴素按钮
export const Plain: Story = {
  render: () => ({
    components: { AyuButton },
    template: `
      <div class="space-x-2">
        <ayu-button v-bind="$props">基础按钮</ayu-button>
        <ayu-button plain type="success">朴素按钮</ayu-button>
      </div>
    `,
  }),
}

// 圆角和圆形
export const Shapes: Story = {
  render: () => ({
    components: { AyuButton },
    template: `
      <div class="space-x-2">
        <ayu-button round type="primary">圆角按钮</ayu-button>
        <ayu-button circle type="success" icon="check"></ayu-button>
      </div>
    `,
  }),
}

// 禁用状态
export const Disabled: Story = {
  render: () => ({
    components: { AyuButton },
    template: `
      <div class="space-x-2">
        <ayu-button disabled>禁用按钮</ayu-button>
        <ayu-button disabled type="primary">禁用按钮</ayu-button>
      </div>
    `,
  }),
}

// 加载状态
export const Loading: Story = {
  render: () => ({
    components: { AyuButton },
    template: `
      <div class="space-x-2">
        <ayu-button loading>加载中</ayu-button>
        <ayu-button loading type="primary">加载中</ayu-button>
      </div>
    `,
  }),
}
