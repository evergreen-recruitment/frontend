<script lang="ts" setup>
import { nextTick, onUnmounted, ref } from 'vue'
import router from '@/router'
import CompanyCard from '@/components/CompanyCard/CompanyCard.vue'
import type { CompanyType } from '@/apis/company'

const props = defineProps<{
  searchCompanyList: CompanyType[]
  currentPage: number
  maxPage: number
}>()
const companyListRef = ref<HTMLElement | null>(null)
const floatButtonGroupRef = ref<HTMLElement | null>(null)
const current = ref(props.currentPage)

function onCurrentChange(val: number) {
  current.value = val
  toSearch()
}

function onNavClick(val: number) {
  current.value += val
  if (isNaN(current.value) || current.value < 1) {
    current.value = 1
  }
  if (current.value > props.maxPage) {
    current.value = props.maxPage
  }
  toSearch()
}

function toSearch() {
  router.push({
    name: 'companySearch',
    query: {
      ...router.currentRoute.value.query,
      current: current.value,
    },
  })
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
  const companyListElement = companyListRef.value
  const floatButtonGroupElement = document.querySelector('.ant-float-btn-group') as HTMLElement
  if (companyListElement && floatButtonGroupElement) {
    const rect = companyListElement.getBoundingClientRect()
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
  <div class="company-list-outer">
    <a-float-button-group
      class="page-btn"
      ref="floatButtonGroupRef"
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
        :formatter="(val: string) => `${val}/${maxPage}页`"
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
    <div class="company-list" ref="companyListRef">
      <company-card
        v-slide-in="{ enter: true }"
        v-for="company in searchCompanyList"
        :key="company.id"
        :company="company"
        class=""
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.company-list-outer {
  :deep(.ant-input-number) {
    width: 100% !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;

    input {
      text-align: center !important;
      padding: 0 !important;
      font-size: 10px;
    }
  }

  .compa-list {
    column-count: 2;
    column-gap: 10px;
  }
}
</style>
