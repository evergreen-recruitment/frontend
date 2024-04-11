<script lang="ts" setup>
import type { JobFilterType } from '@/apis/job'
import { useVModel } from '@vueuse/core'
import type { CascaderProps } from 'ant-design-vue'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
import { useStatusStore } from '@/stores'
import { findFullJobType } from '@/utils/utils'
import { computed } from 'vue'

const statusStore = useStatusStore()
const emit = defineEmits(['update:jobFilterData'])
const props = defineProps<{
  jobFilterData: JobFilterType
}>()

const propsJobFilterData = useVModel(props, 'jobFilterData', emit)
const options = statusStore.jobCategory as CascaderProps['options']

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}
const jobStandardId = computed(() => {
  const original = findFullJobType(props.jobFilterData.jobStandardId!)
  return [original[0].id, original[1].id]
})

function handleJobTypeChange(value: number[]) {
  console.log(findFullJobType(props.jobFilterData.jobStandardId!))
  if (value.length > 1) {
    props.jobFilterData.jobStandardId = value[1]
  } else {
    props.jobFilterData.jobStandardId = null
  }
}
</script>

<template>
  <div class="job-filter">
    <a-space-compact block>
      <a-cascader
        :value="jobStandardId"
        :options="options"
        :show-search="{ filter }"
        :field-names="{ label: 'name', value: 'id', children: 'children' }"
        class="job-type"
        expand-trigger="hover"
        placeholder="职位类型"
        @change="handleJobTypeChange"
        style="width: 200px"
      />
      <a-select
        v-model:value="propsJobFilterData.jobType"
        class="apply-type"
        placeholder="求职类型"
        style="width: 200px"
      >
        <a-select-option :value="0">不限</a-select-option>
        <a-select-option :value="1">全职</a-select-option>
        <a-select-option :value="2">实习</a-select-option>
      </a-select>
      <a-select
        v-model:value="propsJobFilterData.experience"
        class="experience-type"
        placeholder="工作经验"
        style="width: 200px"
      >
        <a-select-option :value="0">经验不限</a-select-option>
        <a-select-option :value="1">在校/应届</a-select-option>
        <a-select-option :value="2">1-3年</a-select-option>
        <a-select-option :value="3">3-5年</a-select-option>
        <a-select-option :value="4">5-10年</a-select-option>
        <a-select-option :value="5">10年以上</a-select-option>
      </a-select>
      <a-select
        v-model:value="propsJobFilterData.salary"
        class="Nature treatment"
        placeholder="薪资待遇"
        style="width: 200px"
      >
        <a-select-option :value="0">不限</a-select-option>
        <a-select-option :value="1">3k以下</a-select-option>
        <a-select-option :value="2">3k-5k</a-select-option>
        <a-select-option :value="3">5k-10k</a-select-option>
        <a-select-option :value="4">10k-20k</a-select-option>
        <a-select-option :value="5">20k-50k</a-select-option>
        <a-select-option :value="6">50k以上</a-select-option>
      </a-select>
    </a-space-compact>
  </div>
</template>

<style lang="scss" scoped></style>
