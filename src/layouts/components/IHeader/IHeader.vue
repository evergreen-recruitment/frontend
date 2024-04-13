<script lang="ts" setup>
import { useAppStore, useStatusStore, useUserStore } from '@/stores'
import { computed, reactive } from 'vue'
import { getAssetsFile } from '@/utils/utils'
import INavigator from '@/components/INavigator/INavigator.vue'
import IAvatar from '@/layouts/components/IAvatar/IAvatar.vue'
import { constantRouterMap, getAsyncRouterMap, type IRouter } from '@/config/router.config'

const statusStore = useStatusStore()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const appStore = useAppStore()
type LinkType = {
  id: string
  title: string
  path: string
  outer: boolean
  icon?: string
}
const links = reactive<LinkType[]>([
  {
    id: '1',
    title: '首页',
    path: '/home',
    outer: false,
  },
  {
    id: '2',
    title: '推荐',
    path: '/recommend',
    outer: false,
  },
  {
    id: '3',
    title: '搜索',
    path: '/job/search',
    outer: false,
  },
  {
    id: '4',
    title: '公司',
    path: '/company/search',
    outer: false,
  },
  {
    id: '5',
    title: 'APP',
    path: '#',
    outer: false,
  },
  {
    id: '6',
    title: '社区',
    path: '#',
    outer: false,
  },
])

// 获取所有的路由配置
const allRoutes = [...constantRouterMap, ...getAsyncRouterMap()]

// 遍历 links 数组
for (let link of links) {
  // 在所有的路由配置中查找与当前 link 对象 path 属性相同的路由对象
  const route = allRoutes.find((route) => route.path === link.path) as IRouter

  // 如果找到了路由对象，并且这个路由对象有 meta.icon 属性，那么就将这个属性的值添加到 link 对象中
  if (route && route.meta && route.meta.icon) {
    link.icon = route.meta.icon
  }
}
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
          <a-popover placement="bottom" trigger="click">
            <a class="location" href="#">
              <span>{{ statusStore.city.name.split(',')[1] }}</span>
              <span>[切换]</span>
            </a>
            <template #content>
              <i-location-selector
                v-model:text="statusStore.city.name"
                v-model:value="statusStore.city.code"
                add-nationwide
              />
            </template>
          </a-popover>
          <i-navigator
            v-for="i in links"
            :class="[$router.currentRoute.value.path === i.path ? 'active-nav-item' : '']"
            :open-in-new-window="i.outer"
            :to="i.path"
            class="nav-item"
          >
            <Icon v-if="i.icon" :icon="i.icon" />
            {{ i.title }}
          </i-navigator>
        </div>
      </div>
      <div v-if="!userStore.token" class="i-header__inner-right i-header__inner-not-login">
        <i-navigator class="nav-item" to="/empAuth/login"> 我是招聘人</i-navigator>
        <i-navigator class="nav-item" to="/auth/loginByCaptcha"> 我是求职者</i-navigator>
        <i-navigator class="i-header__login" to="/auth/loginByCaptcha">登录 | 注册</i-navigator>
      </div>
      <div v-else class="i-header__inner-right i-header__inner-already-login">
        <i-avatar />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    @apply flex items-center justify-between max-w-[calc(var(--min-screen-width)+150px)] w-full mx-auto;

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
