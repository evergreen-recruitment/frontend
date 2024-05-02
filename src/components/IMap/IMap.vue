<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const props = defineProps<{
  gps: {
    longitude: number
    latitude: number
  }
}>()

let map: any = null

// @ts-ignore
window._AMapSecurityConfig = {
  securityJsCode: '180c94c4fba4aae49383fef2161ab6a1',
}

onMounted(() => {
  //点标记显示内容
  const markerContent = `<div class='custom-content-marker'>
    <img src='https://a.amap.com/jsapi/static/image/plugin/marker_red.png'>
  </div>
  `
  AMapLoader.load({
    key: '410807074b37e182410b296f03e67c2a', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      // 初始化地图
      map = new AMap.Map(document.querySelector('div.i-map'), {
        rotateEnable: true,
        pitchEnable: true,
        zoom: 18,
        pitch: 50,
        rotation: -15,
        viewMode: '3D',
        terrain: true, // 开启3D地形图
        zooms: [12, 19],
        // center: [props.gps.longitude, props.gps.latitude],
        center: [116.333926, 39.997245],
      })
      const marker = new AMap.Marker({
        // position: [props.gps.longitude, props.gps.latitude],
        position: [116.333926, 39.997245],
        content: markerContent,
        offset: new AMap.Pixel(-13, -30),
      })
      marker.on('click', () => {
        map.setCenter(marker.getPosition())
      })
      map?.add(marker)
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div class="i-map"></div>
</template>

<style lang="scss">
@import './style.scss';

.a-map {
  @apply relative w-full h-full;
}
</style>
