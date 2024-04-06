<script setup lang="ts">
import { useAppStore } from '@/stores'
import type { RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'
import router from '@/router'

const appStore = useAppStore()

const props = defineProps<{
  to: RouteLocationRaw
  openInNewWindow?: boolean | null | undefined
}>()

const openType = computed(() => {
  if (props.openInNewWindow === null || props.openInNewWindow === undefined) {
    return appStore.openInNewWindow
  }
  return props.openInNewWindow
})
const href = computed(() => {
  return router.resolve(props.to).href
})
</script>

<template>
  <router-link class="i-navigator" v-if="!openType" v-bind="$attrs" :to="to">
    <slot></slot>
  </router-link>
  <a class="i-navigator" v-else :href="href" target="_blank">
    <slot></slot>
  </a>
</template>

<style scoped lang="scss">
.i-navigator {
  @apply cursor-pointer block;
}
</style>
