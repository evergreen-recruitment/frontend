<script setup lang="ts">
import INavigator from '@/components/INavigator/INavigator.vue'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:keyword'])
const props = defineProps<{
  keyword: string
  hideTitle?: boolean
}>()
const propsKeyword = useVModel(props, 'keyword', emit)
</script>

<template>
  <div class="job-search-bar">
    <div class="title" v-if="!hideTitle">搜索你心仪的岗位</div>
    <div class="search">
      <a-input-group compact>
        <a-input v-model:value="propsKeyword" size="large" placeholder="请输入职位关键词" enter-button="Search">
          <template #suffix>
            <i-navigator :to="{ name: 'jobSearch', query: { keyword: keyword } }">
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
    --font-size: 35px;
    @apply font-bold mb-5;
    font-size: var(--font-size);
  }

  .title-hidden {
    animation: hidden 0.5s forwards;
    @keyframes hidden {
      0% {
        opacity: 1;
        filter: blur(0);
        transform: scale(1);
      }
      50% {
        opacity: 1;
        filter: blur(30px);
        transform: scale(1.2);
      }
      100% {
        opacity: 0;
        filter: blur(30px);
        transform: scale(1);
      }
    }
  }

  .search {
    @apply w-full max-w-[var(--min-screen-width)] flex justify-center items-center;
  }
}
</style>
