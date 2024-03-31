// 路由守卫 如果没有token并且不在白名单中则跳转到登录页
import router from '@/router'
import { nextTick } from 'vue'
import { useUserStore } from '@/stores'
// 加载进度条
import NProgress from 'nprogress' // 进度条
import '@/components/NProgress/nprogress.scss' // 进度条自定义样式

NProgress.configure({ showSpinner: false }) // 进度条配置

let userStore: any = null

nextTick(() => (userStore = useUserStore()))

router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.requireAuth) {
    if (userStore.token) {
      next()
    } else {
      next({
        path: '/auth/login',
        // 在login中使用redirect参数跳转到登录前的页面
        query: { redirect: to.fullPath },
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
