<script setup lang="ts"></script>

<template>
  <div class="i-header">
    <div class="i-header__inner">
      <div class="i-header__inner-left">
        <div class="i-header__logo">
          <router-link to="/">常青招聘</router-link>
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
          <router-link to="/home" class="nav-item active-nav-item"> 首页</router-link>
          <router-link to="/search" class="nav-item"> 搜索</router-link>
          <a href="#" class="nav-item"> 公司 </a>
          <a href="#" class="nav-item"> APP </a>
          <a href="#" class="nav-item"> 社区 </a>
        </div>
      </div>
      <div class="i-header__inner-right">
        <a href="#" class="nav-item"> 我是招聘人 </a>
        <a href="#" class="nav-item"> 我是求职者 </a>
        <div class="i-header__login" @click="$router.push('/auth/loginByCaptcha')">登录 | 注册</div>
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
      @apply bg-gray-800 bg-opacity-80 text-white;
    } @else {
      @apply bg-white bg-opacity-80 text-gray-800;
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
        font:
          400 30px hanyiyongzisonghei,
          serif;
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
        @apply text-sm cursor-pointer px-2 py-1 rounded-md transition-colors;

        @include useTheme {
          @if (getMode() == 'dark') {
            border: 1px solid white;
          } @else {
            border: 1px solid black;
          }
        }
      }
    }
  }
}
</style>
