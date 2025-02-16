import { type CreateAxiosOptionsType } from '@ayu-mu/model'
import { AyuAxios } from './Axios'

// 全局请求默认配置

const defualtOptions: CreateAxiosOptionsType = {
  timeout: 100000,
  requestOptions: {
    withXAppId: true,
    withToken: true,
    withTenantId: true,
    isShowErrorMessage: true
  }
}

/**
 * 创建axios实例
 * @param options 请求配置
 * @returns 请求实例
 */
const createAxios = (options: Partial<CreateAxiosOptionsType> = {}) => {
  return new AyuAxios(Object.assign(defualtOptions, options))
}

const http = createAxios()

export { http, createAxios }
