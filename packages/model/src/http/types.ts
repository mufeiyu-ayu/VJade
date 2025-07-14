import type { AxiosRequestConfig, AxiosRequestHeaders, CreateAxiosDefaults } from 'axios'
import type { ResponseCodeEnum, SummaryParameter } from '.'
import type { DataBaseType } from '../base'

/**
 * 创建Axios实例配置类型
 */
export interface CreateAxiosOptionsType extends Partial<CreateAxiosDefaults> {
  requestOptions: RequestOptionsType
}

/**
 * 请求配置类型
 */
export interface RequestConfigType extends Partial<AxiosRequestConfig> {
  requestOptions?: RequestOptionsType
}

/**
 * 请求选项类型
 */
export interface RequestOptionsType {
  /**
   * 请求参数拼接到url Params形式
   */
  joinParamsToUrl?: boolean
  /**
   * 成功的文本信息
   */
  successMessageText?: string
  /**
   * 是否显示成功信息
   */
  isShowSuccessMessage?: boolean
  /**
   * 是否显示失败信息
   */
  isShowErrorMessage?: boolean
  /**
   * 错误的文本信息
   */
  errorMessageText?: string
  /**
   * 是否展示loading
   */
  isShowLoading?: boolean
  /**
   * loading文本信息
   */
  loadingMessageText?: string
  /**
   * 是否携带token
   */
  withToken?: boolean
  /**
   * 是否携带X-App-Id
   */
  withXAppId?: boolean
  /**
   * 是否携带X-Tenant-Id
   */
  withTenantId?: boolean
  /**
   * 请求头
   */
  headers?: Partial<AxiosRequestHeaders>
}

/**
 * 通用请求返回值类型
 */
export interface CommonResultType<T = object> {
  code: ResponseCodeEnum
  message: string
  data: T
}

/**
 * 分页请求返回值类型
 */
export interface PageResultType<T> {
  content: T[]
  total: number
  totalElements: number
  summaryParameters: SummaryParameter[]
}

/**
 * 数据源返回类型
 */
export interface DataSourceResultType<T> {
  totalCount: number
  data: T[]
  summary: unknown[]
}

/**
 * 文件上传参数类型
 */
export interface UploadFileParamsType<T = unknown> {
  /**
   * 请求参数
   */
  data?: Record<string, T>
  /**
   * 文件参数接口字段名
   */
  name?: string
  /**
   * 文件流
   */
  file: File | Blob
  /**
   * 文件名称
   */
  filename?: string
  /**
   * 文件类型
   */
  types: FileType[]
  /**
   * 其它参数
   */
  [key: string]: unknown
}

/**
 * 文件上传成功后的返回值类型
 */
export interface UploadFileType extends DataBaseType {
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 目录id
   */
  dirId: number
  /**
   * 文件名称
   */
  name: string
  /**
   * 文件上传时的名称
   */
  originalName: string
  /**
   * 路径
   */
  path: string
  /**
   * 文件大小
   */
  size: number
  /**
   * 文件类型
   */
  type: string
  /**
   * 访问地址
   */
  url: string
}

/**
 * 上传文件类型
 */
export interface FileType {
  type: string
  names: string[]
}

/**
 * 数据返回类型
 */
export type DataType<T> = PageResultType<T> | T[] | DataSourceResultType<T> | number

/**
 * 计算类型
 */
export type SumType = 'sum' | 'avg' | 'count' | 'max' | 'min'

/**
 * 查询类型
 */
export type QueryOperator = 'eq' | 'contains' | 'in' | 'le' | 'ge' | 'noteq'
