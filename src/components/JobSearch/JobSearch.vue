<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import router from '@/router'

const emit = defineEmits(['update:keyword'])
const props = defineProps<{
  keyword: string
}>()
const propsKeyword = useVModel(props, 'keyword', emit)

function submit() {
  // @ts-ignore
  router.push({ name: 'jobSearch', query: { keyword: propsKeyword } })
}
</script>

<template>
  <div class="job-search-bar">
    <div class="title">搜索你心仪的岗位</div>
    <div class="search">
      <a-input-group compact>
        <a-input v-model:value="propsKeyword" size="large" placeholder="请输入职位关键词">
          <template #prefix>
            <i-location-selector />
          </template>
          <template #suffix>
            <a-button type="primary" size="large" @click="submit">搜索</a-button>
          </template>
        </a-input>
      </a-input-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.job-search-bar {
  @apply w-full;

  .title {
    @apply text-white text-3xl font-bold text-center mb-5;
  }

  .search {
    @apply w-full max-w-[var(--min-screen-width)] flex justify-center items-center;
  }
}
</style>
