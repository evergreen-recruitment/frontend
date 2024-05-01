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
  scaleId: -1,
  stageId: -1,
})
const hotCities = ref<CityItemType[]>([])
const searchCompanyList = ref<SimpleCompanyType[]>([])

async function getSearchResult() {
  searchState.value.city = searchCity.value[1]
  searchState.value = { ...searchState.value, ...companyFilterData.value }
  const res = await companySearchApi(searchState.value)
  if (!res) return
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
    if (router.currentRoute.value.name !== 'companySearch') return
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
        <div class="job-search-bar">
          <div class="title">搜索公司</div>
          <div class="search">
            <a-input-group compact size="large" style="display: flex">
              <i-location-selector
                class="location-selector"
                v-model:value="searchCity"
                :change="submit"
                add-nationwide
              />
              <a-input-search
                ref="searchInputRef"
                v-model:value="searchState.keyword"
                placeholder="请输入公司关键词"
                enter-button="搜索"
                @search="submit"
              />
            </a-input-group>
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
    @apply flex justify-between w-full max-w-[min(100%,var(--min-screen-width))] mx-auto mt-5;
  }
}
</style>
