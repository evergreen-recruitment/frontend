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
  return request
    .Post(
      '/common/uploadImage',
      { file },
      // @ts-ignore
      { ignoreToken: true },
    )
    .send(true) as Promise<string>
}
