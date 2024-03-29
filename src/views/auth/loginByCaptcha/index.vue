<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { loginByCaptchaApi, type LoginByCaptchaFormType } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const formRef = ref()

const formState = reactive<LoginByCaptchaFormType>({
  phone: '13667777777',
  code: '1234',
  privacy: false,
  uuid: '',
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

onSuccess((event) => {
  const data = event.data as any
  if (data) {
    userStore.token = data.token
    userStore.userInfo = data.userVO
    if (data?.isFirstLogin) {
      router.push('/auth/completeInfo')
      return
    }
    // 获取当前路由的参数, 跳转到指定页面
    const { redirect } = router.currentRoute.value.query
    router.push((redirect as string) || '/')
  }
})

async function login() {
  formRef.value.validate().then(() => {
    send(true)
  })
}
</script>

<template>
  <div>
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
            <a-button type="link">发送验证码</a-button>
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

        <a-button type="text" style="width: 100%; height: 45px">
          <Icon icon="WechatOutlined" />
          <span>微信登录注册</span>
        </a-button>
      </a-form-item>

      <a-form-item name="privacy">
        <a-checkbox v-model:checked="formState.privacy"
          >已阅读并同意常青招聘 《用户协议》《隐私政策》，<br />允许常青招聘统一管理本人账号信息
        </a-checkbox>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.i-auth-title {
  @apply text-3xl font-bold text-center m-5 drop-shadow-md;
}
</style>
