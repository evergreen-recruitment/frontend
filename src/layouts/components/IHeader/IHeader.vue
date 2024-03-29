<script setup lang="ts">
import { useAppStore, useUserStore } from '@/stores'
import { reactive } from 'vue'
import { getAssetsFile } from '@/utils/utils'

const userStore = useUserStore()
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
    path: '/search',
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
    path: '/',
    outer: true,
  },
  {
    id: '5',
    title: '社区',
    path: '/',
    outer: true,
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
            <a class="location nav-item" href="#">
              <span>南昌</span>
              <span>[切换]</span>
            </a>
            <template #content>
              <i-location-selector />
            </template>
          </a-popover>
          <template v-for="i in links">
            <a href="#" class="nav-item" v-if="i.outer" :key="i.title"> {{ i.title }} </a>
            <router-link
              v-else
              :to="i.path"
              :class="['nav-item', $router.currentRoute.value.path === i.path ? 'active-nav-item' : '']"
              :key="i.id"
            >
              {{ i.title }}
            </router-link>
          </template>
        </div>
      </div>
      <div v-if="!userStore.token" class="i-header__inner-right i-header__inner-not-login">
        <a href="#" class="nav-item"> 我是招聘人 </a>
        <router-link to="/auth/loginByCaptcha" class="nav-item"> 我是求职者</router-link>
        <div class="i-header__login" @click="$router.push('/auth/loginByCaptcha')">登录 | 注册</div>
      </div>
      <div v-else class="i-header__inner-right i-header__inner-already-login">
        <a-dropdown trigger="click">
          <div class="i-header__avatar">
            <span>用户&nbsp;</span>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <Icon icon="UserOutlined" />
                <router-link to="/userCenter">&nbsp;用户中心</router-link>
              </a-menu-item>
              <a-menu-item key="2">
                <Icon icon="SettingOutlined" />
                <router-link to="/settings">&nbsp;系统设置</router-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">
                <Icon icon="LogoutOutlined" />
                <router-link to="/" @click="userStore.logout()">&nbsp;退出</router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.i-header {
  @apply sticky top-0 h-12 shadow-md flex items-center justify-between px-4 backdrop-blur-xl  z-10;

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
        @apply flex items-center ml-4 space-x-4;

        .location {
          @apply relative flex items-center justify-center;
          span:nth-child(1) {
            @include useTheme {
              @apply text-lg;
              color: getColor('primary');
            }
          }
        }

        .nav-item {
          @apply text-sm transition-colors;
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
