<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { JobItem } from '@/types/commonTypes'
import { useAppStore, type UserInfo, useUserStore } from '@/stores'

const userStore = useUserStore()
const userInfo = computed<UserInfo>(() => userStore.userInfo)
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
const echartsOption = reactive({
  legend: {
    top: 'bottom',
  },
  series: [
    {
      name: '简历通过率图表',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: appStore.darkMode === 'light' ? '#000' : '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30, // 调整字体大小
          fontWeight: 'bold',
          formatter: function (params: any) {
            // 添加 formatter 属性
            return `${params.name}: ${params.value}`
          },
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 78, name: '已通过' },
        {
          value: 22,
          name: '未通过',
          itemStyle: {
            color: 'red',
          },
        },
      ],
    },
  ],
})
</script>

<template>
  <div class="delivery-page">
    <div class="delivery-page-left">
      <div class="user-panel card">
        <div class="user-panel-top">
          <div class="left">
            <div class="avatar">
              <img :src="userInfo?.avatar" />
            </div>
          </div>
          <div class="right">
            <div class="real-name">{{ userInfo.realName }}</div>
            <div class="info-panel">
              <div class="gender">{{ userInfo.gender }}</div>
              <div class="age">{{ userInfo.age }}</div>
              <div class="location">{{ userInfo.address }}</div>
            </div>
            <div class="phone"><Icon icon="PhoneOutlined" />&nbsp; {{ userInfo.phone }}</div>
          </div>
          <div class="to-optimize-application">
            <a-button type="primary" @click="$router.push('/userCenter')">优化简历</a-button>
          </div>
        </div>
        <div class="user-panel-bottom">
          <div class="apply-status">
            <div class="title">求职状态</div>
            <div class="status">在职-暂不考虑</div>
          </div>
          <div class="join-time">
            <div class="title">加入时间</div>
            <div class="status">{{ userInfo.createTime }}</div>
          </div>
        </div>
      </div>

      <div class="job-list block-item">
        <a-tabs animated>
          <a-tab-pane key="1" tab="已投递">
            <job-item v-for="job in searchJobList" :key="job.id" :job="job" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="待面试">
            <job-item v-for="job in searchJobList" :key="job.id" :job="job" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>

    <div class="delivery-page-right">
      <div class="upload-application card">
        <div class="title">导入简历</div>
        <a-divider />
        <div class="sub-title">请上传DOC、DOCX、PDF格式的中文简历，大小不超过20M</div>
        <div class="upload">
          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
            <template #default>
              <a-button type="primary" style="width: 100%">
                <Icon icon="UploadOutlined" />
                上传简历
              </a-button>
            </template>
          </a-upload>
        </div>
      </div>

      <div class="passing-rate card">
        <div class="title">你的简历通过率</div>
        <i-charts :option="echartsOption" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.delivery-page {
  @apply flex space-x-5 mt-10;

  .delivery-page-left {
    @apply flex flex-col space-y-5 mx-auto w-full;
    .user-panel {
      @apply p-5 pb-10 rounded-[var(--border-radius)] shadow-lg box-border;

      @include useTheme {
        background-color: getModeVar('cardBgColor');
      }

      .user-panel-top {
        @apply relative flex items-center space-x-5 pl-7;

        .left {
          @apply w-24 rounded-full overflow-hidden;

          @include useTheme {
            box-shadow: 0 0 10px rgba(getColor('primary'), 1);
          }

          .avatar {
            @apply flex items-center justify-center w-full h-full;

            @include useTheme {
              background: getColor('primary');
            }

            img {
              @apply w-full h-full object-cover;
            }
          }
        }

        .right {
          @apply flex flex-col;

          .real-name {
            @apply text-5xl mb-5;
          }

          .info-panel {
            @apply flex items-center space-x-5;
          }

          .phone {
            @apply mt-2;
          }
        }

        .to-optimize-application {
          @apply absolute right-5 top-5;
        }
      }

      .user-panel-bottom {
        @apply flex justify-between space-x-6 mt-5;

        .title {
          @apply text-lg font-bold;
        }

        .status {
          @apply text-sm text-gray-500 mt-2;
        }

        .apply-status {
          @apply flex flex-col items-start justify-center;
        }

        .join-time {
          @apply flex flex-col items-start justify-center;
        }
      }
    }

    .job-list {
      @apply overflow-x-hidden;
    }
  }

  .block-item {
    @apply mt-5;
  }

  .delivery-page-right {
    @apply flex flex-col w-[calc(5/19*100%)] space-y-5;

    .upload-application {
      @apply h-fit p-5 pb-10 rounded-[var(--border-radius)] shadow-lg box-border;

      @include useTheme {
        background-color: getModeVar('cardBgColor');
      }

      .title {
        @apply text-lg font-bold;
      }

      .sub-title {
        @apply text-sm text-gray-500;
      }

      .upload {
        @apply mt-5;
      }
    }

    .passing-rate {
      @apply shadow-lg box-border px-2 py-3;

      @include useTheme {
        background-color: getModeVar('cardBgColor');
      }

      .title {
        @apply text-lg font-bold;
      }

      :deep(.chart) {
        @apply h-56;
      }
    }
  }
}
</style>
