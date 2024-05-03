<script lang="ts" setup>
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
  return router.resolve(props.to).href.replace(/^\//, '')
})
</script>

<template>
  <router-link v-if="!openType" :to="to" class="i-navigator" v-bind="$attrs">
    <slot></slot>
  </router-link>
  <a v-else :href="href" class="i-navigator" target="_blank">
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
.i-navigator {
  @apply cursor-pointer block;
}
</style>
