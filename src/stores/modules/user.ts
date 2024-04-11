import { defineStore } from 'pinia'
import { ref } from 'vue'
import { logoutApi } from '@/apis/auth'
import { useCookies } from 'vue3-cookies'
import type { UserInfoType } from '@/apis/user'
import { getUserInfoApi } from '@/apis/user'
import { getCookieStorage } from '@/stores'

const { cookies } = useCookies()

const expiresTime = 60 * 30 // 自定义过期时间 30 分钟
const cookieStorage = getCookieStorage(cookies, expiresTime)
export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref<string>('')
    const userInfo = ref<UserInfoType>({})

    async function getUserInfo() {
      token.value = cookies.get('satoken') || ''
      cookies.set('satoken', token.value, expiresTime)
      userInfo.value = await getUserInfoApi()
    }

    async function logout() {
      token.value = ''
      userInfo.value = {}
      cookies.remove('satoken')
      await logoutApi()
    }

    return {
      token,
      userInfo,
      getUserInfo,
      logout,
    }
  },
  {
    persist: {
      storage: cookieStorage,
      debug: true,
    },
  },
)
