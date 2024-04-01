import { defineStore } from 'pinia'
import { ref } from 'vue'

export type UserInfo = {
  avatar?: string
  userAccount?: string
  realName?: string
  phone?: string
  email?: string
  gender?: string
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
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      realName: '张三',
      userAccount: 'admin',
      phone: '153****4973',
      email: 'pepedd@qq.com',
      gender: '男',
      age: 20,
      address: '浙江省杭州市西湖区',
      applyStatus: 1,
      createTime: '2021-08-01 12:00:00',
    })
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
