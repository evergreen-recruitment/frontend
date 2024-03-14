<script setup lang="ts">
import type { JobItem } from '@/types/commonTypes'
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'

defineProps<{
  job: JobItem
}>()

const appStore = useAppStore()
</script>

<template>
  <div class="job-item" @click="$router.push(`/jobDetail/${job.id}`)">
    <div class="top">
      <div class="left">
        <div class="job-title">{{ job.title }}</div>
        <div class="other">
          <div class="job-salary">{{ `${job.salary[0]}-${job.salary[1]}` }}</div>
          <div class="job-experience">
            <a-tag>{{ job.experience }}</a-tag>
          </div>
          <div class="job-education">
            <a-tag>{{ job.education }}</a-tag>
          </div>
          <div class="job-hr">
            <a-tag>{{ job.hr }}</a-tag>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="company">{{ job.company }}</div>
        <div class="address">{{ job.address }}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="job-tags">
        <a-tag :color="variables[appStore.themeName]" v-for="t in job.tags" :key="t">{{ t }}</a-tag>
      </div>
      <div class="job-time">发布时间：{{ job.createTime }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.job-item {
  @apply mb-5 rounded-[var(--border-radius)] shadow-lg overflow-hidden cursor-pointer;

  @include useTheme {
    background-color: getModeVar('cardBgColor');
  }

  .top {
    @apply flex pt-5 px-5 justify-between items-center;
    .left {
      .job-title {
        @apply text-2xl font-bold;

        @include useTheme {
          color: getColor('primary');
        }
      }

      .other {
        @apply flex items-center mt-5 ml-1;
        .job-salary {
          @apply text-lg mr-3 text-red-600;
        }
      }
    }

    .right {
      @apply flex flex-col items-end;
      .company {
        @apply text-lg;
      }

      .address {
        @apply text-gray-500;
      }
    }
  }

  .bottom {
    @apply h-9 mx-3 px-2 mt-2 mb-2 flex justify-between items-center;

    @include useTheme {
      border-top: 2px solid getColor('primary');
      //background: linear-gradient(0deg, rgba(getColor('primary'), 0.2), getModeVar('cardBgColor'));
    }

    .job-tags {
      a-tag {
      }
    }

    .job-time {
      @apply text-sm text-gray-500;
    }
  }
}
</style>
