<script setup lang="ts">
import INavigator from '@/components/INavigator/INavigator.vue'
import { useVModel } from '@vueuse/core'
const emit = defineEmits(['update:keyword'])
const props = defineProps<{
  keyword: string
}>()
const propsKeyword = useVModel(props, 'keyword', emit)
</script>

<template>
  <div class="job-search-bar">
    <div class="title">搜索你心仪的岗位</div>
    <div class="search">
      <a-input-group compact>
        <a-input v-model:value="propsKeyword" size="large" placeholder="请输入职位关键词" enter-button="Search">
          <template #prefix>
            <i-location-selector />
          </template>
          <template #suffix>
            <i-navigator :to="{ name: 'search', query: { keyword: keyword } }">
              <a-button type="primary" size="large">搜索</a-button>
            </i-navigator>
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
