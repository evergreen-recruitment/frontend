<script setup lang="ts">
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
      v-model:original="propsOriginalCode"
      v-model:modified="propsModifiedCode"
      :theme="theme"
      :language="language"
      :options="options"
      @mount="handleMount"
    />
  </div>
</template>

<style scoped lang="scss">
.i-diff-editor {
  height: 500px;
}
</style>
