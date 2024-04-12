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
  hopJob?: number
  createTime?: string
}

export type UpdateUserInfoFormType = {
  applyStatus?: number
  avatar?: string
  email?: string
  gender?: number
  hopeJob?: number
  id?: string
  location?: number
  phone?: string
  realName?: string
}

export function getUserInfoApi() {
  return request.Get('user/info').send(true) as Promise<UserInfoType>
}

export function updateUserInfoApi(userForm: UpdateUserInfoFormType) {
  return request.Post('user/updateUserInfo', userForm).send(true) as Promise<boolean>
}
