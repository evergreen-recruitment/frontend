<script lang="ts" setup>
import IBackground from '@/layouts/components/IBackground/IBackground.vue'
import { ref } from 'vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const iBackgroundRef = ref<any>(null)
</script>

<template>
  <div class="i-auth-layout">
    <a-config-provider>
      <i-background ref="iBackgroundRef" />
      <div class="i-auth-layout__container">
        <div class="i-auth-layout__container--left">
          <div class="i-auth-layout__container--left-title">常青招聘</div>
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;

  .i-auth-layout__container {
    display: flex;
    width: 670px;
    margin: 0 auto;
    border-radius: 30px; // 圆角
    overflow: hidden;
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

    .i-auth-layout__container--left {
      @include useTheme {
        background: linear-gradient(90deg, getColor('primary'), getModeVar('cardBgColor'));
      }
      color: #ffffff;
      width: 240px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-shadow: 0 0 10px rgba(#000, 0.3);

      .i-auth-layout__container--left-title {
        font-size: 40px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
      }

      .i-auth-layout__container--left-subtitle {
        font-size: 20px;
        text-align: center;
      }
    }

    .i-auth-layout__container--form {
      padding: 20px;
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
