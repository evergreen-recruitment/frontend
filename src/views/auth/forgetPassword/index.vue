<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { forgetPasswordApi, type ForgetPasswordFormType, sendSMSApi } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { message } from 'ant-design-vue'

const formRef = ref()

const formState = reactive<ForgetPasswordFormType>({
  phone: '15707951130',
  verifyCode: '',
  userPassword: '',
  confirmNewPassword: '',
})

const rules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  userPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmNewPassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }],
})

const router = useRouter()
const userStore = useUserStore()

const { loading, send, onSuccess, onError } = useRequest(forgetPasswordApi(formState), {
  // 默认不发出
  immediate: false,
})

onSuccess(async (event) => {
  const data = event.data as any
  if (data === true) {
    message.success('重置密码成功')
    router.push('/auth/login')
    return
  }
  message.error('重置密码失败')
})

async function submit() {
  formRef.value.validate().then(() => {
    // formState.confirmNewPassword = undefined
    send(true)
  })
}

const countdown = ref(0)

async function sendCode() {
  const res = await sendSMSApi(formState.phone!)
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
  <div class="forget-password">
    <div class="i-auth-title">忘记密码</div>
    <a-form
      ref="formRef"
      :label-col="{ span: 5 }"
      :model="formState"
      :rules="rules"
      class="login-form"
      label-align="left"
    >
      <a-form-item name="phone">
        <a-input v-model:value="formState.phone" :placeholder="$t('user.login.placeholder.username')" size="large">
          <template #prefix>
            <Icon icon="PhoneOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="verifyCode">
        <a-input v-model:value="formState.verifyCode" :placeholder="$t('user.login.placeholder.captcha')" size="large">
          <template #prefix>
            <Icon icon="SecurityScanOutlined" />
          </template>
          <template #suffix>
            <a-button :disabled="countdown > 0" type="link" @click="sendCode">
              {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
            </a-button>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="userPassword">
        <a-input-password
          v-model:value="formState.userPassword"
          :placeholder="$t('user.login.placeholder.password')"
          size="large"
        >
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="confirmNewPassword">
        <a-input-password
          v-model:value="formState.confirmNewPassword"
          :placeholder="$t('user.login.placeholder.password')"
          size="large"
        >
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <router-link style="float: left" to="/auth/loginByCaptcha">返回登录</router-link>
      </a-form-item>

      <a-form-item>
        <a-button
          :loading="loading"
          html-type="submit"
          style="width: 100%; height: 45px"
          type="primary"
          @click="submit"
        >
          重置密码
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.forget-password {
  width: calc(100% - 270px);

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  .i-auth-title {
    @apply text-3xl font-bold text-center m-5 drop-shadow-md;
  }
}
</style>
