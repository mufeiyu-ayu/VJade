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

export interface FormParams {
  username: string
  password: string
  email: string
  phone: string
  phone1: string
  remark: string
  remark1: string
  remark2: string
  remark3: string
}
