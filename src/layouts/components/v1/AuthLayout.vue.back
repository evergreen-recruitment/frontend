<script lang="ts" setup>
import IBackground from '@/layouts/components/IBackground/IBackground.vue'
import { computed, ref } from 'vue'
import router from '@/router'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const iBackgroundRef = ref<any>(null)
const currentRouter = router.currentRoute
const currentRouterComp = computed(() => {
  return currentRouter.value.name
})

function toggleDarkMode(dark: 'dark' | 'light') {
  appStore.darkMode = dark
  iBackgroundRef.value?.reCreate()
}
</script>

<template>
  <div id="auth-layout">
    <div class="auth-header">
      <div class="header-right">
        <div class="lang">
          <a-dropdown :trigger="['click']">
            <a-button type="link">
              <Icon icon="GlobalOutlined" />
              {{ $t('setting.language.title') }}
              <Icon :size="10" icon="CaretDownOutlined" />
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="appStore.locale = 'zhCN'">中文</a-menu-item>
                <a-menu-item key="2" @click="appStore.locale = 'enUS'">English</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div class="skin">
          <a-dropdown :trigger="['click']">
            <a-button type="link">
              <Icon icon="SkinOutlined" />
              {{ $t('setting.theme.title') }}
              <Icon :size="10" icon="CaretDownOutlined" />
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="toggleDarkMode('dark')">{{ $t(`setting.theme.dark`) }}</a-menu-item>
                <a-menu-item key="2" @click="toggleDarkMode('light')">{{ $t(`setting.theme.light`) }}</a-menu-item>
                <!--更多颜色 TODO 废弃-->
                <!--<a-menu-item v-for="(color, name) in primaryColorEnum" :key="name" @click="appStore.themeName = name">-->
                <!--  {{ $t(`setting.theme.${name}`) }}-->
                <!--</a-menu-item>-->
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <i-background ref="iBackgroundRef" />
    <div class="container">
      <div class="auth-side">
        <div class="wrapper">
          <div class="title">{{ $t(`user.${String(currentRouterComp)}.title`) }}</div>
        </div>
      </div>
      <router-view v-slot="{ Component }" class="auth-form">
        <transition-slide :offset="[-16, 0]" mode="out-in">
          <component :is="Component" />
        </transition-slide>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

#auth-layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;

  .auth-header {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    backdrop-filter: blur(5px);
    z-index: 999;
    @include useTheme {
      background: rgba(getModeVar('cardBgColor'), 0.2);
    }

    .header-right {
      display: flex;
      align-items: center;

      .lang,
      .skin {
        button {
          @include useTheme {
            color: getModeVar('textColor');
          }
        }
      }
    }
  }

  .container {
    position: relative;
    display: grid;
    grid-template-columns: 4fr 6fr;
    grid-template-rows: 1fr;
    width: 700px;
    margin: 0 auto;
    @include useTheme {
      background: getModeVar('cardBgColor');
    }
    //border-radius: 10px; // 圆角
    overflow: hidden;
    @include useTheme {
      box-shadow: 0 0 10px rgba(getModeVar('infoColor'), 0.1);
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto 3fr;

      width: 500px;
    }

    .auth-side {
      position: relative;
      background: url('@/assets/images/bg1.png') no-repeat center center;

      @media screen and (max-width: 768px) {
        height: 70px;
      }

      .wrapper {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        //backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;

        .title {
          font:
            500 45px 'Microsoft YaHei',
            sans-serif;
          color: #fff;

          @media screen and (max-width: 768px) {
            font-size: 30px;
          }
        }
      }
    }

    .auth-form {
      padding: 50px 20px 30px 20px;

      @media screen and (max-width: 768px) {
        padding: 20px;
      }
    }
  }
}
</style>
