<script setup lang="ts">
import { nextTick, onUnmounted, ref } from 'vue'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['search', 'update:currentPage'])
const props = defineProps<{
  currentPage: number
  maxPage: number
  containerRef: HTMLElement
}>()
const current = useVModel(props, 'currentPage', emit)
let formatter = ref<(val: string) => string>((val) => {
  // TODO 为什么maxPage更新时不会执行到这
  return `${val}/${props.maxPage}页`
})

function onCurrentChange(val: number) {
  current.value = val
  emit('search')
}

function onNavClick(val: number) {
  current.value += val
  if (isNaN(current.value) || current.value < 1) {
    current.value = 1
  }
  if (current.value > props.maxPage) {
    current.value = props.maxPage
  }
  emit('search')
}

nextTick(() => {
  setTimeout(() => {
    updatePosition()
  }, 500)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition)
  window.removeEventListener('resize', updatePosition)
})

function updatePosition() {
  const jobListElement = props.containerRef
  const floatButtonGroupElement = document.querySelector('.page-btn') as HTMLElement
  if (jobListElement && floatButtonGroupElement) {
    const rect = jobListElement.getBoundingClientRect()
    let left = rect.left - floatButtonGroupElement.offsetWidth
    // let top = rect.top + rect.height / 2 - floatButtonGroupElement.offsetHeight / 2
    let top = window.scrollY + window.innerHeight / 2 - floatButtonGroupElement.offsetHeight / 2
    // console.log(top)
    // 判断floatButtonGroup的左边是否超出了屏幕
    if (left < 0) {
      left = 0
    }
    // 判断floatButtonGroup的顶部是否超出了jobList
    if (top < rect.top) {
      top = rect.top
    }
    // 判断floatButtonGroup的底部是否超出了jobList TODO
    // console.log(top + floatButtonGroupElement.offsetHeight, rect.bottom)
    // if (top + floatButtonGroupElement.offsetHeight > rect.bottom) {
    //   top = rect.bottom - floatButtonGroupElement.offsetHeight
    // }
    floatButtonGroupElement.style.left = `${left}px`
    floatButtonGroupElement.style.top = `${top}px`
  }
}
</script>

<template>
  <a-float-button-group
    v-if="maxPage !== 0"
    class="page-btn"
    shape="square"
    style="position: absolute; top: 35%; height: fit-content"
  >
    <a-float-button @click="onNavClick(-1)">
      <template #icon>
        <UpOutlined />
      </template>
    </a-float-button>

    <a-input-number
      :value="current"
      :formatter="formatter"
      :parser="(val: string) => Number(val.split('/')[0])"
      :min="1"
      :max="maxPage"
      @change="onCurrentChange"
      :controls="false"
      style=""
    />

    <a-float-button @click="onNavClick(+1)">
      <template #icon>
        <DownOutlined />
      </template>
    </a-float-button>
  </a-float-button-group>
</template>

<style scoped lang="scss"></style>
