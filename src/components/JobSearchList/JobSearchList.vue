<script lang="ts" setup>
import type { SimpleJobItemType } from '@/apis/job'
import { ref } from 'vue'
import router from '@/router'

const props = defineProps<{
  searchJobList: SimpleJobItemType[]
  currentPage: number
  maxPage: number
}>()
const jobListRef = ref<HTMLElement | null>(null)
const current = ref(props.currentPage)

function toSearch() {
  router.push({
    name: 'jobSearch',
    query: {
      ...router.currentRoute.value.query,
      current: current.value,
    },
  })
}
</script>

<template>
  <div class="company-list-outer">
    <search-pagination
      v-model:current-page="current"
      :container-ref="jobListRef"
      :max-page="maxPage"
      @search="toSearch"
    />
    <div class="job-list" ref="jobListRef">
      <job-item v-slide-in="{ enter: true }" v-for="job in searchJobList" :key="job.id" :job="job" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.company-list-outer {
  :deep(.ant-input-number) {
    width: 100% !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;

    input {
      text-align: center !important;
      padding: 0 !important;
      font-size: 10px;
    }
  }

  .job-list {
    column-count: 2;
    column-gap: 10px;
  }
}
</style>
