import request from '@/utils/request'

export type LoginByCaptchaFormType = {
  phone: string
  code?: string
  privacy?: boolean
  uuid?: string
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
  avatar: string
  userAccount: string
  realName: string
  userPassword: string
  reUserPassword: string
  email: string
  gender: number | null
}

/**
 * 通过验证码登录
 * @param loginForm 登录表单
 */
export function loginByCaptchaApi(loginForm: LoginByCaptchaFormType) {
  delete loginForm.privacy
  return request.Post(
    'auth/loginByCaptcha',
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
  delete loginForm.privacy
  return request.Post(
    'auth/loginByPassword',
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
    'auth/forgetPassword',
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
    'auth/completeUserInfo',
    completeInfoForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}

/**
 * 发送短信验证码
 * @param phone
 */
export function sendSMSApi(phone: string) {
  return request.Get(
    'auth/sendSMS',
    //@ts-ignore
    { params: { phone }, ignoreToken: true },
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
