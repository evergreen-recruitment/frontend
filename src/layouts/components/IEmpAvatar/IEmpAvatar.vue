<script lang="ts" setup>
import { useEmpStore } from '@/stores'
import { computed } from 'vue'

const empStore = useEmpStore()
const empInfo = computed(() => empStore.empInfo)

function logout() {
  empStore.logout()
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
          <span class="i-avatar__title--hello">hello,&nbsp;</span>
          <span class="i-avatar__title--username">{{ empInfo.realName }}</span>
        </div>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1" disabled>
            <Icon icon="UserOutlined" />
            <router-link to="/personalInformationManagement">&nbsp;{{ $t('user.center.title') }}</router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <Icon icon="AlertOutlined" />
            <router-link to="/notificationManagement">&nbsp;{{ $t('user.alert.title') }}</router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <Icon icon="LogoutOutlined" />
            <!--技巧使用 a标签而不是router-link可以刷新页面，如果你需要的话-->
            <a href="/empAuth/login" @click="logout">&nbsp;{{ $t('user.logout') }}</a>
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
