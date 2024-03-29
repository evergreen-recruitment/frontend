<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import type { JobItem } from '@/types/commonTypes'
import INavigator from '@/components/INavigator/INavigator.vue'
import router from '@/router'
import KnowledgeGraph from '@/components/KnowledgeGraph/KnowledgeGraph.vue'
import { getHomeKnowledgeGraphApi } from '@/apis/home'
import type { GraphData } from '@antv/g6'

const searchState = reactive({
  keyword: '',
  city: '',
})
const cityList = ref([
  {
    code: 100010000,
    name: '全国',
  },
  {
    code: 101010100,
    name: '北京',
  },
  {
    code: 101020100,
    name: '上海',
  },
  {
    code: 101280100,
    name: '广州',
  },
  {
    code: 101280600,
    name: '深圳',
  },
  {
    code: 101210100,
    name: '杭州',
  },
  {
    code: 101030100,
    name: '天津',
  },
  {
    code: 101110100,
    name: '西安',
  },
  {
    code: 101190400,
    name: '苏州',
  },
  {
    code: 101200100,
    name: '武汉',
  },
  {
    code: 101230200,
    name: '厦门',
  },
  {
    code: 101250100,
    name: '长沙',
  },
  {
    code: 101270100,
    name: '成都',
  },
  {
    code: 101180100,
    name: '郑州',
  },
  {
    code: 101040100,
    name: '重庆',
  },
])

const similarSearch = ref([
  'java开发',
  'java初级开发工程师',
  '程序员',
  'java后端',
  'java中级开发工程师',
  '前端',
  '码农',
  '测试',
  '架构师',
  '后台开发',
])

const searchJobList = reactive<JobItem[]>([
  {
    id: '1',
    title: 'Java开发工程师',
    salary: ['15k', '30k'],
    experience: '3-5年',
    education: '本科',
    hr: '张三',
    company: '阿里巴巴',
    description: '负责公司后端开发工作',
    address: '北京',
    createTime: '2024-03-11',
    tags: ['Java', '后端', '高级'],
  },
  {
    id: '2',
    title: '前端开发工程师',
    salary: ['10k', '20k'],
    experience: '1-3年',
    education: '本科',
    hr: '李四',
    company: '腾讯',
    description: '负责公司前端开发工作',
    address: '上海',
    createTime: '2024-03-01',
    tags: ['前端', '初级'],
  },
  {
    id: '3',
    title: '测试工程师',
    salary: ['8k', '15k'],
    experience: '1-3年',
    education: '本科',
    hr: '王五',
    company: '百度',
    description: '负责公司测试工作',
    address: '广州',
    createTime: '2024-01-01',
    tags: ['测试', '初级'],
  },
  {
    id: '4',
    title: '运维工程师',
    salary: ['10k', '20k'],
    experience: '3-5年',
    education: '本科',
    hr: '赵六',
    company: '华为',
    description: '负责公司运维工作',
    address: '深圳',
    createTime: '2024-03-02',
    tags: ['运维', '中级'],
  },
  {
    id: '5',
    title: '人工智能工程师',
    salary: ['20k', '40k'],
    experience: '3-5年',
    education: '硕士',
    hr: '小明',
    company: '小米',
    description: '负责公司人工智能工作',
    address: '杭州',
    createTime: '2024-02-21',
    tags: ['人工智能', '高级'],
  },
])
const knowledgeGraphData = ref<GraphData>()
watchEffect(() => {
  searchState.keyword = (router.currentRoute.value.query.keyword as string) || ''
})
onMounted(async () => {
  knowledgeGraphData.value = await getHomeKnowledgeGraphApi()
})
</script>

<template>
  <div class="search-page">
    <div class="search-panel card">
      <job-search v-model:keyword="searchState.keyword" />
      <div class="city-list">
        <router-link class="city" :to="{ name: 'search', query: { city: c.code } }" v-for="c in cityList" :key="c.code">
          {{ c.name }}
        </router-link>
        <router-link class="city" to="/search">其他城市</router-link>
      </div>
      <div class="filter-panel block-item">
        <job-filter />
      </div>
    </div>

    <div class="job">
      <div class="job-list block-item">
        <job-item v-for="job in searchJobList" :key="job.id" :job="job" />
      </div>
      <div class="job-side block-item">
        <div class="graph-cot card">
          <knowledge-graph v-if="knowledgeGraphData" class="graph" :data="knowledgeGraphData" :zoom="0.5" />
        </div>
        <div class="other-search card">
          <div class="title">相关搜索</div>
          <div class="search-list">
            <i-navigator
              class="search-item"
              v-for="item in similarSearch"
              :key="item"
              :to="{ name: 'search', query: { keyword: item } }"
              open-in-new-window
            >
              <span>{{ item }}</span>
              <div class="arrow">
                <Icon icon="CaretRightOutlined" />
              </div>
            </i-navigator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.search-page {
  .search-panel {
    @apply mt-10 mx-auto p-5 pb-10 rounded-[var(--border-radius)] shadow-lg;

    @include useTheme {
      background-color: getModeVar('cardBgColor');
    }

    :deep(.title) {
      @include useTheme {
        color: getModeVar('textColor');
      }
    }

    .city-list {
      @apply my-5 flex items-center justify-items-start;
      .city {
        @apply mx-2;
      }
    }
  }

  .block-item {
    @apply mt-5;
  }

  .job {
    @apply flex;
    .graph-cot {
      @apply w-full h-[300px] mb-7 rounded-[var(--border-radius)] shadow-md;

      @include useTheme {
        background: getModeVar('cardBgColor');
      }
    }

    .job-list {
      @apply w-[calc(14/19*100%)];
    }

    .job-side {
      @apply w-[calc(5/19*100%)] h-fit ml-5;

      .other-search {
        @apply shadow-lg box-border px-2 py-3;

        @include useTheme {
          background-color: getModeVar('cardBgColor');
        }

        .title {
          @apply text-lg font-bold;
        }

        .search-list {
          .search-item {
            @apply flex box-border items-center justify-between w-full px-2 my-0.5 h-10 rounded-[var(--border-radius)] cursor-pointer;
            border: 1px solid transparent;

            &:hover {
              @include useTheme {
                border: 1px solid getColor('primary');
                @if getMode() == 'light' {
                  background: rgba(adjust-hue(hsl(0, 50%, 85%), hue(getColor('primary'))), 0.8);
                } @else {
                  background: rgba(adjust-hue(hsl(0, 50%, 15%), hue(getColor('primary'))), 0.8);
                }
              }
            }

            span {
              @apply cursor-pointer;
            }

            .arrow {
              @apply ml-2;
            }
          }
        }
      }
    }
  }
}
</style>
