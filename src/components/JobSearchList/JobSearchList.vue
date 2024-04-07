<script setup lang="ts">
import type { SimpleJobItemType } from '@/apis/job'

const emit = defineEmits(['addPage'])
const props = defineProps<{
  searchJobList: SimpleJobItemType[]
}>()
</script>

<template>
  <div class="job-list">
    <job-item class='' v-for="job in searchJobList" :job="job" :key="job.id" />
  </div>
</template>

<style scoped lang="scss">
.job-list {
  column-count: 2;
  column-gap: 10px;
}
</style>
