<script lang="ts" setup>
import { type UserInfo, useUserStore } from '@/stores'
import { computed } from 'vue'

const userStore = useUserStore()
const userInfo = computed<UserInfo>(() => userStore.userInfo)

function logout() {
  userStore.logout()
}
</script>

<template>
  <div class="i-avatar">
    <a-dropdown :trigger="['click']">
      <div class="i-avatar__wrapper">
        <div class="i-avatar__wrapper--icon">
          <a-avatar :src="userInfo.avatar" :size="40" />
        </div>
        <div class="i-avatar__title">
          <span class="i-avatar__title--hello">hello,&nbsp;</span>
          <span class="i-avatar__title--username">{{ userInfo.realName }}</span>
        </div>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">
            <Icon icon="UserOutlined" />
            <router-link to="/user/center">&nbsp;用户中心</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <Icon icon="UserOutlined" />
            <router-link to="/user/application">&nbsp;个人简历</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <Icon icon="UserOutlined" />
            <router-link to="/user/previewApplication">&nbsp;预览在线简历</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <Icon icon="UserOutlined" />
            <router-link to="/user/delivery">&nbsp;投递信息</router-link>
          </a-menu-item>
          <a-menu-item key="5">
            <Icon icon="SettingOutlined" />
            <router-link to="/settings">&nbsp;系统设置</router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="6">
            <Icon icon="SettingOutlined" />
            <router-link to="/empAuth/login" @click="userStore.logout()">&nbsp;切换到招聘者</router-link>
          </a-menu-item>
          <a-menu-item key="7">
            <Icon icon="LogoutOutlined" />
            <router-link to="/" @click="userStore.logout()">&nbsp;退出</router-link>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-avatar {
  .i-avatar__wrapper {
    @apply flex items-center justify-center cursor-pointer;

    .i-avatar__wrapper--icon {
      @apply flex items-center justify-center w-[40px] h-[40px] rounded-full z-[2];
      @include useTheme {
        background: getColor('primary');
        box-shadow: 0 0 10px rgba(getColor('primary'), 0.4);
      }
    }

    .i-avatar__title {
      @apply flex items-center h-[20px] rounded-full box-content;
      padding: 5px 10px 5px 25px;
      transform: translateX(-20px);
      font-size: 14px;
      //color: #1677ff;
      @include useTheme {
        background: rgba(getColor('primary'), 0.4);
        box-shadow: 0 0 10px rgba(getColor('primary'), 0.4);
        @if getMode() == 'light' {
          color: getColor('primary');
        } @else {
          color: #fff;
        }
      }

      @media screen and (max-width: 1200px) {
        display: none;
      }

      @media screen and (max-width: 768px) {
        display: none;
      }

      .i-avatar__title--username {
        font-weight: 600;
        // 单行省略号
        //min-width: 50px;
        max-width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
