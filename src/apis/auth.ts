import request from '@/utils/request'

export type LoginByCaptchaFormType = {
  phone: string
  verifyCode?: string
  privacy?: boolean
  uuid?: string
}

export type LoginByPasswordFormType = {
  userAccount: string
  userPassword: string
  privacy?: boolean
}

export type ForgetPasswordFormType = {
  phone?: string
  verifyCode?: string
  userPassword?: string
  confirmNewPassword?: string
  uuid?: string
}

export type CaptchaResponse = {
  uuid?: string
  img?: string
  captchaEnabled?: boolean
}

export type CompleteUserInfoFormType = {
  userId?: string
  avatar?: string
  userAccount: string
  realName: string
  address: [number, number]
  age: number | null
  userPassword: string
  reUserPassword: string | null
  email: string
  applyStatus: number
  gender: number | null
}

/**
 * 通过验证码登录
 * @param loginForm 登录表单
 */
export function loginByCaptchaApi(loginForm: LoginByCaptchaFormType) {
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
  return request
    .Post(
      'user/fill/requireinfo',
      completeInfoForm,
      // @ts-ignore
      { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
    )
    .send(true) as Promise<boolean>
}

/**
 * 判断是否完善用户信息
 */
export function isCompleteUserInfoApi(userId?: string) {
  return request
    .Post(
      'user/has/dorequired',
      { userId: userId },
      // @ts-ignore
      { ignoreToken: true },
    )
    .send(true) as Promise<boolean>
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
  return request.Get(
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
