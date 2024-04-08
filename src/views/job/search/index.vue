<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import INavigator from '@/components/INavigator/INavigator.vue'
import router from '@/router'
import KnowledgeGraph from '@/components/KnowledgeGraph/KnowledgeGraph.vue'
import { getHomeKnowledgeGraphApi } from '@/apis/home'
import type { GraphData } from '@antv/g6'
import { type CityItemType, getHotCitiesApi } from '@/apis/city'
import type { JobFilterType, JobSearchFormType, SimpleJobItemType } from '@/apis/job'
import { jobSearchApi } from '@/apis/job'
import { useStatusStore } from '@/stores'

const statusStore = useStatusStore()
const searchCity = ref(statusStore.city.code)
const searchState = ref<JobSearchFormType>({
  keyword: '',
  city: statusStore.city.code[1],
  current: 1,
  pageSize: 10,
  sortField: '',
  sortOrder: '',
})
const jobFilterData = ref<JobFilterType>({
  jobType: 0,
  needJobType: 0,
  experience: 0,
  salary: 0,
})
const hotCities = ref<CityItemType[]>([])
const knowledgeGraphData = ref<GraphData>()
const similarSearch = ref([
  'java开发',
  'java初级开发工程师',
  '程序员',
  'java后端',
  'java中级开发工程师',
  '前端',
  '码农',
  '测试',
  '架构师',
  '后台开发',
])

const searchJobList = ref<SimpleJobItemType[]>([])

async function getSearchResult() {
  // searchState.value.current += 1
  // const newJobs = await jobSearchApi(searchState.value)
  // newJobs.records.forEach((job) => {
  //   searchJobList.push(job)
  // })
  searchJobList.value = (await jobSearchApi(searchState.value)).records
}

const keyword =  watchEffect(async () => {
  searchState.value.keyword = (router.currentRoute.value.query.keyword as string) || ''
  await getSearchResult()
})
onMounted(async () => {
  knowledgeGraphData.value = await getHomeKnowledgeGraphApi()
  hotCities.value = statusStore.hotCities
})
onUnmounted(() => {

})
</script>

<template>
  <div class="search-page">
    <div class="search-panel card">
      <job-search v-model:city="searchCity" v-model:keyword="searchState.keyword" />
      <div class="city-list">
        <router-link
          v-for="c in hotCities"
          :key="c.code"
          :to="{ name: 'jobSearch', query: { city: c.code } }"
          class="city"
        >
          {{ c.name }}
        </router-link>
        <router-link class="city" to="/job/search">其他城市</router-link>
      </div>
      <div class="filter-panel block-item">
        <job-filter v-model:job-filter-data="jobFilterData" />
      </div>
    </div>

    <div class="job">
      <job-search-list :search-job-list="searchJobList" class="job-l block-item" @add-page="getSearchResult" />
      <div class="job-side block-item">
        <div class="graph-cot card">
          <knowledge-graph v-if="knowledgeGraphData" :data="knowledgeGraphData" :zoom="0.5" class="graph" />
        </div>
        <div class="other-search card">
          <div class="title">相关搜索</div>
          <div class="search-list">
            <i-navigator
              v-for="item in similarSearch"
              :key="item"
              :to="{ name: 'jobSearch', query: { keyword: item } }"
              class="search-item enter-y"
              open-in-new-window
            >
              <span>{{ item }}</span>
              <div class="arrow">
                <Icon icon="CaretRightOutlined" />
              </div>
            </i-navigator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.search-page {
  .search-panel {
    @apply mt-10 mx-auto p-5 pb-10 rounded-[var(--border-radius)] shadow-lg;

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
    .graph-cot {
      @apply w-full h-[300px] mb-7 rounded-[var(--border-radius)] shadow-md;

      @include useTheme {
        background: getModeVar('cardBgColor');
      }
    }

    .job-l {
      @apply w-[calc(14/19*100%)];
    }

    .job-side {
      @apply w-[calc(5/19*100%)] h-fit ml-5;

      .other-search {
        @apply shadow-lg box-border px-2 py-3;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .title {
          @apply text-lg font-bold;
        }

        .search-list {
          .search-item {
            @apply flex box-border items-center justify-between w-full px-2 my-0.5 h-10 rounded-[var(--border-radius)] cursor-pointer;
            border: 1px solid transparent;

            &:hover {
              @include useTheme {
                border: 1px solid getColor('primary');
                @if getMode() == 'light' {
                  background: rgba(adjust-hue(hsl(0, 50%, 85%), hue(getColor('primary'))), 0.8);
                } @else {
                  background: rgba(adjust-hue(hsl(0, 50%, 15%), hue(getColor('primary'))), 0.8);
                }
              }
            }

            span {
              @apply cursor-pointer;
            }

            .arrow {
              @apply ml-2;
            }
          }
        }
      }
    }
  }
}
</style>
