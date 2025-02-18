import type { EventHandlerRequest, H3Event } from 'h3'

import jwt from 'jsonwebtoken'
export interface UserPayload extends UserInfo {
  iat: number
  exp: number
}

// TODO: Replace with your own secret key
const ACCESS_TOKEN_SECRET = 'access_token_secret'
const REFRESH_TOKEN_SECRET = 'refresh_token_secret'

/**
 * 生成登录 token
 * @param user 用户信息
 * @returns token
 */
export function generateAccessToken(user: UserInfo) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

/**
 * 刷新 token
 * @param user 用户信息
 * @returns token
 */
export function generateRefreshToken(user: UserInfo) {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: '30d'
  })
}

export function verifyAccessToken(event: H3Event<EventHandlerRequest>): null | Omit<UserInfo, 'password'> {
  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader?.startsWith('Bearer')) {
    return null
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as UserPayload

    const username = decoded.username
    const user = MOCK_USERS.find((item) => item.username === username)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...userinfo } = user
    return userinfo
  } catch {
    return null
  }
}
