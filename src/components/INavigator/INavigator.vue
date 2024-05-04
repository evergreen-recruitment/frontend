<script lang="ts" setup>
import { useAppStore } from '@/stores'
import type { RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'
import router from '@/router'

const appStore = useAppStore()

const props = defineProps<{
  to: RouteLocationRaw
  openInNewWindow?: boolean | null | undefined
  selfOpen?: boolean
  isOuterLink?: boolean
}>()

const openType = computed(() => {
  if (props.openInNewWindow === null || props.openInNewWindow === undefined) {
    return appStore.openInNewWindow
  }
  return props.openInNewWindow
})
const href = computed(() => {
  if (props.isOuterLink) {
    return props.to as string
  }
  return router.resolve(props.to).href
})
</script>

<template>
  <router-link v-if="!openType && !props.selfOpen" :to="to" class="i-navigator">
    <slot></slot>
  </router-link>
  <a v-else-if="props.selfOpen" :href="href" class="i-navigator" target="_self">
    <slot></slot>
  </a>
  <a v-else :href="href" class="i-navigator" target="_blank">
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
.i-navigator {
  @apply cursor-pointer block;
}
</style>
