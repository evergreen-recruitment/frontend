<script setup lang="tsx">
import { computed, defineComponent, onMounted, onUnmounted, ref, useCssModule } from 'vue'
import router from '@/router'
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

const style = useCssModule()
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
    <div
      class={style.mask}
      style={{ '--blur': `${blurPercent.value * 10}px`, '--opacity': `${opacityPercent.value}` }}
    ></div>
  )
}

const HomeLeftPanel = defineComponent({
  setup() {
    const hotSearch = ref<string[]>([])
    let jobNameInterval: number
    const jobNameRef = ref<HTMLElement>()
    const leftTitleRef = ref<HTMLElement>()
    onMounted(async () => {
      // 设置定时器 每3s 减少--job-name-top 65px 一共减少 hotSearch.length * 65px
      jobNameInterval = setInterval(() => {
        if (jobNameRef.value && leftTitleRef.value) {
          const jobNameTop = Number(
            getComputedStyle(jobNameRef.value).getPropertyValue('--job-name-top').replace('px', ''),
          )
          const fontSize = Number(
            getComputedStyle(leftTitleRef.value).getPropertyValue('--font-size').replace('px', ''),
          )
          jobNameRef.value.style.setProperty('--job-name-top', `${jobNameTop - (fontSize + 1)}px`)
          if (jobNameTop <= -fontSize * (hotSearch.value.length - 1)) {
            jobNameRef.value.style.setProperty('--job-name-top', '0px')
          }
        }
      }, 3000)
      hotSearch.value = await getHotSearchApi()
    })
    onUnmounted(() => {
      clearInterval(jobNameInterval)
    })
    return () => (
      <div class={style['left-panel']}>
        <div class={style['title-panel']}>
          <div class={style.title} ref={leftTitleRef}>
            <span class={style['font-bold']}>『常青招聘』</span>
            <span class="text-lg sm:text-2xl">为您推荐</span>
            <br />
            最适合的岗位
            <div class={style['job-name-outer']}>
              <div class={style['job-name']} ref={jobNameRef}>
                {hotSearch.value.map((item: string) => {
                  return (
                    <div
                      class={style.item}
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
          <div class={style['sub-title']}>
            我们设计了优秀的推荐算法与多元化知识图谱分析，
            <br />
            所使用数据库涵盖{15840}+条岗位信息，为您推荐最适合的岗位
          </div>
          {!userStateRef.value.isLogin && (
            <div class={style['get-start']}>
              <button class={style['get-start-btn']} onClick={() => router.push('/recommend')}>
                登录以获取详细推荐信息
                <div class={style.icon}>
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
      <div class={style['right-panel']}>
        <img src={getAssetsFile('images/bg1.svg')} alt="" />
      </div>
    )
  },
})

const HomeDownArrow = () => {
  return (
    <div
      class={style['down-arrow']}
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
      <div class={style.tip}>向下滚动，查看更多推荐信息</div>
      <div class={style['down-arrow-inner']}>
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
    <div class={style['home-page-background']}>
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
      <div class={[style['user-panel'], style['block-item']]}>
        <div class={style['user-aside-outer']}>
          <div class={style['user-aside']}>
            <div class={style['user-info']}>
              <div class={style.avatar}>
                {userStore.userInfo?.avatar && (
                  <Image src={userStore.userInfo?.avatar || getAssetsFile('images/default_avatar.png')} />
                )}
                {!userStore.userInfo?.avatar && <img src={getAssetsFile('images/logo.png')} />}
              </div>
              <div class={style.name}>{userStore.userInfo?.realName || '常青招聘'}</div>
              <div class={style.desc}>{userStore.userInfo?.email || '大学生智慧招聘平台'}</div>
            </div>
            <div class={style['user-action']}>
              {userStateRef.value.isLogin && (
                <>
                  <INavigator class={style['action-item']} to={'/user/center'}>
                    <Icon icon="UserOutlined" />
                    <span>用户中心</span>
                  </INavigator>
                  <INavigator class={style['action-item']} to={'/user/application'}>
                    <Icon icon="FileTextOutlined" />
                    <span>个人简历</span>
                  </INavigator>
                  <INavigator class={style['action-item']} to={'/user/delivery'}>
                    <Icon icon="FlagOutlined" />
                    <span>投递信息</span>
                  </INavigator>
                  <div onClick={() => userStore.logout()}>
                    <INavigator class={style['action-item']} to={'/'}>
                      <Icon icon="LogoutOutlined" />
                      <span>退出登录</span>
                    </INavigator>
                  </div>
                </>
              )}
              {!userStateRef.value.isLogin && (
                <>
                  <INavigator class={style['action-item']} to={'/auth/loginByCaptcha'}>
                    <Icon icon="UserOutlined" />
                    <span>登录</span>
                  </INavigator>
                  <INavigator class={style['action-item']} to={'/auth/loginByCaptcha'}>
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
          class={style['knowledge-graph']}
        >
          <div class={style.title}>你最有概率投递的岗位(知识图谱分析)</div>
          <div class={style['sub-title']}>根据大数据和算法分析得出</div>
          <div class={[style['graph-cot'], style.card]}>
            {notLoginOrDelivered.value ? (
              <NotLoginTip isLogin={userStateRef.value.isLogin} delivered={userStateRef.value.isUploadApplication} />
            ) : knowledgeGraphData.value ? (
              <KnowledgeGraph class={style.graph} data={knowledgeGraphData.value} show-legend show-minimap />
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
      <div class={[style['job-recommend'], style['block-item']]}>
        <div class={style.title}>岗位推荐</div>
        <div class={style['sub-title']}>通过人工智能分析推荐最适合你的岗位</div>
        <Tabs
          class={style['job-list-tabs']}
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
                  <div class={style['job-list']}>
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
      <div
        v-scroll={async () => (hotCompanyList.value = await getHotCompanyApi())}
        class={[style['hot-company'], style['block-item']]}
      >
        <div class={style.title}>热门公司</div>
        <div class={style['sub-title']}>最热门的互联网公司</div>
        {hotCompanyList.value.length === 0 ? (
          <Spin size="large" tip={'获取数据中...'} />
        ) : (
          <div class={style['hot-company-list']}>
            <div class={style['line-odd']}>
              {hotCompanyList.value.slice(0, hotCompanyList.value.length / 2).map((company) => {
                return (
                  <INavigator
                    class={style['company-item']}
                    key={company.id}
                    to={{ name: 'companyDetail', query: { companyId: company.id } }}
                  >
                    <img v-lazy-load={company?.logo} alt={company.name} />
                  </INavigator>
                )
              })}
            </div>
            <div class={style['line-even']}>
              {hotCompanyList.value.slice(hotCompanyList.value.length / 2).map((company) => {
                return (
                  <INavigator
                    class={style['company-item']}
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
      <div class={style['home-page-bottom']}>
        <HomeUserPanel />
        <HomeJobRecommend />
        <HomeHotCompany />
      </div>
    )
  },
})

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
</script>
<template>
  <div class="home-page">
    <HomeTour />
    <HomeBackground />
    <HomeMask />
    <HomeBottom />
  </div>
</template>

<style lang="scss" module>
@import '@/styles/theme.scss';

.home-page {
  @apply mb-10;

  .mask {
    --blur: 0px;
    --opacity: 0;
    @apply fixed top-0 left-0 w-full h-[100vh] bg-amber-50 pointer-events-none;
    backdrop-filter: blur(var(--blur));

    @include useTheme {
      background: rgba(getModeVar('bgColor'), var(--opacity));
    }
  }

  .home-page-background {
    @apply fixed w-full top-0 h-[100vh] flex z-0;

    .down-arrow {
      @apply fixed left-0 right-0 bottom-0 flex justify-center items-center flex-col cursor-pointer;
      -webkit-tap-highlight-color: transparent;
      transition: opacity 0.3s ease;
      z-index: 9999;

      .tip {
        @apply text-2xl text-center font-medium;
        @media screen and (max-width: 768px) {
          @apply text-lg;
        }

        @include useTheme {
          color: color-mix(in srgb, getColor('primary'), getModeVar('textColor') 60%);
        }
      }

      .down-arrow-inner {
        @apply w-12 h-12 p-4 pt-0 flex items-center justify-center;
        font-size: min(60px, 12vw);
        @include useTheme {
          color: color-mix(in srgb, getColor('primary'), #fff 30%);
        }
        opacity: 0.55;
        transition: opacity 0.25s ease;
      }
    }

    .left-panel {
      @apply relative w-full h-full z-10;
      .title-panel {
        @apply inline-block relative top-[40%] left-[7%];
        @media screen and (max-width: 1280px) {
          @apply top-[50%] left-1/2;
          transform: translate(-50%, -50%);
        }

        // 字体边缘羽化效果，mask有问题，应该选择生成字体的mask
        //.title,
        //.sub-title {
        //  backdrop-filter: blur(5px);
        //  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3CforeignObject width='100%25' height='100%25'%3E%3Cbody class='wrap' xmlns='http://www.w3.org/1999/xhtml'%3E%3Cstyle%3E.wrap%7Bbox-sizing:border-box;margin:0;height:100%25;padding:15px%7D.shadow%7Bheight:100%25;background:black;border-radius:10px;box-shadow:0 0 5px black, 0 0 10px black, 0 0 15px black %7D%3C/style%3E%3Cdiv class='shadow'/%3E%3C/body%3E%3C/foreignObject%3E%3C/svg%3E");
        //}

        .title {
          --font-size: 60px;
          @apply text-center mb-5;
          font-size: var(--font-size);

          @media screen and (max-width: 1280px) {
            --font-size: 50px;
          }

          @media screen and (max-width: 768px) {
            --font-size: 45px;
          }

          //@include useTheme {
          //  color: rgba((adjust-hue(hsl(0, 70%, 20%), hue(getColor('primary')))), 0.9);
          //  text-shadow: 1px 2px 7px rgba((adjust-hue(hsl(0, 70%, 20%), hue(getColor('primary')))), 0.5);
          //}

          .job-name-outer {
            @apply relative h-[var(--font-size)] overflow-hidden;
            .job-name {
              --job-name-top: 0px;
              @apply relative top-[var(--job-name-top)] flex flex-col font-bold;
              transition: top 0.5s;

              .item {
                @apply h-[calc(var(--font-size)+1px)] leading-[calc(var(--font-size)+1px)] cursor-pointer;
              }
            }
          }
        }

        .sub-title {
          //@include useTheme {
          //  color: rgba((adjust-hue(hsl(0, 30%, 40%), hue(getColor('primary')))), 0.9);
          //  text-shadow: 1px 2px 5px rgba((adjust-hue(hsl(0, 30%, 40%), hue(getColor('primary')))), 0.3);
          //}

          @media screen and (max-width: 768px) {
            @apply text-sm;
          }

          @media screen and (max-width: 432px) {
            @apply text-xs;
          }
        }

        .get-start {
          @apply mt-[10px] flex items-center justify-center;
          .get-start-btn {
            @apply flex items-center relative text-base font-medium border-0 overflow-hidden text-white cursor-pointer;
            letter-spacing: 0.05em;
            height: 2.8em;
            padding: 0.35em;
            padding-left: 1.2em;
            padding-right: 3.3em;

            @media screen and (max-width: 768px) {
              @apply text-sm;
            }

            border-radius: calc(var(--border-radius) * 1.5);

            @include useTheme {
              background: getColor('primary');
              box-shadow: inset 0 0 1.6em -0.6em getColor('primary');
            }

            &:hover {
              .icon {
                width: calc(100% - 0.6em);

                span {
                  transform: translateX(0.1em);
                }
              }
            }

            &:active {
              .icon {
                transform: scale(0.95);
              }
            }

            .icon {
              @apply flex absolute justify-center items-center bg-white;
              margin-left: 1em;
              height: 2.2em;
              width: 2.2em;
              right: 0.3em;
              transition: all 0.3s;
              border-radius: calc(var(--border-radius) * 1.2);

              @include useTheme {
                box-shadow: 0.1em 0.1em 0.6em 0.2em getColor('primary');
                span {
                  width: 1.1em;
                  transition: transform 0.3s;
                  color: getColor('primary');
                }
              }
            }
          }
        }
      }
    }

    .right-panel {
      @apply absolute w-full h-full;

      @include useTheme {
        background: getModeVar('bgColor');
      }

      img {
        @apply absolute right-[10%] bottom-0 w-[60%] h-fit object-center;

        @media screen and (max-width: 1280px) {
          @apply w-[80%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;
        }

        @media screen and (max-width: 768px) {
          @apply w-full left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2;
        }
      }
    }
  }

  .home-page-bottom {
    @apply relative w-full mt-[100vh] overflow-y-hidden flex flex-col items-center justify-center;
    transition: top 0.8s;

    .block-item {
      @apply my-5 mx-auto max-w-[var(--min-screen-width)] w-full flex flex-col items-center justify-center;
      .title {
        @apply text-3xl font-bold text-center mb-5;
      }

      .sub-title {
        @apply text-gray-500 mb-5;
      }
    }

    .user-panel {
      @apply relative flex flex-row items-center justify-between px-2 box-border;
      @media screen and (max-width: 768px) {
        @apply space-y-5;
        flex-direction: column;
        .user-aside-outer,
        knowledge-graph {
          flex: 1;
        }
      }

      .user-aside {
        @apply flex flex-col items-center justify-between mx-auto;

        .user-info {
          @apply flex flex-col items-center;
          .avatar {
            @apply w-28 h-28 rounded-full overflow-hidden;
            img {
              @apply w-full h-full object-cover;
            }
          }

          .name {
            @apply text-3xl font-bold ml-5 my-2;
          }

          .desc {
            @apply text-gray-500;
          }
        }

        .user-action {
          @apply grid grid-cols-2 grid-rows-2 gap-4;
          .action-item {
            @apply flex items-center justify-center w-28 h-10 mx-2 text-base rounded-md box-border cursor-pointer;
            border: 2px transparent solid;
            transition: 0.4s;

            &:hover {
              transform: scale(1.05);
              @include useTheme {
                background: rgba(getColor('primary'), 0.6);
                border: 2px rgba(getColor('primary'), 1) solid;
              }
            }

            span {
              @apply ml-2;
            }
          }
        }
      }

      .knowledge-graph {
        @apply relative flex flex-col items-center h-[550px] justify-center w-[70%];

        @media screen and (max-width: 768px) {
          @apply w-full;
        }

        .graph-cot {
          @apply flex justify-center items-center relative h-[80%] w-full rounded-[var(--border-radius)] shadow-md;

          @include useTheme {
            background: rgba(getModeVar('cardBgColor'), 0.9);
          }
        }
      }
    }

    .banner {
      @apply relative w-[var(--min-screen-width)] h-auto mx-auto my-10;

      .title {
        @apply text-3xl font-bold text-center mb-5;
      }

      .sub-title {
        @apply text-gray-500 mb-5 text-center;
      }

      .banner-inner {
        --left-side-width: 20rem;
        @apply relative h-full;
        .left-side {
          @apply absolute w-[var(--left-side-width)] h-full py-5 box-border z-[1] backdrop-blur-3xl;
          transition: width 0.3s;
          background: rgba((adjust-hue(hsl(0, 50%, 10%), hue(getColor('primary')))), 0.8);

          .menu {
            @apply text-white;
            .right {
              @apply flex items-center justify-center w-[24px] h-[30px] rounded-r-full rounded-l-none absolute top-1/2 right-[-22px] bg-[rgba(0,0,0,0.5)] cursor-pointer z-10;
            }

            .menu-item {
              @apply w-full h-10 px-5 flex justify-between box-border cursor-pointer leading-10 hover:bg-[rgba(255,255,255,0.7)] hover:text-black;

              .layer {
                @apply absolute top-0 left-[var(--left-side-width)] w-[calc(1280px-var(--left-side-width))] h-[500px] backdrop-blur-2xl hidden;
                transition:
                  left 0.3s,
                  width 0.3s;
                @include useTheme {
                  background: linear-gradient(90deg, #fffffff0, rgba(getColor('primary'), 0.9));
                }

                .title {
                  @apply text-2xl font-bold ml-5 mt-5 mb-5;
                }

                .content {
                  @apply flex flex-wrap;
                  .menu-item {
                    @apply w-1/3 h-10 px-5 flex justify-between box-border cursor-pointer leading-10 hover:bg-[rgba(255,255,255,0.4)] hover:text-black;
                  }
                }
              }

              &:hover {
                .layer {
                  @apply block;
                }
              }
            }
          }
        }

        .ant-carousel {
          @apply w-full h-full;

          :deep(.slick-slide) {
            & > div {
              height: 100% !important;
              width: 100% !important;
            }
          }

          .carousel-item {
            display: grid !important;
            @apply relative grid-cols-4 grid-rows-4;
            left: var(--left-side-width) !important;
            width: calc(100% - var(--left-side-width)) !important;
            height: 100% !important;
            transition:
              left 0.3s,
              width 0.3s;

            img {
              @apply w-full h-full object-cover;
            }
          }
        }

        :deep(.slick-slide) {
          @apply w-full h-[500px] text-center flex items-center justify-center overflow-hidden;

          $colors: (
            2: linear-gradient(135deg, #a1c4fd, #c2e9fb),
            3: linear-gradient(135deg, #ff9a9e, #fad0c4),
            4: linear-gradient(135deg, #f6d365, #fda085),
            5: linear-gradient(135deg, #a8e063, #56ab2f),
          );

          @for $i from 0 through 5 {
            &:nth-child(#{$i}) {
              background: map-get($colors, $i) !important;
            }
          }
        }
      }
    }

    .job-recommend {
      @apply box-border;
      .job-list-tabs {
        @apply max-w-[var(--min-screen-width)] w-full;
        .job-list {
          @apply grid gap-[15px] w-[calc(100%-1rem)];
          --card-width: 17.5rem;
          --card-height: 10rem;
          grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));

          //瀑布流
          //column-count: 4;
          //column-gap: 7px;

          //gap: 15px;
        }

        :deep(.ant-tabs-content-holder) {
          @apply p-2;
        }
      }
    }

    .hot-company {
      @apply w-full max-w-full flex flex-col items-center justify-center overflow-x-hidden my-4;
      .hot-company-list {
        @apply w-fit flex flex-col items-center justify-center space-y-2;

        .company-item {
          @apply block w-60 h-24 mx-5 flex items-center justify-center rounded-[var(--border-radius)];
          @include useTheme {
            background: getModeVar('cardBgColor');
            &:hover {
              @if getMode() == 'light' {
                background: rgba(adjust-hue(hsl(0, 50%, 85%), hue(getColor('primary'))), 0.8);
              } @else {
                background: rgba(adjust-hue(hsl(0, 50%, 15%), hue(getColor('primary'))), 0.8);
              }
            }
          }
        }

        .line-odd {
          @apply w-full flex items-center justify-center;
          transform: translateX(-32%);
          animation: scrollToRightOdd 30s infinite linear;

          img {
            @apply w-20 h-20 mx-5;
          }

          @keyframes scrollToRightOdd {
            0% {
              transform: translateX(-32%);
            }
            100% {
              transform: translateX(32%);
            }
          }
        }

        .line-even {
          @apply w-full flex items-center justify-center;
          transform: translateX(-32%);
          animation: scrollToRightEven 45s infinite linear;

          img {
            @apply w-20 h-20 mx-5;
          }

          @keyframes scrollToRightEven {
            0% {
              transform: translateX(-32%);
            }
            100% {
              transform: translateX(32%);
            }
          }
        }
      }
    }
  }
}

.ant-btn {
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
