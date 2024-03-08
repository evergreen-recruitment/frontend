import request from '@/utils/request'

export type LoginByCaptchaFormType = {
  phone: string
  code?: string
  privacy?: boolean // 不传递给后端
  uuid?: string
}

export type LoginByPasswordFormType = {
  phone: string
  password: string
  privacy?: boolean // 不传递给后端
}

export type ForgetPasswordFormType = {
  phone?: string
  code?: string
  newPassword?: string
  confirmNewPassword?: string
  uuid?: string
}

export function loginByCaptchaApi(loginForm: LoginByCaptchaFormType) {
  delete loginForm.privacy
  return request.Post(
    'auth/loginByCaptcha',
    loginForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}

export function loginByPasswordApi(loginForm: LoginByPasswordFormType) {
  delete loginForm.privacy
  return request.Post(
    'auth/loginByPassword',
    loginForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}

export function forgetPasswordApi(forgetPasswordForm: ForgetPasswordFormType) {
  return request.Post(
    'auth/forgetPassword',
    forgetPasswordForm,
    // @ts-ignore
    { headers: { 'Content-Type': 'application/json' }, ignoreToken: true },
  )
}

export type CaptchaResponse = {
  uuid?: string
  img?: string
  captchaEnabled?: boolean
}

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
