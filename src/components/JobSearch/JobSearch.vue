<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import router from '@/router'

const emit = defineEmits(['update:keyword', 'update:city', 'search'])
const props = defineProps<{
  keyword: string
  city: string[]
}>()
const propsKeyword = useVModel(props, 'keyword', emit)
const propsCity = useVModel(props, 'city', emit)

function submit() {
  router.push({
    path: '/job/search',
    query: {
      keyword: propsKeyword.value,
      city: propsCity.value[1],
    },
  })
}
</script>

<template>
  <div class="job-search-bar">
    <div class="title">搜索岗位</div>
    <div class="search">
      <a-input-group compact>
        <a-input v-model:value="propsKeyword" placeholder="请输入职位关键词" size="large" @keyup.enter="submit">
          <template #prefix>
            <i-location-selector v-model:value="propsCity" />
          </template>
          <template #suffix>
            <a-button size="large" type="primary" @click="submit">搜索</a-button>
          </template>
        </a-input>
      </a-input-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
