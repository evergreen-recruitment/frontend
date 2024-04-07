<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import Icon from '@/components/Icon/Icon.vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import type { CompleteUserInfoFormType } from '@/apis/auth'
import { completeUserInfoApi, isCompleteUserInfoApi } from '@/apis/auth'
import ILocationSelector from '@/components/ILocationSelector/ILocationSelector.vue'
import router from '@/router'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const fileList = ref([])
const avatarUploadLoading = ref(false)
const loading = ref(false)
const formRef = ref()
const formState = reactive<CompleteUserInfoFormType>({
  avatar: '',
  userAccount: '',
  realName: '',
  address: [101010000, 101010100],
  age: null,
  userPassword: '',
  reUserPassword: '',
  email: '',
  applyStatus: 0,
  gender: null,
})
const rules = reactive({
  userAccount: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  age: [{ required: true, message: '请选择年龄', trigger: 'blur' }],
  userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  reUserPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
  applyStatus: [{ required: true, message: '请选择求职状态', trigger: 'blur' }],
  gender: [{ required: true, message: '选择性别', trigger: 'blur' }],
})

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

function handleChange(info: UploadChangeParam) {
  if (info.file.status === 'uploading') {
    avatarUploadLoading.value = true
    return
  }
  if (info.file.status === 'done') {
    formState.avatar = info.file.response.data
    avatarUploadLoading.value = false
  }
  if (info.file.status === 'error') {
    avatarUploadLoading.value = false
    message.error('upload error')
  }
}

// @ts-ignore
function beforeUpload(file: UploadProps['fileList'][number]) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('你只能上传一般图片文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过2MB!')
  }
  return isJpgOrPng && isLt2M
}

function submitCompleteInfo(e: any) {
  formRef.value.validate().then(async () => {
    // loading.value = true
    // @ts-ignore
    formState.userId = userStore.userInfo?.userId
    formState.reUserPassword = null
    const res = await completeUserInfoApi(formState)
    if (res !== true) {
      message.error('提交失败')
      loading.value = false
      return
    }
    message.success('提交成功')
    router.push('/auth/uploadApplication')
  })
}

onMounted(async () => {
  const container = document.querySelector('.i-auth-layout__container') as HTMLElement | null
  container?.style.setProperty('width', '850px', 'important')

  // 获取用户id查询是否填写过信息
  const res = await isCompleteUserInfoApi()
  console.log(res)
  if (res !== false) {
    router.push('/')
  }
})
onUnmounted(() => {
  const container = document.querySelector('.i-auth-layout__container') as HTMLElement | null
  container?.style.removeProperty('width')
})
</script>

<template>
  <div class="complete-info">
    <div class="i-auth-title">完善信息</div>
    <a-form
      ref="formRef"
      :label-col="{ span: 5 }"
      :rules="rules"
      :model="formState"
      class="complete-info-form"
      label-align="left"
    >
      <a-row :gutter="0" style="align-items: end">
        <a-col :span="8">
          <a-form-item name="avatar" label="头像">
            <a-upload
              v-model:file-list="fileList"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="http://47.113.185.207:8081/common/uploadImage"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img
                v-if="formState.avatar"
                :src="formState.avatar"
                style="width: 100%; height: 100%; object-fit: cover"
              />
              <div v-else>
                <Icon v-if="avatarUploadLoading" icon="loading-outlined" :size="30" style="color: #aaaaaa" />
                <Icon v-else icon="plus-outlined" :size="40" style="color: #aaa" />
              </div>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="16">
          <a-form-item name="realName" label="姓名">
            <a-input v-model:value="formState.realName" placeholder="请输入真实姓名">
              <template #prefix>
                <Icon icon="UserOutlined" />
              </template>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item name="userAccount" label="用户名">
        <a-input v-model:value="formState.userAccount" placeholder="请输入用户名">
          <template #prefix>
            <Icon icon="UserOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-row :gutter="2">
        <a-col :span="12">
          <a-form-item name="gender" label="性别">
            <a-radio-group v-model:value="formState.gender">
              <a-radio value="0">男</a-radio>
              <a-radio value="1">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="age" label="年龄">
            <a-input-number v-model:value="formState.age" :min="1" :max="150" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item name="address" label="地址">
        <i-location-selector v-model:value="formState.address" />
      </a-form-item>

      <a-form-item name="userPassword" label="密码">
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入用户密码">
          <template #prefix>
            <Icon icon="SecurityScanOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="reUserPassword" label="再次输入密码">
        <a-input-password v-model:value="formState.reUserPassword" placeholder="请再次输入密码">
          <template #prefix>
            <Icon icon="SecurityScanOutlined" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="email" label="邮箱">
        <a-input v-model:value="formState.email" placeholder="请输入邮箱">
          <template #prefix>
            <Icon icon="MailOutlined" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="applyStatus" label="求职状态">
        <a-select v-model:value="formState.applyStatus" placeholder="请选择求职状态">
          <a-select-option :value="0">在职，看看新机会</a-select-option>
          <a-select-option :value="1">在职，暂无跳槽打算</a-select-option>
          <a-select-option :value="2">离职，随时到岗</a-select-option>
          <a-select-option :value="3">在校，月内到岗</a-select-option>
          <a-select-option :value="4">在校，考虑机会</a-select-option>
          <a-select-option :value="5">在校，暂不考虑</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <router-link to="/auth/loginByPassword" style="float: left">使用密码登录？</router-link>
        <router-link to="/auth/forgetPassword" style="float: right">忘记密码</router-link>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" html-type="submit" type="primary" style="width: 100%" @click="submitCompleteInfo">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.complete-info {
  width: calc(100% - 270px);

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  .i-auth-title {
    @apply text-3xl font-bold text-center m-5 drop-shadow-md;
  }

  .complete-info-form {
    .avatar-uploader {
      @apply relative overflow-hidden;
      img {
        @apply relative z-0;
      }
    }
  }
}

:deep(.i-auth-layout__container) {
  width: 700px !important;
}
</style>
