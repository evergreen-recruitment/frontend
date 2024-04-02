<script setup lang="ts">
import INavigator from '@/components/INavigator/INavigator.vue'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:keyword'])
const props = defineProps<{
  keyword: string
  titleSize: number
}>()
const propsKeyword = useVModel(props, 'keyword', emit)
</script>

<template>
  <div class="job-search-bar">
    <div class="title" :style="`font-size:${titleSize}px`">搜索你心仪的岗位</div>
    <div class="search">
      <a-input-group compact>
        <a-input v-model:value="propsKeyword" size="large" placeholder="请输入职位关键词" enter-button="Search">
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
  @apply flex flex-col justify-center items-center w-[calc(var(--min-screen-width)-80px)];

  .title {
    @apply text-5xl font-bold mb-5;
  }

  .search {
    @apply w-full max-w-[var(--min-screen-width)] flex justify-center items-center;
  }
}
</style>
