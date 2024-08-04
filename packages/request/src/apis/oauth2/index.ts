import { BaseApi } from '../base'
import { http } from '../../'
import { type AuthType, type LoginParamType, type MenuType, SystemArchEnum, type VoType } from '@ayu/model'
import { webStorage } from '@ayu/utils'

const Api = () => {
  const envConfig = webStorage.getStorageFromKey('envConfig')
  const appConfig = webStorage.getStorageFromKey('app')

  let IsSingle = false

  if (appConfig && appConfig.appForm) {
    IsSingle = appConfig.appForm === SystemArchEnum.ZSINGLE
  } else {
    IsSingle = envConfig.SYSTEM_ARCH === SystemArchEnum.ZSINGLE
  }

  const AppId = envConfig?.APP_ID

  return {
    FindByVoCode: `/${IsSingle ? AppId : 'ucenter'}/view/findByVoCode?voCode=`,
    FindTenantConfig: `/${IsSingle ? AppId : 'oauth2'}/frame/findConfig`,
    FindMenu: `/${IsSingle ? AppId : 'ucenter'}/frame/findMenu`,
    LoginToken: `/${IsSingle ? AppId : 'oauth2'}/oauth/token`,
    LogoutToken: `/${IsSingle ? AppId : 'oauth2'}/oauth/logout?token=`,
    SaveRoleMenus: `/${IsSingle ? AppId : 'ucenter'}/role/saveRoleMenus/`,
    SaveRoleUsers: `/${IsSingle ? AppId : 'ucenter'}/role/saveRoleUsers/`,
    SaveRoleResources: `/${IsSingle ? AppId : 'ucenter'}/role/saveRoleResources/`,
    JsApiSign: `/${IsSingle ? AppId : 'oauth2'}/wechat/manager/getJsapiSign`
  }
}

class Oauth2Api extends BaseApi {
  /**
   *
   * @description 登录
   * @param {LoginParamType} params
   * @return {*}
   * @memberof oauth2Api
   */
  loginToken(params: LoginParamType) {
    return http.post<AuthType>(Api().LoginToken, params, {
      withToken: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  /**
   *
   * @description 登出
   * @param {string} token
   * @return {*}
   * @memberof oauth2Api
   */
  logoutToken(token: string) {
    return http.get<AuthType>(
      Api().LogoutToken + token,
      {},
      {
        withToken: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  }

  /**
   *
   * @description 获取菜单
   * @return {*}
   * @memberof oauth2Api
   */
  findMenu() {
    return http.get<MenuType>(
      Api().FindMenu,
      {},
      {
        isShowErrorMessage: false
      }
    )
  }

  /**
   * 获取vo配置
   * @param {String} voName VO名称
   */
  findByVoCode(voName: string) {
    return http.get<VoType[]>(`${Api().FindByVoCode}${voName}`, {})
  }

  /**
   * 保存角色菜单
   * @param {String | Number} id 角色id
   * @param {*[]} menus 菜单数据
   */
  saveRoleMenus(id: string | number, menus: any[]) {
    return http.post(`${Api().SaveRoleMenus}${id}`, menus, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '保存成功'
    })
  }

  /**
   * 保存角色用户
   * @param {String | Number} id 角色id
   * @param {*[]} users 用户数据
   */
  saveRoleUsers(id: string | number, users: any[]) {
    return http.post(`${Api().SaveRoleUsers}${id}`, users, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '保存成功'
    })
  }

  /**
   * 保存角色数据权限
   * @param {String | Number} id 角色id
   * @param {*[]} resources 数据权限
   */
  saveRoleResources(id: string | number, resources: any[]) {
    return http.post(`${Api().SaveRoleResources}${id}`, resources, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '保存成功'
    })
  }

  /**
   * 获取js签名（企微认证用）
   * @param type 类型
   * @param agentId  租户id
   */
  getJsApiSign = (type: string, agentId: string) => {
    return http.get(
      `${Api().JsApiSign}?type=${type ?? ''}&url=${encodeURIComponent(
        window.location.href.split('#')[0]
      )}&agentId=${agentId}`,
      null,
      {
        withToken: false
      }
    )
  }
}

const oauth2Api = new Oauth2Api('oauth2')

const roleMenuApi = new BaseApi('ucenter', 'roleMenu')

export { oauth2Api, roleMenuApi }
