import request from '@/utils/request'

export type UserInfoType = {
  id?: string
  avatar?: string
  userAccount?: string
  realName?: string
  phone?: string
  email?: string
  gender?: number
  age?: number
  location?: number
  applyStatus?: number
  createTime?: string
}

export function getUserInfoApi() {
  return request.Get('user/info').send(true) as Promise<UserInfoType>
}
