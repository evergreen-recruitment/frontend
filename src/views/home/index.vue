<script setup lang="ts">
import { onMounted, ref } from 'vue'
import variables from '@/styles/variables.module.scss'
import { useAppStore } from '@/stores'
import {
  getHomeCategoryApi,
  getHomeKnowledgeGraphApi,
  getHomeNearbyJobsApi,
  getHomeNewJobsApi,
  getHomeRecommendApi,
  getHotSearchApi,
} from '@/apis/home'

const appStore = useAppStore()
const tabKey = ref('1')
const category = ref()
const hotSearch = ref()
const recommendJobList = ref()
const newJobList = ref()
const nearbyJobList = ref()
const knowledgeGraphData = ref()

onMounted(async () => {
  category.value = await getHomeCategoryApi()
  hotSearch.value = await getHotSearchApi()
  recommendJobList.value = await getHomeRecommendApi()
  newJobList.value = await getHomeNewJobsApi()
  nearbyJobList.value = await getHomeNearbyJobsApi()
  knowledgeGraphData.value = await getHomeKnowledgeGraphApi()
})
</script>

<template>
  <div class="home-page">
    <div class="search-panel">
      <div class="search-panel__inner">
        <job-search />
        <!--热门搜索-->
        <div class="hot-search">
          <div class="title">热门搜索</div>
          <div class="search-list">
            <a-tag :color="variables[appStore.themeName]" v-for="i in hotSearch" :key="i" class="search-item"
              >{{ i }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
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
                <div class="menu-item" v-for="i in item.children" :key="i.name">
                  <span>{{ i.name }}</span>
                  <div class="arrow">
                    <Icon icon="CaretRightOutlined" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a-carousel autoplay>
        <div class="carousel-item">常青招聘</div>
        <div class="carousel-item">常青招聘</div>
        <div class="carousel-item">常青招聘</div>
        <div class="carousel-item">常青招聘</div>
      </a-carousel>
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
    <div class="knowledge-graph block-item">
      <div class="title">相关职位(知识图谱分析)</div>
      <div class="sub-title">跟据大数据和算法分析得出</div>
      <knowledge-graph v-if="knowledgeGraphData" class="graph" :data="knowledgeGraphData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.home-page {
  @apply mb-10;

  .search-panel {
    @apply w-full h-64 flex flex-col items-center justify-center;

    @include useTheme {
      $t: getColor('primary');
      @if getMode() == 'dark' {
        background: linear-gradient(
          135deg,
          adjust-hue(hsl(0, 70%, 30%), hue(adjust-hue($t, -30))),
          adjust-hue(hsl(0, 70%, 30%), hue(adjust-hue($t, 30)))
        );
      } @else {
        background: linear-gradient(
          135deg,
          adjust-hue(hsl(0, 70%, 50%), hue(adjust-hue($t, -30))),
          adjust-hue(hsl(0, 70%, 50%), hue(adjust-hue($t, 30)))
        );
      }
    }

    .search-panel__inner {
      @apply w-[calc(var(--min-screen-width)-80px)];

      .hot-search {
        @apply w-[1000px] h-20 flex items-center justify-items-start;
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

  .banner {
    @apply relative w-[1280px] h-[500px] mx-auto mt-10;

    .left-side {
      @apply absolute w-80 h-full py-5 box-border bg-black bg-opacity-50 z-[1] backdrop-blur-3xl;

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

  .knowledge-graph {
    @apply min-h-[60vh] h-[700px];

    .graph {
      @apply w-full h-full rounded-[var(--border-radius)] shadow-md;

      @include useTheme {
        background: getModeVar('cardBgColor');
      }
    }
  }

  .carousel-item {
    font:
      400 70px hanyiyongzisonghei,
      serif;
  }
}
</style>
