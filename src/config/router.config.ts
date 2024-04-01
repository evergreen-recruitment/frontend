import BasicLayout from '@/layouts/BasicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import EmpAuthLayout from '@/layouts/EmpAuthLayout.vue'
import i18n from '@/locales'

export const constantRouterMap = [
  {
    name: 'basicLayout',
    path: '/',
    redirect: '/home',
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
      {
        name: 'completeInfo',
        path: '/auth/completeInfo',
        meta: {
          title: '完善信息',
        },
        component: () => import('@/views/auth/completeInfo/index.vue'),
      },
      {
        name: 'uploadApplication',
        path: '/auth/uploadApplication',
        meta: {
          title: '上传简历',
        },
        component: () => import('@/views/auth/uploadApplication/index.vue'),
      },
    ],
  },
  {
    name: 'empAuthLayout',
    path: '/empAuth',
    component: EmpAuthLayout,
    redirect: '/empAuth/login',
    hidden: true,
    children: [
      {
        name: 'empLogin',
        path: '/empAuth/login',
        meta: {
          title: '招聘者登录',
        },
        component: () => import('@/views/empAuth/login/index.vue'),
      },
      {
        name: 'empRegister',
        path: '/empAuth/register',
        meta: {
          title: '招聘者注册',
        },
        component: () => import('@/views/empAuth/register/index.vue'),
      },
      {
        name: 'empForget',
        path: '/empAuth/forget',
        meta: {
          title: '招聘者忘记密码',
        },
        component: () => import('@/views/empAuth/forget/index.vue'),
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
  width?: number
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
      name: i18n.global?.t('menu.home'),
      path: '/home',
      meta: {
        icon: 'HomeOutlined',
        title: '首页',
      },
      component: () => import('@/views/home/index.vue'),
    },
    {
      name: 'search',
      path: '/search',
      meta: {
        icon: 'SearchOutlined',
        title: '搜索',
        width: 1280,
      },
      component: () => import('@/views/search/index.vue'),
    },
    {
      name: 'company',
      path: '/company',
      meta: {
        icon: 'BankOutlined',
        title: '公司',
        width: 1280,
      },
      component: () => import('@/views/company/index.vue'),
    },
    {
      name: 'jobDetail',
      path: '/jobDetail/:id(\\d+)',
      meta: {
        icon: 'ToolOutlined',
        title: '工作详情',
      },
      component: () => import('@/views/jobDetail/index.vue'),
    },
    {
      name: i18n.global?.t('menu.userCenter'),
      path: '/userCenter',
      meta: {
        icon: 'UserOutlined',
        title: '个人中心',
        requireAuth: true,
        width: 1280,
      },
      component: () => import('@/views/user/center/index.vue'),
    },
    {
      name: 'delivery',
      path: '/delivery',
      meta: {
        icon: 'UserOutlined',
        title: '投递信息',
        requireAuth: true,
        width: 1280,
      },
      component: () => import('@/views/user/delivery/index.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      meta: {
        icon: 'SettingOutlined',
        title: '设置',
        requireAuth: true,
        width: 1280,
      },
      component: () => import('@/views/settings/index.vue'),
    },
  ]
}
