<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAppStore, useStatusStore, useUserStore } from '@/stores'
import { getHomeKnowledgeGraphApi, getHotSearchApi } from '@/apis/home'
import type { CompanyType } from '@/apis/company'
import { getHotCompanyApi } from '@/apis/company'
import INavigator from '@/components/INavigator/INavigator.vue'
import type { JobCategoryType } from '@/apis/job'
import { getNewJobsApi } from '@/apis/job'
import Icon from '@/components/Icon/Icon.vue'
import tutorial from '@/assets/tutorial/tutorial'
import { homePageGuideState } from '@/tours'

const userStore = useUserStore()
const isLogin = ref(false)
const appStore = useAppStore()
const statusStore = useStatusStore()
const bannerLeftSideCollapsed = ref(false)
const tabKey = ref('1')
const category = ref<JobCategoryType[]>([])
const hotSearch = ref<string[]>([])
const hotCompanyList = ref<CompanyType[]>([])
const recommendJobList = ref()
const newJobList = ref()
const nearbyJobList = ref()
const knowledgeGraphData = ref()
const tutorialList = ref(tutorial)
const delivered = ref(false)

let homePageBottom: HTMLElement | null
let header: HTMLElement | null
let jobNameInterval: any = null

onMounted(async () => {
  const footer = document.querySelector('.footer') as HTMLElement
  footer.style.top = 'calc(100vh - 58px)'
  isLogin.value = userStore.getUserState().isLogin.value
  delivered.value = await userStore.getUserState().isUploadApplication.value
  hotSearch.value = await getHotSearchApi()
  hotCompanyList.value = await getHotCompanyApi()
  newJobList.value = await getNewJobsApi({ pageSize: 12 })
  recommendJobList.value = await getNewJobsApi({ current: 2, pageSize: 12 })
  nearbyJobList.value = await getNewJobsApi({ current: 3, pageSize: 12 })
  knowledgeGraphData.value = await getHomeKnowledgeGraphApi()
  category.value = statusStore.jobCategory

  // 设置定时器 每3s 减少--job-name-top 65px 一共减少 hotSearch.length * 65px
  jobNameInterval = setInterval(() => {
    const jobName = document.querySelector('.job-name') as HTMLElement
    const jobNameOuter = document.querySelector('.job-name-outer') as HTMLElement
    const jobNameTop = Number(jobName.style.getPropertyValue('--job-name-top').replace('px', ''))
    jobName.style.setProperty('--job-name-top', `${jobNameTop - 61}px`)
    if (jobNameTop <= -60 * (hotSearch.value.length - 1)) {
      jobName.style.setProperty('--job-name-top', '0px')
    }
  }, 3000)

  // 初始化页面时使用一次
  scrollEvent()
})

onUnmounted(() => {
  const footer = document.querySelector('.footer') as HTMLElement
  footer.style.top = '0'
  clearInterval(jobNameInterval)
  window.removeEventListener('scroll', () => {})
})

function scrollEvent() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight

  homePageBottom = document.querySelector('.mask')
  header = document.querySelector('.i-header')

  const blurPercent = Number((scrollTop / clientHeight > 1 ? 1 : scrollTop / clientHeight).toFixed(2))
  const opacityPercent = Number((scrollTop / clientHeight > 0.8 ? 0.8 : scrollTop / clientHeight).toFixed(2))

  header?.style.setProperty('--shadow-opacity', `${(1 - opacityPercent) * 0.2}`)

  homePageBottom?.style.setProperty('--blur', `${blurPercent * 10}px`)
  homePageBottom?.style.setProperty('--opacity', `${opacityPercent}`)

  // if (searchBarPercent > 0.7) {
  //   searchBarTitle?.classList.add('title-hidden')
  //   setTimeout(() => (hideSearchBarTitle.value = true), 500)
  // } else if (searchBarPercent < 0.2) {
  //   searchBarTitle?.classList.remove('title-hidden')
  //   hideSearchBarTitle.value = false
  //   // setTimeout(() => (hideSearchBarTitle.value = false), 500)
  // }
}

// 监听页面滚动事件
window.addEventListener('scroll', scrollEvent)
</script>

<template>
  <div class="home-page">
    <a-tour
      v-model:current="homePageGuideState.current"
      type="primary"
      :open="homePageGuideState.open"
      :steps="homePageGuideState.steps"
      @close="homePageGuideState.open = false"
    />
    <!--<i-search-bar class="search-bar" />-->
    <!--<job-search-home v-model:keyword="searchState.keyword" :hide-title="hideSearchBarTitle" class="search-bar" />-->
    <div v-if="true" class="home-page-background">
      <div class="left-panel">
        <div class="title-panel">
          <div class="title">
            你最适合的岗位
            <div class="job-name-outer">
              <div class="job-name">
                <div
                  class="item"
                  v-for="item in hotSearch"
                  :key="item"
                  @click="$router.push({ name: 'jobSearch', query: { keyword: item } })"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <div class="sub-title">
            我们设计了优秀的推荐算法、知识图谱分析，为你推荐最适合的岗位<br />
            数据库中包含我们爬取的{{ 11300 }}+岗位信息
          </div>
          <div v-if="!isLogin" class="get-start" style="margin-top: 10px; text-align: center">
            <a-button type="primary" @click="$router.push('/auth/login')">
              登录以获取详细推荐信息
              <Icon icon="RightOutlined" />
            </a-button>
          </div>
        </div>
      </div>
      <div class="right-panel">
        <img src="@/assets/images/bg1.svg" alt="" />
      </div>
    </div>
    <div class="mask"></div>
    <div class="home-page-bottom">
      <div v-slide-in="{ distance: 200 }" class="user-panel block-item">
        <div class="user-aside-outer">
          <div v-if="userStore.token" class="user-aside">
            <div class="user-info">
              <div class="avatar">
                <img alt="avatar" :src="userStore.userInfo?.avatar" />
              </div>
              <div class="name">{{ userStore.userInfo.realName }}</div>
              <div class="desc">{{ userStore.userInfo.email }}</div>
            </div>
            <div class="user-action">
              <i-navigator class="action-item" to="/user/center">
                <Icon icon="UserOutlined" />
                <span>用户中心</span>
              </i-navigator>
              <i-navigator class="action-item" to="/user/application">
                <Icon icon="FileTextOutlined" />
                <span>个人简历</span>
              </i-navigator>
              <i-navigator class="action-item" to="/user/delivery">
                <Icon icon="FlagOutlined" />
                <span>投递信息</span>
              </i-navigator>
              <i-navigator class="action-item" to="/" @click.prevent="userStore.logout()">
                <Icon icon="LogoutOutlined" />
                <span>退出登录</span>
              </i-navigator>
            </div>
          </div>
          <div v-else class="user-aside-no-login">
            <div class="user-info">
              <div class="avatar">
                <img alt="avatar" src="@/assets/images/logo.png" />
              </div>
              <div class="name">常青招聘</div>
              <div class="desc">大学生智慧招聘平台</div>
            </div>
            <div class="user-action">
              <i-navigator class="action-item" to="/auth/loginByCaptcha">
                <Icon icon="UserOutlined" />
                <span>登录</span>
              </i-navigator>
              <i-navigator class="action-item" to="/auth/loginByCaptcha">
                <Icon icon="UserAddOutlined" />
                <span>注册</span>
              </i-navigator>
            </div>
          </div>
        </div>
        <div class="knowledge-graph">
          <div class="title">你最有概率投递的岗位(知识图谱分析)</div>
          <div class="sub-title">根据大数据和算法分析得出</div>
          <div class="graph-cot card">
            <div v-if="!isLogin || !delivered" class="not-login">
              <div class="title">{{ !isLogin ? '未登录' : !delivered ? '未上传简历' : '' }}</div>
              <div class="desc">
                <a-button type="primary" @click="$router.push('/recommend')">根据推荐步骤使用本系统</a-button>
              </div>
            </div>
            <knowledge-graph
              v-else-if="knowledgeGraphData"
              :data="knowledgeGraphData"
              class="graph"
              show-legend
              show-minimap
            />
          </div>
        </div>
      </div>
      <div v-if="false && category" class="banner">
        <div class="title">我们有全面的IT分类岗位</div>
        <div class="sub-title">包含83个细分领域</div>
        <div class="banner-inner" :style="`--left-side-width:${bannerLeftSideCollapsed ? '170px' : '20rem'}`">
          <div class="left-side">
            <div class="menu">
              <Icon
                :icon="`${bannerLeftSideCollapsed ? 'RightOutlined' : 'LeftOutlined'}`"
                class="right"
                @click="bannerLeftSideCollapsed = !bannerLeftSideCollapsed"
                >收起
              </Icon>
              <div v-for="item in category" :key="item.name" class="menu-item">
                <span>{{ item.name }}</span>
                <div class="arrow">
                  <Icon icon="CaretRightOutlined" />
                </div>
                <div class="layer">
                  <div class="title">
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="content">
                    <i-navigator
                      v-for="i in item.children"
                      :key="i.name"
                      :to="{ name: 'jobSearch', query: { jobStandardId: i.id } }"
                      class="menu-item"
                    >
                      <span>{{ i.name }}</span>
                      <div class="arrow">
                        <Icon icon="CaretRightOutlined" />
                      </div>
                    </i-navigator>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a-carousel autoplay>
            <div class="carousel-item">
              <a
                v-for="item in tutorialList.slice(0, tutorialList.length / 2)"
                class="tutorial"
                :href="item.url"
                target="_blank"
                :key="item.url"
              >
                <img v-lazy-load="item.img" />
              </a>
            </div>
            <div class="carousel-item">
              <a
                v-for="item in tutorialList.slice(tutorialList.length / 2)"
                class="tutorial"
                :href="item.url"
                target="_blank"
                :key="item.url"
              >
                <img v-lazy-load="item.img" />
              </a>
            </div>
          </a-carousel>
        </div>
      </div>
      <div class="hot-company block-item">
        <div class="title">热门公司</div>
        <div class="sub-title">最热门的互联网公司</div>
        <div class="hot-company-list">
          <div class="line-odd">
            <i-navigator
              v-for="company in hotCompanyList.slice(0, hotCompanyList.length / 2)"
              :key="company.id"
              :to="{ name: 'companyDetail', query: { companyId: company.id } }"
              class="company-item"
            >
              <img v-lazy-load="company.logo" alt="company.name" />
            </i-navigator>
          </div>
          <div class="line-even">
            <i-navigator
              v-for="company in hotCompanyList.slice(hotCompanyList.length / 2)"
              :key="company.id"
              :to="{ name: 'companyDetail', query: { companyId: company.id } }"
              class="company-item"
            >
              <img v-lazy-load="company.logo" alt="company.name" />
            </i-navigator>
          </div>
        </div>
      </div>
      <div v-slide-in="{ distance: 200 }" class="job-recommend block-item">
        <div class="title">推荐岗位</div>
        <div class="sub-title">通过人工智能分析推荐最适合你的岗位</div>
        <a-tabs v-model:activeKey="tabKey" animated style="width: 1200px; overflow: hidden; padding: 5px 0">
          <a-tab-pane key="1" tab="推荐岗位">
            <div class="job-list">
              <job-card v-for="job in recommendJobList" :key="job.id" :job="job" />
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="最新岗位">
            <div class="job-list">
              <job-card v-for="job in newJobList" :key="job.id" :job="job" />
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="附近岗位">
            <div class="job-list">
              <job-card v-for="job in nearbyJobList" :key="job.id" :job="job" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <bottom-float-btn />
  </div>
</template>

<style lang="scss" scoped>
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

  .search-bar {
    --opacity: 0;
    --blur: 0;
    --top: calc(50vh - 120px + 55px);
    --shadow-opacity: 0;
    @apply sticky top-[var(--top)] z-[9] w-full p-5 box-border;
    transition: height 0.3s;
    backdrop-filter: blur(var(--blur));
    //box-shadow: 0 5px 10px rgba(0, 0, 0, var(--shadow-opacity));

    @include useTheme {
      @if (getMode() == 'dark') {
        @apply text-white;
        background: rgba((adjust-hue(hsl(0, 50%, 10%), hue(getColor('primary')))), var(--opacity));
      } @else {
        @apply text-gray-800;
        background: rgba((adjust-hue(hsl(0, 50%, 90%), hue(getColor('primary')))), var(--opacity));
      }
    }
  }

  .home-page-background {
    @apply fixed w-full top-0 h-[100vh] flex z-0;

    .left-panel {
      @apply relative w-full h-full z-10;
      .title-panel {
        @apply inline-block relative top-[40%] left-[7%];
        .title {
          --fontSize: 60px;
          @apply text-center mb-5;
          font-size: var(--fontSize);

          .job-name-outer {
            @apply relative h-[var(--fontSize)] overflow-hidden;
            .job-name {
              --job-name-top: 0px;
              @apply relative top-[var(--job-name-top)] flex flex-col font-bold;
              transition: top 0.5s;

              .item {
                @apply h-[calc(var(--fontSize)+1px)] leading-[calc(var(--fontSize)+1px)] cursor-pointer;
              }
            }
          }
        }

        .sub-title {
          @apply text-gray-500;
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
      }
    }
  }

  .home-page-bottom {
    @apply relative top-[100vh] w-full overflow-y-hidden flex flex-col items-center justify-center;
    transition: top 0.8s;

    .banner {
      @apply relative w-[1280px] h-auto mx-auto my-10;

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

    .block-item {
      @apply my-5 mx-auto w-[1200px] flex flex-col items-center justify-center;
      .title {
        @apply text-3xl font-bold text-center mb-5;
      }

      .sub-title {
        @apply text-gray-500 mb-5;
      }
    }

    .hot-company {
      width: 100vw !important;
      @apply flex flex-col items-center justify-center overflow-x-hidden mt-4;
      .hot-company-list {
        @apply w-fit flex flex-col items-center justify-center space-y-2;

        .company-item {
          @apply block w-60 h-24 mx-5 flex items-center justify-center rounded-[var(--border-radius)];
          @include useTheme {
            background: getModeVar('cardBgColor');
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

    .job-recommend {
      @apply box-border;
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

    .user-panel {
      @apply relative flex flex-row items-center justify-between overflow-auto h-[530px] px-2;

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
            @apply flex items-center justify-center w-24 h-10 mx-2 text-sm rounded-md cursor-pointer;
            span {
              @apply ml-2;
            }
          }
        }
      }

      .user-aside-no-login {
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
          @apply flex items-center;
          .action-item {
            @apply flex items-center justify-center w-20 h-10 mx-2 text-xl rounded-md cursor-pointer;
            span {
              @apply ml-2;
            }
          }
        }
      }

      .knowledge-graph {
        @apply relative flex flex-col items-center justify-center h-[500px] w-[70%];

        .graph-cot {
          @apply relative w-full h-full rounded-[var(--border-radius)] shadow-md;

          @include useTheme {
            background: rgba(getModeVar('cardBgColor'), 0.9);
          }

          .not-login {
            @apply flex flex-col items-center justify-center w-full h-full text-2xl;
          }
        }
      }
    }
  }
}
</style>
