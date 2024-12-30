<!--
 * @Author: achuang
 * @Date: 2024-11-18 11:01:34
 * @LastEditTime: 2024-11-18 11:02:06
 * @LastEditors: achuang
-->

## Web Build - 前端开发工具集

Web Build 是一个基于 monorepo + workspace + turbo 架构的前端开发工具集，旨在提供高效的开发体验。该项目整合了 代码规范、工具函数、组件封装 和 自动化文档生成 等功能，为开发者提供全方位的支持，提升开发效率和代码质量。

### 项目架构

该项目采用现代前端架构，基于 monorepo、workspace 和 turbo 组织多个模块，能够更好地管理代码和依赖。通过将工具函数、组件库和自动生成文档等模块集中管理，极大简化了项目结构并提高了开发效率。

### 功能亮点

- 🔧模块化架构：基于 monorepo 和 workspace，将所有模块整合到一个仓库中，方便管理与依赖更新。<br/>
- ⚡ 高效开发：通过 turbo 实现高效的任务运行和增量构建，提升开发效率，减少不必要的编译与打包时间。<br/>
- 📏 统一代码规范：集成了统一的代码规范和最佳实践，保证代码质量和团队协作的一致性。<br/>
- 🛠️ 工具函数集：封装了一系列实用的工具函数，提升开发便捷性，减少重复造轮子。<br/>
- 🎨 组件库封装：提供了一些基础组件的封装，便于快速开发高质量的用户界面。<br/>
- 📚 自动化文档生成：通过 API Extractor 等工具自动生成 API 文档，提升文档维护效率。<br/>

### 技术栈

- **Vue 3**: 🚀 现代化的前端框架，提供了更强的响应式系统和更清晰的组件化结构。
- **Element Plus**: 🎨 优雅的 Vue 3 UI 组件库，快速构建美观的用户界面。
- **TypeScript**: 🔤 提升开发效率和代码质量的强类型语言。
- **Vite**: ⚡ 极速的构建工具，提供开箱即用的开发环境。
- **TailwindCSS**: 💅 低代码、灵活的 CSS 框架，帮助你快速构建定制化的页面设计。

### 安装

1. 克隆项目仓库：

```bash
git clone https://github.com/mufeiyu-ayu/web-build
```

2. 安装依赖:

```bash
pnpm install
```

3. 初始化项目：

```bash
pnpm pge-init
```

### 使用步骤

在项目根目录执行 pnpm i 安装依赖。
执行 pnpm pge-init 初始化项目设置。

### 功能模块

- 📏 代码规范：集成了常见的前端代码规范，如 ESLint 配置、Prettier 配置等，确保团队成员之间的代码风格一致。
- 🔨 工具函数：提供了常用的工具函数，如数据处理、字符串操作、日期格式化等，帮助开发者减少重复编码。
- 🎨 组件封装：提供一套基础的组件封装，包含常见的 UI 元素，如按钮、输入框、弹窗等，能够快速构建符合规范的界面。
- 📚 文档生成：通过 API Extractor 和相关工具自动生成 API 文档，保持文档与代码同步更新，方便团队成员查阅和使用。
  示例代码

```ts
import { isJsonString } from '@ayu-mu/utils'

const jsonString = '{"name": "Alice", "age": 25}'
if (isJsonString(jsonString)) {
  console.log('Valid JSON:', JSON.parse(jsonString))
} else {
  console.log('Invalid JSON')
}
```

### 贡献

欢迎大家参与贡献，您可以通过以下方式参与：

1. Fork 本仓库
2. 创建 Issue 或 Pull Request
3. 提交 bug 或功能需求

### 许可证

本项目使用 MIT 许可证。
