import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

// @ts-ignore
export function getExpiredStorage(storage: Storage, expiresTime: string | number | Date) {
  return {
    getItem(key: string) {
      const itemStr = storage.getItem(key)
      if (!itemStr) {
        return null
      }
      // 读取的时候是字符串，需要转换为对象
      const item = JSON.parse(itemStr)
      const now = new Date()
      if (now.getTime() > item.expiry) {
        storage.removeItem(key)
        return null
      }
      // pinia 的持久化插件要求返回JSON字符串
      return JSON.stringify(item.value)
    },
    setItem(key: string, value: string) {
      const now = new Date()
      const item = {
        value: JSON.parse(value), // value是JSON字符串，需要转换为对象
        expiry: now.getTime() + Number(expiresTime) * 1000,
      }
      storage.setItem(key, JSON.stringify(item)) // 存储又要转为JSON字符串
    },
    removeItem(key: string) {
      storage.removeItem(key)
    },
    clear() {
      Object.keys(storage).forEach((key: string) => {
        storage.removeItem(key)
      })
    },
    key(index: number): string | null {
      const keys = Object.keys(storage)
      return keys[index] || null
    },
    length: Object.keys(storage).length,
  } as Storage
}

// 默认导出，给 main.ts 使用
export default pinia

export * from './modules/status'
export * from './modules/user'
export * from './modules/employee'
export * from './modules/app'
