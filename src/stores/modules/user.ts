import { defineStore } from 'pinia'
import { ref } from 'vue'
import { logoutApi } from '@/apis/auth'
import { useCookies } from 'vue3-cookies'
import type { UpdateUserInfoFormType, UserInfoType } from '@/apis/user'
import { getUserInfoApi, updateUserInfoApi } from '@/apis/user'
import { getExpiredStorage } from '@/stores'

const { cookies } = useCookies()

const expiresTime = 60 * 30 // 自定义过期时间 30 分钟
const expiredStorage = getExpiredStorage(localStorage, expiresTime)
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

    async function updateUserInfo(newUserInfo: UpdateUserInfoFormType) {
      const res = await updateUserInfoApi(newUserInfo)
      console.log(res)
      if (res === true) {
        await getUserInfo()
      }
      console.log(userInfo.value)
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
      updateUserInfo,
      logout,
    }
  },
  {
    persist: {
      storage: expiredStorage,
      debug: true,
    },
  },
)
