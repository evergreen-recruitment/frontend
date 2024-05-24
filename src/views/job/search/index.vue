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
import { jobSearchPageGuideState } from '@/tours'

const statusStore = useStatusStore()
const searchInputRef = ref()
const searchCity = ref(statusStore.city.code)
const showKnowledgeGraph = ref(false)
const maxPage = ref(0)
const searchBarState = ref({
  value: '',
  focus: false,
  hover: false,
})
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
  searchState.value.city = searchCity.value[1]
  searchState.value = { ...searchState.value, ...jobFilterData.value }
  const res = await jobSearchApi(searchState.value)
  if (!res) {
    return
  }
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
    path: '/job/search',
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
    submit()
  },
  {
    immediate: true,
    deep: true,
  },
)
const routerPathWatch = watch(
  () => router.currentRoute.value.query,
  async (newVal) => {
    if (router.currentRoute.value.name !== 'jobSearch') {
      return
    }
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
  window.removeEventListener('scroll', collapseSearchPanel)
  jobFilterWatch()
  routerPathWatch()
})
</script>

<template>
  <div class="search-page">
    <a-tour
      v-model:current="jobSearchPageGuideState.current"
      type="primary"
      :open="jobSearchPageGuideState.open"
      :steps="jobSearchPageGuideState.steps"
      @close="jobSearchPageGuideState.open = false"
    />
    <div class="search-panel card">
      <div class="search-panel__inner">
        <div class="job-search-bar">
          <div class="title">搜索岗位</div>
          <div
            :class="[
              'search-bar',
              searchBarState.focus ? 'search-bar-focus' : '',
              searchBarState.hover ? 'search-bar-hover' : '',
            ]"
          >
            <div class="left-icon">
              <i-location-selector
                class="location-selector"
                v-model:value="searchCity"
                :change="submit"
                add-nationwide
              />
            </div>
            <a-input
              ref="searchInputRef"
              v-model:value="searchState.keyword"
              placeholder="请输入职位关键词"
              @focus="searchBarState.focus = true"
              @blur="searchBarState.focus = false"
              @mouseenter="searchBarState.hover = true"
              @mouseleave="searchBarState.hover = false"
              @press-enter="submit"
            />
            <div class="right-icon" @click="submit">
              <Icon icon="SearchOutlined" :size="22" />
            </div>
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

    <div class="job">
      <job-search-list
        v-if="searchJobList"
        :current-page="searchState.current"
        :max-page="maxPage"
        :search-job-list="searchJobList"
        class="job-l block-item"
      />
      <div class="job-side block-item">
        <div class="graph-cot card">
          <knowledge-graph
            v-if="showKnowledgeGraph && knowledgeGraphData"
            :data="knowledgeGraphData"
            :zoom="0.5"
            class="graph"
          />
          <div v-else class="not-keyword">
            未输入关键词或选择职位类别
            <a-button type="primary" style="margin-top: 10px" @click="searchInputRef.focus()">输入关键词</a-button>
          </div>
        </div>
        <div class="other-search card">
          <div class="title">相关搜索</div>
          <div class="search-list">
            <i-navigator
              v-for="item in similarSearch"
              :key="item"
              :to="{ name: 'jobSearch', query: { keyword: item } }"
              class="search-item enter-y"
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
  // 公共属性
  .title {
    @apply text-lg font-bold;
  }

  .collapse-search-panel {
    @apply sticky w-full z-10;
    top: 0 !important;
  }

  .search-panel {
    @apply sticky top-[55px] w-full mx-auto p-5 pb-10 z-10 box-border;
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

        @include useTheme {
          .search-bar-hover {
            box-shadow: 0 0 0 0.15vw rgba(getColor('primary'), 0.186) !important;
          }

          .search-bar-focus {
            box-shadow: 0 0 0 0.15vw getColor('primary') !important;
            transform: scale(1.01);
          }
        }

        .search-bar {
          @apply flex pl-2 pr-2 justify-between items-center;
          border-radius: calc(var(--border-radius) * 1.2);
          transition: 0.4s;
          @include useTheme {
            box-shadow: 0 0 0 0.1vw rgba(getModeVar('textColor'), 0.186);
            background-color: getModeVar('cardBgColor');
          }

          .ant-input {
            @apply text-lg outline-none border-0 shadow-none font-medium;
          }

          .left-icon {
            @apply flex items-center justify-center cursor-pointer;
            :deep(.ant-select-selector) {
              border: none;
            }
          }

          .right-icon {
            @apply flex items-center justify-center cursor-pointer;
            @include useTheme {
              color: rgba(getModeVar('textColor'), 0.5);
            }
          }
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

  .job {
    @apply flex justify-between w-full max-w-[min(100%,var(--min-screen-width))] mx-auto mt-1;

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

      .graph-cot {
        @apply flex items-center justify-center;
        .not-keyword {
          @apply flex flex-col items-center justify-center text-lg font-bold;
        }
      }

      .other-search {
        @apply shadow-lg box-border px-2 py-3;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
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
