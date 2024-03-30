<script setup lang="ts"></script>

<template>
  <div class="company-page">
    <div class="search-panel card">搜索</div>

    <div class="company"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.company-page {
  .search-panel {
    @apply mt-10 mx-auto p-5 pb-10 rounded-[var(--border-radius)] shadow-lg;

    @include useTheme {
      background-color: getModeVar('cardBgColor');
    }
  }
}
</style>
