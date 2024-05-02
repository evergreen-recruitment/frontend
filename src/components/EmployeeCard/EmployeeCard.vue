<script lang="ts" setup>
import { useAppStore } from '@/stores'
import type { SimpleEmployeeType } from '@/apis/employee'

const props = defineProps<{
  employee: SimpleEmployeeType
}>()

const appStore = useAppStore()
</script>

<template>
  <div class="employee-card-outer">
    <div class="employee-card">
      <div class="employee-card__content">
        <div class="employee-card__content--employee">
          <div class="left">
            <img v-lazy-load="employee.avatar" alt="" />
          </div>
          <div class="right">
            <div class="employee">{{ employee.realName }}</div>
            <div class="address">{{ employee.position }}</div>
          </div>
        </div>
      </div>
      <div class="employee-card__info">
        <div v-if="employee.jobIds" class="employee-job-count">
          <span>在招职位：</span>
          <span>{{ employee.jobIds.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.employee-card-outer {
  @apply relative rounded-[var(--border-radius)];

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

  .employee-card {
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
      border: 1px solid rgba(getColor('primary'), var(--show-border-op));
    }

    .employee-card__content {
      @apply w-full px-4 py-2 box-border;
      .employee-card__content--employee {
        @apply space-x-3 w-full flex justify-start items-center;
        .left {
          @apply relative w-14 h-14;
          img {
            @apply w-full h-full rounded-full object-cover object-center;
          }
        }

        .right {
          @apply flex flex-col max-w-[75%];
          .employee {
            @apply text-base font-bold single-line;
          }

          .address {
            @apply text-sm text-gray-500 single-line;
          }
        }
      }

      .employee-card__content--bottom {
        @apply mt-2;
      }
    }

    .employee-card__info {
      @apply flex justify-between items-center w-full px-4 py-2 box-border;
      .employee-job-count,
      .employee-employee-count {
        @apply text-sm;
        span {
          @apply text-gray-500;
        }
      }
    }
  }
}
</style>
