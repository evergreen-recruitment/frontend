<script lang="ts" setup>
import { reactive, ref } from 'vue'

const activeKey = ref('1')
const isMobile = ref(window.innerWidth < 768)
const userInfoForm = reactive<any>({})
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 768
})
</script>

<template>
  <div class="user-center">
    <i-card>
      <a-tabs v-model:activeKey="activeKey" :tab-position="isMobile ? 'top' : 'left'">
        <a-tab-pane key="1" tab="个人信息">
          <div class="user-info">
            <a-page-header title="个人信息" />
            <div class="container">
              <a-form :label-col="{ span: 5 }" :model="userInfoForm" class="user-info-form" label-align="left">
                <a-form-item label="邮箱">
                  <a-input v-model:value="userInfoForm.email" />
                </a-form-item>
                <a-form-item label="昵称">
                  <a-input v-model:value="userInfoForm.nickname" />
                </a-form-item>
                <a-form-item label="个人简介">
                  <a-input v-model:value="userInfoForm.desc" />
                </a-form-item>
                <a-form-item label="联系电话">
                  <a-input v-model:value="userInfoForm.phone" />
                </a-form-item>
                <a-form-item label="所在地区">
                  <a-input v-model:value="userInfoForm.area" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary">保存</a-button>
                </a-form-item>
              </a-form>
              <div class="avatar">
                <div class="title">
                  <span>头像</span>
                </div>
                <div class="avatar-img">
                  <Icon icon="UserOutlined" />
                </div>
                <a-upload>
                  <a-button>
                    <Icon icon="UploadOutlined" />
                    Click to Upload
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
              <a-button type="link">修改</a-button>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="未设置密保问题，密保问题可有效保护账户安全" title="密保问题" />
              <a-button type="link">修改</a-button>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="已绑定邮箱：ant***sign.com" title="备用邮箱" />
              <a-button type="link">修改</a-button>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="未绑定 MFA 设备，绑定后，可以进行二次确认" title="MFA 设备" />
              <a-button type="link">修改</a-button>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="3" tab="账号绑定">
          <a-page-header title="账号绑定" />
          <a-list>
            <a-list-item>
              <a-list-item-meta description="当前未绑定淘宝" title="绑定淘宝">
                <template #avatar>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png" />
                </template>
              </a-list-item-meta>
              <a-button type="link">绑定</a-button>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="当前未绑定支付宝" title="绑定支付宝">
                <template #avatar>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png" />
                </template>
              </a-list-item-meta>
              <a-button type="link">绑定</a-button>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="当前未绑定钉钉" title="绑定钉钉">
                <template #avatar>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png" />
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
            <a-descriptions-item label="真实姓名"> 姚佳煜</a-descriptions-item>
            <a-descriptions-item label="验证时间"> 2023/02/15 15:08</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="5" tab="通知设置">
          <a-page-header title="通知设置" />
          <a-list item-layout="horizontal">
            <a-list-item>
              <a-list-item-meta description="其他用户的消息将以站内信的形式通知" title="账户密码" />
              <a-switch />
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="系统消息将以站内信的形式通知" title="系统消息" />
              <a-switch />
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="待办任务将以站内信的形式通知" title="待办任务" />
              <a-switch />
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </i-card>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.user-center {
  $panel-width: calc(500px + 20vw);
  //padding: 20px;
  //@include useTheme {
  //  background: getModeVar('cardBgColor');
  //  border: 1px solid getModeVar('borderColor');
  //}

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
          background: #1677ff;
          box-shadow: 0 0 10px rgba(#1677ff, 0.4);
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

  :deep(.ant-tabs-content) {
    width: $panel-width;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
