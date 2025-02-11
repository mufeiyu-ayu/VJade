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
