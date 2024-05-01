<script lang="ts" setup>
import IHeader from '@/layouts/components/IHeader/IHeader.vue'
import IFooter from '@/layouts/components/IFooter/IFooter.vue'
import router from '@/router'
import { useAppStore, useStatusStore, useUserStore } from '@/stores'
import { computed, onBeforeMount } from 'vue'
import { isCompleteUserInfoApi } from '@/apis/auth'

const statusStore = useStatusStore()
const userStore = useUserStore()
const appStore = useAppStore()
const containerWidth = computed(() => {
  return `${
    router.currentRoute.value.meta?.width === undefined
      ? `${appStore.minScreenWidthComp}px`
      : router.currentRoute.value.meta.width
  }`
})
onBeforeMount(async () => {
  if (userStore.token !== undefined && userStore.token !== '') {
    if (appStore.screenWidth < 768) {
      userStore.isGuide = {
        homePage: true,
        jobSearchPage: true,
        jobDetailPage: true,
      }
    }

    const res = await isCompleteUserInfoApi()
    if (res === false) {
      router.push({
        name: 'completeInfo',
        query: {
          userId: userStore.userInfo.id,
        },
      })
    } else {
      await userStore.getUserInfo()
    }
  }
  await statusStore.init()
})
</script>
<template>
  <div class="i-layout">
    <i-header />
    <router-view
      v-slot="{ Component }"
      :style="{
        width: `min(100%, ${containerWidth})`,
      }"
      class="i-layout__inner"
    >
      <transition-slide :offset="[-16, 0]" mode="out-in">
        <component :is="Component" />
      </transition-slide>
    </router-view>
    <i-footer />
    <bottom-float-btn />
  </div>
</template>

<style lang="scss" scoped>
.i-layout {
  @apply min-h-screen;

  .i-layout__inner {
    @apply min-h-screen mx-auto;
  }
}
</style>
