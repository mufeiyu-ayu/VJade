import { LanguageList } from '@/contants'

/**
 * 获取浏览器语言
 * @returns 浏览器语言
 */
export function getBrowserLanguage() {
  const browserLanguage = navigator.language.split('-')[0]
  const supportedLanguage = LanguageList.find(lang => lang.code === browserLanguage)
  return supportedLanguage ? browserLanguage : 'en'
}
