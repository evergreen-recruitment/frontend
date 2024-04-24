<script lang="ts" setup>
import { computed, h, onMounted, ref } from 'vue'
import {
  CloudSyncOutlined,
  FilePdfOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import type { StepProps } from 'ant-design-vue'
import { useUserStore } from '@/stores'
import router from '@/router'
import { getNewJobsApi } from '@/apis/job'

const userStore = useUserStore()
const tabKey = ref('1')
const recommendJobList = ref()
const newJobList = ref()
const nearbyJobList = ref()
const items = [
  {
    title: '登录/注册',
    description: '请先登录或注册，我们网站使用最新的技术栈，同时使用优美的界面设计，给您带来不一样的体验。',
    icon: h(UserOutlined, { style: { 'font-size': '30px' } }),
  },
  {
    title: '完善信息',
    description: '完善用户信息有助于我们分析你的简历情况。',
    icon: h(SolutionOutlined, { style: { 'font-size': '30px' } }),
  },
  {
    title: '上传简历',
    description: '上传简历，我们将分析你简历的内容，并为你进行能力评估，推荐岗位。',
    icon: h(FilePdfOutlined, { style: { 'font-size': '30px' } }),
  },
  {
    title: '云端算法处理',
    description: '我们使用先进了NLP算法配合自研的推荐算法，将为您推荐最合适岗位。',
    icon: h(CloudSyncOutlined, { style: { 'font-size': '30px' } }),
  },
  {
    title: '推荐岗位',
    description: '我们数据库中有最完善的计算机类岗位，包含全国各地的最新最好岗位，包您满意。',
    icon: h(SmileOutlined, { style: { 'font-size': '30px' } }),
  },
] as StepProps[]

const res = ref<any[]>([])
const compCurrent = computed(() => {
  return res.value.indexOf(false) === -1 ? 5 : res.value.indexOf(false)
})

function onStepsChange(current: any) {
  if (compCurrent.value === 0) {
    router.push({ name: 'login' })
  } else if (compCurrent.value === 1) {
    router.push({ name: 'completeInfo' })
  } else if (compCurrent.value === 2) {
    router.push({ name: 'application' })
  }
}

onMounted(async () => {
  const obj = userStore.getUserState()
  res.value = [obj.isLogin.value, await obj.isCompleteInfo.value, await obj.isUploadApplication.value]

  newJobList.value = await getNewJobsApi({ pageSize: 24 })
  recommendJobList.value = await getNewJobsApi({ current: 2, pageSize: 24 })
  nearbyJobList.value = await getNewJobsApi({ current: 3, pageSize: 24 })
})
</script>

<template>
  <div class="recommend-page">
    <i-card class="nav-panel">
      <div class="title">推荐岗位</div>
      <a-divider />
      <a-steps :current="compCurrent" :items="items" @change="onStepsChange" />
    </i-card>
    <div v-if="compCurrent === 5" v-slide-in="{ distance: 200 }" class="job-recommend block-item">
      <div class="company-list-outer">
        <div class="job-list">
          <job-card v-for="job in recommendJobList" :key="job.id" :job="job" />
        </div>
        <!--<a-tabs v-model:activeKey="tabKey" animated style="width: 100%; overflow: hidden; padding: 5px 0">-->
        <!--  <a-tab-pane key="1" tab="推荐岗位">-->
        <!--  </a-tab-pane>-->
        <!--  <a-tab-pane key="2" tab="最新岗位">-->
        <!--    <div class="job-list">-->
        <!--      <job-card v-for="job in newJobList" :key="job.id" :job="job" />-->
        <!--    </div>-->
        <!--  </a-tab-pane>-->
        <!--  <a-tab-pane key="3" tab="附近岗位">-->
        <!--    <div class="job-list">-->
        <!--      <job-card v-for="job in nearbyJobList" :key="job.id" :job="job" />-->
        <!--    </div>-->
        <!--  </a-tab-pane>-->
        <!--</a-tabs>-->
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.recommend-page {
  @apply mt-10;
  .nav-panel {
    @apply mb-4;
    .title {
      @apply text-2xl font-bold;
    }
  }

  .job-recommend {
    @apply my-5 mx-auto flex flex-col  justify-center box-border;

    .company-list-outer {
      @apply flex items-center justify-center;
      .job-list {
        @apply grid gap-[15px] w-[calc(100%-1rem)];
        --card-width: 17.5rem;
        --card-height: 10rem;
        grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));

        //瀑布流
        //column-count: 4;
        //column-gap: 7px;

        //gap: 15px;
      }
    }

    :deep(.ant-tabs-content-holder) {
      @apply p-2;
    }
  }
}
</style>
