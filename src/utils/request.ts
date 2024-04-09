import { createAlova, Method } from 'alova'
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
const useProxy = true // 使用 代理 代理将后端服务域名代理到前端 开发环境使用 vite进行代理 生产环境使用nginx代理
const useMock = false // 使用mock数据
if (import.meta.env.MODE === 'development' && useMock) {
  baseURL = import.meta.env.VITE_API_MOCK
} else if (import.meta.env.MODE === 'development' && useProxy) {
  baseURL = import.meta.env.VITE_API_PREFIX
} else if (import.meta.env.MODE === 'production' && useProxy) {
  baseURL = import.meta.env.VITE_API_PREFIX
} else {
  // TODO 发布时使用这行，开发时使用VITE的代理
  // baseURL = import.meta.env.VITE_API_URL // TODO 现在暂时用MOCK
  baseURL = import.meta.env.VITE_API_URL
}

const errCode = {
  40000: '请求参数错误',
  40001: '请求数据为空',
  40100: '未登录',
  40101: '无权限',
  40301: '访问屏蔽',
  50000: '系统内部异常',
}

// 创建alova实例
const request = createAlova({
  baseURL,
  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,
  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),
  // 全局请求拦截器
  beforeRequest(method: Method) {
    // 解决跨域cookie问题
    method.config.credentials = 'include'
    if (method.config.ignoreToken) {
      return
    }
    if (!userStore.token) {
      message.error('请先登录')
      router.push('/auth/login')
      return
    }
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
        if (json.code === 40100) {
          userStore.logout()
          router.push('/auth/login')
        }
        if (msg) {
          message.error(msg)
          throw new Error(msg)
        }
      }
      if (msg) {
        message.success(msg)
      }
      if (json.data == undefined) {
        return json
      }
      return json.data
    },
    onError: async (error, method) => {
      message.error(error.message)
    },
  },
})

const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
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

export { alovaInstance }

export default request
