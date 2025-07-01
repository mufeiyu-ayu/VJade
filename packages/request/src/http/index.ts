import type { CreateAxiosOptionsType } from '@ayu-mu/model'
import { AyuAxios } from './Axios'

// 全局请求默认配置
const defaultOptions: CreateAxiosOptionsType = {
  timeout: 100000,
  requestOptions: {
    withXAppId: false,
    // 是否携带token
    withToken: true,
    // 是否携带tenantId
    withTenantId: true,
    // 是否显示错误信息
    isShowErrorMessage: true,
  },
}

/**
 * 创建axios实例
 * @param options 请求配置
 * @returns 请求实例
 */
function createAxios(options: Partial<CreateAxiosOptionsType> = {}) {
  return new AyuAxios(Object.assign(defaultOptions, options))
}

const http = createAxios()

export { createAxios, http }
