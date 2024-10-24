import { webStorage } from '@ayu/utils'

/* 文件在线地址 */
export const createFileUrl = (file: any) => {
  const envConfig = webStorage.getStorageFromKey('envConfig')
  return envConfig.FILE_PREVIEW_URL + '/' + file.name
}
