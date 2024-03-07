//@ts-nocheck
import enUS from './langs/en'
import zhCN from './langs/zh'
import { createI18n } from 'vue-i18n'

const messages = {
  enUS,
  zhCN,
}

const i18n = createI18n({
  locale: 'enUS',
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages,
})

export default i18n
