import { defineStore } from 'pinia'
import { webStorage } from '@ayu-mu/utils'
import { ref } from 'vue'
import { generatorRouter } from '@/router/generator-router'
import { router } from '@/router'
import { login, getMenuList } from '@/apis'
import type { MenuItem } from '@ayu-mu/model'
import type { LoginResult } from '@/apis/types'
import { ElMessage } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'
export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<LoginResult>()
  // 是否登录
  const isLogin = ref(webStorage.getStorageFromKey('isLogin') || false)
  // 从 localStorage 初始化 userMenu
  const userMenu = ref<MenuItem[]>(webStorage.getStorageFromKey('menu') || [])
  const routeLen = ref(webStorage.getStorageFromKey('routeLen') || [])
  const menuList = ref<RouteRecordRaw[]>([])
  /**
   * 用户登录
   * @param form 登录表单
   * @returns
   */
  const userLogin = async (form) => {
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
  const setMenuList = (menu?: Array<MenuItem | any>) => {
    webStorage.setStorage('menu', menu ?? null)
    userMenu.value = menu ?? []
  }

  /**
   * 退出登录
   */
  const loginOut = () => {
    setAuthInfo({ clear: true, data: null })
    setMenuList()
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

  const setAuthInfo = ({ clear, data }: { clear: boolean; data: any }) => {
    if (!clear) {
      webStorage.setStorage('token', data?.accessToken)
      webStorage.setStorage('userInfo', data)
      webStorage.setStorage('isLogin', !!data?.accessToken)
    } else {
      webStorage.removeStorageFromKey('token')
      webStorage.removeStorageFromKey('userInfo')
      webStorage.removeStorageFromKey('isLogin')
      webStorage.removeStorageFromKey('menu')
    }
    isLogin.value = data?.accessToken ? true : false
    userInfo.value = data
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
    setRouteLen
  }
})
