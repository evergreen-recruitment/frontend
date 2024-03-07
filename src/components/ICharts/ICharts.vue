<template>
  <div class="chart">
    <v-echart v-bind="$attrs" class="chart" :option="optionComputed" :theme="themeComputed" autoresize />
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
  HeatmapChart,
  LineChart,
  MapChart,
  PieChart,
  RadarChart,
  SankeyChart,
  ScatterChart,
} from 'echarts/charts'
import {
  CalendarComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
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
  RadarChart,
  HeatmapChart,
  LineChart,
  ScatterChart,
  CandlestickChart,
  BoxplotChart,
  SankeyChart,
  TooltipComponent,
  VisualMapComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  CalendarComponent,
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
  } else {
    o.tooltip = {
      ...o.tooltip,
      backgroundColor: appStore.darkMode === 'light' ? '#fff' : '#000',
      borderColor: appStore.darkMode === 'light' ? '#fff' : '#000',
      textStyle: {
        color: appStore.darkMode === 'light' ? '#000' : '#fff',
      },
    }
  }
  return o
})
</script>

<style lang="scss" scoped></style>
