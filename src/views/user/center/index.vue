<script lang="ts" setup>
import { ref } from 'vue'
import { useStatusStore, useUserStore } from '@/stores'
import { findFullLocation } from '@/utils/utils'
import type { UpdateUserInfoFormType, UserInfoType } from '@/apis/user'
import { ApplyStatusEnum } from '@/apis/user'
import { message, type UploadChangeParam, type UploadProps } from 'ant-design-vue'
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import { uploadImageApi } from '@/apis/common'

const userStore = useUserStore()
const statusStore = useStatusStore()
const fileList = ref([])
const avatarUploadLoading = ref(false)
const formRef = ref()
const activeKey = ref('1')
const changePhoneVisible = ref(false)
type ModifiedUserInfoType = Omit<UserInfoType, 'location'> & { location: [number, number] }
const userInfoForm = ref<ModifiedUserInfoType>({
  ...userStore.userInfo,
  createTime: undefined,
  phone: undefined,
  userAccount: undefined,
  location: [101010000, 101010100], // 提供一个初始值
})

function getUserInfo() {
  const fullPath = findFullLocation(userStore.userInfo.location as number)
  userInfoForm.value = {
    ...userStore.userInfo,
    createTime: undefined,
    phone: undefined,
    userAccount: undefined,
    location: [fullPath[0].code, fullPath[1].code], // 提供一个初始值
  }
}

getUserInfo()

function submit() {
  formRef.value.validate().then(async () => {
    const obj: UpdateUserInfoFormType = {
      ...userInfoForm.value,
      location: userInfoForm.value.location[1],
    }
    const res = await userStore.updateUserInfo(obj)
    if (res === true) {
      message.success('更新用户信息成功')
    }
    getUserInfo()
  })
}

function handleAvatarChange(info: UploadChangeParam) {
  if (info.file.status === 'uploading') {
    avatarUploadLoading.value = true
    return
  }
  if (info.file.status === 'done') {
    userInfoForm.value.avatar = info.file.response
    avatarUploadLoading.value = false
  }
  if (info.file.status === 'error') {
    avatarUploadLoading.value = false
    message.error('upload error')
  }
}

// @ts-ignore
function beforeAvatarUpload(file: UploadProps['fileList'][number]) {
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

async function customUploadImage(e: UploadRequestOption) {
  const res = await uploadImageApi(e.file as File)
  if (res === undefined) {
    message.error('上传失败')
    return
  }
  // @ts-ignore
  e.onSuccess(res, e.file)
}
</script>

<template>
  <div class="user-center">
    <i-card class="card">
      <a-tabs v-model:activeKey="activeKey" tab-position="left">
        <a-tab-pane key="1" tab="个人信息">
          <div class="user-info">
            <a-page-header title="个人信息" />
            <div class="container">
              <a-form
                ref="formRef"
                :label-col="{ span: 5 }"
                :model="userInfoForm"
                class="user-info-form"
                label-align="left"
              >
                <a-form-item label="姓名" name="realName">
                  <a-input v-model:value="userInfoForm.realName" />
                </a-form-item>
                <a-form-item label="性别" name="gender">
                  <a-radio-group v-model:value="userInfoForm.gender">
                    <a-radio :value="0">女</a-radio>
                    <a-radio :value="1">男</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item label="邮箱" name="email">
                  <a-input v-model:value="userInfoForm.email" />
                </a-form-item>
                <a-form-item label="求职状态" name="applyStatus">
                  <a-select v-model:value="userInfoForm.applyStatus" placeholder="请选择求职状态">
                    <a-select-option v-for="(item, index) in ApplyStatusEnum" :value="Number(index)"
                      >{{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="所在地区" name="location">
                  <i-location-selector v-model:value="userInfoForm.location" />
                </a-form-item>
                <a-form-item label="求职意向" name="hopeJob">
                  <job-category-filter v-model:job-standard-id="userInfoForm.hopeJob" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" @click="submit">保存</a-button>
                </a-form-item>
              </a-form>
              <div class="avatar">
                <div class="title">
                  <span>头像</span>
                </div>
                <div v-if="userInfoForm.avatar" class="avatar-img">
                  <a-image :src="userInfoForm.avatar" />
                </div>
                <div v-else class="avatar-icon">
                  <Icon icon="UserOutlined" />
                </div>
                <a-upload
                  v-model:file-list="fileList"
                  :before-upload="beforeAvatarUpload"
                  :custom-request="customUploadImage"
                  :show-upload-list="false"
                  @change="handleAvatarChange"
                >
                  <a-button>
                    <Icon icon="UploadOutlined" />
                    上传头像
                  </a-button>
                </a-upload>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" force-render tab="安全设置">
          <a-page-header title="安全设置" />
          <a-list>
            <a-list-item>
              <a-list-item-meta description="当前密码强度：强" title="账户密码" />
              <a-button type="link">修改</a-button>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="已绑定手机：(86)139****3266" title="密保手机" />
              <a-popover v-model:open="changePhoneVisible" trigger="click">
                <template #title>
                  <h2>发送验证码</h2>
                </template>
                <template #content>
                  <div style="display: flex; flex-direction: column; gap: 10px; width: 230px">
                    <a-input placeholder="更换的手机号" />
                    <a-input-search placeholder="发送验证码">
                      <template #enterButton>
                        <a-button>发送</a-button>
                      </template>
                    </a-input-search>
                    <a-button type="primary">确认</a-button>
                  </div>
                </template>
                <a-button type="link">修改</a-button>
              </a-popover>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="3" tab="账号绑定">
          <a-page-header title="账号绑定" />
          <a-list>
            <a-list-item>
              <a-list-item-meta description="当前未绑定微信" title="绑定微信">
                <template #avatar>
                  <Icon icon="WechatOutlined" :size="40" />
                </template>
              </a-list-item-meta>
              <a-button type="link">绑定</a-button>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="当前未绑定支付宝" title="绑定支付宝">
                <template #avatar>
                  <Icon icon="AlipayOutlined" :size="40" />
                </template>
              </a-list-item-meta>
              <a-button type="link">绑定</a-button>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="当前未绑定QQ" title="绑定QQ">
                <template #avatar>
                  <Icon icon="QqOutlined" :size="40" />
                </template>
              </a-list-item-meta>
              <a-button type="link">绑定</a-button>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="4" tab="用户认证">
          <a-page-header title="用户认证" />
          <a-descriptions bordered title="手机验证">
            <a-descriptions-item label="验证状态">已验证</a-descriptions-item>
            <a-descriptions-item label="手机号">
              (86)139****3266
              <a-button type="link">编辑</a-button>
            </a-descriptions-item>
            <a-descriptions-item label="验证时间">2023/02/15 15:08</a-descriptions-item>
          </a-descriptions>
          <a-descriptions bordered title="实名验证">
            <a-descriptions-item label="验证状态">已验证</a-descriptions-item>
            <a-descriptions-item label="真实姓名">
              张三
              <a-button type="link">编辑</a-button>
            </a-descriptions-item>
            <a-descriptions-item label="验证时间"> 2023/02/15 15:08</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs>
    </i-card>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.user-center {
  @apply mt-10;
  $panel-width: calc(500px + 20vw);

  .user-info {
    .container {
      display: flex;
      justify-content: flex-start;
      align-items: start;

      @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
      }

      .user-info-form {
        flex: 1;
        max-width: 500px;

        @media screen and (max-width: 768px) {
          width: 100%;
        }
      }

      .avatar {
        display: flex;
        flex-direction: column;
        width: 20vw;
        justify-content: center;
        align-items: center;
        margin: 10px;

        @media screen and (max-width: 768px) {
          width: 100%;
        }

        .title {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
        }

        .avatar-img {
          width: 100px;
          height: 100px;
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 20px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .avatar-icon {
          width: 100px;
          height: 100px;
          border-radius: 999px;
          @include useTheme {
            background: getColor('primary');
            box-shadow: 0 0 10px rgba(getColor('primary'), 0.4);
          }
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 40px;
          color: #fff;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
