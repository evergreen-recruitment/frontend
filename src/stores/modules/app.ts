import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { theme } from 'ant-design-vue'
import type { primaryColorEnumType } from '@/config/theme.config'
import variables from '@/styles/variables.module.scss'
import { useI18n } from 'vue-i18n'
import router, { syncAsyncRoute } from '@/router'

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
    const darkModeRef = ref<'auto' | 'dark' | 'light'>('light')
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

    // 设置是否显示卡片边框
    const showCardBorder = ref(true)
    const showCardBorderComp = computed({
      get() {
        document.documentElement.style.setProperty('--show-border-op', showCardBorder.value ? '0.5' : '0')
        return showCardBorder.value
      },
      set(val) {
        showCardBorder.value = val
        document.documentElement.style.setProperty('--show-border-op', val ? '0.5' : '0')
      },
    })

    // 设置最小屏幕宽度
    const minScreenWidth = ref(1280)
    const minScreenWidthComp = computed({
      get() {
        return minScreenWidth.value
      },
      set(val) {
        document.documentElement.style.setProperty('--min-screen-width', `${val}px`)
        minScreenWidth.value = val
      },
    })

    function setBodyZoom() {
      const body = document.body as HTMLBodyElement
      const screenWidth = window.innerWidth || document.documentElement.clientWidth
      document.documentElement.style.setProperty(
        '--screen-width',
        `${screenWidth}
        px`,
      )

      // zoom 不是标准的CSS, 不建议使用，但是兼容性还行
      const exceptRoutes = ['/auth', '/empAuth', '/emp', '404']
      // 遍历设置
      for (const route of exceptRoutes) {
        if (router.currentRoute.value.path.includes(route)) {
          // @ts-ignore
          body.style.zoom = '1'
          return
        }
      }

      if (screenWidth < minScreenWidthComp.value) {
        const zoomValue = (screenWidth / minScreenWidthComp.value) * 100
        // @ts-ignore
        body.style.zoom = `${zoomValue}% `
      } else {
        // @ts-ignore
        body.style.zoom = '100%'
      }
    }

    setBodyZoom()
    window.addEventListener('resize', setBodyZoom)
    watch(router.currentRoute, () => {
      setBodyZoom()
    })

    // 设置Token过期时间
    const tokenExpires = ref(1) // 1小时

    // 设置岗位是否通过新窗口打开
    const openInNewWindow = ref(true)

    return {
      themeName,
      locale,
      localeComp,
      borderRadius,
      themeConfig,
      darkModeRef, // 用于持久化 可怜的computed无法持久化
      darkMode,
      showCardBorder,
      showCardBorderComp,
      minScreenWidth,
      minScreenWidthComp,
      tokenExpires,
      openInNewWindow,
    }
  },
  {
    persist: false,
  },
)
