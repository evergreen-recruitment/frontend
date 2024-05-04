<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'
import CompanyCard from '@/components/CompanyCard/CompanyCard.vue'
import type { SimpleCompanyType } from '@/apis/company'

const props = defineProps<{
  searchCompanyList: SimpleCompanyType[]
  currentPage: number
  maxPage: number
}>()
const companyListRef = ref<HTMLElement | null>(null)
const current = ref(props.currentPage)

function toSearch() {
  router.push({
    name: 'companySearch',
    query: {
      ...router.currentRoute.value.query,
      current: current.value,
    },
  })
}
</script>

<template>
  <div class="company-list-outer">
    <search-pagination
      :container-ref="companyListRef"
      v-model:current-page="current"
      :max-page="maxPage"
      @search="toSearch"
    />
    <div class="company-list" ref="companyListRef">
      <company-card
        v-slide-in="{ enter: true }"
        v-for="company in searchCompanyList"
        :key="company.id"
        :company="company"
        class=""
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.company-list-outer {
  @apply w-full;
  :deep(.ant-input-number) {
    width: 100% !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;

    input {
      text-align: center !important;
      padding: 0 !important;
      font-size: 10px;
    }
  }

  .company-list {
    @apply box-border grid gap-[15px] w-[calc(100%-1rem)] max-w-[min(100%,var(--min-screen-width))] mx-auto;
    --card-width: 17.5rem;
    --card-height: 10rem;
    grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
  }
}
</style>
