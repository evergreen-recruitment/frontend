<script setup lang="ts">
import { useAppStore, useStatusStore, useUserStore } from '@/stores'
import { computed, reactive } from 'vue'
import { getAssetsFile } from '@/utils/utils'
import INavigator from '@/components/INavigator/INavigator.vue'
import IAvatar from '@/layouts/components/IAvatar/IAvatar.vue'

const statusStore = useStatusStore()
statusStore.getAddress()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const appStore = useAppStore()
const links = reactive([
  {
    id: '1',
    title: '首页',
    path: '/home',
    outer: false,
  },
  {
    id: '2',
    title: '搜索',
    path: '/job/search',
    outer: false,
  },
  {
    id: '3',
    title: '公司',
    path: '/company',
    outer: false,
  },
  {
    id: '4',
    title: 'APP',
    path: '#',
    outer: false,
  },
  {
    id: '5',
    title: '社区',
    path: '#',
    outer: false,
  },
])
</script>

<template>
  <div class="i-header">
    <div class="i-header__inner">
      <div class="i-header__inner-left">
        <div class="i-header__logo">
          <a href="/">
            <img
              :src="
                appStore.darkMode == 'light'
                  ? getAssetsFile('images/logo1-black.png')
                  : getAssetsFile('images/logo1-white.png')
              "
              alt=""
            />
          </a>
        </div>
        <div class="i-header__menu">
          <a-popover trigger="click" placement="bottom">
            <a class="location" href="#">
              <span>{{ statusStore.city.name.split(',')[1] }}</span>
              <span>[切换]</span>
            </a>
            <template #content>
              <i-location-selector v-model:value="statusStore.city.code" v-model:text="statusStore.city.name" />
            </template>
          </a-popover>
          <i-navigator
            v-for="i in links"
            :to="i.path"
            class="nav-item"
            :class="[$router.currentRoute.value.path === i.path ? 'active-nav-item' : '']"
            :open-in-new-window="i.outer"
          >
            {{ i.title }}
          </i-navigator>
        </div>
      </div>
      <div v-if="!userStore.token" class="i-header__inner-right i-header__inner-not-login">
        <i-navigator to="/empAuth/login" class="nav-item" open-in-new-window> 我是招聘人</i-navigator>
        <i-navigator to="/auth/loginByCaptcha" class="nav-item" open-in-new-window> 我是求职者</i-navigator>
        <i-navigator class="i-header__login" to="/auth/loginByCaptcha" open-in-new-window>登录 | 注册</i-navigator>
      </div>
      <div v-else class="i-header__inner-right i-header__inner-already-login">
        <i-avatar />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.i-header {
  --shadow-opacity: 0.1;
  @apply sticky w-full top-0 h-[55px] flex items-center justify-between px-4 backdrop-blur-xl z-10 box-border;

  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, var(--shadow-opacity));

  @include useTheme {
    @if (getMode() == 'dark') {
      @apply text-white;
      background: rgba((adjust-hue(hsl(0, 50%, 10%), hue(getColor('primary')))), 0.8);
    } @else {
      @apply text-gray-800;
      background: rgba((adjust-hue(hsl(0, 50%, 90%), hue(getColor('primary')))), 0.8);
    }
  }

  a {
    @apply no-underline;

    @include useTheme {
      @if (getMode() == 'dark') {
        @apply text-white;
      } @else {
        @apply text-gray-800;
      }
    }
  }

  .i-header__inner {
    @apply flex items-center justify-between max-w-7xl w-full mx-auto;

    .i-header__inner-left {
      @apply flex items-center;

      .i-header__logo {
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          margin: 0 5px 0 10px;
          @media screen and (max-width: 1280px) {
            margin: 0 5px;
          }

          img {
            height: 50px;
            width: 100%;
            object-fit: cover;
            object-position: left center;
          }
        }
      }

      .i-header__menu {
        @apply flex items-center ml-4 space-x-3;

        .location {
          @apply relative flex items-center justify-center p-0;
          span:nth-child(1) {
            @include useTheme {
              @apply text-lg;
              color: getColor('primary');
            }
          }
        }

        .nav-item {
          @apply px-2 py-1 text-sm transition-colors rounded-[var(--border-radius)] cursor-pointer;

          &:hover {
            @include useTheme {
              background: rgba(getModeVar('infoColor'), 0.1);
            }
          }
        }

        .active-nav-item {
          @include useTheme {
            color: getColor('primary');
          }
        }
      }
    }

    .i-header__inner-right {
      @apply flex items-center space-x-4;
      .i-header__login {
        @apply text-sm cursor-pointer px-2 py-1 rounded-[var(--border-radius)] transition-colors;

        @include useTheme {
          @if (getMode() == 'dark') {
            border: 1px solid white;
          } @else {
            border: 1px solid black;
          }
        }
      }

      .i-header__avatar {
        @apply flex items-center space-x-3 cursor-pointer;
      }
    }
  }
}
</style>
