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
  hopeJob?: number
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

export const ApplyStatusEnum = {
  0: '在职，看看新机会',
  1: '在职，暂无跳槽打算',
  2: '离职，随时到岗',
  3: '在校，月内到岗',
  4: '在校，考虑机会',
  5: '在校，暂不考虑',
}

export function getUserInfoApi() {
  return request.Get('user/info').send(true) as Promise<UserInfoType>
}

export function updateUserInfoApi(userForm: UpdateUserInfoFormType) {
  return request.Post('user/updateUserInfo', userForm).send(true) as Promise<boolean>
}
