<script lang="ts" setup>
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
// @ts-ignore
import map from '@/assets/map/map.json'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:value', 'update:text'])
const props = defineProps<{
  value: [number, number]
  text?: string
}>()
const propsValue = useVModel(props, 'value', emit)
const propsText = useVModel(props, 'text', emit)
const options = map

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}

function onChange(_value: any, selectedOptions: any) {
  propsText.value = selectedOptions.map((o: any) => o.name).join(', ')
}
</script>

<template>
  <a-cascader
    v-bind="$attrs"
    v-model:value="propsValue"
    :options="options"
    :field-names="{ label: 'name', value: 'code', children: 'children' }"
    :show-search="{ filter }"
    expand-trigger="hover"
    placeholder="选择位置(可输入搜索)"
    @change="onChange"
  />
</template>

<style lang="scss" scoped></style>
