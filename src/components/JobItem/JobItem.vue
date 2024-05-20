<script lang="ts" setup>
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'
import type { SimpleJobItemType } from '@/apis/job'
import { formatDateStr } from '@/utils/utils'

defineProps<{
  job: SimpleJobItemType
}>()

const appStore = useAppStore()
</script>

<template>
  <div class="job-item-outer">
    <i-navigator :to="{ name: 'jobDetail', query: { jobId: job.id } }" class="job-item" open-in-new-window>
      <div class="top">
        <div class="left">
          <div class="job-title">{{ job.title }}</div>
          <div class="other">
            <div class="job-salary">{{ job.salary }}</div>
            <div class="job-label">
              <a-tag v-for="label in job.jobLabels">{{ label }}</a-tag>
              <a-tag v-if="job.jobType === 4" :color="variables[appStore.themeName]">实习</a-tag>
            </div>
            <!--<div class="job-hr">-->
            <!--  <a-tag>{{ job.employeeVO?.realName || '招聘者' }}</a-tag>-->
            <!--</div>-->
          </div>
        </div>
        <div class="right">
          <div class="company">{{ job.companyName }}</div>
          <div class="address">{{ job.cityName }} {{ job.areaDistrict }}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="job-tags">
          <a-tag v-for="t in job.jobSkills" :key="t" :color="variables[appStore.themeName]">{{ t }}</a-tag>
        </div>
        <div class="job-time">更新时间：<br />{{ formatDateStr(job.updateTime).slice(0, 10) }}</div>
      </div>
    </i-navigator>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.job-item-outer {
  @apply relative rounded-[var(--border-radius)];
  //animation: none !important;
  //瀑布流
  break-inside: avoid;
  margin-bottom: 7px;

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

  .job-item {
    @apply relative z-[1] backdrop-blur-[30px] rounded-[var(--border-radius)] shadow-md cursor-pointer;
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
      @apply mx-3 px-2 mt-2 mb-2 flex justify-between items-start;

      @include useTheme {
        border-top: 2px solid getColor('primary');
        //background: linear-gradient(0deg, rgba(getColor('primary'), 0.2), getModeVar('cardBgColor'));
      }

      .job-tags {
        @apply mt-2;
      }

      .job-time {
        @apply text-sm text-gray-500 min-w-[100px] text-right;
      }
    }
  }
}
</style>
