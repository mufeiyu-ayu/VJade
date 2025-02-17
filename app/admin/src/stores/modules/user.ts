import { defineStore } from 'pinia'
import { webStorage } from '@ayu-mu/utils'
import { ref } from 'vue'
// import { router } from '@/router'
import { login } from '@/apis'
import type { MenuItem } from '@ayu-mu/model'
import type { LoginResult } from '@/apis/types'
export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<LoginResult>()
  // 是否登录
  const isLogin = ref(false)
  const userMenu = ref<MenuItem[]>([])
  /**
   * 用户登录
   * @param form 登录表单
   * @returns
   */
  const userLogin = async (form) => {
    const { code, data } = await login(form)
    webStorage.setStorage('token', data?.accessToken)
    webStorage.setStorage('userInfo', data)

    webStorage.setStorage('isLogin', !!data?.accessToken)

    userInfo.value = data
    isLogin.value = !!data?.accessToken
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
   * 初始化路由
   */
  const initRouter = () => {}
  return {
    userLogin,
    initRouter,
    userInfo,
    isLogin,
    userMenu,
    setMenuList
  }
})
