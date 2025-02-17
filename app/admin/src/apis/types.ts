export interface LoginResult {
  code: number
  id: number
  username: string
  realName: string
  roles: string[]
  createAt: string
  updateAt: string
  accessToken: string
  error: string | null
  message: string
}
