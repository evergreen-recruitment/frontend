import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getIpAddressApi, type IpAddressType } from '@/apis/common'

export const useStatusStore = defineStore(
  'statusStore',
  () => {
    const city = ref<IpAddressType>({ name: '北京,北京', code: [101010000, 101010100] })

    async function getAddress() {
      city.value = await getIpAddressApi()
    }
    return {
      city,
      getAddress,
    }
  },
  {
    persist: true,
  },
)
