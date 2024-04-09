<script lang="ts" setup>
import type { SimpleJobItemType } from '@/apis/job'

// const emit = defineEmits(['addPage'])
const props = defineProps<{
  searchJobList: SimpleJobItemType[]
}>()
</script>

<template>
  <div class="job-list">
    <job-item v-slide-in="{ enter: true }" v-for="job in searchJobList" :key="job.id" :job="job" class="" />
  </div>
</template>

<style lang="scss" scoped>
.job-list {
  column-count: 2;
  column-gap: 10px;
}
</style>
