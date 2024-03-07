// @ts-nocheck
import '@/styles/style.scss'
import '@/styles/common.scss'
import { createApp } from 'vue'
import App from '@/App.vue'
// 引入andv icon
import * as Icons from '@ant-design/icons-vue'
import Icon from '@/components/Icon/Icon.vue'
import router from '@/router'
import '@/router/permission'
import pinia from '@/stores'
import i18n from '@/locales'
// 过渡动画
import VueTransitions from '@morev/vue-transitions'
import '@morev/vue-transitions/styles'
// monaco editor
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
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

app.mount('#app')
