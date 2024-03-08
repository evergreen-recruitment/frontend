<script setup lang="ts"></script>

<template>
  <div class="search-page">
    <div class="search-panel">
      <job-search />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.search-page {
  @apply w-[1200px] mx-auto;

  .search-panel {
    @apply mt-10 mx-auto;

    :deep(.title) {
      @include useTheme {
        color: getModeVar('textColor');
      }
    }
  }
}
</style>
