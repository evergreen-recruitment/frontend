import { defineStore } from 'pinia'
import { ref } from 'vue'
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

    const userState = ref({
      isLogin: false,
      isCompleteInfo: false,
      isUploadApplication: false,
    })

    async function getUserState() {
      userState.value.isLogin = !!token.value
      if (!userState.value.isLogin) {
        userState.value.isCompleteInfo = false
        userState.value.isUploadApplication = false
        return
      }
      userState.value.isCompleteInfo = await isCompleteUserInfoApi()
      userState.value.isUploadApplication = await isUploadApplicationApi()
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
      await getUserState()
    }

    return {
      token,
      isGuide,
      userInfo,
      userState,
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
