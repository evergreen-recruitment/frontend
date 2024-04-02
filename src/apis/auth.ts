import request from '@/utils/request'
import { unref } from 'vue'

export type LoginByCaptchaFormType = {
  phone: string
  code?: string
  privacy?: boolean
}

export type LoginByPasswordFormType = {
  phone: string
  password: string
  privacy?: boolean
}

export type ForgetPasswordFormType = {
  phone?: string
  code?: string
  newPassword?: string
  confirmNewPassword?: string
  uuid?: string
}

export type CaptchaResponse = {
  uuid?: string
  img?: string
  captchaEnabled?: boolean
}

export type CompleteUserInfoFormType = {
  avatar?: string
  userAccount: string
  realName: string
  address: string[]
  age: number
  userPassword: string
  reUserPassword: string
  email: string
  applyStatus: number
  gender: number | null
}

/**
 * 通过验证码登录
 * @param loginForm 登录表单
 */
export function loginByCaptchaApi(loginForm: LoginByCaptchaFormType) {
  loginForm.privacy = undefined

  return request.Post(
    'user/login/phone',
    loginForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}

/**
 * 通过密码登录
 * @param loginForm 登录表单
 */
export function loginByPasswordApi(loginForm: LoginByPasswordFormType) {
  loginForm.privacy = undefined

  return request.Post(
    'user/login/password',
    loginForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}

/**
 * 忘记密码
 * @param forgetPasswordForm 忘记密码表单
 */
export function forgetPasswordApi(forgetPasswordForm: ForgetPasswordFormType) {
  return request.Post(
    'user/forget',
    forgetPasswordForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}

/**
 * 完善用户信息
 * @param completeInfoForm 完善用户信息表单
 */
export function completeUserInfoApi(completeInfoForm: CompleteUserInfoFormType) {
  return request.Post(
    'user/fill/requireinfo',
    completeInfoForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}

/**
 * 判断是否完善用户信息
 */
export function isCompleteUserInfoApi() {
  return request.Get(
    'user/has/dorequired',
    // @ts-ignore
    { ignoreToken: true },
  )
}

export function isDeliveryApi() {
  return request.Get(
    'user/has/delivery',
    // @ts-ignore
    { ignoreToken: true },
  )
}

/**
 * 发送短信验证码
 * @param phone
 */
export function sendSMSApi(phone: string) {
  return request
    .Get(
      'common/phone/send',
      //@ts-ignore
      { params: { phone }, ignoreToken: true },
    )
    .send(true) as Promise<boolean>
}

/**
 * 退出登录
 */
export function logoutApi() {
  return request.Post(
    'user/logout',
    {},
    // @ts-ignore
    { ignoreToken: true },
  )
}

/**
 * 获取验证码图片
 */
export function getCodeImgApi() {
  // '/auth/captchaImage'
  return request
    .Get('auth/captchaImage', {
      // @ts-ignore
      ignoreToken: true,
      // 强制请求，防止缓存
    })
    .send(true) as Promise<CaptchaResponse>
}
