<script lang="ts" setup>
import IHeader from '@/layouts/components/IHeader/IHeader.vue'
import IFooter from '@/layouts/components/IFooter/IFooter.vue'
import router from '@/router'
import { useStatusStore, useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { isCompleteUserInfoApi } from '@/apis/auth'

const statusStore = useStatusStore()
const userStore = useUserStore()
onMounted(async () => {
  if (userStore.token) {
    const res = await isCompleteUserInfoApi(userStore.userInfo?.id)
    if (res === false) {
      router.push({
        name: 'completeInfo',
        query: {
          userId: userStore.userInfo.id,
        },
      })
    }
  }
  await statusStore.getIndustryList()
  await statusStore.getJobCategory()
})
</script>
<template>
  <div class="i-layout">
    <i-header />
    <router-view
      v-slot="{ Component }"
      class="i-layout__inner"
      :style="{ width: `${router.currentRoute.value.meta.width}px` }"
    >
      <transition-slide :offset="[-16, 0]" mode="out-in">
        <component :is="Component" />
      </transition-slide>
    </router-view>
    <i-footer />
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
