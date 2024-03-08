<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderProps } from 'ant-design-vue'
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
import pcCode from './map/pc-code.json'

const value = ref()

function convertNameCodeToLabelValue(data: any) {
  return data.map((item: any) => {
    return {
      label: item.name,
      value: item.code,
      children: item.children ? convertNameCodeToLabelValue(item.children) : [],
    }
  })
}

const options = convertNameCodeToLabelValue(pcCode) as CascaderProps['options']

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}
</script>

<template>
  <a-cascader v-model:value="value" :show-search="{ filter }" :options="options" placeholder="选择位置(可输入搜索)" />
</template>

<style scoped lang="scss"></style>
