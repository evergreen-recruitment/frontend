<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { forgetPasswordApi, type ForgetPasswordFormType } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const formRef = ref()
const captchaEnabled = ref(true)
const codeUrl = ref('')

const formState = reactive<ForgetPasswordFormType>({
  phone: '13667777777',
  code: '1234',
  newPassword: '1234',
  confirmNewPassword: '1234',
  uuid: '',
})

const rules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmNewPassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }],
})

const router = useRouter()
const userStore = useUserStore()

const { loading, send, onSuccess, onError } = useRequest(forgetPasswordApi(formState), {
  // 默认不发出
  immediate: false,
})
</script>

<template>
  <div>
    <div class="i-auth-title">忘记密码</div>
    <a-form ref="formRef" :label-col="{ span: 5 }" :model="formState" class="login-form" label-align="left">
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

      <a-form-item name="newPassword">
        <a-input-password
          v-model:value="formState.newPassword"
          size="large"
          :placeholder="$t('user.login.placeholder.password')"
        >
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="confirmNewPassword">
        <a-input-password
          v-model:value="formState.confirmNewPassword"
          size="large"
          :placeholder="$t('user.login.placeholder.password')"
        >
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <router-link to="/auth/loginByCaptcha" style="float: left">返回登录</router-link>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" html-type="submit" style="width: 100%; height: 45px" type="primary"
          >重置密码
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.i-auth-title {
  @apply text-3xl font-bold text-center m-5 drop-shadow-md;
}
</style>
