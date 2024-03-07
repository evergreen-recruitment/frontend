// @ts-nocheck
import { createMemoryHistory, createRouter, createWebHistory, useRouter } from 'vue-router'
import { ref } from 'vue'
import { constantRouterMap, getAsyncRouterMap, type IRouter } from '@/config/router.config'

export const asyncRouterMap = ref<IRouter[]>([])

// 将异步路由添加到路由表
export function syncAsyncRoute() {
  const router = useRouter()
  asyncRouterMap.value = getAsyncRouterMap()
  if (router?.getRoutes() === undefined) {
    // 将asyncRouterMap添加到constantRouterMap的baseLayout的children中
    asyncRouterMap.value.forEach((item) => {
      constantRouterMap[0].children.push(item)
    })
  } else {
    // 更新路由
    // 1. 删除原有路由
    constantRouterMap[0].children.forEach((item) => {
      router?.removeRoute(item.name)
    })
    // 1.1 删除basicLayout
    const basicLayout = router?.getRoutes().find((item) => item.name === 'basicLayout')
    basicLayout.children = []
    router?.removeRoute(constantRouterMap[0].name)
    // console.log(router?.getRoutes())
    // 2. 添加新路由
    // 2.1 将asyncRouterMap添加到constantRouterMap的baseLayout的children中
    constantRouterMap[0].children = []
    asyncRouterMap.value.forEach((item) => {
      constantRouterMap[0].children.push(item)
    })
    // 2.2 添加新路由
    asyncRouterMap.value.forEach((item) => {
      router?.addRoute(item)
    })
    // 2.3 添加路由到basicLayout的children中
    asyncRouterMap.value.forEach((item) => {
      basicLayout?.children.push(item)
    })
    router?.addRoute(basicLayout)
  }
}

syncAsyncRoute()
export default createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: constantRouterMap,
})
