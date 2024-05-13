<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useAppStore } from '@/stores'

const props = withDefaults(
  defineProps<{
    longitude?: number
    latitude?: number
    viewMode?: '2D' | '3D'
  }>(),
  {
    longitude: 116.333926,
    latitude: 39.997245,
    viewMode: '3D',
  },
)

const appStore = useAppStore()

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
      :center="[longitude, latitude]"
      :zoom="18"
      :zooms="[12, 19]"
      :pitch="50"
      :rotation="-15"
      :view-mode="viewMode"
      :map-style="appStore.darkMode === 'dark' ? 'amap://styles/dark' : 'amap://styles/normal'"
      terrain
      @init="init"
    >
      <el-amap-marker :position="[longitude, latitude]" :offset="[-10, -34]" @click="clickMarker">
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
