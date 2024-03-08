import { defineStore } from 'pinia'
import { ref } from 'vue'

export type UserInfo = {
  username?: string
  nickname?: string
  phone?: string
  email?: string
  createTime?: string
}

export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref<string>('')
    const userInfo = ref<UserInfo>({})
    const logout = () => {
      token.value = ''
      userInfo.value = {}
    }
    return {
      token,
      userInfo,
      logout,
    }
  },
  {
    persist: true,
  },
)
