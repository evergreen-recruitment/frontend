<script setup lang="ts">
import { BorderBox11, Decoration5, Decoration8 } from '@kjgl77/datav-vue3'
import { reactive } from 'vue'

const option1 = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  yAxis: {
    type: 'value',
    name: '能源消耗量（千瓦时）',
  },
  series: [
    {
      name: '电力',
      type: 'line',
      data: [1000, 1200, 1100, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100],
      smooth: true,
    },
  ],
})
</script>

<template>
  <div class="bg-screen">
    <border-box11 title="常青招聘数据大屏" :title-width="400" :color="['#4fd2dd', '#235fa7']">
      <div v-if="false" class="title">
        <div class="title-content">常青招聘数据大屏</div>
        <div class="title-frame">
          <decoration8 style="width: 30%; height: 50px" />
          <decoration5 :dur="3" style="width: 40%; height: 40px" />
          <decoration8 reverse style="width: 30%; height: 50px" />
        </div>
      </div>
      <div v-if="false" class="grid-container">
        <border-box11
          class="border-card"
          v-for="i in 4"
          title="dv-border-box-11"
          :color="['#4fd2dd', '#235fa7']"
          :key="i"
          :title-width="400"
          :animate="false"
        >
          <i-charts dv-bg :option="option1" />
        </border-box11>
      </div>
    </border-box11>
  </div>
</template>

<style lang="scss" scoped>
.bg-screen {
  @apply w-full h-full;
  background: url('@/assets/images/bg-screen-image.png') no-repeat center center;
  background-size: cover;

  .title {
    @apply w-full h-[90px] p-2 flex flex-col items-center justify-center box-border;
    .title-content {
      @apply text-white font-bold text-3xl;
    }

    .title-frame {
      @apply w-full h-[40px] flex justify-between items-center;
    }
  }

  .grid-container {
    --card-width: 600px;
    --card-height: 400px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
    grid-template-rows: auto;
    gap: 15px;

    @media screen and (max-width: 1600px) {
      --card-width: 500px;
    }

    @media screen and (max-width: 1280px) {
      --card-width: 400px;
      --card-height: 300px;
    }

    @media screen and (max-width: 1024px) {
      --card-width: 300px;
      --card-height: 250px;
    }

    :deep(.chart) {
      height: var(--card-height);
    }

    .border-card {
      //@apply bg-[#1890FF30];
      :deep(.border-box-content) {
        @apply p-5 pt-10  box-border;
      }
    }
  }
}
</style>
