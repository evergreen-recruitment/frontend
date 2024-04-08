<script lang="ts" setup>
import type { CascaderProps } from 'ant-design-vue'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
// @ts-ignore
import city from './map/city.json'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:value', 'update:text'])
const props = defineProps<{
  value: [number, number]
  text?: string
}>()
const propsValue = useVModel(props, 'value', emit)
const propsText = useVModel(props, 'text', emit)

function convertNameCodeToLabelValue(data: any) {
  return data.map((item: any) => {
    return {
      label: item.name,
      value: item.code,
      children: item.children ? convertNameCodeToLabelValue(item.children) : [],
    }
  })
}

const options = convertNameCodeToLabelValue(city) as CascaderProps['options']

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}

function onChange(_value: any, selectedOptions: any) {
  propsText.value = selectedOptions.map((o: any) => o.label).join(', ')
}
</script>

<template>
  <a-cascader
    v-model:value="propsValue"
    :options="options"
    :show-search="{ filter }"
    expand-trigger="hover"
    placeholder="选择位置(可输入搜索)"
    @change="onChange"
  />
</template>

<style lang="scss" scoped></style>
