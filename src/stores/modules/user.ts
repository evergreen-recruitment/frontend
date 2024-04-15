import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { isCompleteUserInfoApi, logoutApi } from '@/apis/auth'
import { useCookies } from 'vue3-cookies'
import type { UpdateUserInfoFormType, UserInfoType } from '@/apis/user'
import { getUserInfoApi, isUploadApplicationApi, updateUserInfoApi } from '@/apis/user'
import { getExpiredStorage } from '@/stores'

const { cookies } = useCookies()

const expiresTime = 60 * 30 // 自定义过期时间 30 分钟
const expiredStorage = getExpiredStorage(localStorage, expiresTime)
export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref<string>('')
    const isGuide = ref<{
      homePage?: boolean
      jobSearchPage?: boolean
      jobDetailPage?: boolean
    }>({
      homePage: false,
      jobSearchPage: false,
      jobDetailPage: false,
    })
    const userInfo = ref<UserInfoType>({})
    const getUserState = function () {
      return {
        isLogin: computed(() => !!token.value),
        isCompleteInfo: computed(() => {
          if (token.value !== undefined && token.value !== '') {
            return new Promise((resolve) => {
              const isComplete = isCompleteUserInfoApi().then((res) => {
                return res
              })
              resolve(isComplete)
            }) as Promise<boolean>
          } else {
            return Promise.resolve(false)
          }
        }),
        isUploadApplication: computed(() => {
          if (token.value !== undefined && token.value !== '') {
            return new Promise((resolve) => {
              const isUpload = isUploadApplicationApi().then((res) => {
                return res
              })
              resolve(isUpload)
            }) as Promise<boolean>
          } else {
            return Promise.resolve(false)
          }
        }),
      }
    }

    async function getUserInfo() {
      token.value = cookies.get('satoken') || ''
      cookies.set('satoken', token.value, expiresTime)
      userInfo.value = await getUserInfoApi()
    }

    async function updateUserInfo(newUserInfo: UpdateUserInfoFormType) {
      const res = await updateUserInfoApi(newUserInfo)
      if (res === true) {
        await getUserInfo()
      }
    }

    async function logout() {
      token.value = ''
      isGuide.value = {}
      userInfo.value = {}
      cookies.remove('satoken')
      await logoutApi()
    }

    return {
      token,
      isGuide,
      userInfo,
      getUserState,
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
