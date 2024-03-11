<script setup lang="ts">
import { ref } from 'vue'
import JobFilter from '@/components/JobFilter/JobFilter.vue'
import JobItem from '@/components/JobItem/JobItem.vue'

const cityList = ref([
  '全国',
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '天津',
  '西安',
  '苏州',
  '武汉',
  '厦门',
  '长沙',
  '成都',
  '郑州',
  '重庆',
  '其他城市',
])
</script>

<template>
  <div class="search-page">
    <div class="search-panel">
      <job-search />
      <div class="city-list">
        <router-link class="city" to="/search" v-for="c in cityList" :key="c">{{ c }}</router-link>
      </div>
      <div class="filter-panel block-item">
        <job-filter />
      </div>
    </div>

    <div class="job">
      <div class="job-list block-item">
        <job-item v-for="i in 10" :key="i" />
      </div>
      <div class="job-side block-item">
        <div class="title">热门搜索</div>
        <div class="search-list">
          <a-tag v-for="i in 10" :key="i" class="search-item" color="blue">{{ i }}</a-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.search-page {
  @apply w-[1200px] mx-auto;

  .search-panel {
    @apply mt-10 mx-auto p-5 pb-10 rounded-2xl shadow-lg;

    @include useTheme {
      background-color: getModeVar('cardBgColor');
    }

    :deep(.title) {
      @include useTheme {
        color: getModeVar('textColor');
      }
    }

    .city-list {
      @apply my-5 flex items-center justify-items-start;
      .city {
        @apply mx-2;
      }
    }
  }

  .block-item {
    @apply mt-5;
  }

  .job {
    @apply flex;
    .job-list {
      @apply w-[1000px];
    }

    .job-side {
      @apply w-[200px] h-fit box-border p-3 ml-5 rounded-2xl shadow-lg;

      @include useTheme {
        background-color: getModeVar('cardBgColor');
      }

      .title {
        @apply text-lg font-bold;
      }

      .search-list {
        @apply flex flex-wrap;
        .search-item {
          @apply mx-2 my-2;
        }
      }
    }
  }
}
</style>
