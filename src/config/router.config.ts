import BasicLayout from '@/layouts/BasicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import EmpAuthLayout from '@/layouts/EmpAuthLayout.vue'
import EmpBasicLayout from '@/layouts/EmpBasicLayout.vue'
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
    name: 'empBasicLayout',
    path: '/emp',
    component: EmpBasicLayout,
    redirect: '/emp/home',
    hidden: true,
    children: [
      {
        name: '招聘者首页',
        path: '/emp/home',
        meta: {
          icon: 'ToolOutlined',
          title: '招聘者首页',
        },
        component: () => import('@/views/empViews/home/index.vue'),
      },
      {
        name: '发布岗位',
        path: '/emp/postJob',
        meta: {
          icon: 'ToolOutlined',
          title: '发布岗位',
        },
        component: () => import('@/views/empViews/home/index.vue'),
      },
      {
        name: '岗位数据',
        path: '/emp/jobData',
        meta: {
          icon: 'ToolOutlined',
          title: '岗位数据',
        },
        component: () => import('@/views/empViews/home/index.vue'),
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
  width?: string
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
        width: '100%',
      },
      component: () => import('@/views/home/index.vue'),
    },
    {
      name: 'recommend',
      path: '/recommend',
      meta: {
        icon: 'CompassOutlined',
        title: '推荐',
      },
      component: () => import('@/views/recommend/index.vue'),
    },
    {
      name: 'companySearch',
      path: '/company/search',
      meta: {
        icon: 'BankOutlined',
        title: '公司搜索',
      },
      component: () => import('@/views/company/search/index.vue'),
    },
    {
      name: 'companyDetail',
      path: '/company/detail',
      meta: {
        icon: 'BankOutlined',
        title: '公司详情',
      },
      component: () => import('@/views/company/detail/index.vue'),
    },
    {
      name: 'jobSearch',
      path: '/job/search',
      meta: {
        icon: 'SearchOutlined',
        title: '搜索',
      },
      component: () => import('@/views/job/search/index.vue'),
    },
    {
      name: 'jobDetail',
      path: '/job/detail',
      meta: {
        icon: 'ToolOutlined',
        title: '工作详情',
        width: '100%',
      },
      component: () => import('@/views/job/detail/index.vue'),
    },
    {
      name: 'user',
      path: '/user',
      meta: {
        icon: 'UserOutlined',
        title: '用户',
        requireAuth: true,
      },
      children: [
        {
          name: i18n.global?.t('menu.userCenter'),
          path: '/user/center',
          meta: {
            icon: 'UserOutlined',
            title: '个人中心',
            requireAuth: true,
          },
          component: () => import('@/views/user/center/index.vue'),
        },
        {
          name: 'application',
          path: '/user/application',
          meta: {
            icon: 'UserOutlined',
            title: '个人简历',
            requireAuth: true,
          },
          component: () => import('@/views/user/application/index.vue'),
        },
        {
          name: 'previewApplication',
          path: '/user/previewApplication',
          meta: {
            icon: 'UserOutlined',
            title: ' 预览在线简历',
            requireAuth: true,
          },
          component: () => import('@/views/user/previewApplication/index.vue'),
        },
        {
          name: 'delivery',
          path: '/user/delivery',
          meta: {
            icon: 'UserOutlined',
            title: '投递信息',
            requireAuth: true,
          },
          component: () => import('@/views/user/delivery/index.vue'),
        },
      ],
    },
    {
      name: 'settings',
      path: '/settings',
      meta: {
        icon: 'SettingOutlined',
        title: '设置',
      },
      component: () => import('@/views/settings/index.vue'),
    },
  ]
}
