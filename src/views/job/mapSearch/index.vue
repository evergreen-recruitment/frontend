<script setup lang="ts">
import { ref } from 'vue'

const gps = ref({ longitude: 116.333926, latitude: 39.997245 })
</script>

<template>
  <div>
    <i-map class="background-map" :longitude="gps.longitude" :latitude="gps.latitude" view-mode="2D" />
  </div>
</template>

<style scoped lang="scss">
.background-map {
  @apply fixed top-0 left-0 w-screen h-screen z-0;
}
</style>
