/**
 * 提取 Vue 组件的 Props 类型
 *
 * @typeParam T - Vue 组件类型
 * @returns 组件的 Props 类型定义
 *
 * @example
 * ```ts
 * // 从 Element Plus 的 ElInput 组件提取 Props 类型
 * type InputProps = ExtractComponentProps<typeof ElInput>
 *
 * // 使用提取的类型
 * const inputProps: InputProps = {
 *   modelValue: 'hello',
 *   placeholder: '请输入',
 *   disabled: false
 * }
 * ```
 *
 * @example
 * ```ts
 * // 自定义组件
 * const MyComponent = defineComponent({
 *   props: {
 *     title: String,
 *     count: Number
 *   }
 * })
 *
 * // 提取 MyComponent 的 Props 类型
 * type MyComponentProps = ExtractComponentProps<typeof MyComponent>
 * // 结果类型等同于: { title?: string; count?: number }
 * ```
 *
 * @remarks
 * 这个工具类型主要用于在 TypeScript 中提取 Vue 组件的 Props 类型定义。
 * 它通过检查组件实例的 $props 属性来获取完整的 Props 类型。
 * 如果传入的类型不是有效的 Vue 组件，将返回 never 类型。
 */
export type ExtractComponentProps<T> = T extends new () => { $props: infer P } ? P : never
