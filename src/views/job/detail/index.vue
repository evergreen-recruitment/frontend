<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue'
import router from '@/router'
import { useAppStore, useStatusStore } from '@/stores'
import { getJobDetailApi, type JobItemType, jobSearchApi, type SimpleJobItemType } from '@/apis/job'
import I3DProgressBar from '@/components/I3DProgressBar/I3DProgressBar.vue'

const appStore = useAppStore()
const statusStore = useStatusStore()
const job = ref<JobItemType | null>()
const sideJobList = ref<SimpleJobItemType[]>([])
// 监听路由变化
const routerWatch = watchEffect(async () => {
  if (router.currentRoute.value.path === '/job/detail' && router.currentRoute.value.query.jobId) {
    job.value = await getJobDetailApi(router.currentRoute.value.query.jobId as string)
    sideJobList.value = (
      await jobSearchApi({ keyword: job.value?.title, pageSize: 7, current: Math.random() * 10 })
    ).records
  }
})
// echarts配置
const option1 = reactive({
  legend: {
    top: 'bottom',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  series: [
    {
      name: '技术栈要求可视化',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 30, name: 'Java' },
        { value: 28, name: 'Spring' },
        { value: 22, name: 'Spring Boot', itemStyle: { color: 'gray' } },
        { value: 20, name: 'MySQL' },
        { value: 18, name: 'MyBatis Plus' },
        { value: 16, name: 'Redis' },
        { value: 19, name: 'RabbitMQ' },
        { value: 18, name: 'Spring Cloud', itemStyle: { color: 'gray' } },
      ],
    },
  ],
})
onMounted(async () => {})
onUnmounted(() => {
  routerWatch()
})
</script>

<template>
  <div class="job-detail">
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
          <a-button class="apply-job" size="large" type="primary">立即投递</a-button>
        </div>
        <div class="job-detail__banner--right">
          <div class="job-salary">{{ job?.salary }}</div>
        </div>
      </div>
    </div>
    <div class="job-detail__main enter-y">
      <div class="job-detail__content">
        <div v-slide-in class="job-detail__description card">
          <div class="job-detail__description--title">职位描述</div>
          <a-divider />
          <div class="job-detail__description--content">
            <div class="tags">
              <a-tag v-for="t in job?.jobSkills" :key="t">{{ t }}</a-tag>
            </div>
            <div class="description">{{ job?.description }}</div>
          </div>
          <a-divider />
          <div class="job-detail__hr">
            <a-avatar :src="job?.employeeVO.avatar" size="large" />
            <span>{{ job?.employeeVO?.realName || '招聘者' }}&nbsp;</span>
          </div>
        </div>
        <div v-slide-in class="job-detail__stack card">
          <div class="job-detail__stack--title">
            <div class="title">技术栈要求可视化</div>
            <div class="sub-title">
              算法分析出该岗位的所需技术栈，大小代表其在该岗位中的权重，<br />灰色部分为你未掌握的技术栈
            </div>
          </div>
          <a-divider />
          <i-charts :option="option1" />
        </div>
        <div v-slide-in class="job-detail__company-info card">
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
              <a-tag v-if="job?.companyVO.scaleId" class="scale" color="cyan">{{ job?.companyVO.scaleId }}</a-tag>
              <a-tag v-if="job?.companyVO.stageId" class="stage" color="orange">{{ job?.companyVO.stageId }}</a-tag>
              <a-tag v-if="job?.companyVO.industryId" class="industry" color="pink">
                {{ job?.companyVO.industryId }}
              </a-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="job-detail__side">
        <div v-slide-in class="job-detail__side--ability-ranking card">
          <div class="job-detail__side--title">能力排名</div>
          <a-divider />
          <div class="job-detail__side--ranking">
            <div class="title">你的能力在该岗位的应聘者中排名</div>
            <i3-d-progress-bar :progress="Math.random() * 50 + 50" />
          </div>
        </div>
        <div v-slide-in class="job-detail__side--vote card">
          <div class="job-detail__side--title">推荐效果评分</div>
          <a-divider />
          <div class="job-detail__side--vote-main">
            <div class="title">对该岗位的推荐效果评分<br />请选择好或者不好</div>
            <div class="btn-group">
              <a-button>
                <Icon icon="LikeOutlined" />
                很好
              </a-button>
              <a-button>
                <Icon icon="DislikeOutlined" />
                不好
              </a-button>
            </div>
          </div>
        </div>
        <div v-slide-in class="job-detail__side--similar-job card">
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
  .job-detail__banner {
    @apply sticky top-[55px] w-full h-48 text-white flex items-center justify-center z-10;

    @include useTheme {
      background: rgba((adjust-hue(hsl(0, 50%, 20%), hue(getColor('primary')))), 1);
    }

    .job-detail__banner--inner {
      @apply w-[1100px] h-full flex justify-between items-center box-border;

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
        @apply flex items-center;
        .job-salary {
          @apply text-[red] text-4xl font-bold;
        }
      }
    }
  }

  .job-detail__main {
    @apply flex justify-between w-[1150px] mx-auto mt-5;

    .job-detail__content {
      @apply w-[calc(100%-320px)] box-border;

      .job-detail__description {
        @apply rounded-[var(--border-radius)] shadow-lg p-5;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__description--title {
          @apply text-2xl font-bold;
        }

        .job-detail__description--content {
          .tags {
            @apply flex space-x-2 items-center mb-3;
          }

          .description {
            @apply text-lg whitespace-pre-line;
          }
        }

        .job-detail__hr {
          @apply flex items-center space-x-3 cursor-pointer;
        }
      }

      .job-detail__stack {
        @apply mt-5 h-[720px] rounded-[var(--border-radius)] shadow-lg p-5 mb-4;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        :deep(.chart) {
          @apply h-[650px];
        }

        .job-detail__stack--title {
          @apply flex items-center space-x-4;

          .title {
            @apply text-2xl font-bold;
          }

          .sub-title {
            @apply text-sm text-gray-500;
          }
        }
      }

      .job-detail__company-info {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-4;

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
            @apply text-base mb-4 whitespace-pre-line;
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

      .job-detail__side--ability-ranking {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-4;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__side--ranking {
          @apply relative;
        }
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
