<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '@/router'
import INavigator from '@/components/INavigator/INavigator.vue'

const formRef = ref()
const formState = reactive({
  empAccount: '',
  empPassword: '',
})
const rules = reactive({
  empAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  empPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

function login() {
  router.push('/emp/home')
}
</script>

<template>
  <div style="width: 100%">
    <div class="i-empauth-title">招聘者登录</div>
    <div class="i-change">
      <div class="tabs">
        <input id="radio-1" name="tabs" type="radio" />
        <label class="tab" for="radio-1">
          <i-navigator to="/auth/login">我是求职者</i-navigator>
        </label>
        <input id="radio-2" checked name="tabs" type="radio" />
        <label class="tab" for="radio-2">
          <i-navigator to="/empAuth/login">我是招聘人</i-navigator>
        </label>
        <span class="glider"></span>
      </div>
    </div>
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item name="empAccount">
        <a-input v-model:value="formState.empAccount" :placeholder="'请输入账号'" size="large">
          <template #prefix>
            <Icon icon="UserOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="empPassword">
        <a-input-password v-model:value="formState.empPassword" :placeholder="'请输入密码'" size="large">
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <router-link style="float: left" to="/empAuth/register">注册招聘者？</router-link>
        <router-link style="float: right" to="/empAuth/forget">忘记密码？</router-link>
      </a-form-item>

      <a-form-item>
        <a-button style="width: 100%; height: 45px" type="primary" @click="login">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-empauth-title {
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
</style>
