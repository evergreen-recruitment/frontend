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
    <a-page-header v-bind="$attrs" :sub-title="subTitle" :title="title" class="i-page-header__inner" />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-page-header {
  border-radius: var(--border-radius);
  @include useTheme {
    background: getModeVar('cardBgColor');
    border: 1px solid getModeVar('borderColor');
  }
}
</style>
