<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import router from '@/router'
import { useAppStore, useUserStore } from '@/stores'
import { getJobDetailApi, type JobItemType, jobSearchApi, type SimpleJobItemType } from '@/apis/job'
import { CompanyScaleEnum, CompanyStageEnum } from '@/apis/company'
import { findFullIndustry, findFullJobTypeByName } from '@/utils/utils'
import { message } from 'ant-design-vue'
import { jobDetailGuideState } from '@/tours'

const appStore = useAppStore()
const userStore = useUserStore()
const isLogin = ref(false)
const delivered = ref(false)

// prettier-ignore
const welfareTagsColor = ref<string[]>(['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple', 'pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'])
const job = ref<JobItemType | null>()
const sideJobList = ref<SimpleJobItemType[]>([])
const companyInfo = computed(() => {
  const scale = CompanyScaleEnum[job.value?.companyVO.scaleId as keyof typeof CompanyScaleEnum]
  const stage = CompanyStageEnum[job.value?.companyVO.stageId as keyof typeof CompanyStageEnum]
  const industry = findFullIndustry(job.value?.companyVO.industryId as number)
  const industryName = industry[1]?.name
  return { scale, stage, industryName }
})

// const companyDetailInfo = ref<CompanyDetailType>({})

// 监听路由变化
const routerWatch = watchEffect(async () => {
  if (router.currentRoute.value.path === '/job/detail' && router.currentRoute.value.query.jobId) {
    job.value = await getJobDetailApi(router.currentRoute.value.query.jobId as string)
    sideJobList.value =
      (await jobSearchApi({ keyword: job.value?.title, pageSize: 7, current: Math.floor(Math.random() * 10) }))
        ?.records || []
    if (sideJobList.value.length <= 4) {
      sideJobList.value = sideJobList.value.concat(
        (await jobSearchApi({ keyword: job.value?.title, pageSize: 7, current: 1 }))?.records || [],
      )
    }
    const fullJobType = findFullJobTypeByName(job.value?.jobStandardName)
    const jobStandardId = fullJobType[1]?.id
    if (sideJobList.value.length <= 4) {
      sideJobList.value = sideJobList.value.concat(
        (
          await jobSearchApi({
            keyword: '',
            pageSize: 7,
            jobStandardId: jobStandardId,
            current: Math.floor(Math.random() * 10),
          })
        )?.records || [],
      )
    }
  }
})

function collapseBanner() {
  // 当页面滚动超过55px时将job-detail__banner固定在顶部 添加collapse-banner类名 当页面滚动小于55px时移除collapse-banner类名
  const jobDetailBanner = document.querySelector('.job-detail__banner') as HTMLElement
  if (jobDetailBanner) {
    if (window.scrollY > 55) {
      jobDetailBanner.classList.add('collapse-banner')
    } else {
      jobDetailBanner.classList.remove('collapse-banner')
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
  isLogin.value = userStore.userState.isLogin
  delivered.value = userStore.userState.isUploadApplication
})
</script>

<template>
  <div class="job-detail">
    <a-tour
      v-model:current="jobDetailGuideState.current"
      type="primary"
      :open="jobDetailGuideState.open"
      :steps="jobDetailGuideState.steps"
      :scroll-into-view-options="false"
      @close="jobDetailGuideState.open = false"
    />
    <div class="job-detail__banner">
      <div class="job-detail__banner--inner">
        <div class="job-detail__banner--left">
          <div class="job-title">
            <div class="job-recruit-state">招聘中</div>
            <div class="job-title__text">
              {{ job?.title }}
            </div>
          </div>
          <div class="job-info">
            <div class="job-address">{{ job?.cityName }} {{ job?.areaDistrict }}</div>
            <div v-for="label in job?.jobLabels" :key="label" class="job-labels">{{ label }}</div>
          </div>
          <a-button class="apply-job" size="large" type="primary" @click="message.success('投递成功，请静待面试通知')">
            立即投递
          </a-button>
        </div>
        <div class="job-detail__banner--right">
          <div class="job-salary">{{ job?.salary }}</div>
          <div class="welfare-tags">
            <a-tag v-for="(item, index) in job?.welfareList.slice(0, 7)" :color="welfareTagsColor[index]"
              >{{ item }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="job-detail__main enter-y">
      <div class="job-detail__content">
        <div v-slide-in="{ enter: true }" class="job-detail__description card">
          <div class="job-detail__description--title">职位描述</div>
          <a-divider />
          <div class="job-detail__description--content">
            <div class="tags">
              <a-tag v-for="t in job?.jobSkills" :key="t" style="font-size: 14px; height: 25px">{{ t }}</a-tag>
            </div>
            <div class="description">{{ job?.description }}</div>
          </div>
          <a-divider />
          <div class="job-detail__hr">
            <a-avatar :src="job?.employeeVO.avatar" size="large" />
            <span>{{ job?.employeeVO?.realName || '招聘者' }}&nbsp;</span>
          </div>
        </div>
        <div v-slide-in="{ enter: true }" class="job-detail__company-info card">
          <div class="job-detail__company-info--title">公司信息</div>
          <a-divider />
          <div class="job-detail__company-info--content">
            <div class="simple-info">
              <div class="left">
                <div class="logo">
                  <img :src="job?.companyVO.logo" />
                </div>
              </div>
              <div class="right">
                <div class="title">{{ job?.companyVO.name }}</div>
                <div class="address">地址：{{ job?.companyVO.address }}</div>
              </div>
            </div>
            <div class="description">{{ job?.companyVO.description }}</div>
            <div class="tag-list">
              <a-tag v-if="companyInfo.scale" class="scale" color="cyan">{{ companyInfo.scale }}</a-tag>
              <a-tag v-if="companyInfo.stage" class="stage" color="orange">{{ companyInfo.stage }}</a-tag>
              <a-tag v-if="companyInfo.industryName" class="industry" color="pink">
                {{ companyInfo.industryName }}
              </a-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="job-detail__side">
        <div v-slide-in="{ enter: true }" class="job-detail__side--vote card">
          <div class="job-detail__side--title">推荐效果评分</div>
          <a-divider />
          <div class="job-detail__side--vote-main">
            <div class="title">对该岗位的推荐效果评分<br />请选择好或者不好</div>
            <div class="btn-group">
              <a-button @click="message.success('感谢您的反馈，希望您喜欢这个工作')">
                <Icon icon="LikeOutlined" />
                很好
              </a-button>
              <a-button @click="message.success('感谢您的反馈，我们会继续改进推荐效果的')">
                <Icon icon="DislikeOutlined" />
                不好
              </a-button>
            </div>
          </div>
        </div>
        <div v-slide-in="{ enter: true }" class="job-detail__side--similar-job card">
          <div class="job-detail__side--title">相似岗位</div>
          <a-divider />
          <div v-if="sideJobList" class="job-detail__side--job-list">
            <job-card-v2 v-for="job in sideJobList" :key="job.id" :job="job" class="enter-y" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.job-detail {
  .collapse-banner {
    @apply sticky w-full z-10;
    top: 0 !important;
  }

  .job-detail__banner {
    @apply sticky top-[55px] w-full h-48 text-white flex items-center justify-center z-10;
    transition: top 0.3s;
    @include useTheme {
      background: rgba((adjust-hue(hsl(0, 50%, 20%), hue(getColor('primary')))), 1);
    }

    .job-detail__banner--inner {
      @apply max-w-[calc(var(--min-screen-width)+100px)] px-5 box-border w-full h-full flex justify-between items-center box-border;

      .job-detail__banner--left {
        @apply h-[calc(100%-30px)] flex flex-col justify-between space-y-2;

        .job-title {
          .job-recruit-state {
            @apply text-sm mb-4;
          }

          .job-title__text {
            @apply text-4xl font-bold;
          }
        }

        .job-info {
          @apply flex items-center space-x-4;
          .job-address {
            @apply text-lg;
          }

          .job-labels {
            @apply text-sm;
          }
        }

        .apply-job {
          @apply block w-52 h-11;
        }
      }

      .job-detail__banner--right {
        @apply h-2/3 flex flex-col items-center justify-between;
        .job-salary {
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

  .job-detail__main {
    @apply flex justify-between max-w-[var(--min-screen-width)] w-full mx-auto mt-5;

    .job-detail__content {
      @apply w-[calc(100%-320px)] box-border;

      .job-detail__description {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-5;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__description--title {
          @apply text-2xl font-bold;
        }

        .job-detail__description--content {
          .tags {
            @apply flex flex-wrap space-y-0.5 space-x-2 items-center mb-3;
          }

          .description {
            @apply text-base leading-7 whitespace-pre-line;
          }
        }

        .job-detail__hr {
          @apply flex items-center space-x-3 cursor-pointer;
        }
      }

      .job-detail__company-info {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-5;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__company-info--title {
          @apply text-2xl font-bold mb-4;
        }

        .job-detail__company-info--content {
          @apply p-5;

          .simple-info {
            @apply flex;

            .left {
              @apply flex items-center justify-center mr-2 w-16 h-16 mb-5;
              .logo {
                @apply w-full h-full;
                img {
                  @apply w-full object-cover;
                }
              }
            }

            .right {
              @apply flex flex-col items-start justify-around;

              .title {
                @apply text-xl font-semibold mb-2;
              }

              .address {
                @apply text-sm mb-4;
              }
            }
          }

          .description {
            @apply text-base leading-7  mb-4 whitespace-pre-line;
          }

          .tag-list {
            @apply mt-5 flex space-x-2;
            a-tag {
              @apply rounded-full px-3 py-1 text-sm;
            }
          }
        }
      }
    }

    .job-detail__side {
      @apply w-[320px] relative ml-5;

      .job-detail__side--title {
        @apply text-2xl font-bold;
      }

      .job-detail__side--vote {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-4;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__side--vote-main {
          .title {
            @apply text-base text-center;
          }

          .btn-group {
            @apply mt-5 flex justify-between;
          }
        }
      }

      .job-detail__side--similar-job {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 box-border;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__side--job-list {
          @apply mt-5;
        }
      }
    }
  }
}
</style>
