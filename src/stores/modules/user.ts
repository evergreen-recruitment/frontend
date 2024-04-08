import { defineStore } from 'pinia'
import { ref } from 'vue'
import { logoutApi } from '@/apis/auth'
import { useCookies } from 'vue3-cookies'
import type { UserInfoType } from '@/apis/user'

const { cookies } = useCookies()

const expiresTime = 60 * 30 // 自定义过期时间 30 分钟

const cookieStorage: Storage = {
  getItem(key: string) {
    // pinia 的持久化插件要求返回字符串
    return JSON.stringify(cookies.get(key))
  },
  setItem(key: string, value: string) {
    console.log('cookies.set(key, value)', key, value)
    cookies.set(key, value, expiresTime)
  },
  removeItem(key: string) {
    cookies.remove(key)
  },
  clear() {
    cookies.keys().forEach((key) => {
      cookies.remove(key)
    })
  },
  key(index: number): string | null {
    return cookies.keys()[index] || null
  },
  length: cookies.keys().length,
}

export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref<string>('')
    const userInfo = ref<UserInfoType>({})

    async function logout() {
      token.value = ''
      userInfo.value = {}
      cookies.remove('satoken')
      await logoutApi()
    }

    return {
      token,
      userInfo,
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
