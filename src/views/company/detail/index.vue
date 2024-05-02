<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores'
import { type CompanyDetailType, CompanyScaleEnum, CompanyStageEnum, getCompanyDetailApi } from '@/apis/company'
import { findFullIndustry, isEmpty, removeNullUndefinedProps } from '@/utils/utils'

const userStore = useUserStore()

const company = ref<CompanyDetailType | null>()
const companyInfo = computed(() => {
  const scale = CompanyScaleEnum[company.value?.scaleId as keyof typeof CompanyScaleEnum]
  const stage = CompanyStageEnum[company.value?.stageId as keyof typeof CompanyStageEnum]
  const industryName = findFullIndustry(company.value?.industryId as number)?.[1]?.name
  let res = { scale, stage, industryName }
  res = removeNullUndefinedProps(res)
  return res
})

// 监听路由变化
const routerWatch = watchEffect(async () => {
  if (router.currentRoute.value.path === '/company/detail' && !isEmpty(router.currentRoute.value.query.companyId)) {
    company.value = await getCompanyDetailApi(router.currentRoute.value.query.companyId as string)
  }
})

function collapseBanner() {
  // 当页面滚动超过55px时将company-detail__banner固定在顶部 添加collapse-banner类名 当页面滚动小于55px时移除collapse-banner类名
  const companyDetailBanner = document.querySelector('.company-detail__banner') as HTMLElement
  if (companyDetailBanner) {
    if (window.scrollY > 55) {
      companyDetailBanner.classList.add('collapse-banner')
    } else {
      companyDetailBanner.classList.remove('collapse-banner')
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', collapseBanner)
})
onUnmounted(() => {
  routerWatch()
  window.removeEventListener('scroll', () => {})
})
nextTick(async () => {
  await userStore.getUserState()
})
</script>

<template>
  <div class="company-detail">
    <div class="company-detail__banner">
      <div class="company-detail__banner--inner">
        <div class="company-detail__banner--left">
          <div class="company-title__logo">
            <img :src="company?.logo" alt="" />
          </div>
          <div class="company-title">
            <div class="company-title__text">
              {{ company?.name }}
            </div>
            <div class="company-info">
              <span>
                {{
                  Object.entries(companyInfo)
                    .map(([key, value]) => `${value}`)
                    .join(' · ')
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="company-detail__banner--right">
          <div class="company-jobs">
            <span v-if="company?.jobVOList" class="text-5xl">
              {{ company?.jobVOList.length }}
            </span>
            <span class="text-base"> 在招岗位</span>
          </div>
          <div class="company-employees">
            <span v-if="company?.employeeVOList" class="text-5xl">
              {{ company?.employeeVOList.length }}
            </span>
            <span class="text-base"> 位招聘者</span>
          </div>
        </div>
      </div>
    </div>
    <div class="company-detail__main enter-y">
      <div class="company-detail__content">
        <div v-slide-in="{ enter: true }" class="company-detail__hot-job card">
          <div class="company-detail__hot-job--title card-title">热招岗位</div>
          <a-divider />
          <div class="company-detail__hot-job--content">
            <div v-if="company?.jobVOList" class="hot-job">
              <job-card-v3 v-for="job in company?.jobVOList.slice(0, 5)" :key="job.id" :job="job" />
            </div>
          </div>
        </div>
        <div v-slide-in="{ enter: true }" class="company-detail__description card">
          <div class="company-detail__description--title card-title">公司简介</div>
          <a-divider />
          <div class="company-detail__description--content">
            <div class="description">{{ company?.description }}</div>
          </div>
        </div>
        <div v-slide-in="{ enter: true }" class="company-detail__address card">
          <div class="company-detail__address--title card-title">公司地址</div>
          <a-divider />
          <div class="company-detail__address--content">
            <div class="company-detail__address--content-inner">
              <div class="address">
                <Icon icon="PhoneOutlined" /> &nbsp;
                {{ company?.address }}
              </div>
              <i-map
                v-if="company?.address"
                :longitude="company?.longitude"
                :latitude="company?.latitude"
                style="height: 400px"
              />
            </div>
          </div>
        </div>
        <div v-slide-in="{ enter: true }" class="company-detail__job card">
          <div class="company-detail__job--title card-title">所有岗位</div>
          <a-divider />
          <div v-if="company?.jobVOList" class="company-detail__job-list">
            <job-card-v3 v-for="job in company?.jobVOList" :key="job.id" :job="job" />
          </div>
        </div>
      </div>
      <div class="company-detail__side">
        <div v-slide-in="{ enter: true }" class="company-detail__side-employee card">
          <div class="company-detail__side--title card-title">所有招聘者</div>
          <a-divider />
          <div v-if="company?.employeeVOList" class="company-detail__side--employee-list">
            <employee-card v-for="employee in company?.employeeVOList" :key="employee.id" :employee="employee" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.company-detail {
  .collapse-banner {
    @apply sticky w-full z-10;
    top: 0 !important;
  }

  .company-detail__banner {
    @apply sticky top-[55px] w-full h-40 text-white flex items-center justify-center z-10;
    transition: top 0.3s;
    @include useTheme {
      background: rgba((adjust-hue(hsl(0, 50%, 20%), hue(getColor('primary')))), 1);
    }

    .company-detail__banner--inner {
      @apply max-w-[calc(var(--min-screen-width)+100px)] px-5 box-border w-full h-24 flex justify-between items-center box-border;

      .company-detail__banner--left {
        @apply h-full flex justify-between items-center space-x-3;

        .company-title__logo {
          @apply w-24 h-full;
          img {
            @apply w-full h-full object-cover rounded-[var(--border-radius)];
          }
        }

        .company-title {
          @apply h-full flex flex-col justify-between;
          .company-title__text {
            @apply text-4xl font-bold;
          }
        }

        .address {
          @apply flex items-center space-x-4;
          .company-address {
            @apply text-lg;
          }

          .company-labels {
            @apply text-sm;
          }
        }

        .apply-company {
          @apply block w-52 h-11;
        }
      }

      .company-detail__banner--right {
        @apply h-2/3 flex items-center justify-between space-x-3;
        .company-salary {
          @apply text-[red] text-4xl font-bold;
        }

        .welfare-tags {
          @apply flex items-center justify-between;
          :deep(.ant-tag) {
            @apply text-sm;
          }
        }
      }
    }
  }

  .company-detail__main {
    @apply flex justify-between max-w-[var(--min-screen-width)] w-full mx-auto mt-5;

    .card-title {
      @apply text-2xl font-bold;
    }

    .company-detail__content {
      @apply w-[calc(100%-320px)] box-border;

      .company-detail__hot-job {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-5;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .company-detail__hot-job--content {
          .hot-job {
            @apply pb-2 box-border flex space-x-2 overflow-y-auto;
          }
        }
      }

      .company-detail__description {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-5;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .company-detail__description--content {
          .description {
            @apply text-base leading-7 whitespace-pre-line;
          }
        }
      }

      .company-detail__address {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-5;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .company-detail__address--content {
          @apply p-2;
          .company-detail__address--content-inner {
            @apply rounded-[var(--border-radius)] shadow-lg overflow-hidden box-border;

            @include useTheme {
              border: 2px solid getModeVar('borderColor');
            }

            .address {
              @apply text-lg p-2 flex items-center space-x-4;
            }
          }
        }
      }

      .company-detail__job {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 box-border;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .company-detail__job-list {
          @apply p-1 box-border grid gap-[7px] mt-5 max-h-[100vh] overflow-y-auto;
          --card-width: 17.5rem;
          --card-height: 10rem;
          grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
        }
      }
    }

    .company-detail__side {
      @apply w-[320px] relative ml-5;

      .company-detail__side-employee {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 box-border;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .company-detail__side--employee-list {
          @apply pr-2 box-border mt-5 max-h-[200vh] space-y-2 overflow-y-auto;
        }
      }
    }
  }
}
</style>
