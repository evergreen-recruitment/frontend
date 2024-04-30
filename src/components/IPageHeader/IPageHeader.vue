<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '标题',
  },
  subTitle: {
    type: String,
    default: '副标题',
  },
})
</script>

<template>
  <div class="i-page-header">
    <a-page-header :sub-title="subTitle" :title="title" class="i-page-header__inner" v-bind="$attrs" />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-page-header {
  border-radius: var(--border-radius);
  backdrop-filter: blur(40px) saturate(180%);
  @include useTheme {
    background: rgba(getModeVar('bg1color'), 0.7);
    border: 1px solid getModeVar('borderColor');
  }
}
</style>
