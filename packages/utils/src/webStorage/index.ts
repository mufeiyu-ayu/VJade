// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { encrypt, decrypt } from '../encry'
// import type { globalConfig } from './interface'
// import type { StorageKeyType } from '@ayu-mu/model'

const config: any = {
  type: 'localStorage',
  prefix: 'ayu-',
  expire: 24 * 60, // 过期时间，单位位分钟(默认过期时间为 1 天)
  isEncrypt: true // 是否加密存储
}

class WebStorage {
  /* @description 存储 */
  setStorage = (key: any, value: any, expire: number = 24 * 60): boolean => {
    if (value === '' || value === null || value === undefined) {
      value = null
    }

    if (isNaN(expire) || expire < 0) {
      // 过期时间判断
      throw new Error('expire must be a number')
    }
    const data = {
      value, //存储值
      time: Date.now(), //存储日期
      expire: Date.now() + 1000 * 60 * expire //过期时间
    }
    // 是否需要加密，判断装载加密数据或原数据
    if (typeof window !== 'undefined')
      window[config.type].setItem(
        this.autoAddPreFix(key),
        config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data)
      )
    return true
  }

  /* @description 获取所有数据 */
  getAllStorage = () => {
    //获取所有值
    const storageList: any = {}
    if (typeof window !== 'undefined') {
      const keys = Object.keys(window[config.type]) // 获取所有的键
      keys.forEach((key) => {
        const value = this.getStorageFromKey(this.autoRemovePreFix(key))
        if (value !== null) {
          //如果值没有过期，加入到列表中
          storageList[this.autoRemovePreFix(key)] = value
        }
      })
      return storageList
    }
  }

  /* @description  获取指定值 */
  getStorageFromKey = (key: any) => {
    if (config.prefix) {
      key = this.autoAddPreFix(key)
    }

    if (typeof window !== 'undefined') {
      if (!window[config.type].getItem(key)) {
        return null
      }
    }

    const storageVal = config.isEncrypt
      ? JSON.parse(decrypt(window[config.type].getItem(key) as string))
      : JSON.parse(window[config.type].getItem(key) as string)
    const now = Date.now()
    if (now > storageVal.expire) {
      this.removeStorageFromKey(key)
    } else {
      return storageVal.value
    }
  }

  /* @description 获取键值列表长度 */
  getStorageLength = () => {
    if (typeof window !== 'undefined') return window[config.type].length
  }

  /* @description  指定 key删除换成 */
  removeStorageFromKey = (key: any) => {
    //删除值
    if (config.prefix) {
      key = this.autoAddPreFix(key)
    }
    if (typeof window !== 'undefined') window[config.type].removeItem(key)
  }

  /* @description 清除所有缓存 */
  clearStorage = () => {
    if (typeof window !== 'undefined') window[config.type].clear()
  }
  /* @description 添加前缀 */
  autoAddPreFix = (key: string): string => {
    const prefix = config.prefix || ''
    return `${prefix}_${key}`
  }

  /* @description 移除前缀 */
  autoRemovePreFix = (key: string): any => {
    //删除前缀，进行增删改查
    const lineIndex = config.prefix.length + 1
    return key.substr(lineIndex)
  }
}

export const webStorage = new WebStorage()
