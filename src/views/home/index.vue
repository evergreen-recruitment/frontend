<script setup lang="ts">
import { reactive, ref } from 'vue'

const tabKey = ref('1')
const hotSearch = ref(['Java工程师', 'SpringBoot', '前端工程师', '测试工程师', '人工智能', '运维'])
const data = reactive([
  {
    name: '后端开发',
    children: [
      {
        name: 'Java',
      },
      {
        name: 'PHP',
      },
      {
        name: 'Python',
      },
      {
        name: 'Node.js',
      },
      {
        name: 'Go',
      },
      {
        name: 'C++',
      },
      {
        name: 'C#',
      },
      {
        name: '其他',
      },
    ],
  },
  {
    name: '前端/移动开发',
    children: [
      {
        name: '前端开发工程师',
      },
      {
        name: 'Android',
      },
      {
        name: 'IOS',
      },
      {
        name: 'U3D',
      },
      {
        name: 'UE4',
      },
      {
        name: 'Cocos',
      },
      {
        name: '技术美术',
      },
    ],
  },
  {
    name: '测试',
    children: [
      {
        name: '测试工程师',
      },
      {
        name: '自动化测试',
      },
      {
        name: '功能测试',
      },
      {
        name: '性能测试',
      },
      {
        name: '安全测试',
      },
      {
        name: '游戏测试',
      },
      {
        name: '硬件测试',
      },
      {
        name: '其他',
      },
    ],
  },
  {
    name: '运维/技术支持',
    children: [
      {
        name: '运维工程师',
      },
      {
        name: '运维开发工程师',
      },
      {
        name: '网络工程师',
      },
      {
        name: '系统工程师',
      },
      {
        name: 'IT技术支持',
      },
      {
        name: '系统管理员',
      },
      {
        name: '数据库管理员',
      },
      {
        name: '其他',
      },
    ],
  },
  {
    name: '人工智能',
    children: [
      {
        name: '机器学习',
      },
      {
        name: '深度学习',
      },
      {
        name: '图像识别',
      },
      {
        name: '语音识别',
      },
      {
        name: '算法工程师',
      },
      {
        name: '数据挖掘',
      },
      {
        name: '自然语言处理',
      },
      {
        name: '其他',
      },
    ],
  },
])
</script>

<template>
  <div class="home-page">
    <div class="search-panel">
      <job-search />
      <!--热门搜索-->
      <div class="hot-search">
        <div class="title">热门搜索</div>
        <div class="search-list">
          <a-tag v-for="i in hotSearch" :key="i" class="search-item" color="blue">{{ i }}</a-tag>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="left-side">
        <div class="menu">
          <div class="menu-item" v-for="item in data" :key="item.name">
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
            <job-card v-for="i in 12" :key="i" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="最新岗位">
          <div class="job-list">
            <job-card v-for="i in 12" :key="i" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="附近岗位">
          <div class="job-list">
            <job-card v-for="i in 12" :key="i" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="knowledge-graph block-item">
      <div class="title">相关职位(知识图谱分析)</div>
      <div class="sub-title">跟据大数据和算法分析得出</div>
      <knowledge-graph class="graph" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.home-page {
  @apply mb-10;

  .search-panel {
    @apply w-full h-52 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center;

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
    @apply p-10;
    .job-list {
      --card-width: 18rem;
      --card-height: 10rem;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
      grid-template-rows: auto;
      gap: 15px;
    }
  }

  .knowledge-graph {
    @apply min-h-[60vh] h-[700px];

    .graph {
      @apply w-full h-full rounded-2xl shadow-md;

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
