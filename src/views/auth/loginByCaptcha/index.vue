<script lang="ts" setup>
import { h, nextTick, reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { getCodeImgApi, loginByCaptchaApi, type LoginByCaptchaFormType } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { notification } from 'ant-design-vue'
import i18n from '@/locales'
import { SmileOutlined } from '@ant-design/icons-vue'

const formRef = ref()
const captchaEnabled = ref(true)
const codeUrl = ref('')

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
      required: true,
      message: '请同意用户协议',
      trigger: 'blur',
      type: 'boolean',
      validator: (rule: any, value: any) => value === true,
    },
  ],
})

const router = useRouter()
const userStore = useUserStore()

const { loading, send, onSuccess, onError } = useRequest(loginByCaptchaApi(formState), {
  // 默认不发出
  immediate: false,
})

onSuccess((event) => {
  const data = event.data as any
  console.log('data', data)
  if (data) {
    userStore.token = data.token
    userStore.userInfo = data.userVO
    // 获取当前路由的参数, 跳转到指定页面
    const { redirect } = router.currentRoute.value.query
    router.push((redirect as string) || '/')
    // 显示欢迎信息
    notification.open({
      message: i18n.global.t('app.title'),
      description: i18n.global.t('app.welcome'),
      icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
    })
  }
})

onError((event) => {
  getCode()
})

async function login() {
  formRef.value.validate().then(() => {
    send(true)
  })
}

async function getCode() {
  const res = await getCodeImgApi()
  captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + res.img
    formState.uuid = res.uuid || ''
  }
}

nextTick(() => {
  if (captchaEnabled.value) {
    getCode()
  }
})
</script>

<template>
  <div>
    <div class="i-auth-title">验证码登录/注册</div>
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
