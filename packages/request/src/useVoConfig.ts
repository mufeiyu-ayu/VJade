import { getCurrentInstance, reactive } from 'vue'
import type { ViewColumnType, VoType } from '@ayu-mu/model'
import { BaseApi, http, oauth2Api, useAyuRequest } from './'
import { cloneDeep, isUndefined } from 'lodash-es'
import { webStorage, isJsonStringTryCatch } from '@ayu-mu/utils'

// VO缓存数据

export const voCache = reactive<Map<string, VoType>>(new Map())

export const useVoConfig = () => {
  const { data, runAsync } = useAyuRequest(oauth2Api.findByVoCode, {
    manual: true
  })

  /**
   * 根据vo名称获取vo配置
   * @param {String} voName vo名称
   * @returns vo源数据
   */
  const getVoMetaData = async (voName: string): Promise<VoType> => {
    let voType = voCache.get(voName)
    // 缓存Vo信息
    if (isUndefined(voType)) {
      await runAsync(voName)
      voType = data.value?.data?.[0]
      voCache.set(voName, voType!)
    }
    const copy_data = cloneDeep(voType)

    copy_data?.fields.forEach((field) => {
      // 将editOption转为对象
      field.editOption = isJsonStringTryCatch(field.editOption as unknown as string)
        ? JSON.parse(field.editOption as unknown as string)
        : field.editOption
      // 将formMate转为对象
      field.format = isJsonStringTryCatch(field.format as unknown as string)
        ? JSON.parse(field.format as unknown as string)
        : field.format
    })

    return copy_data as VoType
  }

  /**
   *
   * @description获取 vo 配置
   * @param {string} voName vo 名称
   * @param {string} [service] 服务名
   * @param {string} [uriPrefix] 请求前缀
   * @param {string} [url] 请求标识
   * @return {*}  {Promise<{ options: BaseApi; fields: ViewColumnType[]; voMetaConfig: VoType }>}
   */
  const getVoConfig = async (
    voName: string,
    service?: string,
    uriPrefix?: string,
    url?: string
  ): Promise<{ options: BaseApi; fields: ViewColumnType[]; voMetaConfig: VoType }> => {
    const instance = getCurrentInstance()
    const httpMutex = instance?.appContext.config.globalProperties?.$httpMutex

    // 在请求前加锁
    if (httpMutex) await httpMutex.acquire()
    const voMetaConfig: VoType = await getVoMetaData(voName)
    service = service || voMetaConfig.service
    voName = uriPrefix || voName
    const baseApi = new BaseApi(service || voMetaConfig?.service, voName, url)
    // 在请求完成后解锁
    if (httpMutex) httpMutex.relase()

    return {
      fields: voMetaConfig?.fields,
      options: baseApi,
      voMetaConfig
    }
  }

  /**
   *
   * @description 获取页面默认配置
   * @param {*} currentMenu
   * @return {*}
   */
  const getPageFavoriteConfig = async (currentMenu: any) => {
    const envConfig = webStorage.getStorageFromKey('envConfig')
    return await http.get(
      `/${envConfig.TENANT_ID}/favorite/getDefault?relCode=${currentMenu?.menuCode}&type=${currentMenu?.type}`,
      {},
      {
        isShowErrorMessage: false
      }
    )
  }

  return { getVoMetaData, getVoConfig, getPageFavoriteConfig }
}
