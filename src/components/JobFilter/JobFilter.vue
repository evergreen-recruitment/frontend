<script setup lang="ts">
import type { JobFilterType } from '@/apis/job'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:jobFilterData'])
const props = defineProps<{
  jobFilterData: JobFilterType
}>()

const propsJobFilterData = useVModel(props, 'jobFilterData', emit)
</script>

<template>
  <div class="job-filter">
    <a-tag v-for="item in propsJobFilterData" :key="item" closable>{{ item }}</a-tag>
    <a-space-compact block>
      <a-dropdown class="job-type" trigger="click">
        <a-button> 职位类型</a-button>
        <template #overlay>
          <!--<a-menu v-model:selected-keys="propsJobFilter.jobType">-->
          <!--  <a-menu-item> 1</a-menu-item>-->
          <!--  <a-menu-item> 2</a-menu-item>-->
          <!--  <a-menu-item> 3</a-menu-item>-->
          <!--</a-menu>-->
        </template>
      </a-dropdown>
      <a-dropdown class="apply-type" trigger="click">
        <a-button> 求职类型</a-button>
        <template #overlay>
          <a-menu v-model:selected-keys="propsJobFilterData.needJobType">
            <a-menu-item :key="0"> 不限</a-menu-item>
            <a-menu-item :key="1"> 全职</a-menu-item>
            <a-menu-item :key="2"> 兼职</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown class="experience-type" trigger="click">
        <a-button> 工作经验</a-button>
        <template #overlay>
          <a-menu v-model:selected-keys="propsJobFilterData.experience">
            <a-menu-item :key="0"> 不限</a-menu-item>
            <a-menu-item :key="1"> 在校生</a-menu-item>
            <a-menu-item :key="2"> 应届生</a-menu-item>
            <a-menu-item :key="3"> 经验不限</a-menu-item>
            <a-menu-item :key="4"> 一年以内</a-menu-item>
            <a-menu-item :key="5"> 1-3年</a-menu-item>
            <a-menu-item :key="6"> 3-5年</a-menu-item>
            <a-menu-item :key="7"> 5-10年</a-menu-item>
            <a-menu-item :key="8"> 10年以上</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown class="Nature treatment" trigger="click">
        <a-button> 薪资待遇</a-button>
        <template #overlay>
          <a-menu v-model:selected-keys="propsJobFilterData.salary">
            <a-menu-item :key="0"> 不限</a-menu-item>
            <a-menu-item :key="1"> 3k以下</a-menu-item>
            <a-menu-item :key="2"> 3k-5k</a-menu-item>
            <a-menu-item :key="3"> 5k-10k</a-menu-item>
            <a-menu-item :key="4"> 10k-20k</a-menu-item>
            <a-menu-item :key="5"> 20k-50k</a-menu-item>
            <a-menu-item :key="6"> 50k以上</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-space-compact>
  </div>
</template>

<style scoped lang="scss"></style>
