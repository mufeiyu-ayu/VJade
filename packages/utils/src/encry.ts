import { AES, mode, pad, enc } from 'crypto-js'

const SECRET_KEY = enc.Utf8.parse('3333e6e143439161') // 十六位进制数作为密钥
const SECRET_TV = enc.Utf8.parse('e3bbe7e3ba84431a') // 十六位 进制数作为偏移量

/**
 * @description 加密
 * @param data
 * @returns string
 */
const encrypt = (data: object | string): string => {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data)
    } catch (e) {
      throw new Error('加密失败' + e)
    }
  }

  const dataHex = enc.Utf8.parse(data)
  const encrypted = AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_TV,
    mode: mode.CBC,
    padding: pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

/**
 * @description 解密
 * @param data
 * @returns string
 */
const decrypt = (data: string): string => {
  const encryptedHexStr = enc.Hex.parse(data)
  const encryptedBase64Str = enc.Base64.stringify(encryptedHexStr)
  const decrypt = AES.decrypt(encryptedBase64Str, SECRET_KEY, {
    iv: SECRET_TV,
    mode: mode.CBC,
    padding: pad.Pkcs7
  })

  const decryptedStr = decrypt.toString(enc.Utf8)
  return decryptedStr.toString()
}

export { encrypt, decrypt }
