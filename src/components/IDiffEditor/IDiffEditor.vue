<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:originalCode', 'update:modifiedCode'])
defineExpose({ getOriginalValue, getModifiedValue })
const props = defineProps({
  originalCode: {
    type: String,
    default: '',
  },
  modifiedCode: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'vs-dark',
  },
  language: {
    type: String,
    default: 'javascript',
  },
  options: {
    type: Object,
    default: () => ({
      // automaticLayout: true,
      // formatOnType: true,
      // formatOnPaste: true,
      readOnly: true,
      lineNumbersMinChars: 3,
      minimap: {
        enabled: false,
      },
    }),
  },
})
const propsOriginalCode = useVModel(props, 'originalCode', emit)
const propsModifiedCode = useVModel(props, 'modifiedCode', emit)
const diffEditorRef = shallowRef()
const handleMount = (diffEditor: HTMLElement) => (diffEditorRef.value = diffEditor)

// get the original value
function getOriginalValue() {
  return diffEditorRef.value.getOriginalEditor().getValue()
}

// get the modified value
function getModifiedValue() {
  return diffEditorRef.value.getModifiedEditor().getValue()
}
</script>

<template>
  <div class="i-diff-editor">
    <vue-monaco-diff-editor
      v-model:modified="propsModifiedCode"
      v-model:original="propsOriginalCode"
      :language="language"
      :options="options"
      :theme="theme"
      @mount="handleMount"
    />
  </div>
</template>

<style lang="scss" scoped>
.i-diff-editor {
  height: 500px;
}
</style>
