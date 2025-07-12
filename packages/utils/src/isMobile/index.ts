/**
 * 检测当前设备是否为移动设备
 * @description 通过检查用户代理字符串来判断当前设备是否为移动设备
 * @returns {boolean} 如果是移动设备返回 true，否则返回 false
 * @example
 * ```ts
 * // 基础使用
 * if (isMobile()) {
 *   console.log('当前设备是移动设备')
 * }
 *
 * // 在响应式布局中使用
 * const isMobileDevice = isMobile()
 * const layout = isMobileDevice ? 'mobile' : 'desktop'
 *
 * // 在条件渲染中使用
 * const showMobileMenu = isMobile()
 * return showMobileMenu ? <MobileMenu /> : <DesktopMenu />
 * ```
 */
export function isMobile(): boolean {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const mobileKeywords = [
    'android',
    'iphone',
    'ipad',
    'ipod',
    'blackberry',
    'windows phone',
    'opera mini',
    'mobile',
  ]

  return mobileKeywords.some(keyword => userAgent.includes(keyword))
}
