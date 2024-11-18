import CryptoJS from 'crypto-js'

import UTF8 from 'crypto-js/enc-utf8'

const SECRET_KEY = UTF8.parse('3333e6e143439161') // 十六位进制数作为密钥
const SECRET_TV = UTF8.parse('e3bbe7e3ba84431a') // 十六位 进制数作为偏移量

/**
 * @description 加密
 * @param data
 * @returns string
 */
const encrypt = (data: object | string): string => {
  console.log('hello 22111')
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data)
    } catch (e) {
      throw new Error('加密失败' + e)
    }
  }

  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_TV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

/**
 * @description 解密
 * @param data
 * @returns string
 */
const decrypt = (data: string): string => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(encryptedBase64Str, SECRET_KEY, {
    iv: SECRET_TV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

export { encrypt, decrypt }
