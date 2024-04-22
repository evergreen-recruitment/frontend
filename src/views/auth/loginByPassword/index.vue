<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { isCompleteUserInfoApi, loginByPasswordApi, type LoginByPasswordFormType } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const formRef = ref()
const captchaEnabled = ref(true)
const codeUrl = ref('')

const formState = reactive<LoginByPasswordFormType>({
  userAccount: '15707951130',
  userPassword: '123456',
  privacy: false,
})

const rules = reactive({
  userAccount: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
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

const { loading, send, onSuccess, onError } = useRequest(loginByPasswordApi(formState), {
  // 默认不发出
  immediate: false,
})

onSuccess(async (event) => {
  const data = event.data as any
  if (data) {
    userStore.token = data.token
    userStore.userInfo = data.userVO
    const res = await isCompleteUserInfoApi()
    if (res === false) {
      router.push({
        name: 'completeInfo',
        query: {
          userId: data.userVO.id,
        },
      })
      return
    }
    // 获取当前路由的参数, 跳转到指定页面
    const { redirect } = router.currentRoute.value.query
    router.push((redirect as string) || '/')
  }
})

async function login() {
  formRef.value.validate().then(() => {
    // formState.privacy = undefined
    send(true)
  })
}
</script>

<template>
  <div class="login-by-password">
    <div class="i-auth-title">密码登录</div>
    <a-form
      ref="formRef"
      :label-col="{ span: 5 }"
      :model="formState"
      :rules="rules"
      class="login-form"
      label-align="left"
    >
      <a-form-item name="userAccount">
        <a-input v-model:value="formState.userAccount" placeholder="请输入手机号/用户名" size="large">
          <template #prefix>
            <Icon icon="UserOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="userPassword">
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" size="large">
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <router-link style="float: left" to="/auth/loginByCaptcha">一键登录注册登录</router-link>
        <router-link style="float: right" to="/auth/forgetPassword">忘记密码</router-link>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" html-type="submit" style="width: 100%; height: 45px" type="primary" @click="login">
          登录
        </a-button>
      </a-form-item>

      <a-form-item name="privacy">
        <a-checkbox v-model:checked="formState.privacy">已阅读并同意常青招聘 《用户协议》《隐私政策》</a-checkbox>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.login-by-password {
  width: calc(100% - 270px);

  @media (max-width: 768px) {
    width: 100%;
  }

  .i-auth-title {
    @apply text-3xl font-bold text-center m-5 drop-shadow-md;
  }
}
</style>
