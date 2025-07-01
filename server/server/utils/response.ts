import type { EventHandlerRequest, H3Event } from 'h3'
import { setResponseStatus } from 'h3'

/**
 * 响应数据接口
 */
interface ResponseData<T = unknown> {
  [key: string]: T
}

/**
 * 错误信息接口
 */
interface ErrorInfo {
  message?: string
  stack?: string
  [key: string]: unknown
}

/**
 * 分页响应参数接口
 */
interface PageResponseParams<T = unknown> {
  page: number | string
  pageSize: number | string
  list: T[]
  message?: string
}

/**
 * 响应成功
 * @param data 响应数据
 * @returns 响应对象
 */
export function responseSuccess<T extends ResponseData = ResponseData>(data: T) {
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
export function responseError(message: string, error: ErrorInfo | null = null) {
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
export function pagination<T = unknown>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset)
    : array.slice(offset, offset + Number(pageSize))
}

/**
 * 分页响应成功
 * @param params 分页参数
 * @param params.page 页码
 * @param params.pageSize 每页条数
 * @param params.list 数据源
 * @param params.message 消息
 * @returns 分页响应对象
 */
export function pageResponseSuccess<T = unknown>(params: PageResponseParams<T>) {
  const { page, pageSize, list, message = 'ok' } = params
  const pageData = pagination(Number.parseInt(`${page}`), Number.parseInt(`${pageSize}`), list)

  return {
    ...responseSuccess({
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
export function pageResponseError(message: string, error: ErrorInfo | null = null) {
  return {
    ...responseError(message, error),
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
  return responseError(message, { message })
}

/**
 * 未授权
 * @param event 事件对象
 * @returns 未授权响应对象
 */
export function unAuthorizedResponse(event: H3Event<EventHandlerRequest>) {
  setResponseStatus(event, 401)
  return responseError('Unauthorized Exception', { message: 'Unauthorized Exception' })
}

/**
 * 睡眠
 * @param ms 睡眠时间
 * @returns Promise<void>
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
