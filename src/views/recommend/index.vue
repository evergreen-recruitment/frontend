<script lang="ts" setup>
import { h } from 'vue'
import {
  CloudSyncOutlined,
  FilePdfOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import type { StepProps } from 'ant-design-vue'

const items = [
  {
    title: '登录/注册',
    description: '请先登录或注册，我们网站使用最新的技术栈，同时使用优美的界面设计，给您带来不一样的体验。',
    status: 'finish',
    icon: h(UserOutlined, { style: { 'font-size': '30px' } }),
  },
  {
    title: '完善信息',
    description: '完善用户信息有助于我们分析你的简历情况。',
    status: 'finish',
    icon: h(SolutionOutlined, { style: { 'font-size': '30px' } }),
  },
  {
    title: '上传简历',
    description: '上传简历，我们将分析你简历的内容，并为你进行能力评估，推荐岗位。',
    status: 'process',
    icon: h(FilePdfOutlined, { style: { 'font-size': '30px' } }),
  },
  {
    title: '云端算法处理',
    description: '我们使用先进了NLP算法配合自研的推荐算法，将为您推荐最合适岗位。',
    status: 'wait',
    icon: h(CloudSyncOutlined, { style: { 'font-size': '30px' } }),
  },
  {
    title: '推荐岗位',
    description: '我们数据库中有最完善的计算机类岗位，包含全国各地的最新最好岗位，包您满意。',
    status: 'wait',
    icon: h(SmileOutlined, { style: { 'font-size': '30px' } }),
  },
] as StepProps[]
</script>

<template>
  <div class="recommend-page">
    <i-card>
      <div class="title">推荐岗位</div>
      <a-divider />
      <a-steps :items="items" />
    </i-card>
  </div>
</template>
<style lang="scss" scoped>
.recommend-page {
  @apply mt-10;
  .title {
    @apply text-2xl font-bold;
  }
}
</style>
