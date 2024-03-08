<script setup lang="ts"></script>

<template>
  <div class="job-card">
    <div class="job-card__header">
      <div class="job-card__header--title">前端开发工程师</div>
      <div class="job-card__header--salary">15k-25k</div>
    </div>
    <div class="job-card__content">
      <div class="job-card__content--company">常青科技</div>
      <div class="job-card__content--address">深圳市南山区</div>
      <div class="job-card__content--tags">
        <a-tag color="blue">五险一金</a-tag>
        <a-tag color="blue">年终奖</a-tag>
        <a-tag color="blue">带薪年假</a-tag>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.job-card {
  @apply w-72 h-40 rounded-lg shadow-md;
  @include useTheme {
    background: getModeVar('cardBgColor');
  }

  .job-card__header {
    @apply flex justify-between items-center px-4 py-2;
    .job-card__header--title {
      @apply text-lg font-bold;
    }

    .job-card__header--salary {
      @apply text-lg font-bold text-red-500;
    }
  }

  .job-card__content {
    @apply px-4 py-2;
    .job-card__content--company {
      @apply text-lg font-bold;
    }

    .job-card__content--address {
      @apply text-gray-500;
    }

    .job-card__content--tags {
      @apply mt-2;
      a-tag {
        @apply mb-2;
      }
    }
  }
}
</style>
