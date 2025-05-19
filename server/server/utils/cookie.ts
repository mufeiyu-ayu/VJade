import type { EventHandlerRequest, H3Event } from 'h3'

// 设置刷新令牌到 Cookie
export function setRefreshTokenCookie(event: H3Event<EventHandlerRequest>, refreshToken: string) {
  setCookie(event, 'jwt', refreshToken, {
    httpOnly: true, // 禁止 JavaScript 访问 Cookie，增加安全性
    maxAge: 24 * 60 * 60 * 1000, // Cookie 有效期为 24 小时
    sameSite: 'none', // 允许跨站点请求
    secure: true, // 只在 HTTPS 连接中传输
  })
}

// 从 Cookie 中获取刷新令牌
export function getRefreshTokenFromCookie(event: H3Event<EventHandlerRequest>) {
  const refreshToken = getCookie(event, 'jwt')
  return refreshToken
}
