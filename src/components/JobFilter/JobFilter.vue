<script lang="ts" setup>
import type { JobCategoryType, JobFilterType } from '@/apis/job'
import { useVModel } from '@vueuse/core'
import type { CascaderProps } from 'ant-design-vue'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
import { useStatusStore } from '@/stores'

const statusStore = useStatusStore()
const emit = defineEmits(['update:jobFilterData'])
const props = defineProps<{
  jobFilterData: JobFilterType
}>()

const propsJobFilterData = useVModel(props, 'jobFilterData', emit)

function convertNameIdToLabelValue(data: JobCategoryType[]): any {
  return data.map((item: JobCategoryType) => {
    return {
      label: item.name,
      value: item.id,
      children: item.children ? convertNameIdToLabelValue(item.children) : [],
    }
  })
}

const options = convertNameIdToLabelValue(statusStore.jobCategory) as CascaderProps['options']

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}

function handleJobTypeChange(value: number[]) {
  if (value.length > 1) {
    props.jobFilterData.jobType = value[1]
  } else {
    props.jobFilterData.jobType = null
  }
}
</script>

<template>
  <div class="job-filter">
    <a-space-compact block>
      <a-cascader
        :options="options"
        :show-search="{ filter }"
        class="job-type"
        expand-trigger="hover"
        placeholder="职位类型"
        @change="handleJobTypeChange"
      />
      <a-select v-model="propsJobFilterData.needJobType" class="apply-type" placeholder="求职类型">
        <a-select-option value="0">不限</a-select-option>
        <a-select-option value="1">正式</a-select-option>
        <a-select-option value="2">实习</a-select-option>
      </a-select>
      <a-select v-model="propsJobFilterData.experience" class="experience-type" placeholder="工作经验">
        <a-select-option value="0">不限</a-select-option>
        <a-select-option value="1">在校生</a-select-option>
        <a-select-option value="2">应届生</a-select-option>
        <a-select-option value="3">经验不限</a-select-option>
        <a-select-option value="4">一年以内</a-select-option>
        <a-select-option value="5">1-3年</a-select-option>
        <a-select-option value="6">3-5年</a-select-option>
        <a-select-option value="7">5-10年</a-select-option>
        <a-select-option value="8">10年以上</a-select-option>
      </a-select>
      <a-select v-model="propsJobFilterData.salary" class="Nature treatment" placeholder="薪资待遇">
        <a-select-option value="0">不限</a-select-option>
        <a-select-option value="1">3k以下</a-select-option>
        <a-select-option value="2">3k-5k</a-select-option>
        <a-select-option value="3">5k-10k</a-select-option>
        <a-select-option value="4">10k-20k</a-select-option>
        <a-select-option value="5">20k-50k</a-select-option>
        <a-select-option value="6">50k以上</a-select-option>
      </a-select>
    </a-space-compact>
  </div>
</template>

<style lang="scss" scoped></style>
