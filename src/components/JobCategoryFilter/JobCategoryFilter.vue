<script setup lang="ts">
import { useStatusStore } from '@/stores'
import { computed } from 'vue'
import { findFullJobType } from '@/utils/utils'
import { useVModel } from '@vueuse/core'
import type { CascaderProps } from 'ant-design-vue'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'

const emit = defineEmits(['update:jobStandardId'])
const props = defineProps<{
  jobStandardId: number | undefined
}>()
const propsJobStandardId = useVModel(props, 'jobStandardId', emit)
const statusStore = useStatusStore()
const options = statusStore.jobCategory as CascaderProps['options']
/**
 * 处理搜索
 * @param inputValue
 * @param path
 */
const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}
/**
 * 这里计算出来的是两级职位类型的 id
 */
const CompJobStandardIds = computed(() => {
  if (props.jobStandardId === undefined || props.jobStandardId === null) {
    return []
  }
  const original = findFullJobType(props.jobStandardId!)
  return [original[0].id, original[1].id]
})

/**
 * 处理职位类型的选择
 * @param value
 */
function handleJobTypeChange(value: number[]) {
  if (value === undefined || value === null) {
    propsJobStandardId.value = undefined
  }
  if (value?.length > 1) {
    propsJobStandardId.value = value[1]
  } else {
    propsJobStandardId.value = undefined
  }
}
</script>

<template>
  <a-cascader
    :value="CompJobStandardIds"
    :options="options"
    :show-search="{ filter }"
    :field-names="{ label: 'name', value: 'id', children: 'children' }"
    class="job-type"
    expand-trigger="hover"
    placeholder="职位类型"
    @change="handleJobTypeChange"
  />
</template>

<style scoped lang="scss"></style>
