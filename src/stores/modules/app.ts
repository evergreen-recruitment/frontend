import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { theme } from 'ant-design-vue'
import type { primaryColorEnumType } from '@/config/theme.config'
import variables from '@/styles/variables.module.scss'
import { useI18n } from 'vue-i18n'
import { syncAsyncRoute } from '@/router'

/**
 * app 配置 开启持久化
 */
export const useAppStore = defineStore(
  'app',
  () => {
    // 语言
    const locale = ref<'zhCN' | 'enUS'>('zhCN')
    const localeComp = computed(() => {
      const { locale: iLocale } = useI18n()
      iLocale.value = locale.value
      document.documentElement.setAttribute('lang', locale.value.substring(0, 2))
      syncAsyncRoute()
      return locale.value
    })
    // 颜色模式
    const darkModeRef = ref<'auto' | 'dark' | 'light'>('auto')
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)') as MediaQueryList

    function handleDarkModeChange() {
      darkModeRef.value = darkModeQuery.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-dark', darkModeRef.value)
    }

    const darkMode = computed({
      get() {
        if (darkModeRef.value === 'auto') {
          document.documentElement.setAttribute('data-darkMode', 'auto')
          handleDarkModeChange()
          darkModeQuery.addEventListener('change', handleDarkModeChange)
        }
        return darkModeRef.value
      },
      set(val) {
        darkModeRef.value = val
        if (darkModeRef.value === 'auto') {
          document.documentElement.setAttribute('data-darkMode', 'auto')
        } else {
          document.documentElement.removeAttribute('data-darkMode')
          document.documentElement.setAttribute('data-dark', darkModeRef.value)
        }
        if (document.documentElement.getAttribute('data-darkMode') === 'auto') {
          handleDarkModeChange()
          darkModeQuery.addEventListener('change', handleDarkModeChange)
        } else {
          darkModeQuery.removeEventListener('change', handleDarkModeChange)
        }
      },
    })
    // 主题名称
    const themeName = ref<primaryColorEnumType>('origin')
    // 主题配置
    const borderRadius = ref(7)
    const themeConfig = computed(() => {
      document.documentElement.setAttribute('data-theme', themeName.value)
      document.documentElement.style.setProperty('--border-radius', borderRadius.value + 'px')
      // @ts-ignore
      return {
        token: {
          colorPrimary: variables[themeName.value] || '#27ba9b',
          colorSuccess: '#1dc779',
          colorWarning: '#ffb302',
          colorError: '#cf4444',
          colorInfo: variables[themeName.value] || '#27ba9b',
          wireframe: true,
          borderRadius: borderRadius, // 直角风格
        },
        algorithm: darkMode.value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }
    })
    return {
      themeName,
      locale,
      localeComp,
      borderRadius,
      themeConfig,
      darkModeRef, // 用于持久化 可怜的computed无法持久化
      darkMode,
    }
  },
  {
    persist: false,
  },
)
