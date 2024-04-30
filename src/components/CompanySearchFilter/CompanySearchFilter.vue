<script setup lang="ts">
import { useStatusStore } from '@/stores'
import type { CompanyFilterType } from '@/apis/company'
import { CompanyScaleEnum, CompanyStageEnum } from '@/apis/company'
import { useVModel } from '@vueuse/core'
import type { CascaderProps } from 'ant-design-vue'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
import { computed } from 'vue'
import { findFullIndustry } from '@/utils/utils'

const statusStore = useStatusStore()
const emit = defineEmits(['update:companyFilterData'])
const props = defineProps<{
  companyFilterData: CompanyFilterType
}>()

const propsCompanyFilterData = useVModel(props, 'companyFilterData', emit)
const options = statusStore.industryList as CascaderProps['options']
const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}
const industryId = computed(() => {
  if (props.companyFilterData.industryId === undefined || props.companyFilterData.industryId === null) {
    return []
  }
  const original = findFullIndustry(props.companyFilterData.industryId!)
  return [original[0].code, original[1].code]
})

function handleCompanyTypeChange(value: number[]) {
  if (value === undefined || value === null) {
    props.companyFilterData.industryId = undefined
  }
  if (value?.length > 1) {
    props.companyFilterData.industryId = value[1]
  } else {
    props.companyFilterData.industryId = undefined
  }
}
</script>

<template>
  <div class="company-filter">
    <a-space-compact block>
      <a-cascader
        :value="industryId"
        :options="options"
        :show-search="{ filter }"
        :field-names="{ label: 'name', value: 'code', children: 'children' }"
        class="job-type"
        expand-trigger="hover"
        placeholder="行业类型"
        @change="handleCompanyTypeChange"
        style="width: 200px"
      />
      <a-select
        v-model:value="propsCompanyFilterData.scaleId"
        class="scale-type"
        placeholder="规模大小"
        style="width: 200px"
      >
        <a-select-option v-for="(item, index) in CompanyScaleEnum" :value="Number(index)">{{ item }}</a-select-option>
      </a-select>
      <a-select
        v-model:value="propsCompanyFilterData.stageId"
        class="stage-type"
        placeholder="融资情况"
        style="width: 200px"
      >
        <a-select-option v-for="(item, index) in CompanyStageEnum" :value="Number(index)">{{ item }}</a-select-option>
      </a-select>
    </a-space-compact>
  </div>
</template>

<style scoped lang="scss"></style>
