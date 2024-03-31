import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatusStore = defineStore(
  'statusStore',
  () => {
    const city = ref({ name: '北京,北京', code: [101010000, 101010100] })
    return {
      city,
    }
  },
  {
    persist: true,
  },
)
