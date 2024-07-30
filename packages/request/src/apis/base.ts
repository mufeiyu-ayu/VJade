import { http } from '../'
import { type QueryParameter, type CommonResultType, SystemArchEnum } from '@ayu/model'
import { webStorage } from '@ayu/utils'

/* 
  基础接口类
 */
export class BaseApi {
  service: string
  voName: string
  url: string

  // 生成 jsdoc

  /**
   * Creates an instance of BaseApi.
   * @param {string} [service] 服务名
   * @param {string} [voName] vo 名
   * @param {stirng} [url] vo 标识
   * @memberof BaseApi
   */
  constructor(service?: string, voName?: string, url?: string) {
    const envConfig = webStorage.getStorageFromKey('envConfig')
    const appConfig = webStorage.getStorageFromKey('app')
    const IsSingle = envConfig?.SYSTEM_ARCH === SystemArchEnum.ZSINGLE || appConfig?.appForm === SystemArchEnum.ZSINGLE

    const AppId = envConfig?.APP_ID
    this.service = IsSingle ? AppId : service || ''

    this.voName = voName || ''
    this.url = url || ''
    // 绑定 this 避免 new 之后 this指向实例 从儿获取不到 service 和 vo
    this.list = this.list.bind(this)
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  /**
   *
   *@description 列表
   * @template T
   * @param {QueryParameter} [params] 查询条件
   * @return {*}  {Promise<CommonResultType<T>>}
   * @memberof BaseApi
   */
  list<T = any>(params?: QueryParameter): Promise<CommonResultType<T>> {
    return http.post<T>(`/${this.service}/${this.url || this.voName}/list?vo=${this.voName}`, params)
  }

  /**
   *
   *@description 查询
   * @template T
   * @param {string} url
   * @param {QueryParameter} [params]
   * @return {*}  {Promise<CommonResultType<T>>}
   * @memberof BaseApi
   */
  modifyList<T = any>(url: string, params?: QueryParameter): Promise<CommonResultType<T>> {
    return http.post<T>(url, params)
  }

  /**
   * 导出Excel
   */
  async exportExcel<T = any>(type: string, params?: QueryParameter, columns?: string[]) {
    let printColumn: string = ''
    columns?.forEach((item) => {
      printColumn += '&columns=' + item
    })
    return http.request<T>(
      {
        url: `/${this.service}/${this.url || this.voName}/excel/export?type=${type === 'sql' ? 'sql' : type}&voCode=${
          this.voName
        }${printColumn}`,
        method: 'post',
        data: params,
        responseType: 'blob'
      },
      {
        isShowErrorMessage: false
      }
    )
  }

  /**
   *
   *@description 保存
   * @template T
   * @param {*} data
   * @return {*}  {Promise<CommonResultType<T>>}
   * @memberof BaseApi
   */
  add<T = any>(data: any): Promise<CommonResultType<T>> {
    return http.post<T>(`/${this.service}/${this.url || this.voName}/save`, data, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '保存成功'
    })
  }

  batchSave<T = any>(data: any): Promise<CommonResultType<T>> {
    return http.post<T>(`/${this.service}/${this.url || this.voName}/batchSave`, data, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '保存成功'
    })
  }

  /**
   * 支持文件上传的保存
   * @param params  data表单数据  files文件数据
   */
  addAndFile<T = any>(params: any): Promise<CommonResultType<T>> {
    return http.uploadFile({ url: `/${this.service}/${this.url || this.voName}/saveAttach` }, params, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '保存成功'
    })
  }

  /**
   * 更新
   * @param {*} data 更新参数
   */
  update<T = any>(data: any): Promise<CommonResultType<T>> {
    return http.post<T>(`/${this.service}/${this.url || this.voName}/save`, data, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '修改成功'
    })
  }

  /**
   * 删除
   * @param {String[]} ids 删除IDs
   */
  delete<T = any>(ids: string[]): Promise<CommonResultType<T>> {
    return http.remove<T>(`/${this.service}/${this.url || this.voName}/delete`, ids, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '删除成功'
    })
  }

  /**
   * 编辑
   * @param {String[]} ids 编辑IDs
   */
  edit<T = any>(ids: string): Promise<CommonResultType<T>> {
    return http.get<T>(`/${this.service}/${this.url || this.voName}/edit/${ids}`)
  }

  /**
   * sql列表查询
   */
  sqlList<T = any>(params?: QueryParameter, paged: boolean = true): Promise<CommonResultType<T>> {
    return http.post<T>(
      `/${this.service}/${this.url || this.voName}/list?type=sql&resource=${this.voName}&handleSub=false&paged=${paged}`,
      params
    )
  }
}
