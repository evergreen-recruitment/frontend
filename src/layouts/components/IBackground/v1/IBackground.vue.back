<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import PerlinNoise from '@/layouts/components/IBackground/PerlinNoise/PerlinNoise'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const options = reactive({
  Background: appStore.darkMode === 'dark' ? '#000000' : '#ffffff',
  Color1: '#63ffeb',
  Color2: '#0799f2',
  Color3: '#57ccff',
  Length: 5,
  Nums: 400,
  Size: 2,
  noiseScale: 800,
  ColorMode: 'Linear Gradient',
})
let perlinNoise: any
onMounted(() => {
  perlinNoise = new PerlinNoise('.i-background', options)
})

function reCreate() {
  perlinNoise = null
  // @ts-ignore
  const iBackgroundDom = document.querySelector('.i-background') || ({} as HTMLElement)
  iBackgroundDom.innerHTML = ''
  options.Background = appStore.darkMode === 'dark' ? '#000000' : '#ffffff'
  perlinNoise = new PerlinNoise('.i-background', options)
}

defineExpose({
  reCreate,
})

window.addEventListener('resize', () => {
  reCreate()
})
</script>

<template>
  <div class="i-background"></div>
</template>

<style lang="scss" scoped>
.i-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #dddddd;
  z-index: -1;
}
</style>
