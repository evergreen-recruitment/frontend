<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useAppStore, useUserStore } from '@/stores'
import { findFullLocation } from '@/utils/utils'
import type { SimpleJobItemType } from '@/apis/job'
import { jobSearchApi } from '@/apis/job'
import type { UserInfoType } from '@/apis/user'

const userStore = useUserStore()
const userInfo = computed<UserInfoType>(() => userStore.userInfo)
const appStore = useAppStore()
const searchJobList = ref<SimpleJobItemType[]>([])
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
        borderColor: appStore.darkMode === 'light' ? '#999' : '#fff',
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
        {
          value: 78,
          name: '已通过',
          itemStyle: {
            color: 'green',
          },
        },
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
onMounted(async () => {
  console.log(userInfo.value.location, findFullLocation(userInfo.value.location as number))
  searchJobList.value = (
    await jobSearchApi({
      current: Math.random() * 2 + 2,
      pageSize: 10,
    })
  ).records
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
              <div class="gender">{{ userInfo.gender == 1 ? '男' : '女' }}</div>
              <div class="age">{{ userInfo.age }}岁</div>
              <div class="location">{{ findFullLocation(userInfo.location as number)[1].name }}</div>
            </div>
            <div class="phone"><Icon icon="PhoneOutlined" />&nbsp; {{ userInfo.phone }}</div>
          </div>
          <div class="to-optimize-application">
            <a-button type="primary" @click="$router.push('/user/application')">优化简历</a-button>
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
          <a-tab-pane key="1" :tab="`已投递 (${searchJobList.length})`">
            <job-item v-for="job in searchJobList" :key="job.id" :job="job" />
          </a-tab-pane>
          <a-tab-pane key="2" :tab="`待面试 (${searchJobList.length})`">
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
              <a-button style="width: 100%" type="primary">
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

<style lang="scss" scoped>
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
          @apply w-24 h-24 rounded-full overflow-hidden;

          @include useTheme {
            box-shadow: 0 0 10px rgba(getColor('primary'), 1);
          }

          .avatar {
            @apply flex items-center justify-center w-full h-full;

            @include useTheme {
              background: getColor('primary');
            }

            img {
              @apply w-full h-full object-cover object-center;
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
      @apply h-fit p-5 rounded-[var(--border-radius)] shadow-lg box-border;

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
