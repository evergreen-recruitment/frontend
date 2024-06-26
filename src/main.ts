// @ts-nocheck
import '@/styles/style.scss'
import '@/styles/common.scss'
// 通过禁用tailwindcss默认的preflight.css来解决样式冲突问题
// import '@/styles/preflight.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import VueCookies from 'vue3-cookies'
// 引入andv icon
import * as Icons from '@ant-design/icons-vue'
import Icon from '@/components/Icon/Icon.vue'
import router from '@/router'
import '@/router/permission'
import pinia from '@/stores'
import i18n from '@/locales'
// 自定义指令
import VSlideIn from '@/directives/vSlideIn'
import VLazyLoad from '@/directives/vLazyLoad'
import VScroll from '@/directives/vScroll'
// 过渡动画
import VueTransitions from '@morev/vue-transitions'
import '@morev/vue-transitions/styles'
// monaco editor
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

// 高德地图
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'

// 初始化vue-amap
initAMapApiLoader({
  // 高德的key
  key: '410807074b37e182410b296f03e67c2a',
  securityJsCode: '180c94c4fba4aae49383fef2161ab6a1', // 新版key需要配合安全密钥使用
})

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.use(VueCookies)
app.use(VueTransitions, {
  // Plugin options (optional, described below)
})
app.use(VueMonacoEditorPlugin, {
  paths: {
    // The recommended CDN config
    vs: 'https://cdn.staticfile.net/monaco-editor/0.45.0/min/vs',
  },
})
app.component(Icon)
// 注册全局图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})
app.directive('slide-in', VSlideIn)
app.directive('lazy-load', VLazyLoad)
app.directive('scroll', VScroll)
app.mount('#app')
