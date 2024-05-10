import './style.scss'
import router from '@/router'
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { homePageGuideState } from '@/tours'
import { Image, Skeleton, Spin, TabPane, Tabs, Tour } from 'ant-design-vue'
import { getAssetsFile, getClientHeight, getScreenHeight, getScrollTop } from '@/utils/utils'
import { useStatusStore, useUserStore } from '@/stores'
import { getHomeKnowledgeGraphApi, getHotSearchApi } from '@/apis/home'
import { getNearbyJobsApi, getNewJobsApi, type SimpleJobItemType } from '@/apis/job'
import { getHotCompanyApi, type SimpleCompanyType } from '@/apis/company'
import Icon from '@/components/Icon/Icon.vue'
import INavigator from '@/components/INavigator/INavigator.vue'
import NotLoginTip from '@/components/NotLoginTip/NotLoginTip.vue'
import KnowledgeGraph from '@/components/KnowledgeGraph/KnowledgeGraph.vue'
import ICard from '@/components/ICard/ICard.vue'
import JobCard from '@/components/JobCard/JobCard.vue'

const userStore = useUserStore()
const userStateRef = ref(userStore.userState)
const statusStore = useStatusStore()
const blurPercent = ref(0)
const opacityPercent = ref(0)
const HomeTour = () => {
  return (
    <Tour
      v-model:current={homePageGuideState.current}
      type={'primary'}
      steps={homePageGuideState.steps}
      open={homePageGuideState.open}
      onClose={() => {
        homePageGuideState.open = false
      }}
    />
  )
}

const HomeMask = () => {
  return (
    <div class="mask" style={{ '--blur': `${blurPercent.value * 10}px`, '--opacity': `${opacityPercent.value}` }}></div>
  )
}

const HomeLeftPanel = defineComponent({
  setup() {
    const hotSearch = ref<string[]>([])
    let jobNameInterval: number
    onMounted(async () => {
      // 设置定时器 每3s 减少--job-name-top 65px 一共减少 hotSearch.length * 65px
      jobNameInterval = setInterval(() => {
        const jobName = document.querySelector('.job-name') as HTMLElement
        const jobNameTop = Number(getComputedStyle(jobName).getPropertyValue('--job-name-top').replace('px', ''))
        const leftTitle = document.querySelector('.left-panel .title-panel .title') as HTMLElement
        const fontSize = Number(getComputedStyle(leftTitle).getPropertyValue('--font-size').replace('px', ''))
        jobName.style.setProperty('--job-name-top', `${jobNameTop - (fontSize + 1)}px`)
        if (jobNameTop <= -fontSize * (hotSearch.value.length - 1)) {
          jobName.style.setProperty('--job-name-top', '0px')
        }
      }, 3000)
      hotSearch.value = await getHotSearchApi()
    })
    onUnmounted(() => {
      clearInterval(jobNameInterval)
    })
    return () => (
      <div class="left-panel">
        <div class="title-panel">
          <div class="title">
            <span class="font-bold">『常青招聘』</span>
            <span class="text-lg sm:text-2xl">为您推荐</span>
            <br />
            最适合的岗位
            <div class="job-name-outer">
              <div class="job-name">
                {hotSearch.value.map((item: string) => {
                  return (
                    <div
                      class="item"
                      key={item}
                      onClick={() => router.push({ name: 'jobSearch', query: { keyword: item } })}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div class="sub-title">
            我们设计了优秀的推荐算法与多元化知识图谱分析，
            <br />
            所使用数据库涵盖{15840}+条岗位信息，为您推荐最适合的岗位
          </div>
          {!userStateRef.value.isLogin && (
            <div class="get-start">
              <button class="get-start-btn" onClick={() => router.push('/recommend')}>
                登录以获取详细推荐信息
                <div class="icon">
                  <Icon icon="ArrowRightOutlined" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  },
})
const HomeRightPanel = defineComponent({
  setup() {
    return () => (
      <div class="right-panel">
        <img src={getAssetsFile('images/bg1.svg')} alt="" />
      </div>
    )
  },
})

const HomeDownArrow = () => {
  return (
    <div
      class="down-arrow"
      style={
        blurPercent.value === 0 ? { opacity: '1', pointerEvents: 'auto' } : { opacity: '0', pointerEvents: 'none' }
      }
      onClick={() => {
        window.scrollTo({
          top: getScreenHeight(),
          behavior: 'smooth',
        })
      }}
    >
      <div class="tip">向下滚动，查看更多推荐信息</div>
      <div class="down-arrow-inner">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
            d="M112 184l144 144 144-144"
          />
        </svg>
      </div>
    </div>
  )
}

const HomeBackground = () => {
  return (
    <div class="home-page-background">
      <HomeLeftPanel />
      <HomeRightPanel />
      <HomeDownArrow />
    </div>
  )
}

const HomeUserPanel = defineComponent({
  setup() {
    const knowledgeGraphData = ref()
    const notLoginOrDelivered = computed(() => !userStateRef.value.isLogin || !userStateRef.value.isUploadApplication)
    return () => (
      <div class="user-panel block-item">
        <div class="user-aside-outer">
          <div class="user-aside">
            <div class="user-info">
              <div class="avatar">
                {userStore.userInfo?.avatar && (
                  <Image src={userStore.userInfo?.avatar || getAssetsFile('images/default_avatar.png')} />
                )}
                {!userStore.userInfo?.avatar && <img src={getAssetsFile('images/logo.png')} />}
              </div>
              <div class="name">{userStore.userInfo?.realName || '常青招聘'}</div>
              <div class="desc">{userStore.userInfo?.email || '大学生智慧招聘平台'}</div>
            </div>
            <div class="user-action">
              {userStateRef.value.isLogin && (
                <>
                  <INavigator class="action-item" to={'/user/center'}>
                    <Icon icon="UserOutlined" />
                    <span>用户中心</span>
                  </INavigator>
                  <INavigator class="action-item" to={'/user/application'}>
                    <Icon icon="FileTextOutlined" />
                    <span>个人简历</span>
                  </INavigator>
                  <INavigator class="action-item" to={'/user/delivery'}>
                    <Icon icon="FlagOutlined" />
                    <span>投递信息</span>
                  </INavigator>
                  <div onClick={() => userStore.logout()}>
                    <INavigator class="action-item" to={'/'}>
                      <Icon icon="LogoutOutlined" />
                      <span>退出登录</span>
                    </INavigator>
                  </div>
                </>
              )}
              {!userStateRef.value.isLogin && (
                <>
                  <INavigator class="action-item" to={'/auth/loginByCaptcha'}>
                    <Icon icon="UserOutlined" />
                    <span>登录</span>
                  </INavigator>
                  <INavigator class="action-item" to={'/auth/loginByCaptcha'}>
                    <Icon icon="UserAddOutlined" />
                    <span>注册</span>
                  </INavigator>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          v-scroll={async () =>
            !notLoginOrDelivered.value && (knowledgeGraphData.value = await getHomeKnowledgeGraphApi())
          }
          class="knowledge-graph"
        >
          <div class="title">你最有概率投递的岗位(知识图谱分析)</div>
          <div class="sub-title">根据大数据和算法分析得出</div>
          <div class="graph-cot card">
            {notLoginOrDelivered.value ? (
              <NotLoginTip isLogin={userStateRef.value.isLogin} delivered={userStateRef.value.isUploadApplication} />
            ) : knowledgeGraphData.value ? (
              <KnowledgeGraph class={'graph'} data={knowledgeGraphData.value} show-legend show-minimap />
            ) : (
              <Spin size="large" tip={'云端算法计算中...'} />
            )}
          </div>
        </div>
      </div>
    )
  },
})

const HomeJobRecommend = defineComponent({
  setup() {
    const tabKey = ref(0)
    const jobList = ref<{ id: number; label: string; list: SimpleJobItemType[] }[]>([
      {
        id: 0,
        label: '热门岗位',
        list: [],
      },
      {
        id: 1,
        label: '最新岗位',
        list: [],
      },
      {
        id: 2,
        label: '附近岗位',
        list: [],
      },
    ])

    async function getData(id: number) {
      if (id === 0) {
        jobList.value[0].list = await getNewJobsApi({ current: 2, pageSize: 12 })
      }
      if (id === 1) {
        jobList.value[1].list = await getNewJobsApi({ pageSize: 12 })
      }
      if (id === 2) {
        jobList.value[2].list = await getNearbyJobsApi({ current: 1, pageSize: 12, city: statusStore.city.code[1] })
      }
    }

    return () => (
      <div class="job-recommend block-item">
        <div class="title">岗位推荐</div>
        <div class="sub-title">通过人工智能分析推荐最适合你的岗位</div>
        <Tabs
          class="job-list-tabs"
          v-scroll={async () => await getData(tabKey.value)}
          v-model:activeKey={tabKey.value}
          onChange={(key) => getData(key as number)}
          style={'overflow: hidden; padding: 5px 0'}
          animated
        >
          {jobList.value.map((item) => {
            return (
              <TabPane key={item.id} tab={item.label}>
                {item.list.length > 0 && (
                  <div class="job-list">
                    {item.list.map((job) => {
                      return <JobCard key={job.id} job={job} />
                    })}
                  </div>
                )}
                {item.list.length === 0 && (
                  <ICard>
                    <Skeleton paragraph={{ rows: 9 }} active />
                  </ICard>
                )}
              </TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  },
})

const HomeHotCompany = defineComponent({
  setup() {
    const hotCompanyList = ref<SimpleCompanyType[]>([])

    return () => (
      <div v-scroll={async () => (hotCompanyList.value = await getHotCompanyApi())} class="hot-company block-item">
        <div class="title">热门公司</div>
        <div class="sub-title">最热门的互联网公司</div>
        {hotCompanyList.value.length === 0 ? (
          <Spin size="large" tip={'获取数据中...'} />
        ) : (
          <div class="hot-company-list">
            <div class="line-odd">
              {hotCompanyList.value.slice(0, hotCompanyList.value.length / 2).map((company) => {
                return (
                  <INavigator
                    class="company-item"
                    key={company.id}
                    to={{ name: 'companyDetail', query: { companyId: company.id } }}
                  >
                    <img v-lazy-load={company?.logo} alt={company.name} />
                  </INavigator>
                )
              })}
            </div>
            <div class="line-even">
              {hotCompanyList.value.slice(hotCompanyList.value.length / 2).map((company) => {
                return (
                  <INavigator
                    class="company-item"
                    key={company.id}
                    to={{ name: 'companyDetail', query: { companyId: company.id } }}
                  >
                    <img v-lazy-load={company?.logo} alt={company.name} />
                  </INavigator>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  },
})
const HomeBottom = defineComponent({
  setup() {
    return () => (
      <div class="home-page-bottom">
        <HomeUserPanel />
        <HomeJobRecommend />
        <HomeHotCompany />
      </div>
    )
  },
})

export default defineComponent({
  setup() {
    function handleScroll() {
      const scrollTop = getScrollTop()
      const clientHeight = getClientHeight()
      blurPercent.value = Number((scrollTop / clientHeight > 1 ? 1 : scrollTop / clientHeight).toFixed(2))
      opacityPercent.value = Number((scrollTop / clientHeight > 0.8 ? 0.8 : scrollTop / clientHeight).toFixed(2))
    }

    handleScroll()
    onMounted(async () => {
      window.addEventListener('scroll', handleScroll)
      // 需要获取状态
      await userStore.getUserState()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return () => (
      <div class="home-page">
        <HomeTour />
        <HomeBackground />
        <HomeMask />
        <HomeBottom />
      </div>
    )
  },
})
