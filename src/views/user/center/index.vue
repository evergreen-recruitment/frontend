<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { findFullLocation } from '@/utils/utils'
import type { UserInfoType } from '@/apis/user'

const userStore = useUserStore()
const activeKey = ref('1')
const changePhoneVisible = ref(false)
type ModifiedUserInfoType = Omit<UserInfoType, 'location'> & { location: [number, number] }
const fullPath = findFullLocation(userStore.userInfo.location as number)
const userInfoForm = ref<ModifiedUserInfoType>({
  ...userStore.userInfo,
  location: [fullPath[0].code, fullPath[1].code], // 提供一个初始值
})
console.log(userInfoForm.value.gender)
</script>

<template>
  <div class="user-center">
    <i-card class="card">
      <a-tabs v-model:activeKey="activeKey" tab-position="left">
        <a-tab-pane key="1" tab="个人信息">
          <div class="user-info">
            <a-page-header title="个人信息" />
            <div class="container">
              <a-form :label-col="{ span: 5 }" :model="userInfoForm" class="user-info-form" label-align="left">
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
                    <a-select-option :value="0">在职，看看新机会</a-select-option>
                    <a-select-option :value="1">在职，暂无跳槽打算</a-select-option>
                    <a-select-option :value="2">离职，随时到岗</a-select-option>
                    <a-select-option :value="3">在校，月内到岗</a-select-option>
                    <a-select-option :value="4">在校，考虑机会</a-select-option>
                    <a-select-option :value="5">在校，暂不考虑</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="所在地区" name="location">
                  <i-location-selector v-model:value="userInfoForm.location" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary">保存</a-button>
                </a-form-item>
              </a-form>
              <div class="avatar">
                <div class="title">
                  <span>头像</span>
                </div>
                <div v-if="userInfoForm.avatar" class="avatar-img">
                  <img :src="userInfoForm.avatar" alt="" />
                </div>
                <div v-else class="avatar-icon">
                  <Icon icon="UserOutlined" />
                </div>
                <a-upload>
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
