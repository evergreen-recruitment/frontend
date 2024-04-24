<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import router from '@/router'
import { getHomeKnowledgeGraphApi } from '@/apis/home'
import type { GraphData } from '@antv/g6'
import { type CityItemType } from '@/apis/city'
import type { JobFilterType, JobSearchFormType, SimpleJobItemType } from '@/apis/job'
import { jobSearchApi } from '@/apis/job'
import { useStatusStore } from '@/stores'
import { findFullLocation } from '@/utils/utils'
import JobSearchFilter from '@/components/JobSearchFilter/JobSearchFilter.vue'

const statusStore = useStatusStore()
const searchInputRef = ref()
const searchCity = ref(statusStore.city.code)
const showKnowledgeGraph = ref(false)
const maxPage = ref(0)
const searchState = ref<JobSearchFormType>({
  keyword: '',
  city: statusStore.city.code[1],
  current: 1,
  pageSize: 10,
  sortField: '',
  sortOrder: '',
})
const jobFilterData = ref<JobFilterType>({
  jobStandardId: null,
  jobType: 0,
  experience: 0,
  salary: 0,
})
const hotCities = ref<CityItemType[]>([])
const knowledgeGraphData = ref<GraphData>()

const searchJobList = ref<SimpleJobItemType[]>([])

async function getSearchResult() {
  searchState.value.city = searchCity.value[1]
  searchState.value = { ...searchState.value, ...jobFilterData.value }
  const res = await jobSearchApi(searchState.value)
  if (!res) return
  if (searchState.value.keyword || searchState.value.jobStandardId) {
    showKnowledgeGraph.value = true
  } else {
    showKnowledgeGraph.value = false
  }
  searchJobList.value = res?.records || []
  maxPage.value = res.pages
}

function submit() {
  router.push({
    path: '/company/search',
    query: {
      keyword: searchState.value.keyword,
      current: searchState.value.current,
      city: searchCity.value[1],
      jobStandardId: jobFilterData.value.jobStandardId,
      jobType: jobFilterData.value.jobType,
      experience: jobFilterData.value.experience,
      salary: jobFilterData.value.salary,
    },
  })
}

const jobFilterWatch = watch(
  jobFilterData,
  () => {
    // submit()
  },
  {
    immediate: true,
    deep: true,
  },
)
const routerPathWatch = watch(
  () => router.currentRoute.value.query,
  async (newVal) => {
    if (router.currentRoute.value.name !== 'jobSearch') return
    if (newVal?.keyword) {
      searchState.value.keyword = newVal?.keyword as string
    }
    if (newVal?.current) {
      searchState.value.current = Number(newVal?.current)
    }
    if (newVal?.city) {
      // @ts-ignore
      let fullPath = findFullLocation(Number(newVal?.city)) as CityItemType[]
      if (fullPath.length < 2) {
        fullPath = findFullLocation(statusStore.city.code[1]) as CityItemType[]
      }
      searchCity.value = [fullPath[0].code, fullPath[1].code]
    }
    if (newVal?.jobStandardId) {
      // jobFilterData.value.jobStandardId = findFullJobType(Number(newVal?.jobStandardId))
      jobFilterData.value.jobStandardId = Number(newVal?.jobStandardId)
    }
    if (newVal?.jobType) {
      jobFilterData.value.jobType = Number(newVal?.jobType)
    }
    if (newVal?.experience) {
      jobFilterData.value.experience = Number(newVal?.experience)
    }
    if (newVal?.salary) {
      jobFilterData.value.salary = Number(newVal?.salary)
    }
    await getSearchResult()
  },
  {
    immediate: true,
  },
)

function collapseSearchPanel() {
  // 当页面滚动超过55px时将job-detail__banner固定在顶部 添加collapse-banner类名 当页面滚动小于55px时移除collapse-banner类名
  const searchPanel = document.querySelector('.search-panel') as HTMLElement
  if (searchPanel) {
    if (window.scrollY > 55) {
      searchPanel.classList.add('collapse-search-panel')
    } else {
      searchPanel.classList.remove('collapse-search-panel')
    }
  }
}

onMounted(async () => {
  window.addEventListener('scroll', collapseSearchPanel)
  knowledgeGraphData.value = await getHomeKnowledgeGraphApi()
  hotCities.value = statusStore.hotCities
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
  jobFilterWatch()
  routerPathWatch()
})
</script>

<template>
  <div class="search-page">
    <!--<a-tour-->
    <!--  v-model:current="jobSearchPageGuideState.current"-->
    <!--  type="primary"-->
    <!--  :open="jobSearchPageGuideState.open"-->
    <!--  :steps="jobSearchPageGuideState.steps"-->
    <!--  @close="jobSearchPageGuideState.open = false"-->
    <!--/>-->
    <div class="search-panel">
      <div class="search-panel__inner">
        <div class="job-search-bar">
          <div class="title">搜索公司</div>
          <div class="search">
            <a-input-group compact size="large" style="display: flex">
              <i-location-selector class="location-selector" v-model:value="searchCity" add-nationwide />
              <a-input-search
                ref="searchInputRef"
                v-model:value="searchState.keyword"
                placeholder="请输入职位关键词"
                enter-button="搜索"
              />
            </a-input-group>
          </div>
        </div>
        <div class="city-list">
          <router-link
            v-for="c in hotCities"
            :key="c.code"
            :to="{ name: 'jobSearch', query: { ...$router.currentRoute.value.query, city: c.code } }"
            class="city"
          >
            {{ c.name }}
          </router-link>
          <router-link class="city" to="/job/search">其他城市</router-link>
        </div>
        <div class="filter-panel block-item">
          <job-search-filter v-model:job-filter-data="jobFilterData" />
        </div>
      </div>
    </div>

    <div class="company">
      <company-search-list
        v-if="searchJobList"
        :current-page="searchState.current"
        :max-page="maxPage"
        :search-job-list="searchJobList"
        class="block-item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.search-page {
  .collapse-search-panel {
    @apply sticky w-full z-10;
    top: 0 !important;
  }

  .search-panel {
    @apply sticky top-[55px] w-full mx-auto p-5 pb-10 z-10;
    transition: top 0.3s;
    @include useTheme {
      background-color: getModeVar('cardBgColor');
    }

    .search-panel__inner {
      @apply max-w-[var(--min-screen-width)] w-full mx-auto;
      .job-search-bar {
        @apply w-full;

        .title {
          @apply text-white text-3xl font-bold text-center mb-5;
          @include useTheme {
            color: getModeVar('textColor');
          }
        }

        .search {
          @apply w-full max-w-[var(--min-screen-width)] flex justify-center items-center;
        }
      }

      .city-list {
        @apply my-5 flex items-center justify-items-start;
        .city {
          @apply mx-2;
        }
      }
    }
  }

  .block-item {
    @apply mt-5;
  }

  .company {
    @apply flex justify-between max-w-[var(--min-screen-width)] w-full mx-auto mt-5;
  }
}
</style>
