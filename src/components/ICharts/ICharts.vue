<template>
  <div class="chart">
    <v-echart :option="optionComputed" :theme="themeComputed" autoresize class="chart" v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
// ------基础文件---------
import VEchart from 'vue-echarts'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
// ------可选文件---------
import {
  BarChart,
  BoxplotChart,
  CandlestickChart,
  GaugeChart,
  HeatmapChart,
  LineChart,
  MapChart,
  PieChart,
  RadarChart,
  SankeyChart,
  ScatterChart,
} from 'echarts/charts'
// @ts-ignore
import { Bar3DChart } from 'echarts-gl/charts'
// @ts-ignore
import { Grid3DComponent } from 'echarts-gl/components'
import {
  CalendarComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  PolarComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'
import { computed } from 'vue'
import { useAppStore } from '@/stores'

use([
  SVGRenderer,
  BarChart,
  MapChart,
  PieChart,
  GridComponent,
  PolarComponent,
  RadarChart,
  HeatmapChart,
  LineChart,
  ScatterChart,
  CandlestickChart,
  BoxplotChart,
  SankeyChart,
  Bar3DChart,
  GaugeChart,
  TooltipComponent,
  VisualMapComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  CalendarComponent,
  Grid3DComponent,
])
const props = defineProps<{
  option: any
  theme?: string
}>()
const appStore = useAppStore()
// 暗亮色通过变量获取
const themeComputed = computed(() => {
  return props.theme || appStore.darkMode
})
// 将option中添加backgroundColor=transparent的属性
const optionComputed = computed(() => {
  let o = {} as any
  Object.assign(o, props.option)
  if (!o.backgroundColor) {
    o.backgroundColor = 'transparent'
  }
  if (!o.tooltip) {
    return o
  }
  o.tooltip = {
    ...o.tooltip,
    backgroundColor: appStore.darkMode === 'light' ? '#fff' : '#000',
    borderColor: appStore.darkMode === 'light' ? '#fff' : '#000',
    textStyle: {
      color: appStore.darkMode === 'light' ? '#000' : '#fff',
    },
  }

  return o
})
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
