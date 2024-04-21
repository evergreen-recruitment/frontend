<script lang="ts" setup>
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'

defineProps<{
  job: any
}>()

const appStore = useAppStore()
</script>

<template>
  <div class="job-card-outer">
    <i-navigator :to="{ name: 'jobDetail', query: { jobId: job.id } }" class="job-card" open-in-new-window>
      <div class="job-card__header">
        <div class="job-card__header--title">{{ job.title }}</div>
        <div class="job-card__header--salary">{{ job.salary }}</div>
      </div>
      <div class="job-card__content">
        <div class="job-card__content--company">
          <div class="left">
            <div class="company">{{ job.companyName }}</div>
            <div class="address">{{ job.cityName }}</div>
          </div>
          <div class="right">
            <img v-lazy-load="job.companyVO.logo" alt="" />
          </div>
        </div>
        <div class="job-card__content--bottom">
          <a-tag v-for="t in job.jobLabels" :key="t" :color="variables[appStore.themeName]">{{ t }}</a-tag>
        </div>
      </div>
    </i-navigator>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.job-card-outer {
  @apply relative rounded-[var(--border-radius)];
  //瀑布流
  //break-inside: avoid;
  //margin-bottom: 7px;

  &::before {
    @apply w-[70px] h-[70px] right-[10%] top-[10%] absolute rounded-full border-2 border-solid z-0;
    content: '';
    transition: all 1s;
    @include useTheme {
      background: getColor('primary');
    }
  }

  &:hover {
    &::before {
      transform: translate(-50%, 50%);
    }
  }

  .job-card {
    @apply relative w-full h-[140px] flex flex-col items-start justify-between rounded-[var(--border-radius)] backdrop-blur-[30px]  shadow-md cursor-pointer;
    transition: box-shadow 0.3s;

    @include useTheme {
      &:hover {
        @if getMode() == 'light' {
          background: rgba(adjust-hue(hsl(0, 50%, 85%), hue(getColor('primary'))), 0.8);
        } @else {
          background: rgba(adjust-hue(hsl(0, 50%, 15%), hue(getColor('primary'))), 0.8);
        }
      }
      background: rgba(getModeVar('cardBgColor'), 0.7);
      //border: 1px solid rgba(getModeVar('textColor'), 0.089);
      border: 1px solid rgba(getColor('primary'), var(--show-border-op));
    }

    .job-card__header {
      @apply w-full box-border flex justify-between items-center px-4 py-2;
      .job-card__header--title {
        @apply text-xl font-bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 170px;
      }

      .job-card__header--salary {
        @apply text-base font-bold text-red-500 text-right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 170px;
      }
    }

    .job-card__content {
      @apply w-full px-4 py-2 box-border;
      .job-card__content--company {
        @apply w-full flex justify-between items-center;
        .left {
          .company {
            @apply text-base font-bold;
          }

          .address {
            @apply text-sm text-gray-500;
          }
        }

        .right {
          @apply w-12 h-12;
          img {
            @apply w-full h-full rounded-full object-cover object-center;
          }
        }
      }

      .job-card__content--bottom {
        @apply mt-2;
      }
    }
  }
}
</style>
