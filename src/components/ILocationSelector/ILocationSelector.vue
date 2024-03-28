<script setup lang="ts">
import type { CascaderProps } from 'ant-design-vue'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
import city from './map/city.json'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:value'])
const props = defineProps<{
  value: string[]
}>()
const propsValue = useVModel(props, 'value', emit)

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
</script>

<template>
  <a-cascader
    v-model:value="propsValue"
    :show-search="{ filter }"
    :options="options"
    placeholder="选择位置(可输入搜索)"
  />
</template>

<style scoped lang="scss"></style>
