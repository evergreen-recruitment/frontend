<script lang="ts" setup>
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'
import type { CompanyType } from '@/apis/company'
import { CompanyScaleEnum, CompanyStageEnum } from '@/apis/company'
import { computed } from 'vue'
import { findFullIndustry } from '@/utils/utils'

const props = defineProps<{
  company: CompanyType
}>()

const appStore = useAppStore()

const companyInfo = computed(() => {
  const scale = CompanyScaleEnum[props.company.scaleId as keyof typeof CompanyScaleEnum]
  const stage = CompanyStageEnum[props.company.stageId as keyof typeof CompanyStageEnum]
  const industry = findFullIndustry(props.company.industryId as number)
  const industryName = industry[1]?.name
  return { scale, stage, industryName }
})
</script>

<template>
  <div class="company-card-outer">
    <i-navigator
      :to="{ name: 'companyDetail', query: { companyId: company.id } }"
      class="company-card"
      open-in-new-window
    >
      <div class="company-card__content">
        <div class="company-card__content--company">
          <div class="left">
            <img v-lazy-load="company.logo" alt="" />
          </div>
          <div class="right">
            <div class="company">{{ company.name }}</div>
            <div class="address">{{ company.address }}</div>
          </div>
        </div>
        <div class="company-card__content--bottom">
          <a-tag v-for="t in companyInfo" :key="t" :color="variables[appStore.themeName]">{{ t }}</a-tag>
        </div>
      </div>
    </i-navigator>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.company-card-outer {
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

  .company-card {
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

    .company-card__header {
      @apply w-full box-border flex justify-between items-center px-4 py-2;
      .company-card__header--title {
        @apply text-xl font-bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 170px;
      }

      .company-card__header--salary {
        @apply text-base font-bold text-red-500 text-right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 170px;
      }
    }

    .company-card__content {
      @apply w-full px-4 py-2 box-border;
      .company-card__content--company {
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

      .company-card__content--bottom {
        @apply mt-2;
      }
    }
  }
}
</style>
