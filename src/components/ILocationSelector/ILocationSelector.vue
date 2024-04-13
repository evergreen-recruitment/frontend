<script lang="ts" setup>
import type { ShowSearchType } from 'ant-design-vue/es/cascader'
// @ts-ignore
import map from '@/assets/map/map.json'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:value', 'update:text'])
const props = defineProps<{
  value: [number, number] | undefined
  text?: string
  addNationwide?: boolean
}>()
const propsValue = useVModel(props, 'value', emit)
const propsText = useVModel(props, 'text', emit)
if (props.addNationwide) {
  if (map[0].name !== '全国') {
    map.unshift({
      code: 10,
      name: '全国',
      children: [
        {
          code: 0,
          name: '全国',
          children: null,
        },
      ],
    })
  }
}
const options = map

const filter: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option) => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}

function onChange(_value: any, selectedOptions: any) {
  if (!selectedOptions) return
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
