<script lang="ts" setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()

function logout() {
  userStore.logout()
}
</script>

<template>
  <div class="i-avatar">
    <a-dropdown :trigger="['click']">
      <div class="i-avatar__wrapper">
        <div class="i-avatar__wrapper--icon">
          <a-avatar :size="40">
            <template #icon>
              <Icon icon="UserOutlined" />
            </template>
          </a-avatar>
        </div>
        <div class="i-avatar__title">
          <span class="i-avatar__title--hello">hello, </span>
          <span class="i-avatar__title--username">username</span>
        </div>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">
            <Icon icon="UserOutlined" />
            <router-link to="/userCenter">&nbsp;{{ $t('user.center.title') }}</router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <Icon icon="LogoutOutlined" />
            <!--技巧使用 a标签而不是router-link可以刷新页面，如果你需要的话-->
            <a href="/auth/login" @click="logout">&nbsp;{{ $t('user.logout') }}</a>
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
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .i-avatar__wrapper--icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 999px;
      background: #1677ff;
      box-shadow: 0 0 10px rgba(#1677ff, 0.4);
      z-index: 2;
    }

    .i-avatar__title {
      display: flex;
      align-items: center;
      background: rgba(#1677ff, 0.4);
      height: 28px;
      padding: 5px 10px 5px 25px;
      transform: translateX(-20px);
      font-size: 14px;
      border-radius: 999px;
      box-shadow: 0 0 10px rgba(#1677ff, 0.4);
      //color: #1677ff;
      @include useTheme {
        @if getMode() == 'light' {
          color: #1677ff;
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
        max-width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
