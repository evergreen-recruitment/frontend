<script lang="ts" setup>
import IBackground from '@/layouts/components/IBackground/IBackground.vue'
import { ref, watch } from 'vue'
import router from '@/router'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
// const mobile = ref(window.innerWidth < 768)
const activeKey = ref(router.currentRoute.value.name)
const iBackgroundRef = ref<any>(null)

function toggleDarkMode(dark: 'dark' | 'light') {
  appStore.darkMode = dark
  // iBackgroundRef.value?.reCreate()
}

function handleTabsChange() {
  if (activeKey.value === 'login') {
    router.push('/auth/login')
  } else {
    router.push('/auth/register')
  }
}

// 监听路由变化
watch(
  () => router.currentRoute.value.name,
  (val) => {
    activeKey.value = val
  },
)

// // 监听窗口变化
// window.addEventListener('resize', () => {
//   mobile.value = window.innerWidth < 768
// })
</script>

<template>
  <div class="i-auth-layout">
    <a-config-provider>
      <!--:theme="{-->
      <!--  algorithm: theme.defaultAlgorithm,-->
      <!--}"-->
      <div class="i-auth-layout__header">
        <div class="i-auth-layout__header--left">
          <a href="/" style="text-decoration: none;font-size: 30px">
            <!--<img-->
            <!--  :src="-->
            <!--    appStore.darkMode == 'light'-->
            <!--      ? getAssetsFile('images/logo1-blue.png')-->
            <!--      : getAssetsFile('images/logo1-white.png')-->
            <!--  "-->
            <!--/>-->
            <!--使用图片替换-->
            <span>Logo</span>
          </a>
        </div>
        <div class="i-auth-layout__header--right">
          <div class="lang">
            <a-dropdown :trigger="['click']">
              <a-button type="text">
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
          <!--关闭登录界面的皮肤切换 TODO-->
          <div v-if="true" class="skin">
            <a-dropdown :trigger="['click']">
              <a-button type="text">
                <Icon icon="SkinOutlined" />
                {{ $t('setting.theme.title') }}
                <Icon :size="10" icon="CaretDownOutlined" />
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0" @click="appStore.darkMode = 'auto'">{{ $t(`setting.theme.auto`) }}</a-menu-item>
                  <a-menu-item key="1" @click="appStore.darkMode = 'dark'">{{ $t(`setting.theme.dark`) }}</a-menu-item>
                  <a-menu-item key="2" @click="appStore.darkMode = 'light'">
                    {{ $t(`setting.theme.light`) }}
                  </a-menu-item>
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
      <div class="i-auth-layout__container">
        <div class="i-auth-layout__container--top">
          <a-tabs
            v-model:active-key="activeKey"
            :tab-bar-gutter="150"
            class="i-auth-layout__container--tabs"
            @change="handleTabsChange"
          >
            <a-tab-pane key="login" :tab="$t('user.login.title')" />
            <a-tab-pane key="register" :tab="$t('user.register.title')" />
          </a-tabs>
        </div>
        <router-view v-slot="{ Component }" class="i-auth-layout__container--form">
          <transition-slide :offset="[-16, 0]" mode="out-in">
            <component :is="Component" />
          </transition-slide>
        </router-view>
      </div>
    </a-config-provider>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-auth-layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;

  .i-auth-layout__header {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0 20px 0 50px;
    box-sizing: border-box;
    backdrop-filter: blur(5px);
    z-index: 999;
    //background: rgba(#ffffff, 0.2);
    transition: background 0.3s ease-in-out;
    @include useTheme {
      background: rgba(getModeVar('cardBgColor'), 0.2);
    }

    @media screen and (max-width: 768px) {
      height: 40px;
      padding: 0 20px;
    }

    .i-auth-layout__header--left {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      a {
        @include useTheme {
          color: getModeVar('textColor');
        }

        img {
          height: 50px;
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }
    }

    .i-auth-layout__header--right {
      display: flex;
      align-items: center;

      .lang,
      .skin {
        button {
          //color: #000;
          @include useTheme {
            color: getModeVar('textColor');
          }
        }
      }
    }
  }

  .i-auth-layout__container {
    position: relative;
    width: 470px;
    margin: 0 auto;
    left: 20vw;
    padding: 10px;
    border-radius: var(--border-radius); // 圆角
    overflow: hidden;
    //box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    //background: #ffffff;
    transition: background 0.3s ease-in-out;
    @include useTheme {
      background: getModeVar('cardBgColor');
    }
    @include useTheme {
      box-shadow: 0 0 10px rgba(getModeVar('infoColor'), 0.1);
    }

    @media screen and (max-width: 1280px) {
      left: 0;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      left: 0;
      border-radius: 0;
    }

    .i-auth-layout__container--form {
      padding: 20px 20px 30px 20px;

      @media screen and (max-width: 768px) {
        padding: 20px;
      }
    }
  }
}

//修改ant-design样式
:deep(.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap) {
  display: flex !important;
  justify-content: center !important;
}

:deep(.ant-tabs .ant-tabs-tab .ant-tabs-tab-btn) {
  font-size: 20px !important;
  @media screen and (max-width: 768px) {
    font-size: 16px !important;
  }
}
</style>
