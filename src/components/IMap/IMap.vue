<script setup lang="ts">
import { onUnmounted } from 'vue'
import { isEmpty } from '@/utils/utils'

const props = defineProps<{
  longitude: number
  latitude: number
}>()

let map: any = null

function init(amap: any) {
  map = amap
}

function clickMarker() {
  // 地图居中
  map.setCenter([props.longitude, props.latitude])
  map.setZoom(18)
}

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div class="i-map">
    <el-amap
      :center="[isEmpty(longitude) ? 116.333926 : longitude, isEmpty(latitude) ? 39.997245 : latitude]"
      :zoom="18"
      :zooms="[12, 19]"
      :pitch="50"
      :rotation="-15"
      view-mode="3D"
      terrain
      @init="init"
    >
      <el-amap-marker
        :position="[isEmpty(longitude) ? 116.333926 : longitude, isEmpty(latitude) ? 39.997245 : latitude]"
        :offset="[-10, -34]"
        @click="clickMarker"
      >
        <div class="custom-content-marker">
          <img src="https://a.amap.com/jsapi/static/image/plugin/marker_red.png" />
        </div>
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<style lang="scss">
@import './style.scss';

.i-map {
  @apply relative w-full h-full;
}
</style>
