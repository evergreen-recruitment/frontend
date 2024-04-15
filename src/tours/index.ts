import { computed, reactive } from 'vue'
import type { TourProps } from 'ant-design-vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
// 首页漫游式引导
export const homePageGuideState = reactive({
  current: 0,
  steps: [
    {
      title: '欢迎',
      description: '欢迎使用本系统，接下来我将引导您使用本系统',
    },
    {
      title: '导航栏',
      description: '这里是导航栏，您将可以选择需要的服务和功能',
      target: () => document.querySelector('.i-header') as HTMLElement,
    },
    {
      title: '地区',
      description: '选择不同的地区，我们将为您推送不同的服务',
      target: () => document.querySelector('.i-header .location') as HTMLElement,
    },
    {
      title: '推荐',
      description: '在这里你可以根据步骤指引，最后将会生成推荐岗位',
      target: () => document.querySelector('.i-header a[href="/recommend"]') as HTMLElement,
    },
    {
      title: '岗位搜索',
      description: '在这里你可以通过复杂、全面的筛选条件，找出自己最心仪的岗位',
      target: () => document.querySelector('.i-header a[href="/job/search"]') as HTMLElement,
    },
    {
      title: '公司搜索',
      description: '和岗位搜索一样，这里同样提供智能的搜索功能，为您筛选心仪的公司',
      target: () => document.querySelector('.i-header a[href="/company/search"]') as HTMLElement,
    },
    {
      title: '头像',
      description: '这里包含了你注册时上传的头像和姓名',
      target: () => document.querySelector('.i-header .i-avatar') as HTMLElement,
    },
    // {
    //   title: '个人功能',
    //   description: '在这里，你可以选择修改信息、上传简历、分析投递信息、系统设置等等',
    //   target: () => {
    //     const avatar = document.querySelector('.i-header .i-avatar .i-avatar__wrapper') as HTMLElement
    //     avatar.click()
    //     setTimeout(() => {}, 300)
    //     return document.querySelector('.ant-dropdown-menu') as HTMLElement
    //   },
    // },
    // {
    //   title: '应聘者登录',
    //   description: '注册成为应聘者，你可以在本网站挑选最心仪的岗位，享受来自我们最智能的推荐算法的效果',
    //   target: () => document.querySelector('.i-header a[href="/auth/loginByCaptcha"]') as HTMLElement,
    // },
    // {
    //   title: '招聘者登录',
    //   description: '除了成为应聘者，你还可以成为招聘人，发布岗位，招聘能人贤者',
    //   target: () => document.querySelector('.i-header a[href="/empAuth/login"]') as HTMLElement,
    // },
    {
      title: '首页内容',
      description: '这里是首页的内容，包含知识图谱、岗位分类、教程推荐、热门公司、推荐岗位等等。',
      target: () => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        })
        return document.querySelector('.mask') as HTMLElement
      },
    },
    {
      title: '知识图谱',
      description: '使用知识图谱分析你的简历，为你推荐最适合的岗位',
      target: () => document.querySelector('.home-page-bottom .knowledge-graph') as HTMLElement,
    },
    {
      title: 'IT岗位分类',
      description: '本系统包含83个细分岗位分类，同时提供每个岗位的学习路径和教程，您可以根据需求自行选择',
      mask: false,
      scrollIntoViewOptions: {
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      },
      target: () => {
        const banner = document.querySelector('.home-page-bottom .banner') as HTMLElement
        // banner.scrollIntoView({ behavior: 'smooth' })
        // window.scrollBy({
        //   top: banner.getBoundingClientRect().top - window.innerHeight,
        //   behavior: 'smooth',
        // })
        return banner
      },
    },
    {
      title: '热门公司',
      description: '我们分析出我们岗位最热门的30个公司，以跑马灯流水线的方式展现',
      mask: false,
      target: () => document.querySelector('.home-page-bottom .hot-company') as HTMLElement,
    },
    {
      title: '推荐岗位',
      description: '我们使用自研的智能推荐算法，分析岗位数据库，推荐最适合的岗位信息',
      placement: 'top',
      target: () => document.querySelector('.home-page-bottom .job-recommend') as HTMLElement,
    },
  ] as TourProps['steps'],
  open: computed({
    get: () => {
      return userStore.token.length > 1 && !userStore.isGuide.homePage
    },
    set: (value) => {
      if (userStore.token.length < 1) {
        return
      }
      userStore.isGuide.homePage = !value
    },
  }),
})

// 岗位搜索页漫游式引导
export const jobSearchPageGuideState = reactive({
  current: 0,
  steps: [
    {
      title: '欢迎',
      description: '欢迎使用搜索功能，接下来我将引导您使用搜索功能',
    },
    {
      title: '搜索框',
      description: '这里是搜索框，您将可以输入你想要搜索的岗位的关键词，然后按下搜索或者回车，得到结果',
      target: () => document.querySelector('.search-panel .search') as HTMLElement,
    },
    {
      title: '地区',
      description: '选择不同的地区，会得到不同地区的岗位结果',
      target: () => document.querySelector('.search-panel .location-selector') as HTMLElement,
    },
    {
      title: '快捷选择地区',
      description: '在这里，是热门的岗位分布地区，您可以快速选择地区进行查看',
      target: () => document.querySelector('.search-panel .city-list') as HTMLElement,
    },
    {
      title: '筛选条件',
      description: '在这里，您可以选择筛选岗位分类、岗位类型、经验要求、薪资情况',
      target: () => document.querySelector('.search-panel .filter-panel') as HTMLElement,
    },
    {
      title: '搜索结果',
      description: '这里是搜索的结果',
      mask: false,
      target: () => document.querySelector('.job .job-list-outer .job-list') as HTMLElement,
    },
    {
      title: '分页按钮',
      description: '在这里您可以选择翻页或者到指定页',
      target: () => document.querySelector('.job .job-list-outer .page-btn') as HTMLElement,
    },
    {
      title: '知识图谱',
      description: '这里是对应的搜索结果的知识图谱分析',
      target: () => document.querySelector('.job .job-side .graph-cot') as HTMLElement,
    },
    {
      title: '相关搜索',
      description: '这里是相关的搜索',
      target: () => document.querySelector('.job .job-side .other-search') as HTMLElement,
    },
  ] as TourProps['steps'],
  open: computed({
    get: () => {
      return userStore.token.length > 1 && !userStore.isGuide.jobSearchPage
    },
    set: (value) => {
      if (userStore.token.length < 1) {
        return
      }
      userStore.isGuide.jobSearchPage = !value
    },
  }),
})

// 岗位详情页漫游式引导
export const jobDetailGuideState = reactive({
  current: 0,
  steps: [
    {
      title: '欢迎',
      description: '欢迎使用岗位详情页功能，接下来我将引导您使用该功能',
    },
    {
      title: '岗位基本信息',
      description: '这里是岗位的基本信息栏，包括招聘状态、地区、经验要求、学历要求、薪资情况、福利情况等等',
      target: () => document.querySelector('.job-detail__banner') as HTMLElement,
    },
    {
      title: '岗位描述信息',
      description: '这里是岗位的描述信息，包括岗位的技能要求等等',
      placement: 'top',
      target: () =>
        document.querySelector('.job-detail__main .job-detail__content .job-detail__description') as HTMLElement,
    },
    {
      title: '推荐效果评分',
      description: '对推荐效果进行评分',
      target: () => document.querySelector('.job-detail__side .job-detail__side--vote') as HTMLElement,
    },
    {
      title: '岗位技术栈可视化',
      description:
        '这里分析出了该岗位所需的技术栈和技术栈的要求占比，并且分析你的简历技术栈情况，若未学习的技术栈将标灰',
      placement: 'top',
      mask: false,
      target: () =>
        document.querySelector(
          '.job-detail__main .job-detail__content .job-detail__chart .job-detail__stack',
        ) as HTMLElement,
    },
    {
      title: '能力排名可视化',
      description: '这里分析了该岗位的应聘者们的能力排名，每个柱子代表一个应聘者，它的长度代表这名应聘者超过了多少人',
      placement: 'top',
      mask: false,
      target: () =>
        document.querySelector(
          '.job-detail__main .job-detail__content .job-detail__chart .job-detail__ability-ranking',
        ) as HTMLElement,
    },
    {
      title: '公司信息',
      description: '这里包含了该公司的一些信息',
      placement: 'top',
      mask: false,
      target: () => document.querySelector('.job-detail__main .job-detail__company-info') as HTMLElement,
    },
    {
      title: '相似岗位',
      description: '这里是相似的其他岗位列表，根据您的需求再选择其他岗位',
      placement: 'left',
      mask: false,
      scrollIntoViewOptions: false,
      target: () => document.querySelector('.job-detail__side .job-detail__side--similar-job') as HTMLElement,
    },
  ] as TourProps['steps'],
  open: computed({
    get: () => {
      return userStore.token.length > 1 && !userStore.isGuide.jobDetailPage
    },
    set: (value) => {
      if (userStore.token.length < 1) {
        return
      }
      userStore.isGuide.jobDetailPage = !value
    },
  }),
})
