<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import type { JobItem, SimpleJobItem } from '@/types/commonTypes'
import router from '@/router'
import { useAppStore } from '@/stores'
import JobCardV2 from '@/components/JobCardV2/JobCardV2.vue'
import { getJobDetail } from '@/apis/jobDetail'
import I3DProgressBar from '@/components/I3DProgressBar/I3DProgressBar.vue'

const appStore = useAppStore()
const searchJobList = reactive<JobItem[]>([
  {
    id: '1',
    title: 'Java开发工程师',
    salary: ['15k', '30k'],
    experience: '3-5年',
    education: '本科',
    hr: '张三',
    company: '阿里巴巴',
    description: '负责公司后端开发工作',
    address: '北京',
    createTime: '2024-03-11',
    tags: ['Java', '后端', '高级'],
  },
  {
    id: '2',
    title: '前端开发工程师',
    salary: ['10k', '20k'],
    experience: '1-3年',
    education: '本科',
    hr: '李四',
    company: '腾讯',
    description: '负责公司前端开发工作',
    address: '上海',
    createTime: '2024-03-01',
    tags: ['前端', '初级'],
  },
  {
    id: '3',
    title: '测试工程师',
    salary: ['8k', '15k'],
    experience: '1-3年',
    education: '本科',
    hr: '王五',
    company: '百度',
    description: '负责公司测试工作',
    address: '广州',
    createTime: '2024-01-01',
    tags: ['测试', '初级'],
  },
  {
    id: '4',
    title: '运维工程师',
    salary: ['10k', '20k'],
    experience: '3-5年',
    education: '本科',
    hr: '赵六',
    company: '华为',
    description: '负责公司运维工作',
    address: '深圳',
    createTime: '2024-03-02',
    tags: ['运维', '中级'],
  },
  {
    id: '5',
    title: '人工智能工程师',
    salary: ['20k', '40k'],
    experience: '3-5年',
    education: '硕士',
    hr: '小明',
    company: '小米',
    description: '负责公司人工智能工作',
    address: '杭州',
    createTime: '2024-02-21',
    tags: ['人工智能', '高级'],
  },
])
const companyInfo = reactive({
  name: '京东乾石',
  logo: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20190318/ee5cdd8ce3fcaff15bcd0bc322457de3d04025c6db993a34b2372a1fcb5e06a2_s.jpg',
  address: '北京通州区京东总部2号楼B座',
  description: '京东物流智能供应链产业平台，立足物流科技，发展智能供应链软件、技术及服务',
  scale: '10000人以上',
  stage: '上市公司',
  industry: '电商',
})
const jobs = reactive<SimpleJobItem[]>([
  {
    id: '1',
    title: 'Java工程师',
    salary: ['15k', '25k'],
    company: '百度',
    address: '北京',
    tags: ['Java', 'Spring', 'SpringBoot', 'MySQL'],
  },
  {
    id: '2',
    title: '前端工程师',
    salary: ['15k', '25k'],
    company: '腾讯',
    address: '深圳',
    tags: ['JavaScript', 'Vue', 'React', 'Node.js'],
  },
  {
    id: '3',
    title: '测试工程师',
    salary: ['15k', '25k'],
    company: '阿里巴巴',
    address: '杭州',
    tags: ['自动化测试', '功能测试', '性能测试', '安全测试'],
  },
  {
    id: '4',
    title: '运维工程师',
    salary: ['15k', '25k'],
    company: '字节跳动',
    address: '北京',
    tags: ['Linux', 'Shell', 'Python', 'Docker'],
  },
  {
    id: '5',
    title: '人工智能工程师',
    salary: ['15k', '25k'],
    company: '华为',
    address: '深圳',
    tags: ['机器学习', '深度学习', '图像识别', '语音识别'],
  },
  {
    id: '6',
    title: 'Python工程师',
    salary: ['15k', '25k'],
    company: '小米',
    address: '北京',
    tags: ['Python', 'Django', 'Flask', 'Tornado'],
  },
])
const id = ref(Number(router.currentRoute.value.params.id))
const job = ref<any>(jobs[0])
// 监听路由变化
watchEffect(async () => {
  id.value = Number(router.currentRoute.value.params.id)
  job.value = await getJobDetail(id.value)
})
// echarts配置
const option1 = reactive({
  legend: {
    top: 'bottom',
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: 'Java' },
        { value: 38, name: 'Spring' },
        { value: 32, name: 'Spring Boot' },
        { value: 30, name: 'MySQL' },
        { value: 28, name: 'MyBatis Plus' },
        { value: 26, name: 'Redis' },
        { value: 22, name: 'RabbitMQ' },
        { value: 18, name: 'Spring Cloud' },
      ],
    },
  ],
})
onMounted(async () => {
  console.log(await getJobDetail(1))
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
              {{ job.title }}
            </div>
          </div>
          <div class="job-info">
            <div class="job-address">{{ job.address }}</div>
            <div class="job-experience">{{ job.experience }}</div>
          </div>
          <a-button type="primary" size="large" class="apply-job">立即投递</a-button>
        </div>
        <div class="job-detail__banner--right">
          <div class="job-salary">{{ `${job.salary[0]}-${job.salary[1]}` }}</div>
        </div>
      </div>
    </div>
    <div class="job-detail__main">
      <div class="job-detail__content">
        <div class="job-detail__description card">
          <div class="job-detail__description--title">职位描述</div>
          <a-divider />
          <div class="job-detail__description--content">
            <div class="tags">
              <a-tag v-for="t in job.tags" :key="t">{{ t }}</a-tag>
            </div>
            <div class="description">{{ job.description }}</div>
          </div>
          <a-divider />
          <div class="job-detail__hr">
            <a-avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <span>{{ job.hr }}&nbsp;</span>
          </div>
        </div>
        <div class="job-detail__stack card">
          <div class="job-detail__stack--title">技术栈要求可视化</div>
          <a-divider />
          <i-charts :option="option1" />
        </div>
        <div class="job-detail__company-info card">
          <div class="job-detail__company-info--title">公司信息</div>
          <a-divider />
          <div class="job-detail__company-info--content">
            <div class="simple-info">
              <div class="left">
                <div class="logo">
                  <img :src="companyInfo.logo" />
                </div>
              </div>
              <div class="right">
                <div class="title">{{ companyInfo.name }}</div>
                <div class="address">地址：{{ companyInfo.address }}</div>
              </div>
            </div>
            <div class="description">{{ companyInfo.description }}</div>
            <div class="tag-list">
              <a-tag class="scale" color="cyan">{{ companyInfo.scale }}</a-tag>
              <a-tag class="stage" color="orange">{{ companyInfo.stage }}</a-tag>
              <a-tag class="industry" color="pink">{{ companyInfo.industry }}</a-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="job-detail__side">
        <div class="job-detail__side--ability-ranking card">
          <div class="job-detail__side--title">能力排名</div>
          <a-divider />
          <div class="job-detail__side--ranking">
            <div class="title">你的能力在该岗位的应聘者中排名</div>
            <i3-d-progress-bar :progress="30" />
          </div>
        </div>
        <div class="job-detail__side--similar-job card">
          <div class="job-detail__side--title">相似岗位</div>
          <a-divider />
          <div class="job-detail__side--job-list">
            <job-card-v2 v-for="job in jobs" :key="job.id" :job="job" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

          .job-experience {
            @apply text-lg;
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
    @apply flex justify-between w-[1100px] mx-auto mt-5;

    .job-detail__content {
      @apply w-[calc(100%-300px)] box-border;

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
            @apply text-lg;
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
          @apply text-2xl font-bold;
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
            @apply text-base mb-4;
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
      @apply relative ml-5;

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

      .job-detail__side--similar-job {
        @apply rounded-[var(--border-radius)] shadow-lg p-5;

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
