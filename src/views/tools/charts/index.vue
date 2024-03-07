<script lang="ts" setup>
import ICharts from '@/components/ICharts/ICharts.vue'
import { reactive, ref } from 'vue'
import { useAppStore } from '@/stores'
import jiangxi from '@/assets/map/jiangxi.json'
import * as echarts from 'echarts'

const appStore = useAppStore()
const option1 = reactive({
  title: {
    text: '能源消耗趋势图',
    subtext: '2023年1月至12月的能源消耗量变化趋势',
    x: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  legend: {
    data: ['电力'],
    x: 'left',
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
const option2 = reactive({
  title: {
    text: '能源消耗成本占比',
    subtext: '不同类型能源在总能源消耗成本中的占比情况',
    x: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['电力', '燃气', '水'],
  },
  series: [
    {
      name: '能源类型',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 60, name: '电力' },
        { value: 30, name: '燃气' },
        { value: 10, name: '水' },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
// @ts-ignore
echarts.registerMap('jiangxi', jiangxi)
const option3 = reactive({
  title: {
    text: '能源消耗区域分布地图',
    subtext: '江西省的能源消耗情况',
    x: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} 千瓦时',
  },
  visualMap: {
    min: 0,
    max: 5000,
    text: ['High', 'Low'], // 视觉映射的文本标签
    calculable: true,
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered'], // 颜色范围，可以自定义
    },
  },
  series: [
    {
      name: '能源消耗',
      type: 'map',
      mapType: 'jiangxi',
      roam: false,
      label: {
        show: true,
      },
      data: [
        { name: '南昌市', value: 5000 },
        { name: '吉安市', value: 3000 },
        { name: '赣州市', value: 4000 },
        { name: '景德镇市', value: 0 },
        { name: '萍乡市', value: 0 },
        { name: '九江市', value: 0 },
        { name: '新余市', value: 0 },
        { name: '鹰潭市', value: 0 },
        { name: '宜春市', value: 0 },
        { name: '抚州市', value: 0 },
        { name: '上饶市', value: 0 },
      ],
    },
  ],
})

// 提取设备名称和能效指标数据
let data = [
  { device: '设备1', efficiency: 80 },
  { device: '设备2', efficiency: 75 },
  { device: '设备3', efficiency: 85 },
]

const option4 = reactive({
  title: {
    text: '设备能效排名',
    subtext: '能源利用率（百分比）',
    x: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: '{b}: {c}%',
  },
  legend: {
    data: ['能源利用率'],
    x: 'left',
  },
  xAxis: {
    type: 'category',
    data: data.map(function (item) {
      return item.device
    }),
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}%',
    },
  },
  series: [
    {
      name: '能源利用率',
      type: 'bar',
      data: data.map(function (item) {
        return item.efficiency
      }),
    },
  ],
})
const threshold = 1500 // 能源消耗预警阈值
const option5 = reactive({
  title: {
    text: '能源消耗预警报表',
    subtext: '每月电力消耗',
    x: 'center',
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params: any) {
      const month = params[0].name
      let content = `${month}<br>`
      params.forEach((param: any) => {
        const value = param.value
        const status = value > threshold ? '超过预警阈值' : '正常'
        content += `${param.seriesName}: ${value} 千瓦时 (${status})<br>`
      })
      return content
    },
  },
  legend: {
    data: ['电力消耗'],
    x: 'left',
  },
  xAxis: {
    type: 'category',
    data: ['2023年1月', '2023年2月', '2023年3月', '2023年4月', '2023年5月', '2023年6月'],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 千瓦时',
    },
  },
  series: [
    {
      name: '电力消耗',
      type: 'bar',
      data: [1600, 1400, 1100, 900, 2300, 1300],
      itemStyle: {
        color: function (params: any) {
          return params.value > threshold ? 'orangered' : 'lightskyblue'
        },
      },
    },
  ],
})
const option6 = reactive({
  title: {
    text: '能源消耗排名',
    subtext: '区域、工厂或设备',
    x: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} 千瓦时',
  },
  legend: {
    data: ['能源消耗量'],
    x: 'left',
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 千瓦时',
    },
  },
  yAxis: {
    type: 'category',
    data: ['区域A', '区域B', '区域C'],
  },
  series: [
    {
      name: '能源消耗量',
      type: 'bar',
      data: [5000, 4000, 3500],
    },
  ],
})
let isFullScreen = ref(false)

function toggleFullScreen() {
  isFullScreen.value = !isFullScreen.value
  const ele = document.querySelector('.ant-layout-content') as any
  if (isFullScreen.value) {
    // 进入全屏
    if (ele.requestFullscreen) {
      ele.requestFullscreen()
    } else if (ele.webkitRequestFullScreen) {
      ele.webkitRequestFullScreen()
    } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen()
    } else if (ele.msRequestFullscreen) {
      ele.msRequestFullscreen()
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
      // @ts-ignore
    } else if (document.webkitCancelFullScreen) {
      // @ts-ignore
      document.webkitCancelFullScreen()
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen()
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen()
    }
  }
}
</script>

<template>
  <div class="energy-consumption-analysis">
    <a-space direction="vertical" size="large" style="width: 100%">
      <i-card class="title" title="能源消耗情况诊断大屏">
        <template #extra>
          <div style="font-size: 20px; color: #1890ff; cursor: pointer" @click="toggleFullScreen">
            <Icon :icon="isFullScreen ? 'FullscreenExitOutlined' : 'FullscreenOutlined'" />
          </div>
        </template>
        <p>可视化分析能源消耗情况</p>
      </i-card>

      <div class="grid-container">
        <i-card>
          <i-charts :option="option1" />
        </i-card>
        <i-card>
          <i-charts :option="option2" />
        </i-card>
        <i-card>
          <i-charts :option="option3" />
        </i-card>
        <i-card>
          <i-charts :option="option4" />
        </i-card>
        <i-card>
          <i-charts :option="option5" />
        </i-card>
        <i-card>
          <i-charts :option="option6" />
        </i-card>
      </div>
    </a-space>
  </div>
</template>

<style lang="scss" scoped>
.energy-consumption-analysis {
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
  }
}
</style>
