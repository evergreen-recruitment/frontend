import request from '@/utils/request'

export type IpAddressType = {
  code: [number, number]
  ip?: string
  name: string
}

export function getIpAddressApi() {
  return request
    .Get(
      '/common/getIpAddress',
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<IpAddressType>
}

export function uploadImageApi(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return request
    .Post(
      '/common/uploadImage',
      formData,
      // @ts-ignore 这里不要自己添加Content-Type，会自动识别
      { ignoreToken: true },
    )
    .send(true) as Promise<string>
}

export function uploadApplicationApi(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return request
    .Post(
      '/user/uploadApplication',
      formData,
      // @ts-ignore 这里不要自己添加Content-Type，会自动识别
      { ignoreToken: true, setTimeout: 60 * 10 }, // 设置十分钟超时
    )
    .send(true) as Promise<string>
}

export function updateTokenTimeApi(time: number) {
  return request.Get(`/common/update/token?timeout=${time}`).send(true) as Promise<boolean>
}
