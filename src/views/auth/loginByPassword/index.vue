<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { loginByPasswordApi, type LoginByPasswordFormType } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const formRef = ref()
const captchaEnabled = ref(true)
const codeUrl = ref('')

const formState = reactive<LoginByPasswordFormType>({
  phone: '13667777777',
  password: '1234',
  privacy: false,
})

const rules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
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
</script>

<template>
  <div class="login-by-password">
    <div class="i-auth-title">登录</div>
    <a-form ref="formRef" :label-col="{ span: 5 }" :model="formState" class="login-form" label-align="left">
      <a-form-item name="phone">
        <a-input v-model:value="formState.phone" size="large" :placeholder="$t('user.login.placeholder.username')">
          <template #prefix>
            <Icon icon="PhoneOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
          v-model:value="formState.password"
          size="large"
          :placeholder="$t('user.login.placeholder.password')"
        >
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <router-link to="/auth/loginByCaptcha" style="float: left">一键登录注册登录</router-link>
        <router-link to="/auth/forgetPassword" style="float: right">忘记密码</router-link>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" html-type="submit" style="width: 100%; height: 45px" type="primary"
          >{{ $t('user.login.submit') }}
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
