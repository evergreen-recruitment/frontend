<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import router from '@/router'
import { type CityItemType } from '@/apis/city'
import { useStatusStore } from '@/stores'
import { findFullLocation } from '@/utils/utils'
import type { CompanyFilterType, CompanySearchFormType, SimpleCompanyType } from '@/apis/company'
import { companySearchApi } from '@/apis/company'

const statusStore = useStatusStore()
const searchInputRef = ref()
const searchCity = ref(statusStore.city.code)
const maxPage = ref(0)
const searchBarState = ref({
  value: '',
  focus: false,
  hover: false,
})
const searchState = ref<CompanySearchFormType>({
  keyword: '',
  city: statusStore.city.code[1],
  current: 1,
  pageSize: 24,
  sortField: '',
  sortOrder: '',
})
const companyFilterData = ref<CompanyFilterType>({
  industryId: null,
  scaleId: null,
  stageId: null,
  jobNumSort: null,
  employeeNumSort: null,
})
const hotCities = ref<CityItemType[]>([])
const searchCompanyList = ref<SimpleCompanyType[]>([])

async function getSearchResult() {
  searchState.value.city = searchCity.value[1]
  searchState.value = { ...searchState.value, ...companyFilterData.value }
  const res = await companySearchApi(searchState.value)
  if (!res) {
    return
  }
  searchCompanyList.value = res?.records || []
  maxPage.value = res.pages
}

function submit() {
  router.push({
    path: '/company/search',
    query: {
      keyword: searchState.value.keyword,
      current: searchState.value.current,
      city: searchCity.value[1],
      industryId: companyFilterData.value.industryId,
      scaleId: companyFilterData.value.scaleId,
      stageId: companyFilterData.value.stageId,
      jobNumSort: companyFilterData.value.jobNumSort,
      employeeNumSort: companyFilterData.value.employeeNumSort,
    },
  })
}

const companyFilterWatch = watch(
  companyFilterData,
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
    if (router.currentRoute.value.name !== 'companySearch') {
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
    if (newVal?.industryId) {
      // jobFilterData.value.jobStandardId = findFullJobType(Number(newVal?.jobStandardId))
      companyFilterData.value.industryId = Number(newVal?.industryId)
    }
    if (newVal?.scaleId) {
      companyFilterData.value.scaleId = Number(newVal?.scaleId)
    }
    if (newVal?.stageId) {
      companyFilterData.value.stageId = Number(newVal?.stageId)
    }
    if (newVal?.jobNumSort) {
      companyFilterData.value.jobNumSort = Number(newVal?.jobNumSort)
    }
    if (newVal?.employeeNumSort) {
      companyFilterData.value.employeeNumSort = Number(newVal?.employeeNumSort)
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
  hotCities.value = statusStore.hotCities
})
onUnmounted(() => {
  window.removeEventListener('scroll', collapseSearchPanel)
  companyFilterWatch()
  routerPathWatch()
})
</script>

<template>
  <div class="search-page">
    <div class="search-panel">
      <div class="search-panel__inner">
        <div class="company-search-bar">
          <div class="title">搜索公司</div>
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
            :to="{ name: 'companySearch', query: { ...$router.currentRoute.value.query, city: c.code } }"
            class="city"
          >
            {{ c.name }}
          </router-link>
          <router-link class="city" to="/company/search">其他城市</router-link>
        </div>
        <div class="filter-panel block-item">
          <company-search-filter v-model:company-filter-data="companyFilterData" />
        </div>
      </div>
    </div>

    <div class="company">
      <company-search-list
        class="block-item"
        v-if="searchCompanyList"
        :current-page="searchState.current"
        :max-page="maxPage"
        :search-company-list="searchCompanyList"
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
    @apply sticky top-[55px] w-full mx-auto p-5 pb-10 z-10 box-border;
    transition: top 0.3s;
    @include useTheme {
      background-color: getModeVar('cardBgColor');
    }

    .search-panel__inner {
      @apply max-w-[var(--min-screen-width)] w-full mx-auto;
      .company-search-bar {
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

  .company {
    @apply flex justify-between w-full max-w-[min(100%,var(--min-screen-width))] mx-auto mt-5;
  }
}
</style>
