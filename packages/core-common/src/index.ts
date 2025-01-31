/**
 * AYU 业务组件库，提供了一系列高度封装的业务组件，用于快速构建企业级应用。
 *
 * @packageDocumentation
 *
 * @remarks
 * 安装:
 * ```bash
 * # 使用 npm
 * npm install @ayu-mu/core-common
 *
 * # 使用 pnpm
 * pnpm add @ayu-mu/core-common
 * ```
 *
 * 基础使用:
 * ```typescript
 * import { AyuForm } from '@ayu-mu/core-common'
 * import '@ayu-mu/core-common/style.css'
 * ```
 *
 * ### 主要功能
 *
 * #### AyuForm 表单组件
 * - 支持分组和未分组两种模式
 * - 提供多种分组展示方式（默认、折叠面板、卡片）
 * - 自动表单验证
 * - 灵活的布局配置
 * - 支持自定义表单项
 *
 * ### 依赖说明
 * - 基于 Vue 3.x
 * - 使用 Element Plus 作为基础组件库
 * - 集成 Tailwind CSS
 *
 * ### 版本要求
 * - Vue >= 3.4.0
 * - Element Plus >= 2.7.0
 * - TypeScript >= 5.x
 *

 */

import './tailwind.css'

export * from './basic'
