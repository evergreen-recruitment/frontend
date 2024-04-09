import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

// @ts-ignore
export function getCookieStorage(cookies, expiresTime: string | number | Date) {
  return {
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
      cookies.keys().forEach((key: any) => {
        cookies.remove(key)
      })
    },
    key(index: number): string | null {
      return cookies.keys()[index] || null
    },
    length: cookies.keys().length,
  } as Storage
}

// 默认导出，给 main.ts 使用
export default pinia

export * from './modules/status'
export * from './modules/user'
export * from './modules/employee'
export * from './modules/app'
