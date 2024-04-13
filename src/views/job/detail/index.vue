<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue'
import router from '@/router'
import { useAppStore, useStatusStore } from '@/stores'
import { getJobDetailApi, type JobItemType, jobSearchApi, type SimpleJobItemType } from '@/apis/job'
import Icon from '@/components/Icon/Icon.vue'
import { CompanyScaleEnum, CompanyStageEnum } from '@/apis/company'
import { findFullIndustry } from '@/utils/utils'

const appStore = useAppStore()
const statusStore = useStatusStore()
const job = ref<JobItemType | null>()
const sideJobList = ref<SimpleJobItemType[]>([])
const companyInfo = computed(() => {
  const scale = CompanyScaleEnum[job.value?.companyVO.scaleId as keyof typeof CompanyScaleEnum]
  const stage = CompanyStageEnum[job.value?.companyVO.stageId as keyof typeof CompanyStageEnum]
  const industry = findFullIndustry(job.value?.companyVO.industryId as number)
  const industryName = industry[1]?.name
  return { scale, stage, industryName }
})
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
  }
})
// echarts配置
const stackOptions = reactive({
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
      radius: [60, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      label: {
        show: false,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
      itemStyle: {
        borderRadius: 10,
        borderColor: appStore.darkMode === 'light' ? '#c4c4c4' : '#fff',
        borderWidth: 2,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40, // 调整字体大小
          fontWeight: 'bold',
          formatter: function (params: any) {
            // 添加 formatter 属性
            return `${params.name}: ${params.value}`
          },
        },
      },
      data: [
        { value: 25, name: 'Java' },
        { value: 24, name: 'Spring' },
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

const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
// prettier-ignore
// const data = [[0, 0, 99], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
// 随机生成数组 高数值向中心靠拢
const data = Array.from({ length: 100 }, () => {
  function limitNumber(num: number) {
    if (num > 1) {
      return 1
    } else if (num < 0) {
      return 0
    } else {
      return num
    }
  }

  function generateNormalDistribution(mean: number, stdDev: number, min: number, max: number) {
    let u = 0, v = 0
    while (u === 0) u = Math.random() // 生成(0,1)区间的随机数
    while (v === 0) v = Math.random() // 生成(0,1)区间的随机数
    let z0 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) // 第一个正态分布随机数
    let z1 = Math.sqrt(-2.0 * Math.log(u)) * Math.sin(2.0 * Math.PI * v) // 第二个正态分布随机数
    let z2 = Math.sqrt(-2.0 * Math.log(u)) * Math.sin(2.0 * Math.PI * v) // 在指定范围内生成随机整数
    return [Math.floor(limitNumber((z0 * stdDev + mean) / 100) * 15), Math.floor(limitNumber((z1 * stdDev + mean) / 100) * 15), Math.floor(limitNumber((z2 * 50 + 20) / 100) * 100)] // 返回三个正态分布随机整数和一个在指定范围内的随机整数
  }

  // 示例使用
  let mean = 50 // 均值为范围的一半，使得平均值在范围的中心
  let stdDev = 25 // 标准差为范围的一半，使得大部分值在范围内
  let min = 0 // 最小值
  let max = 15 // 最大值
  return generateNormalDistribution(mean, stdDev, min, max)
})
console.log(data)
const rankingOptions = reactive({
  // title: {
  //   text: '能力排名',
  //   subtext: '你的能力在该岗位的应聘者中排名',
  //   left: 'center',
  // },
  tooltip: {},
  visualMap: {
    max: 100,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026',
      ],
    },
  },
  xAxis3D: {
    type: 'category',
    data: hours,
  },
  yAxis3D: {
    type: 'category',
    data: days,
  },
  zAxis3D: {
    type: 'value',
  },
  grid3D: {
    boxWidth: 100,
    boxDepth: 100,
    light: {
      main: {
        intensity: 1.2,
      },
      ambient: {
        intensity: 0.3,
      },
    },
  },
  series: [
    {
      type: 'bar3D',
      data: data.map(function (item) {
        return {
          value: [item[1], item[0], item[2]],
        }
      }),
      shading: 'color',
      label: {
        show: false,
        fontSize: 16,
        borderWidth: 1,
      },
      itemStyle: {
        opacity: 0.6,
      },
      emphasis: {
        label: {
          fontSize: 20,
          color: '#900',
        },
        itemStyle: {
          color: '#900',
        },
      },
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
        <div v-slide-in="{ enter: true }" class="job-detail__description card">
          <div class="job-detail__description--title">职位描述</div>
          <a-divider />
          <div class="job-detail__description--content">
            <div class="tags">
              <a-tag v-for="t in job?.jobSkills" :key="t" style="font-size: 18px; height: 25px">{{ t }}</a-tag>
            </div>
            <div class="description">{{ job?.description }}</div>
          </div>
          <a-divider />
          <div class="job-detail__hr">
            <a-avatar :src="job?.employeeVO.avatar" size="large" />
            <span>{{ job?.employeeVO?.realName || '招聘者' }}&nbsp;</span>
          </div>
        </div>
        <div class="job-detail__chart">
          <div v-slide-in="{ enter: true }" class="job-detail__stack card">
            <div class="job-detail__stack--title chart-title">
              <div class="title">技术栈要求可视化</div>
              <div class="sub-title">
                算法分析出该岗位的所需技术栈，大小代表其在<br />该岗位中的权重，灰色部分为你未掌握的技术栈
              </div>
            </div>
            <a-divider />
            <i-charts :option="stackOptions" />
          </div>
          <div v-slide-in="{ enter: true }" class="job-detail__ability-ranking card">
            <div class="job-detail__side--title chart-title">
              <div class="title">能力排名</div>
              <div class="sub-title">你的能力在该岗位的应聘者中排名</div>
            </div>
            <a-divider />
            <div class="job-detail__ranking">
              <!--<i3-d-progress-bar :progress="Math.random() * 50 + 50" />-->
              <i-charts :option="rankingOptions" />
            </div>
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
        <div v-slide-in="{ enter: true }" class="job-detail__side--similar-job card">
          <div class="job-detail__side--title">相似岗位</div>
          <a-divider />
          <div v-if="sideJobList" class="job-detail__side--job-list">
            <job-card-v2 v-for="job in sideJobList" :key="job.id" :job="job" class="enter-y" />
          </div>
        </div>
      </div>
    </div>
    <bottom-float-btn />
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
        @apply flex items-center;
        .job-salary {
          @apply text-[red] text-4xl font-bold;
        }
      }
    }
  }

  .job-detail__main {
    @apply flex justify-between max-w-[var(--min-screen-width)] w-full mx-auto mt-5;

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
            @apply flex flex-wrap space-y-0.5 space-x-2 items-center mb-3;
          }

          .description {
            @apply text-lg whitespace-pre-line;
          }
        }

        .job-detail__hr {
          @apply flex items-center space-x-3 cursor-pointer;
        }
      }

      .job-detail__chart {
        @apply mt-5 mb-4 h-[650px] flex items-center justify-between space-x-5;

        .chart-title {
          @apply flex items-center space-x-4;

          .title {
            @apply text-2xl font-bold;
          }

          .sub-title {
            @apply text-sm text-gray-500;
          }
        }

        .job-detail__stack {
          @apply h-full rounded-[var(--border-radius)] shadow-lg p-5 box-border;

          @include useTheme {
            background-color: getModeVar('cardBgColor');
          }

          :deep(.chart) {
            @apply h-[520px];
          }
        }

        .job-detail__ability-ranking {
          @apply flex-1 h-full rounded-[var(--border-radius)] shadow-lg p-5 box-border;

          @include useTheme {
            background-color: getModeVar('cardBgColor');
          }

          .job-detail__ranking {
            @apply relative;

            :deep(.chart) {
              @apply h-[550px];
            }
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
