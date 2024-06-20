<script setup lang="tsx">
import { ref } from 'vue'
import { useAppStore } from '@/stores'

const modelState = ref({
  open: false,
})

const appStore = useAppStore()

const radiusMarks = ref({
  0: '0px',
  4: '4px',
  7: '7px',
  12: '12px',
})

const max = ref(1400)

const minWidthMarks = ref({
  1024: '1024px',
  1280: '1280px',
  1400: '1400px',
})
</script>

<template>
  <a-float-button-group shape="square" class="bottom-float-btn">
    <a-float-button @click="$router.push('#')">
      <template #icon>
        <Icon icon="VerticalAlignTopOutlined" />
      </template>
    </a-float-button>
    <a-float-button class="setting-btn" @click="modelState.open = !modelState.open">
      <template #icon>
        <Icon icon="SettingOutlined" />
      </template>
    </a-float-button>
  </a-float-button-group>
  <a-modal
    class="setting-modal"
    v-model:open="modelState.open"
    title="设置"
    :footer="null"
    style="border-radius: var(--border-radius); overflow: hidden"
    :bodyStyle="{ padding: 0, overflow: 'auto' }"
    forceRender
    centered
  >
    <div class="setting-page">
      <div class="setting-page__inner">
        <div class="setting-page__inner--dark-mode">
          <i-page-header sub-title="设置系统的在白天和晚上的展现模式，或者跟随系统" title="暗亮色模式" />
          <div class="setting-page__inner--dark-mode__content setting-item__content">
            <a-radio-group v-model:value="appStore.darkMode">
              <!--<a-radio value="auto">跟随系统</a-radio>-->
              <a-radio value="light">白天模式</a-radio>
              <a-radio value="dark">夜间模式</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="setting-page__inner--radius">
          <i-page-header sub-title="设置系统的圆角大小" title="圆角设置" />
          <div class="setting-page__inner--radius__content setting-item__content">
            <a-slider v-model:value="appStore.borderRadius" :marks="radiusMarks" :max="12" :min="0" />
          </div>
        </div>
        <div class="setting-page__inner--animation">
          <i-page-header sub-title="设置是否开启网页的动画" title="开启动画" />
          <div class="setting-page__inner--animation__content setting-item__content">
            <a-switch v-model:checked="appStore.openAnimation" checked-children="开" un-checked-children="关" />
          </div>
        </div>
        <div class="setting-page__inner--color-mode">
          <i-page-header sub-title="设置系统的主题色" title="色彩模式" />
          <div class="setting-page__inner--color-mode__content setting-item__content">
            <a-radio-group v-model:value="appStore.themeName">
              <a-radio value="origin">原色</a-radio>
              <a-radio value="red">红色</a-radio>
              <a-radio value="orange">橘色</a-radio>
              <a-radio value="yellow">黄色</a-radio>
              <a-radio value="cyan">青色</a-radio>
              <a-radio value="green">绿色</a-radio>
              <a-radio value="blue">蓝色</a-radio>
              <a-radio value="purple">紫色</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="setting-page__inner--show-border">
          <i-page-header sub-title="设置是否显示卡片的边框" title="显示卡片边框" />
          <div class="setting-page__inner--show-border__content setting-item__content">
            <a-switch v-model:checked="appStore.showCardBorderComp" checked-children="开" un-checked-children="关" />
          </div>
        </div>
        <div class="setting-page__inner--min-width">
          <i-page-header sub-title="设置系统的最小屏幕宽度，用于适配各种不同的屏幕尺寸" title="最小宽度" />
          <div class="setting-page__inner--min-width__content setting-item__content">
            <a-slider v-model:value="appStore.minScreenWidthComp" :marks="minWidthMarks" :max="max" :min="1024" />
          </div>
        </div>
        <div class="setting-page__inner--outer-link">
          <i-page-header sub-title="设置元素的打开方式，是否为从新窗口打开" title="是否开启默认打开链接为外链" />
          <div class="setting-page__inner--outer-link__content setting-item__content">
            <a-switch v-model:checked="appStore.openInNewWindow" checked-children="开" un-checked-children="关" />
          </div>
        </div>
        <div class="setting-page__inner--token-keep">
          <i-page-header sub-title="设置登录用户的Token保留天数，以控制登录" title="Token保留天数" />
          <div class="setting-page__inner--token-keep__content setting-item__content">
            <a-time-picker
              v-model:value="appStore.tokenExpiresComp"
              value-format="HH:mm:ss"
              :show-now="false"
              placement="topLeft"
            />
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.bottom-float-btn {
  @apply fixed bottom-10 right-10 z-[9999];
  @media screen and (max-width: 432px) {
    @apply right-5;
  }
}

.setting-page {
  @apply w-full h-full rounded-[var(--border-radius)];
  min-height: 0 !important;

  .setting-page__title {
    @apply text-xl text-center font-bold p-5;
  }

  .setting-page__inner {
    :deep(.i-page-header) {
      @apply rounded-none;
    }

    .setting-item__content {
      @apply p-5;
    }
  }
}
</style>
