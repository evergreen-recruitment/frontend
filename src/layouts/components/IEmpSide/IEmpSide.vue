<script lang="ts" setup>
import IEmpMenu from '@/layouts/components/IEmpMenu/IEmpMenu.vue'
import { getAssetsFile } from '@/utils/utils'
import { useAppStore } from '@/stores'
import { useVModel } from '@vueuse/core'

const appStore = useAppStore()
const emit = defineEmits(['update:collapsed'])
const props = defineProps<{
  collapsed?: boolean
  menuList: any[]
  showLogo?: boolean
}>()
const propsCollapsed = useVModel(props, 'collapsed', emit)
</script>

<template>
  <a-layout-sider
    v-model:collapsed="propsCollapsed"
    :style="showLogo ? {} : { height: 'calc(100vh - 114px)' }"
    :theme="appStore.darkMode || 'light'"
    class="i-side"
    v-bind="$attrs"
  >
    <div v-if="showLogo" class="i-side__logo">
      <a href="/">
        <img
          :src="collapsed ? getAssetsFile('images/logo.png') : getAssetsFile('images/logo-white.png')"
          :style="{ height: collapsed ? '40px' : '64px' }"
          alt=""
        />
      </a>
    </div>
    <i-emp-menu :menu-list="menuList" :style="showLogo ? {} : { height: 'calc(100vh - 114px)' }" v-bind="$attrs" />
  </a-layout-sider>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-side {
  overflow: auto;
  height: 100vh;
  box-sizing: border-box;
  background: transparent;
  z-index: 99;
  margin-left: 2px;
  //transition: width 0.3s;

  .i-side__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    margin: 16px;
    //background: rgba(205, 205, 205, 0.3);
    //background: url('@/assets/images/logo1.png') no-repeat left center;
    //background-size: cover;
    color: #000;

    img {
      height: 64px;
      width: 100%;
      object-fit: cover;
      object-position: left center;
    }
  }
}

// 不显示默认的 收起菜单 trigger
:deep(.ant-layout-sider-trigger) {
  display: none !important;
}
</style>
