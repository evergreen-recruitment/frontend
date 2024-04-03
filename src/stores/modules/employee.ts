import { defineStore } from 'pinia'
import { ref } from 'vue'

export type EmpInfo = {
  userId?: string
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

export const useEmpStore = defineStore(
  'empStore',
  () => {
    const token = ref<string>('')
    const empInfo = ref<EmpInfo>({
      userId: '1774709828510330882',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      realName: '何嘉炜',
      userAccount: 'admin',
      phone: '153****4973',
      email: 'pepedd@qq.com',
      gender: '男',
      age: 20,
      address: '江西省南昌市',
      applyStatus: 1,
      createTime: '2024-04-01 16:06:10',
    })
    const logout = () => {
      token.value = ''
      empInfo.value = {}
    }
    return {
      token,
      empInfo,
      logout,
    }
  },
  {
    persist: true,
  },
)
