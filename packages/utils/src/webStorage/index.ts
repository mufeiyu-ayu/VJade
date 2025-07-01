// @ts-ignore
import { decrypt, encrypt } from '../encry'

interface StorageConfig {
  type: 'localStorage' | 'sessionStorage'
  prefix: string
  expire: number // 过期时间，单位分钟
  isEncrypt: boolean // 是否加密
}

interface StorageData {
  value: unknown
  time: number
  expire: number
}

interface StorageList {
  [key: string]: unknown
}

const config: StorageConfig = {
  type: 'localStorage',
  prefix: 'ayu-',
  expire: 24 * 60,
  isEncrypt: true,
}
/**
 * WebStorage 类用于封装对浏览器 Web 存储（如 localStorage 或 sessionStorage）的操作。
 * 提供常用的存储、获取、删除、清除等功能，支持存储过期时间和加密功能。
 *
 * @remarks
 * - 存储的数据以键值对形式存储，并支持过期时间和加密选项。
 * - 支持自定义前缀，防止与其他应用的数据发生冲突。
 * - 目前支持 localStorage 和 sessionStorage。
 *
 * @example
 * const storage = new WebStorage();
 * storage.setStorage('user', { name: 'John', age: 30 }, 60);  // 存储数据，过期时间为 60 分钟
 * const user = storage.getStorageFromKey('user'); // 获取存储的数据
 * console.log(user);  // { name: 'John', age: 30 }
 *
 * storage.removeStorageFromKey('user');  // 删除指定的 key
 * storage.clearStorage();  // 清除所有存储的数据
 */
class WebStorage {
  /**
   * 存储数据到指定存储中，支持加密和过期时间设置。
   *
   * @param key - 存储的键名
   * @param value - 存储的值，可以是任何类型
   * @param expire - 存储的过期时间，单位为分钟，默认为 1440 分钟（1 天）
   *
   * @returns `true` 表示存储成功
   *
   * @throws {Error} 如果过期时间无效（非数字或小于 0）
   *
   * @example
   * storage.setStorage('user', { name: 'Alice' }, 60);
   */
  setStorage = (key: string, value: unknown, expire: number = 24 * 60): boolean => {
    if (value === '' || value === null || value === undefined) {
      value = null
    }

    if (Number.isNaN(expire) || expire < 0) {
      throw new Error('expire must be a number')
    }
    const data: StorageData = {
      value,
      time: Date.now(),
      expire: Date.now() + 1000 * 60 * expire,
    }

    if (typeof window !== 'undefined') {
      window[config.type].setItem(
        this.autoAddPreFix(key),
        config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data),
      )
    }
    return true
  }

  /**
   * 获取当前存储类型下的所有键值对。
   * 仅返回未过期的存储数据。
   *
   * @returns 所有有效存储项的对象，键名为去除前缀后的存储键
   *
   * @example
   * const allData = storage.getAllStorage();
   * console.log(allData);  // { user: { name: 'John' }, ... }
   */
  getAllStorage = (): StorageList | undefined => {
    const storageList: StorageList = {}
    if (typeof window !== 'undefined') {
      const keys = Object.keys(window[config.type])
      keys.forEach((key) => {
        const value = this.getStorageFromKey(this.autoRemovePreFix(key))
        if (value !== null) {
          storageList[this.autoRemovePreFix(key)] = value
        }
      })
      return storageList
    }
  }

  /**
   * 获取指定键名的存储值。
   * 如果存储值已过期，将自动删除该项并返回 `null`。
   *
   * @param key - 存储的键名
   *
   * @returns 存储的值，如果不存在或已过期返回 `null`
   *
   * @example
   * const user = storage.getStorageFromKey('user');
   * console.log(user);  // { name: 'John', age: 30 }
   */
  getStorageFromKey = (key: string): unknown => {
    if (config.prefix) {
      key = this.autoAddPreFix(key)
    }

    if (typeof window !== 'undefined') {
      if (!window[config.type].getItem(key)) {
        return null
      }
    }

    const storageVal: StorageData = config.isEncrypt
      ? JSON.parse(decrypt(window[config.type].getItem(key) as string))
      : JSON.parse(window[config.type].getItem(key) as string)
    const now = Date.now()
    if (now > storageVal.expire) {
      this.removeStorageFromKey(key)
    }
    else {
      return storageVal.value
    }
  }

  /**
   * 获取当前存储类型中的数据项数量。
   *
   * @returns 存储项的数量
   *
   * @example
   * const length = storage.getStorageLength();
   * console.log(length);  // 3 (例如有 3 项存储数据)
   */
  getStorageLength = (): number | undefined => {
    if (typeof window !== 'undefined')
      return window[config.type].length
  }

  /**
   * 删除指定键名的存储项。
   *
   * @param key - 存储的键名
   *
   * @example
   * storage.removeStorageFromKey('user');
   * console.log(storage.getStorageFromKey('user'));  // null
   */
  removeStorageFromKey = (key: string): void => {
    if (config.prefix) {
      key = this.autoAddPreFix(key)
    }
    if (typeof window !== 'undefined')
      window[config.type].removeItem(key)
  }

  /**
   * 清空当前存储类型中的所有数据项。
   *
   * @example
   * storage.clearStorage();  // 清空所有存储
   */
  clearStorage = (): void => {
    if (typeof window !== 'undefined')
      window[config.type].clear()
  }

  /**
   * 自动添加配置前缀到存储的键名。
   *
   * @param key - 存储的键名
   *
   * @returns 添加前缀后的键名
   *
   * @example
   * const keyWithPrefix = storage.autoAddPreFix('user');
   * console.log(keyWithPrefix);  // 'ayu_user' (假设 prefix 为 'ayu-')
   */
  autoAddPreFix = (key: string): string => {
    const prefix = config.prefix || ''
    return `${prefix}_${key}`
  }

  /**
   * 移除存储键名中的前缀。
   *
   * @param key - 存储的键名
   *
   * @returns 去除前缀后的键名
   *
   * @example
   * const keyWithoutPrefix = storage.autoRemovePreFix('ayu_user');
   * console.log(keyWithoutPrefix);  // 'user' (假设 prefix 为 'ayu-')
   */
  autoRemovePreFix = (key: string): string => {
    const lineIndex = config.prefix.length + 1
    return key.substr(lineIndex)
  }
}

/**
 * `webStorage` 是一个用于浏览器 Web 存储操作的单例对象，封装了对 `localStorage` 和 `sessionStorage` 的常见操作。
 * 它提供了存储、获取、删除、清除数据的功能，支持数据过期时间管理和加密。
 *
 * 该实例允许你通过统一的接口操作不同类型的 Web 存储，同时确保存储的数据能够加密和管理过期时间。
 *
 * @remarks
 * - `webStorage` 实例是通过 `new WebStorage()` 创建的，并且是一个全局唯一的对象。
 * - 支持两种存储类型：`localStorage` 和 `sessionStorage`，可以通过配置文件进行选择。
 * - 支持加密存储的数据，具体加密方式由配置文件决定。
 * - 存储的数据包括有效期，存储的数据会在过期后自动删除。
 *
 * @example
 * 设置存储的数据，过期时间为 60 分钟
 * webStorage.setStorage('user', { name: 'Alice' }, 60);
 *
 * 获取存储的数据
 * const user = webStorage.getStorageFromKey('user');
 * console.log(user);  // 输出：{ name: 'Alice'}
 *
 * 删除指定的存储项
 * webStorage.removeStorageFromKey('user');
 *
 * 清空所有存储的数据
 * webStorage.clearStorage();
 */

export const webStorage = new WebStorage()
