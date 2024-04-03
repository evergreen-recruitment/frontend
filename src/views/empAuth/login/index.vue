<script setup lang="ts">
import { reactive, ref } from 'vue'
import router from '@/router'

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
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item name="empAccount">
        <a-input v-model:value="formState.empAccount" size="large" :placeholder="'请输入账号'">
          <template #prefix>
            <Icon icon="UserOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="empPassword">
        <a-input-password v-model:value="formState.empPassword" size="large" :placeholder="'请输入密码'">
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <router-link to="/empAuth/register" style="float: left">注册招聘者？</router-link>
        <router-link to="/empAuth/forget" style="float: right">忘记密码？</router-link>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" style="width: 100%; height: 45px" @click="login">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.i-empauth-title {
  @apply text-3xl font-bold text-center m-5 drop-shadow-md;
}
</style>
