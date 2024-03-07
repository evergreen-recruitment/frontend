import { createAlova } from 'alova'
import { nextTick } from 'vue'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { useUserStore } from '@/stores'
import router from '@/router/index'
import { message } from 'ant-design-vue'

let userStore: any
nextTick(() => {
  userStore = useUserStore()
})

let baseURL
const useProxy = false // 使用VITE的代理
const useMock = true // 使用mock数据
if (import.meta.env.MODE === 'development' && useMock) {
  baseURL = import.meta.env.VITE_API_MOCK
} else if (import.meta.env.MODE === 'development' && useProxy) {
  baseURL = import.meta.env.VITE_API_PREFIX
} else {
  // TODO 发布时使用这行，开发时使用VITE的代理
  // baseURL = import.meta.env.VITE_API_URL // TODO 现在暂时用MOCK
  baseURL = import.meta.env.VITE_API_MOCK
}

const errCode = {
  401: '登录失效，请重新登录',
  403: '没有权限',
  404: '请求地址错误',
  500: '服务器错误',
}

// 创建alova实例
const request = createAlova({
  baseURL,
  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,
  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),
  // 全局请求拦截器
  beforeRequest(method: any) {
    if (method.config.ignoreToken) {
      return
    }
    if (!userStore.token) {
      message.error('请先登录')
      router.push('/login')
      return
    }
    method.config.headers['satoken'] = `${userStore.token}`
  },
  // 全局的响应拦截器
  responded: {
    onSuccess: async (response, method) => {
      let json
      try {
        json = await response.json()
      } catch (e) {
        message.error('序列化失败')
        throw new Error('序列化失败')
      }
      const msg = json?.msg || errCode[json?.code as keyof typeof errCode]
      if (json.code !== 200) {
        if (json.code === 401) {
          userStore.logout()
          router.push('/login')
        }
        if (msg) {
          message.error(msg)
          throw new Error(msg)
        }
      }
      if (msg) {
        message.success(msg)
      }
      return json.data || json
    },
    onError: async (error, method) => {
      message.error(error.message)
    },
  },
})

export default request
