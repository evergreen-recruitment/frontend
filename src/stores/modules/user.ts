import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAssetsFile } from '@/utils/utils'
import { logoutApi } from '@/apis/auth'

export type UserInfo = {
  userId?: string
  avatar?: string
  userAccount?: string
  realName?: string
  phone?: string
  email?: string
  gender?: number
  age?: number
  address?: string
  applyStatus?: number
  createTime?: string
}

export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref<string>('')
    const userInfo = ref<UserInfo>({
      userId: '1774709828510330882',
      avatar: '' || getAssetsFile('images/default_avatar.png'),
      realName: '何嘉炜',
      userAccount: 'admin',
      phone: '153****4973',
      email: 'pepedd@qq.com',
      gender: 1,
      age: 20,
      address: '江西省南昌市',
      applyStatus: 1,
      createTime: '2024-04-01 16:06:10',
    })

    async function logout() {
      token.value = ''
      userInfo.value = {}
      await logoutApi()
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
