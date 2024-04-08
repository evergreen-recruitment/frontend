import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getIpAddressApi, type IpAddressType } from '@/apis/common'
import { getIndustryListApi, type IndustryListType } from '@/apis/industry'
import type { JobCategoryType } from '@/apis/job'
import { getJobCategoryApi } from '@/apis/job'
import { type CityItemType, getHotCitiesApi } from '@/apis/city'

export const useStatusStore = defineStore(
  'statusStore',
  () => {
    const city = ref<IpAddressType>({ name: '北京,北京', code: [101010000, 101010100] })
    const industryList = ref<IndustryListType[]>([])
    const jobCategory = ref<JobCategoryType[]>([])
    const hotCities = ref<CityItemType[]>([])

    async function getIpAddress() {
      city.value = await getIpAddressApi()
    }

    async function getIndustryList() {
      industryList.value = await getIndustryListApi()
    }

    async function getJobCategory() {
      jobCategory.value = await getJobCategoryApi()
    }

    async function getHotCities() {
      hotCities.value = await getHotCitiesApi()
    }

    async function init() {
      await Promise.all([getIpAddress(), getIndustryList(), getJobCategory(), getHotCities()])
    }

    return {
      city,
      industryList,
      jobCategory,
      hotCities,
      init,
      getIpAddress,
      getIndustryList,
      getJobCategory,
      getHotCities,
    }
  },
  {
    persist: true,
  },
)
