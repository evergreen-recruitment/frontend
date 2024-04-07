import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getIpAddressApi, type IpAddressType } from '@/apis/common'
import { getIndustryListApi, type IndustryListType } from '@/apis/industry'

export const useStatusStore = defineStore(
  'statusStore',
  () => {
    const city = ref<IpAddressType>({ name: '北京,北京', code: [101010000, 101010100] })
    const industryList = ref<IndustryListType[]>([])

    async function getAddress() {
      city.value = await getIpAddressApi()
    }

    async function getIndustryList() {
      industryList.value = await getIndustryListApi()
    }

    return {
      city,
      industryList,
      getAddress,
      getIndustryList,
    }
  },
  {
    persist: true,
  },
)
