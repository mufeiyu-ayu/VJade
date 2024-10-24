import { BaseApi } from '../base'
import { http } from '../../'
import { QueryCondition } from '@ayu-mu/model'
import { webStorage } from '@ayu-mu/utils'

/**
 * @description:接口配置
 *
 * @return {*}
 */
const Api = () => {
  const envConfig = webStorage.getStorageFromKey('envConfig')
  const AppId = envConfig?.APP_ID
  return {
    ListDict: `/${AppId}/dictData/list`
  }
}

/**
 *
 * @description 系统请求
 * @class SystemApi
 * @extends {BaseApi}
 */
class SystemApi extends BaseApi {
  /**
   * @description: 查询字典
   *
   * @param {string} code 字典编码
   * @return {*}
   * @memberof SystemApi
   */
  findDictData(code: string) {
    return http.post(Api().ListDict, {
      queryConditions: [new QueryCondition('typeCode', 'eq', code)]
    })
  }
}

const systemApi = new SystemApi('system')

export { systemApi }
