<script lang="ts" setup>
import { ref } from 'vue'
import IEmpAvatar from '@/layouts/components/IEmpAvatar/IEmpAvatar.vue'
import { useAppStore } from '@/stores'
import IEmpAlert from '@/layouts/components/IEmpAlert/IEmpAlert.vue'
import { useVModel } from '@vueuse/core'
import { getAssetsFile } from '@/utils/utils'

const appStore = useAppStore()
const emit = defineEmits(['update:openDrawer', 'update:menuCollapsed'])
const activeKey = ref('1')
const props = defineProps<{
  openDrawer: boolean
  menuCollapsed?: boolean
}>()
const propsOpenDrawer = useVModel(props, 'openDrawer', emit)
const propsMenuCollapsed = useVModel(props, 'menuCollapsed', emit)
</script>

<template>
  <a-layout-header class="i-emp-header">
    <div class="i-emp-header__inner">
      <div class="i-emp-header__inner--left">
        <div class="i-emp-header__logo">
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
        <a-button class="menu-btn collapse-menu" type="text" @click="propsMenuCollapsed = !propsMenuCollapsed">
          <Icon icon="MenuOutlined" />
        </a-button>
        <a-button class="menu-btn open-drawer" type="text" @click="propsOpenDrawer = !propsOpenDrawer">
          <Icon icon="MenuOutlined" />
        </a-button>
        <div class="logo">
          <div class="title">{{ $t('app.title') }}</div>
        </div>
      </div>
      <div class="i-emp-header__inner--right">
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
        <div class="skin">
          <a-dropdown :trigger="['click']">
            <a-button type="text">
              <Icon icon="SkinOutlined" />
              {{ $t('setting.theme.title') }}
              <Icon :size="10" icon="CaretDownOutlined" />
            </a-button>
            <template #overlay>
              <a-menu>
                <!--<a-menu-item key="0" @click="appStore.darkMode = 'auto'">{{ $t(`setting.theme.auto`) }}</a-menu-item>-->
                <a-menu-item key="1" @click="appStore.darkMode = 'dark'">{{ $t(`setting.theme.dark`) }}</a-menu-item>
                <a-menu-item key="2" @click="appStore.darkMode = 'light'">{{ $t(`setting.theme.light`) }}</a-menu-item>
                <!--更多颜色 TODO 废弃-->
                <!--<a-menu-item v-for="(color, name) in primaryColorEnum" :key="name" @click="appStore.themeName = name">-->
                <!--  {{ $t(`setting.theme.${name}`) }}-->
                <!--</a-menu-item>-->
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div class="company">
          <Icon icon="LockOutlined" />
          阿里巴巴&nbsp;&nbsp;
        </div>
        <i-emp-alert v-model:activeKey="activeKey" />
        <i-emp-avatar />
      </div>
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-emp-header {
  padding: 0 10px;

  .i-emp-header__inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .i-emp-header__inner--left {
      display: flex;
      align-items: center;
      justify-content: center;

      .i-emp-header__logo {
        height: 100%;
        //background: rgba(205, 205, 205, 0.3);
        //background: url('@/assets/images/logo1.png') no-repeat left center;
        //background-size: cover;
        color: #000;

        @media screen and (max-width: 768px) {
          display: none;
        }

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
            height: 60px;
            width: 100%;
            object-fit: cover;
            object-position: left center;
          }
        }
      }

      .menu-btn {
        display: inline-block;
        height: 40px;
        width: 40px;
        padding: 2px;
        font-size: 22px;
      }

      .open-drawer {
        display: none;
        @media screen and (max-width: 768px) {
          display: inline-block;
        }
      }

      .collapse-menu {
        display: inline-block;
        margin-right: 10px;
        @media screen and (max-width: 768px) {
          display: none;
        }
      }

      .logo {
        display: flex;
        align-items: center;

        @media screen and (max-width: 768px) {
          display: none;
        }

        .title {
          font-size: 20px;
          font-weight: 500;
          @include useTheme {
            color: getModeVar('textColor');
          }
        }
      }
    }

    .i-emp-header__inner--right {
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

      .company {
        // 单行文本溢出显示省略号
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 110px;

        @media screen and (max-width: 1200px) {
          display: none;
        }
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
  }
}
</style>
