<script setup lang="ts">
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'
import INavigator from '@/components/INavigator/INavigator.vue'
import type { SimpleJobItemType } from '@/apis/job'
import { onMounted } from 'vue'

const props = defineProps<{
  job: SimpleJobItemType
}>()

const appStore = useAppStore()
onMounted(() => {})
</script>

<template>
  <i-navigator class="job-card" :to="{ name: 'jobDetail', query: { jobId: job.id } }">
    <div class="job-card__header">
      <div class="job-card__header--title">{{ job.title }}</div>
      <div class="job-card__header--salary">{{ job.salary }}</div>
    </div>
    <div class="job-card__content">
      <div class="job-card__content--company">{{ job.companyName }}</div>
      <div class="job-card__content--address">{{ job.cityName }}</div>
      <div class="job-card__content--tags">
        <a-tag :color="variables[appStore.themeName]" v-for="t in job.jobSkills" :key="t">{{ t }}</a-tag>
      </div>
    </div>
  </i-navigator>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.job-card {
  @apply rounded-[var(--border-radius)] cursor-pointer mt-2;

  border: 1px solid transparent;

  &:hover {
    @include useTheme {
      border: 1px solid getColor('primary');
      @if getMode() == 'light' {
        background: rgba(adjust-hue(hsl(0, 50%, 85%), hue(getColor('primary'))), 0.8);
      } @else {
        background: rgba(adjust-hue(hsl(0, 50%, 15%), hue(getColor('primary'))), 0.8);
      }
    }
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
