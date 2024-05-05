<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue'
import router from '@/router'
import { useAppStore, useUserStore } from '@/stores'
import { getJobDetailApi, type JobItemType, jobSearchApi, type SimpleJobItemType } from '@/apis/job'
import { CompanyScaleEnum, CompanyStageEnum } from '@/apis/company'
import { findFullIndustry, findFullJobTypeByName, formatDateStr } from '@/utils/utils'
import { message } from 'ant-design-vue'
import Gaussian from 'gaussian'
import { jobDetailGuideState } from '@/tours'

const appStore = useAppStore()
const userStore = useUserStore()
const userStateRef = ref(userStore.userState)
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

// 获取数据
async function getJobDetailData() {
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
}

const voteState = ref(0)

function voteClick() {
  if (voteState.value === 0 || voteState.value === 2) {
    voteState.value = 1
    message.success('感谢您的反馈，希望您喜欢这个工作')
  } else {
    voteState.value = 0
  }
}

function disVoteClick() {
  if (voteState.value === 0 || voteState.value === 1) {
    voteState.value = 2
    message.success('感谢您的反馈，我们会继续改进推荐效果的')
  } else {
    voteState.value = 0
  }
}

const deliveryState = ref(0)

function deliveryJob() {
  if (deliveryState.value !== 0) {
    return
  }
  if (userStateRef.value.isLogin === false) {
    message.error('请先登录')
    return
  }
  deliveryState.value = 1
  setTimeout(() => {
    deliveryState.value = 2
    message.success('投递成功，请静待面试通知')
  }, 1000)
}

// 监听路由变化
const routerWatch = watchEffect(getJobDetailData, {
  flush: 'post',
})

function generateRandomArray() {
  const array: any[] = [
    { value: 16, name: 'Java' },
    { value: 15, name: 'Spring' },
    { value: 13, name: 'Spring Boot' },
    { value: 13, name: 'MySQL' },
    { value: 12, name: 'MyBatis Plus' },
    { value: 11, name: 'Redis' },
    { value: 10, name: 'RabbitMQ' },
    { value: 9, name: 'Spring Cloud' },
  ]

  let remainingTotal = 100

  // Set initial values randomly
  for (let i = 0; i < array.length; i++) {
    const minValue = array[i].value - 3 // Minimum value allowed
    const maxValue = array[i].value + 3 // Maximum value allowed

    const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    array[i].value = randomValue
    remainingTotal -= randomValue
  }

  // Select 2 to 3 random items and add itemStyle
  const numItemsToAddStyle = Math.floor(Math.random() * 2) + 2 // Randomly select 2 or 3
  const selectedIndexes: any[] = []

  while (selectedIndexes.length < numItemsToAddStyle) {
    const index = Math.floor(Math.random() * array.length)

    if (!selectedIndexes.includes(index)) {
      selectedIndexes.push(index)
      array[index].itemStyle = { color: 'gray' }
    }
  }

  // Distribute remaining total randomly
  while (remainingTotal > 0) {
    const index = Math.floor(Math.random() * array.length)

    if (array[index].value < array[index].value + 3) {
      array[index].value += 1
      remainingTotal -= 1
    }
  }

  return array
}

// echarts配置
const stackOptions = reactive({
  legend: {
    top: 'bottom',
  },
  // tooltip: {
  //   trigger: 'item',
  //   formatter: '{a} <br/>{b} : {c} ({d}%)',
  // },
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
            return `${params.name}: ${params.value}%`
          },
        },
      },
      data: generateRandomArray(),
    },
  ],
})
// const mean = 0 // 均值
// const standardDeviation = 1 // 标准差
//
// const distribution = Gaussian(mean, standardDeviation)
//
// const result = []
// for (let x = 0; x <= 10; x++) {
//   const value = Math.abs(distribution.ppf(x / 10)) * 5 // 从分布中获取一个随机样本，并乘以 y 值
//   result.push([x, value])
// }
//
// console.log(result)
//
// // 输出结果
// console.log(result)
const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
// 随机生成数组 高数值向中心靠拢
const data = (function () {
  function limitNumber(num: number) {
    if (num > 100) {
      return 100
    } else if (num < 0) {
      return 0
    } else {
      return Math.floor(num)
    }
  }

  function limitNum(num: number, max: number) {
    if (num > max) {
      return max - 1
    } else if (num < 0) {
      return 0
    } else {
      return num
    }
  }

  let min = 0 // 最小值
  let max = 15 // 最大值
  function generateNormalDistribution(min: number, max: number) {
    const result = []
    while (result.length < 170) {
      let x = Math.random() * 15 // 生成(0,15)区间的随机数
      let y = Math.random() * 15 // 生成(0,15)区间的随机数
      const distribution = Gaussian(0, 1)

      const x_value = Math.abs(distribution.ppf(x / (max - 1))) * 5 // 从分布中获取一个随机样本，并乘以 y 值
      const y_value = Math.abs(distribution.ppf(y / (max - 1))) * 5 // 从分布中获取一个随机样本，并乘以 y 值

      result.push([Math.floor(x), Math.floor(y), limitNumber((10 - x_value) * (10 - y_value))])
    }
    return result // 返回三个正态分布随机整数和一个在指定范围内的随机整数
  }

  return generateNormalDistribution(min, max)
})()

const rankingOptions = reactive({
  tooltip: {
    show: false,
  },
  visualMap: {
    show: false,
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
      selectedMode: 'single',
      data: data.map(function (item) {
        return {
          value: [item[1], item[0], item[2]],
          selected: item[0] === 14 && item[1] === 7,
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
          show: true,
          fontSize: 20,
          color: appStore.darkMode === 'light' ? '#000' : '#fff',
          formatter: function (params: any) {
            return `超过了${params.value[2]}%的人`
          },
        },
        itemStyle: {
          color: 'red',
        },
      },
    },
  ],
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
  window.removeEventListener('scroll', collapseBanner)
})
nextTick(async () => {
  await userStore.getUserState()
  await getJobDetailData()
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
          <a-button
            class="apply-job"
            size="large"
            @click="deliveryJob"
            :loading="deliveryState === 1"
            :type="deliveryState === 2 ? 'default' : 'primary'"
          >
            <Icon v-if="deliveryState == 2" icon="CheckOutlined" />
            {{ deliveryState === 2 ? '已投递' : '立即投递' }}
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
          <div class="job-detail__description--title title">职位描述</div>
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
            <span
              >{{ job?.employeeVO?.realName || '招聘者' }}&nbsp;
              <span class="text-sm">{{ job?.employeeVO.position }}</span>
            </span>
            <span>
              更新时间
              <span class="text-sm">{{ formatDateStr(job?.updateTime!) }}</span>
            </span>
          </div>
        </div>
        <div class="job-detail__chart">
          <div v-slide-in="{ enter: true }" class="job-detail__stack card">
            <div class="job-detail__stack--title chart-title">
              <div class="title">技术栈要求可视化</div>
              <div class="sub-title multi-line-2">
                算法分析出该岗位的所需技术栈，大小代表其在该岗位中的权重，灰色部分为你未掌握的技术栈
              </div>
            </div>
            <a-divider />
            <div class="job-detail__chart-content">
              <not-login-tip
                v-if="!userStateRef.isLogin || !userStateRef.isUploadApplication"
                :is-login="userStateRef.isLogin"
                :delivered="userStateRef.isUploadApplication"
              />
              <i-charts v-else :option="stackOptions" />
            </div>
          </div>
          <div v-slide-in="{ enter: true }" class="job-detail__ability-ranking card">
            <div class="job-detail__side--title chart-title">
              <div class="title">能力排名</div>
              <div class="sub-title multi-line-2">你的能力在该岗位的应聘者中排名</div>
            </div>
            <a-divider />
            <div class="job-detail__ranking">
              <!--<i3-d-progress-bar :progress="Math.random() * 50 + 50" />-->
              <div class="job-detail__chart-content">
                <not-login-tip
                  v-if="!userStateRef.isLogin || !userStateRef.isUploadApplication"
                  :is-login="userStateRef.isLogin"
                  :delivered="userStateRef.isUploadApplication"
                />
                <i-charts v-else :option="rankingOptions" />
              </div>
            </div>
          </div>
        </div>
        <div v-slide-in="{ enter: true }" class="job-detail__company-info card">
          <div class="job-detail__company-info--title">
            <div class="title">公司信息</div>
          </div>
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
              <div class="go-to-detail">
                <a-button
                  type="primary"
                  @click="
                    $router.push({
                      name: 'companyDetail',
                      query: {
                        companyId: job?.companyVO.id,
                      },
                    })
                  "
                  >查看公司详情
                </a-button>
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

        <div v-slide-in="{ enter: true }" class="job-detail__address card">
          <div class="job-detail__address--title">工作地点</div>
          <a-divider />
          <div class="job-detail__address--content">
            <div class="job-detail__address--content-inner">
              <div class="address">
                <Icon icon="PhoneOutlined" /> &nbsp;
                {{ job?.address }}
              </div>
              <i-map v-if="job?.address" :longitude="job?.longitude" :latitude="job?.latitude" style="height: 400px" />
            </div>
          </div>
        </div>
      </div>
      <div class="job-detail__side">
        <div v-slide-in="{ enter: true }" class="job-detail__side--vote card">
          <div class="job-detail__side--title">
            <div class="title">推荐效果评分</div>
          </div>
          <a-divider />
          <div class="job-detail__side--vote-main">
            <div class="desc">对该岗位的推荐效果评分<br />请选择好或者不好</div>
            <div class="btn-group">
              <a-button @click="voteClick" :type="voteState === 1 ? 'primary' : 'default '">
                <Icon icon="LikeOutlined" />
                很好
              </a-button>
              <a-button @click="disVoteClick" :type="voteState === 2 ? 'primary' : 'default '" danger>
                <Icon icon="DislikeOutlined" />
                不好
              </a-button>
            </div>
          </div>
        </div>
        <div v-slide-in="{ enter: true }" class="job-detail__side--similar-job card">
          <div class="job-detail__side--title">
            <div class="title">相似岗位</div>
          </div>
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
  .title {
    @apply text-2xl font-bold single-line;
  }

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

      .job-detail__chart {
        @apply mb-5 h-[620px] flex items-center justify-between space-x-5;

        .chart-title {
          @apply flex items-center justify-start space-x-4;

          .title {
          }

          .sub-title {
            @apply flex-1 text-sm text-gray-500;
          }
        }

        .job-detail__chart-content {
          @apply h-[500px];
        }

        .job-detail__stack {
          @apply flex-1 h-full rounded-[var(--border-radius)] shadow-lg p-5 box-border;

          @include useTheme {
            background-color: getModeVar('cardBgColor');
          }
        }

        .job-detail__ability-ranking {
          @apply flex-1 h-full rounded-[var(--border-radius)] shadow-lg p-5 box-border;

          @include useTheme {
            background-color: getModeVar('cardBgColor');
          }

          .job-detail__ranking {
            @apply h-full relative;
          }
        }
      }

      .job-detail__company-info {
        @apply relative rounded-[var(--border-radius)] shadow-lg p-5 mb-5;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__company-info--content {
          @apply relative p-5;

          .simple-info {
            @apply relative flex;

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

            .go-to-detail {
              @apply absolute right-5 top-5;
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

      .job-detail__address {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-5;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__address--title {
          @apply text-2xl font-bold mb-4;
        }

        .job-detail__address--content {
          @apply p-2;
          .job-detail__address--content-inner {
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
    }

    .job-detail__side {
      @apply w-[320px] relative ml-5;

      .job-detail__side--vote {
        @apply rounded-[var(--border-radius)] shadow-lg p-5 mb-4;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .job-detail__side--vote-main {
          .desc {
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
