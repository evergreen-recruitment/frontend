<script lang="ts" setup>
import type { JobFilterType } from '@/apis/job'
import { JobExperienceEnum, JobSalaryEnum, JobTypeEnum } from '@/apis/job'
import type { CascaderProps } from 'ant-design-vue'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
import { useVModel } from '@vueuse/core'
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
  if (props.jobFilterData.jobStandardId === undefined || props.jobFilterData.jobStandardId === null) {
    return []
  }
  const original = findFullJobType(props.jobFilterData.jobStandardId!)
  return [original[0].id, original[1].id]
})

function handleJobTypeChange(value: number[]) {
  if (value === undefined || value === null) {
    props.jobFilterData.jobStandardId = undefined
  }
  if (value?.length > 1) {
    props.jobFilterData.jobStandardId = value[1]
  } else {
    props.jobFilterData.jobStandardId = undefined
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
        <a-select-option v-for="(item, index) in JobTypeEnum" :value="Number(index)">{{ item }}</a-select-option>
      </a-select>
      <a-select
        v-model:value="propsJobFilterData.experience"
        class="experience-type"
        placeholder="工作经验"
        style="width: 200px"
      >
        <a-select-option v-for="(item, index) in JobExperienceEnum" :value="Number(index)">{{ item }}</a-select-option>
      </a-select>
      <a-select
        v-model:value="propsJobFilterData.salary"
        class="Nature treatment"
        placeholder="薪资待遇"
        style="width: 200px"
      >
        <a-select-option v-for="(item, index) in JobSalaryEnum" :value="Number(index)">{{ item }}</a-select-option>
      </a-select>
    </a-space-compact>
  </div>
</template>

<style lang="scss" scoped></style>
