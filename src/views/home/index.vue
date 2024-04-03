<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useAppStore, useUserStore } from '@/stores'
import {
  getHomeCategoryApi,
  getHomeKnowledgeGraphApi,
  getHomeNearbyJobsApi,
  getHomeNewJobsApi,
  getHomeRecommendApi,
  getHotSearchApi,
} from '@/apis/home'

const userStore = useUserStore()
const appStore = useAppStore()
const tabKey = ref('1')
const category = ref()
const hotSearch = ref()
const recommendJobList = ref()
const newJobList = ref()
const nearbyJobList = ref()
const knowledgeGraphData = ref()
const delivered = ref(false)
const searchState = reactive({
  keyword: '',
  city: '',
})

onMounted(async () => {
  const footer = document.querySelector('.footer') as HTMLElement
  footer.style.top = 'calc(100vh - 58px)'
  category.value = await getHomeCategoryApi()
  hotSearch.value = await getHotSearchApi()
  recommendJobList.value = await getHomeRecommendApi()
  newJobList.value = await getHomeNewJobsApi()
  nearbyJobList.value = await getHomeNearbyJobsApi()
  knowledgeGraphData.value = await getHomeKnowledgeGraphApi()

  // 初始化页面时使用一次
  scrollEvent()
})

onUnmounted(() => {
  const footer = document.querySelector('.footer') as HTMLElement
  footer.style.top = '0'
  window.removeEventListener('scroll', () => {})
})
const titleSize = ref(35)

function scrollEvent() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight

  // 设置 搜索框的顶部距离 --blur 和 --opacity 变量
  const searchBar = document.querySelector('.search-bar') as HTMLElement | null
  const homePageBottom = document.querySelector('.mask') as HTMLElement | null
  const header = document.querySelector('.i-header') as HTMLElement | null

  const blurPercent = Number((scrollTop / clientHeight > 1 ? 1 : scrollTop / clientHeight).toFixed(2))
  const opacityPercent = Number((scrollTop / clientHeight > 0.8 ? 0.8 : scrollTop / clientHeight).toFixed(2))
  const searchBarPercent = Number((scrollTop / clientHeight > 1 ? 1 : scrollTop / clientHeight).toFixed(2))

  searchBar?.style.setProperty('--top', `calc((50vh - 120px) * ${1 - searchBarPercent} + 55px)`)
  searchBar?.style.setProperty('--opacity', `${opacityPercent}`)
  searchBar?.style.setProperty('--blur', `${searchBarPercent * 10}px`)
  searchBar?.style.setProperty('--shadow-opacity', `${opacityPercent * 0.2}`)
  header?.style.setProperty('--shadow-opacity', `${(1 - opacityPercent) * 0.2}`)

  homePageBottom?.style.setProperty('--blur', `${blurPercent * 10}px`)
  homePageBottom?.style.setProperty('--opacity', `${opacityPercent}`)
}

// 监听页面滚动事件
window.addEventListener('scroll', scrollEvent)
</script>

<template>
  <div class="home-page">
    <job-search-home class="search-bar" v-model:keyword="searchState.keyword" :title-size="titleSize" />
    <div class="search-panel">
      <div class="search-panel__inner">
        <!--热门搜索-->
        <!--<div class="hot-search">-->
        <!--  <div class="title">热门搜索</div>-->
        <!--  <div class="search-list">-->
        <!--    <a-tag :color="variables[appStore.themeName]" v-for="i in hotSearch" :key="i" class="search-item">-->
        <!--      <i-navigator :to="{ name: 'search', query: { keyword: i } }">-->
        <!--        {{ i }}-->
        <!--      </i-navigator>-->
        <!--    </a-tag>-->
        <!--  </div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="mask"></div>
    <div class="home-page-bottom">
      <div class="user-panel block-item">
        <div class="user-aside">
          <div class="user-info">
            <div class="avatar">
              <img src="@/assets/images/logo.png" alt="avatar" />
            </div>
            <div class="name">常青招聘</div>
            <div class="desc">大学生智慧招聘平台</div>
          </div>
          <div class="user-action">
            <i-navigator to="/auth/loginByCaptcha" class="action-item">
              <Icon icon="UserOutlined" />
              <span>登录</span>
            </i-navigator>
            <i-navigator to="/auth/loginByCaptcha" class="action-item">
              <Icon icon="UserAddOutlined" />
              <span>注册</span>
            </i-navigator>
          </div>
        </div>
        <div class="knowledge-graph">
          <div class="title">你最有概率投递的岗位(知识图谱分析)</div>
          <div class="sub-title">根据大数据和算法分析得出</div>
          <div class="graph-cot card">
            <div v-if="!userStore.token" class="not-login">
              <div class="title">未登录或未上传简历</div>
              <div class="desc"></div>
            </div>
            <!--<div v-if="!delivered" class="not-login">-->
            <!--  <div class="title">未登录</div>-->
            <!--  <div class="desc"></div>-->
            <!--</div>-->
            <knowledge-graph
              v-else-if="knowledgeGraphData"
              class="graph"
              :data="knowledgeGraphData"
              show-minimap
              show-legend
            />
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="title">我们有全面的IT分类岗位</div>
        <div class="sub-title">包含83个细分领域</div>
        <div class="banner-inner">
          <div class="left-side">
            <div class="menu">
              <div class="menu-item" v-for="item in category" :key="item.name">
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
                      class="menu-item"
                      v-for="i in item.children"
                      :key="i.name"
                      :to="{ name: 'search', query: { jobId: i.id } }"
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
              <img src="@/assets/images/logo1-white.png" alt="" style="width: 300px; height: auto; object-fit: cover" />
            </div>
            <div class="carousel-item">
              <img src="@/assets/images/logo1-white.png" alt="" style="width: 300px; height: auto; object-fit: cover" />
            </div>
            <div class="carousel-item">
              <img src="@/assets/images/logo1-white.png" alt="" style="width: 300px; height: auto; object-fit: cover" />
            </div>
            <div class="carousel-item">
              <img src="@/assets/images/logo1-white.png" alt="" style="width: 300px; height: auto; object-fit: cover" />
            </div>
          </a-carousel>
        </div>
      </div>
      <div class="job-recommend block-item">
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
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.home-page {
  @apply mb-10 relative;

  .mask {
    --blur: 0px;
    --opacity: 0;
    @apply fixed top-0 left-0 w-full h-[100vh] bg-amber-50 pointer-events-none;
    backdrop-filter: blur(var(--blur));
    //transition: background 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;

    @include useTheme {
      background: rgba(getModeVar('bg1color'), var(--opacity));
    }
  }

  .search-bar {
    --opacity: 0;
    --blur: 0;
    --top: calc(50vh - 120px + 55px);
    --shadow-opacity: 0;
    @apply fixed top-[var(--top)] z-[10] w-full p-5 box-border;

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

  .search-panel {
    @apply fixed w-full top-[-20vh]  h-[120vh] flex flex-col items-center justify-center z-0;

    @include useTheme {
      $t: getColor('primary');
      @if getMode() == 'dark' {
        background: linear-gradient(
          135deg,
          adjust-hue(hsl(0, 30%, 30%), hue(adjust-hue($t, -30))),
          adjust-hue(hsl(0, 30%, 30%), hue(adjust-hue($t, 30)))
        );
      } @else {
        background: linear-gradient(
          135deg,
          adjust-hue(hsl(0, 30%, 50%), hue(adjust-hue($t, -30))),
          adjust-hue(hsl(0, 30%, 50%), hue(adjust-hue($t, 30)))
        );
      }
    }

    .search-panel__inner {
      @apply w-[calc(var(--min-screen-width)-80px)];

      .hot-search {
        @apply relative w-[1000px] top-[50px] h-20 flex items-center justify-items-start;
        .title {
          @apply text-white text-xl;
        }

        .search-list {
          @apply flex items-center justify-center;
          .search-item {
            @apply mx-2;
          }
        }
      }
    }
  }

  .home-page-bottom {
    @apply relative top-[100vh] w-full flex flex-col items-center justify-center;

    .banner {
      @apply relative w-[1280px] h-auto mx-auto mt-10;

      .title {
        @apply text-3xl font-bold text-center mb-5;
      }

      .sub-title {
        @apply text-gray-500 mb-5 text-center;
      }

      .banner-inner {
        @apply relative h-full;
        .left-side {
          @apply absolute w-80 h-full py-5 box-border z-[1] backdrop-blur-3xl;

          background: rgba((adjust-hue(hsl(0, 50%, 10%), hue(getColor('primary')))), 0.8);

          .menu {
            @apply text-white;

            .menu-item {
              @apply w-full h-10 px-5 flex justify-between box-border cursor-pointer leading-10 hover:bg-[rgba(255,255,255,0.7)] hover:text-black;

              .layer {
                @apply absolute top-0 left-[20rem] w-[calc(1280px-20rem)] h-[500px] backdrop-blur-2xl hidden;

                @include useTheme {
                  background: linear-gradient(90deg, #ffffffa0, rgba(getColor('primary'), 0.7));
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

    .job-recommend {
      @apply box-border;
      .job-list {
        @apply grid gap-[15px] w-[calc(100%-1rem)];
        --card-width: 17.5rem;
        --card-height: 10rem;
        grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
        grid-template-rows: auto;
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
            @apply w-20 h-20 rounded-full overflow-hidden;
            img {
              @apply w-full h-full object-cover;
            }
          }

          .name {
            @apply text-2xl font-bold ml-5;
          }

          .desc {
            @apply text-gray-500;
          }
        }

        .user-action {
          @apply flex items-center;
          .action-item {
            @apply flex items-center justify-center w-20 h-10 mx-2 rounded-md cursor-pointer;
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
            @apply flex items-center justify-center w-full h-full text-2xl;
          }
        }
      }
    }
  }
}
</style>
