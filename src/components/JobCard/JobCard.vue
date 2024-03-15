<script setup lang="ts">
import type { SimpleJobItem } from '@/types/commonTypes'
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'

defineProps<{
  job: SimpleJobItem
}>()

const appStore = useAppStore()
</script>

<template>
  <div class="job-card" @click="$router.push(`/jobDetail/${job.id}`)">
    <div class="job-card__header">
      <div class="job-card__header--title">{{ job.title }}</div>
      <div class="job-card__header--salary">{{ `${job.salary[0]}-${job.salary[1]}` }}</div>
    </div>
    <div class="job-card__content">
      <div class="job-card__content--company">{{ job.company }}</div>
      <div class="job-card__content--address">{{ job.address }}</div>
      <div class="job-card__content--tags">
        <a-tag :color="variables[appStore.themeName]" v-for="t in job.tags" :key="t">{{ t }}</a-tag>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.job-card {
  @apply w-72 rounded-[var(--border-radius)] shadow-md cursor-pointer;
  @include useTheme {
    border: 1px solid rgba(getColor('primary'), 0.7);
  }

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
