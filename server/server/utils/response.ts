import type { EventHandlerRequest, H3Event } from 'h3'

/**
 * 响应成功
 * @param data 响应数据
 * @returns 响应对象
 */
export function useResponseSuccess<T = any>(data: T) {
  return {
    code: 0,
    ...data,
    error: null,
    message: 'ok',
  }
}

/**
 * 响应失败
 * @param message 错误信息
 * @param error 错误对象
 * @returns 响应对象
 */
export function useResponseError(message: string, error: any = null) {
  return {
    code: -1,
    data: null,
    error,
    message,
  }
}

/**
 * 分页
 * @param pageNo 页码
 * @param pageSize 每页条数
 * @param array 数据源
 * @returns 分页数据
 */
export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset)
    : array.slice(offset, offset + Number(pageSize))
}

/**
 * 分页响应成功
 * @param page 页码
 * @param pageSize 每页条数
 * @param list 数据源
 * @param message 消息
 * @returns 分页响应对象
 */
export function usePageResponseSuccess<T = any>(
  page: number | string,
  pageSize: number | string,
  list: T[],
  { message = 'ok' } = {},
) {
  const pageData = pagination(Number.parseInt(`${page}`), Number.parseInt(`${pageSize}`), list)

  return {
    ...useResponseSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  }
}

/**
 * 分页响应失败
 * @param message 错误信息
 * @param error 错误对象
 * @returns 分页响应对象
 */
export function usePageResponseError(message: string, error: any = null) {
  return {
    ...useResponseError(message, error),
    items: [],
    total: 0,
  }
}

/**
 * 禁止访问
 * @param event 事件对象
 * @param message 错误信息
 * @returns 禁止访问响应对象
 */
export function forbiddenResponse(event: H3Event<EventHandlerRequest>, message = 'Forbidden Exception') {
  setResponseStatus(event, 403)
  return useResponseError(message, message)
}

/**
 * 未授权
 * @param event 事件对象
 * @returns 未授权响应对象
 */
export function unAuthorizedResponse(event: H3Event<EventHandlerRequest>) {
  setResponseStatus(event, 401)
  return useResponseError('Unauthorized Exception', 'Unauthorized Exception')
}

/**
 * 睡眠
 * @param ms 睡眠时间
 * @returns 睡眠响应对象
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
