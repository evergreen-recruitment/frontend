<script lang="ts" setup>
import IBackground from '@/layouts/components/IBackground/IBackground.vue'
import { ref } from 'vue'
import INavigator from '@/components/INavigator/INavigator.vue'

const iBackgroundRef = ref<any>(null)
</script>

<template>
  <div class="i-auth-layout">
    <a-config-provider>
      <i-background ref="iBackgroundRef" />
      <div class="i-auth-layout__container">
        <div class="i-auth-layout__container--left">
          <div class="i-auth-layout__container--left-title">
            <i-navigator to="/">
              <img src="@/assets/images/logo1-white.png" style="width: 250px; object-fit: cover" />
            </i-navigator>
          </div>
          <div class="i-auth-layout__container--left-subtitle">欢迎使用常青招聘</div>
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
  @apply h-screen flex justify-center items-center;

  @media screen and (max-width: 1280px) {
    //height: 100%;
  }

  @media screen and (max-width: 768px) {
    height: 100%;
  }

  .i-auth-layout__container {
    @apply flex w-[740px] mx-auto rounded-[30px] overflow-hidden transition-all;

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
      @apply w-full h-screen left-0 rounded-none items-center justify-center;
    }

    .i-auth-layout__container--left {
      @apply w-[270px] text-white p-[10px] flex flex-col justify-center items-center;

      @include useTheme {
        background: linear-gradient(90deg, getColor('primary'), getModeVar('cardBgColor'));
      }

      @media screen and (max-width: 768px) {
        display: none;
      }

      .i-auth-layout__container--left-title {
        @apply text-4xl font-bold text-center m-5 drop-shadow-md;
      }

      .i-auth-layout__container--left-subtitle {
        @apply text-xl drop-shadow-md;
      }
    }

    .i-auth-layout__container--form {
      @apply p-[20px] max-h-screen overflow-auto;
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
