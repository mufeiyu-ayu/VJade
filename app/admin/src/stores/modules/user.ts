import type { MenuItem } from '@ayu-mu/model'
import type { RouteRecordRaw } from 'vue-router'
import type { LoginResult } from '@/apis/types'
import { webStorage } from '@ayu-mu/utils'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMenuList, login } from '@/apis'
import { router } from '@/router'
import { generatorRouter } from '@/router/generator-router'
import { RouteNameEnum } from '@/router/type'

interface LoginForm {
  username: string
  password: string
  [key: string]: unknown
}

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<LoginResult>()
  // 是否登录
  const isLogin = ref(webStorage.getStorageFromKey('isLogin') || false)
  // 从 localStorage 初始化 userMenu
  const userMenu = ref<MenuItem[]>(webStorage.getStorageFromKey('menu') as MenuItem[] || [])
  const routeLen = ref<number>(webStorage.getStorageFromKey('routeLen') as number || 0)
  // 菜单列表
  const menuList = ref<RouteRecordRaw[]>([])

  /**
   * 设置用户信息
   * @param param0
   * @returns
   */
  const setAuthInfo = ({ clear, data }: { clear: boolean, data: LoginResult | null }) => {
    if (!clear) {
      webStorage.setStorage('token', data?.accessToken)
      webStorage.setStorage('userInfo', data)
      webStorage.setStorage('isLogin', !!data?.accessToken)
    }
    else {
      webStorage.removeStorageFromKey('token')
      webStorage.removeStorageFromKey('userInfo')
      webStorage.removeStorageFromKey('isLogin')
      webStorage.removeStorageFromKey('menu')
    }
    isLogin.value = !!data?.accessToken
    userInfo.value = data
  }

  /**
   * 用户登录
   * @param form 登录表单
   * @returns
   */
  const userLogin = async (form: LoginForm) => {
    const { code, data } = await login(form)
    if (code !== 0) {
      return
    }
    setAuthInfo({ clear: false, data })
    return code
  }

  /**
   * 设置菜单值
   * @param menu
   */
  const setMenuList = (menu?: MenuItem[]) => {
    webStorage.setStorage('menu', menu ?? null)
    userMenu.value = menu ?? []
  }

  /**
   * 退出登录
   */
  const loginOut = () => {
    setAuthInfo({ clear: true, data: null })
    setMenuList()
    router.push({ name: RouteNameEnum.LOGIN })
  }
  /**
   * 初始化路由
   */
  const initRouter = async () => {
    const { code, data } = await getMenuList()
    if (code !== 0) {
      // token 过期 需清除本地缓存用户信息
      ElMessage.warning('登录已过期，请重新登录')
      loginOut()
      return
    }
    if (data && Array.isArray(data)) {
      const menuDataSort = data.sort((a, b) => a.sort - b.sort)
      // 将菜单信息缓存到本地
      setMenuList(menuDataSort)
      // 生成路由
      await generatorRouter(menuDataSort)
    }
  }

  const setRouteLen = (arr: RouteRecordRaw[]) => {
    webStorage.setStorage('routeLen', router.getRoutes().length)
    routeLen.value = router.getRoutes().length
    menuList.value = arr
  }
  return {
    loginOut,
    userLogin,
    initRouter,
    userInfo,
    isLogin,
    userMenu,
    setMenuList,
    routeLen,
    setRouteLen,
  }
})
