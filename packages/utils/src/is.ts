/**
 * 判断目标字符串是否是JSON字符串形式
 * @param {String} target 目标字符串
 */
export const isJsonString = (target: string): boolean => {
  return /^ [\],:{}\s]* $/.test(target)
}

export const isJsonStringTryCatch = (str: string) => {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {
    return false
  }
  return false
}
