<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { isCompleteUserInfoApi, loginByCaptchaApi, type LoginByCaptchaFormType, sendSMSApi } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { message } from 'ant-design-vue'
import INavigator from '@/components/INavigator/INavigator.vue'

const formRef = ref()

const formState = reactive<LoginByCaptchaFormType>({
  phone: '',
  verifyCode: '',
  privacy: false,
})

const rules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
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
    formState.privacy = undefined
    send(true)
  })
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
    <div class="i-change">
      <div class="tabs">
        <input id="radio-1" checked name="tabs" type="radio" />
        <label class="tab" for="radio-1">我是求职者</label>
        <input id="radio-2" name="tabs" type="radio" />
        <label class="tab" for="radio-2">
          <i-navigator to="/empAuth/login">我是招聘人</i-navigator>
        </label>
        <span class="glider"></span>
      </div>
    </div>
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
        <a-input v-model:value="formState.verifyCode" :placeholder="$t('user.login.placeholder.password')" size="large">
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

      <a-form-item>
        <router-link style="float: left" to="/auth/loginByPassword">使用密码登录？</router-link>
        <router-link style="float: right" to="/auth/forgetPassword">忘记密码</router-link>
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
              <Icon :size="20" icon="WechatOutlined" />
            </a-button>
            <span>微信登录</span>
          </div>

          <div class="i-auth-login-btn weixin-login">
            <a-button class="i-oauth-login-btn-inner" type="text">
              <Icon :size="20" icon="AlipayCircleOutlined" />
            </a-button>
            <span>支付宝登录</span>
          </div>

          <div class="i-auth-login-btn weixin-login">
            <a-button class="i-oauth-login-btn-inner" type="text">
              <Icon :size="20" icon="QqOutlined" />
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
@import '@/styles/theme.scss';

.login-by-captcha {
  width: calc(100% - 270px);

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  .i-auth-title {
    @apply text-3xl font-bold text-center m-5 drop-shadow-md;
  }

  .i-change {
    --tab-width: calc(50% - 8px);
    --tab-height: 35px;
    @apply mb-2;

    .tabs {
      @apply flex relative p-[8px] rounded-full;

      @include useTheme {
        background: getModeVar('bgColor');
        color: getModeVar('infoColor');
      }
    }

    .tabs * {
      z-index: 2;
    }

    input[type='radio'] {
      display: none;
    }

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--tab-height);
      width: var(--tab-width);
      font-size: 1rem;
      font-weight: 500;
      border-radius: 99px;
      cursor: pointer;
      transition: color 0.15s ease-in;
    }

    input[type='radio']:checked + label {
      @include useTheme {
        color: getColor('primary');
      }
    }

    input[id='radio-1']:checked ~ .glider {
      transform: translateX(0);
    }

    input[id='radio-2']:checked ~ .glider {
      transform: translateX(100%);
    }

    .glider {
      position: absolute;
      display: flex;
      height: var(--tab-height);
      width: var(--tab-width);
      z-index: 1;
      border-radius: 99px;
      transition: all 0.3s;

      @include useTheme {
        background: getModeVar('cardBgColor');
      }
    }
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
