<script lang="ts" setup>
import { useAppStore, useUserStore } from '@/stores'
import { computed, ref } from 'vue'
import type { UserInfoType } from '@/apis/user'

const userStore = useUserStore()
const appStore = useAppStore()
const userInfo = computed<UserInfoType>(() => userStore.userInfo)
const menuList = ref([
  {
    id: 3,
    icon: 'UserOutlined',
    path: '/user/center',
    title: '用户中心',
  },
  {
    id: 4,
    icon: 'FileTextOutlined',
    path: '/user/application',
    title: '个人简历',
  },
  {
    id: 5,
    icon: 'EyeOutlined',
    path: 'http://editor.eh.healwrap.cn/developer-concise-1',
    title: '预览在线简历',
    isOuterLink: true,
    selfOpen: true,
  },
  {
    id: 6,
    icon: 'FlagOutlined',
    path: '/user/delivery',
    title: '投递信息',
  },
])
</script>

<template>
  <div class="i-avatar">
    <a-dropdown :trigger="[appStore.screenWidth < 768 ? 'click' : 'hover']" placement="bottomRight">
      <div
        class="i-avatar__wrapper"
        @click="
          () => {
            if (appStore.screenWidth > 768) {
              $router.push('/user/center')
            }
          }
        "
      >
        <div class="i-avatar__wrapper--icon">
          <a-avatar :size="40" :src="userInfo.avatar" />
        </div>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <div class="i-avatar__inner-wrapper">
              <div class="i-avatar__inner-top">
                <div class="i-avatar__inner-left">
                  <div class="i-avatar__inner-wrapper--icon">
                    <a-avatar :size="60" :src="userInfo.avatar" />
                  </div>
                </div>
                <div class="i-avatar__inner-right">
                  <div class="i-avatar__inner-title">
                    <span class="i-avatar__inner-title--hello">hello,&nbsp;</span>
                    <span class="i-avatar__inner-title--username">{{ userInfo.realName }}</span>
                  </div>
                  <div class="i-avatar__inner-subtitle">{{ userInfo.email }}</div>
                </div>
              </div>
              <div class="i-avatar__inner-bottom">
                <div class="i-avatar__inner-left">
                  今日已投递
                  <div class="num">99</div>
                </div>
                <div class="i-avatar__inner-right">
                  今日已面试
                  <div class="num">99</div>
                </div>
              </div>
            </div>
          </a-menu-item>
          <template v-if="appStore.screenWidth < 1200">
            <a-menu-item v-for="menu in menuList" :key="menu.id">
              <i-navigator class="menu-btn" :to="menu.path">
                <Icon :icon="menu.icon" :size="16" />
                {{ menu.title }}
              </i-navigator>
            </a-menu-item>
          </template>
          <a-menu-divider />
          <a-menu-item key="1">
            <Icon icon="TeamOutlined" />
            <router-link to="/empAuth/login" @click="userStore.logout()">&nbsp;切换到招聘者</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <Icon icon="LogoutOutlined" />
            <router-link to="/" @click="userStore.logout()">&nbsp;退出</router-link>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <div v-if="appStore.screenWidth > 1200" class="i-avatar__menu-right">
      <a-tooltip placement="bottom" v-for="menu in menuList" :key="menu.id">
        <template #title>
          <span>{{ menu.title }}</span>
        </template>
        <i-navigator class="menu-btn" :to="menu.path" :self-open="menu?.selfOpen" :is-outer-link="menu?.isOuterLink">
          <Icon :icon="menu.icon" :size="16" />
        </i-navigator>
      </a-tooltip>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/theme.scss';

.ant-dropdown {
  .i-avatar__inner-wrapper {
    @apply flex flex-col items-center justify-center;

    .i-avatar__inner-top {
      @apply flex items-center justify-center;

      .i-avatar__inner-left {
        .i-avatar__inner-wrapper--icon {
        }
      }

      .i-avatar__inner-right {
        @apply flex flex-col items-start justify-center h-[40px] rounded-full box-content;
        padding: 5px 15px 5px 10px;
        font-size: 14px;

        .i-avatar__inner-title {
          @apply flex items-center h-[20px] box-content;
          font-size: 14px;
          @media screen and (max-width: 1200px) {
            display: none;
          }

          @media screen and (max-width: 768px) {
            display: none;
          }

          .i-avatar__inner-title--hello {
            font-weight: 600;
          }

          .i-avatar__inner-title--username {
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

    .i-avatar__inner-bottom {
      @apply w-full flex items-center justify-between mt-2;
      .i-avatar__inner-left,
      .i-avatar__inner-right {
        @apply flex flex-col items-center justify-center;
        .num {
          @apply mt-1 font-bold text-lg;
          @include useTheme {
            color: getColor('primary');
          }
        }
      }
    }
  }
}

.i-avatar {
  @apply flex items-center justify-center box-border space-x-2;
  padding: 5px;

  @include useTheme {
    @apply rounded-full;
    background: rgba(getColor('primary'), 0.4);
    box-shadow: 0 0 10px rgba(getColor('primary'), 0.4);
  }

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

  .i-avatar__menu-right {
    @apply flex items-center space-x-2;
    .menu-btn {
      @apply flex items-center justify-center w-[35px] h-[35px] rounded-full cursor-pointer;
      transition: transform 0.4s;
      @include useTheme {
        background: rgba(getColor('primary'), 0.4);
        box-shadow: 0 0 10px rgba(getColor('primary'), 0.4);
        @if getMode() == 'light' {
          color: getColor('primary');
        } @else {
          color: #fff;
        }
        &:hover {
          transform: scale(1.15);
        }
      }
    }
  }
}
</style>
