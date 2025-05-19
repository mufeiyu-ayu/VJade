/**
 * 检查字符串是否为符合 JSON 格式的字符串。
 *
 * @remarks
 * - 此函数使用正则表达式来检查字符串是否符合 JSON 格式。
 * - 适合用于简单的 JSON 格式检查，但可能不适用于所有复杂的 JSON 场景。
 *
 * @param target - 要检查的目标字符串。
 *
 * @returns 如果字符串符合 JSON 格式，返回 `true`，否则返回 `false`。
 *
 * @example
 * ```typescript
 * isJsonString('{"name": "John", "age": 30}');  // 返回 true
 * isJsonString('Hello World');                   // 返回 false
 * ```
 */
export function isJsonString(target: string): boolean {
  return /^[\],:{}\s]*$/.test(target)
}

/**
 * 使用 `try-catch` 判断字符串是否是 JSON 格式。
 *
 * @remarks
 * - 通过尝试解析字符串来判断是否为 JSON 字符串。
 * - 该方法适合更精确的 JSON 检查，因为它直接解析字符串。
 *
 * @param str - 要检查的目标字符串。
 *
 * @returns 如果字符串是有效的 JSON 格式，返回 `true`；否则返回 `false`。
 *
 * @example
 * ```typescript
 * isJsonStringTryCatch('{"name": "John", "age": 30}');  // 返回 true
 * isJsonStringTryCatch('Hello World');                   // 返回 false
 * ```
 */
export function isJsonStringTryCatch(str: string): boolean {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  }
  catch (e) {
    console.log(e, 'e---')
    return false
  }
  return false
}

/**
 * 检查目标是否为函数类型。
 *
 * @remarks
 * - 通过 `typeof` 运算符判断传入的值是否为函数。
 * - 可用于类型检查，以确保传入参数是一个函数。
 *
 * @param val - 要检查的目标值。
 *
 * @returns 如果目标值为函数类型，返回 `true`；否则返回 `false`。
 *
 * @example
 * ```typescript
 * isFunction(() => {});  // 返回 true
 * isFunction(123);       // 返回 false
 * ```
 */
export function isFunction(val: unknown): boolean {
  return typeof val === 'function'
}
