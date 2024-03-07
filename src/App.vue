<script lang="ts" setup>
import { computed, nextTick } from 'vue'
import { useAppStore } from '@/stores'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { executeAfterImagesLoaded } from '@/utils/utils'

const lang = {
  zhCN: zhCN,
  enUS: enUS,
}
const app = useAppStore()
document.documentElement.setAttribute('data-dark', app.darkMode)
const aLocale = computed(() => lang[app.localeComp])
dayjs.locale(app.locale)
// 加载完成
nextTick(() => {
  setTimeout(() => {
    executeAfterImagesLoaded(() => {
      document.dispatchEvent(new CustomEvent('loaded'))
    })
  }, 2000)
})
</script>

<template>
  <a-config-provider :locale="aLocale" :theme="app.themeConfig">
    <router-view v-slot="{ Component }">
      <transition-fade mode="out-in">
        <component :is="Component" />
      </transition-fade>
    </router-view>
  </a-config-provider>
</template>

<style lang="scss" scoped></style>
