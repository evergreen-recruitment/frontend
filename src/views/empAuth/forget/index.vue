<script lang="ts" setup>
import { reactive, ref } from 'vue'

const formRef = ref()
const formState = reactive({
  empAccount: '',
  empPassword: '',
  reEmpPassword: '',
})
const rules = reactive({
  empAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  empPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  reEmpPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
})
</script>

<template>
  <div style="width: 100%">
    <div class="i-empauth-title">忘记密码</div>
    <a-form ref="formRef" :model="formState">
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

      <a-form-item name="reEmpPassword">
        <a-input-password v-model:value="formState.reEmpPassword" :placeholder="'请再输入密码'" size="large">
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <router-link style="float: left" to="/empAuth/login">去登陆？</router-link>
      </a-form-item>

      <a-form-item>
        <a-button style="width: 100%" type="primary">修改密码</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.i-empauth-title {
  @apply text-3xl font-bold text-center m-5 drop-shadow-md;
}
</style>
