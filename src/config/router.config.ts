import BasicLayout from '@/layouts/BasicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import i18n from '@/locales'

export const constantRouterMap = [
  {
    name: 'basicLayout',
    path: '/',
    redirect: '/dashboard',
    component: BasicLayout,
    children: [],
  },
  {
    name: 'authLayout',
    path: '/auth',
    component: AuthLayout,
    redirect: '/auth/loginByCaptcha',
    hidden: true,
    children: [
      {
        name: 'login',
        path: '/auth/login',
        redirect: '/auth/loginByCaptcha',
      },
      {
        name: 'loginByCaptcha',
        path: '/auth/loginByCaptcha',
        meta: {
          title: '登录',
        },
        component: () => import('@/views/auth/loginByCaptcha/index.vue'),
      },
      {
        name: 'loginByPassword',
        path: '/auth/loginByPassword',
        meta: {
          title: '登录',
        },
        component: () => import('@/views/auth/loginByPassword/index.vue'),
      },
      {
        name: 'forgetPassword',
        path: '/auth/forgetPassword',
        meta: {
          title: '忘记密码',
        },
        component: () => import('@/views/auth/forgetPassword/index.vue'),
      },
    ],
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    hidden: true,
    meta: {
      title: '404',
    },
    component: () => import('@/views/exception/404.vue'),
  },
]

export interface IRouterMeta {
  icon: string
  title: string
  requireAuth?: boolean
  hidden?: boolean
  roles?: string[]
}

export interface IRouter {
  name: string
  path: string
  meta: IRouterMeta
  component?: any
  children?: IRouter[]
}

export function getAsyncRouterMap(): IRouter[] {
  return [
    {
      name: i18n.global?.t('menu.dashboard'),
      path: '/dashboard',
      meta: {
        icon: 'HomeOutlined',
        title: '首页',
        requireAuth: true,
      },
      component: () => import('@/views/dashboard/index.vue'),
    },
    {
      name: i18n.global?.t('menu.userCenter'),
      path: '/userCenter',
      meta: {
        icon: 'UserOutlined',
        title: '个人中心',
        requireAuth: true,
      },
      component: () => import('@/views/user/center/index.vue'),
    },
    {
      name: i18n.global?.t('menu.tools'),
      path: '/tools',
      meta: {
        icon: 'AppstoreOutlined',
        title: '工具',
        requireAuth: true,
      },
      children: [
        {
          name: '图表',
          path: '/charts',
          meta: {
            icon: 'BarChartOutlined',
            title: '图表',
            requireAuth: true,
          },
          component: () => import('@/views/tools/charts/index.vue'),
        },
        {
          name: '编辑器',
          path: '/editor',
          meta: {
            icon: 'FontSizeOutlined',
            title: '编辑器',
            requireAuth: true,
          },
          component: () => import('@/views/tools/editor/index.vue'),
        },
        {
          name: '大屏',
          path: '/largeScreen',
          meta: {
            icon: 'DesktopOutlined',
            title: '大屏',
            requireAuth: true,
          },
          component: () => import('@/views/tools/largeScreen/index.vue'),
        },
      ],
    },
  ]
}
