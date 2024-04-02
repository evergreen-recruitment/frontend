<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { loginByCaptchaApi, type LoginByCaptchaFormType, sendSMSApi } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { message } from 'ant-design-vue'

const formRef = ref()

const formState = reactive<LoginByCaptchaFormType>({
  phone: '15374284973',
  code: '',
  privacy: false,
})

const rules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  privacy: [
    {
      validator: (rule: any, value: any) => {
        if (value !== true) {
          return Promise.reject('请同意用户协议')
        }
        return Promise.resolve()
      },
    },
  ],
})

const router = useRouter()
const userStore = useUserStore()

const { loading, send, onSuccess } = useRequest(loginByCaptchaApi(formState), {
  // 默认不发出
  immediate: false,
})

onSuccess(async (event) => {
  const data = event.data as any
  if (data) {
    userStore.token = data.token
    userStore.userInfo = data.userVO
    // TODO 待后端修改逻辑
    // const res = await isCompleteUserInfoApi()
    router.push('/auth/completeInfo')
    return
    // if () {
    // }
    // 获取当前路由的参数, 跳转到指定页面
    const { redirect } = router.currentRoute.value.query
    router.push((redirect as string) || '/')
  }
})

async function login() {
  // formRef.value.validate().then(() => {
  // })
  send(true)
}

const countdown = ref(0)

async function sendCode() {
  const res = await sendSMSApi(formState.phone)
  console.log(res)
  if (res !== true) {
    message.error('发送失败')
    return
  }
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
</script>

<template>
  <div class="login-by-captcha">
    <div class="i-auth-title">验证码登录/注册</div>
    <a-form
      ref="formRef"
      :label-col="{ span: 5 }"
      :rules="rules"
      :model="formState"
      class="login-form"
      label-align="left"
    >
      <a-form-item name="phone">
        <a-input v-model:value="formState.phone" size="large" :placeholder="$t('user.login.placeholder.username')">
          <template #prefix>
            <Icon icon="PhoneOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="code">
        <a-input v-model:value="formState.code" size="large" :placeholder="$t('user.login.placeholder.password')">
          <template #prefix>
            <Icon icon="SecurityScanOutlined" />
          </template>
          <template #suffix>
            <a-button type="link" @click="sendCode" :disabled="countdown > 0">
              {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
            </a-button>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <router-link to="/auth/loginByPassword" style="float: left">使用密码登录？</router-link>
        <router-link to="/auth/forgetPassword" style="float: right">忘记密码</router-link>
      </a-form-item>

      <a-form-item>
        <a-button
          :loading="loading"
          html-type="submit"
          style="width: 100%; height: 45px; margin-bottom: 5px"
          type="primary"
          @click="login"
          >{{ $t('user.login.submit') }}
        </a-button>

        <!--微信登录，支付宝登录，QQ登录，-->
        <div class="i-oauth-login-panel">
          <div class="i-auth-login-btn weixin-login">
            <a-button class="i-oauth-login-btn-inner" type="text">
              <Icon icon="WechatOutlined" size="20" />
            </a-button>
            <span>微信登录</span>
          </div>

          <div class="i-auth-login-btn weixin-login">
            <a-button class="i-oauth-login-btn-inner" type="text">
              <Icon icon="AlipayCircleOutlined" size="20" />
            </a-button>
            <span>支付宝登录</span>
          </div>

          <div class="i-auth-login-btn weixin-login">
            <a-button class="i-oauth-login-btn-inner" type="text">
              <Icon icon="QqOutlined" size="20" />
            </a-button>
            <span>QQ登录</span>
          </div>
        </div>
      </a-form-item>

      <a-form-item name="privacy">
        <a-checkbox v-model:checked="formState.privacy"> 已阅读并同意常青招聘 《用户协议》《隐私政策》</a-checkbox>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.login-by-captcha {
  width: calc(100% - 270px);

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  .i-auth-title {
    @apply text-3xl font-bold text-center m-5 drop-shadow-md;
  }

  .i-oauth-login-panel {
    @apply flex justify-around;
    .i-auth-login-btn {
      @apply flex flex-col items-center justify-center;
      .i-oauth-login-btn-inner {
        @apply text-center w-[50px] h-[50px] rounded-[50%];
      }
    }
  }
}
</style>
