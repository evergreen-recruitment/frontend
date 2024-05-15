<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:code'])
defineExpose({ formatCode })
const props = defineProps({
  code: {
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
      lineNumbersMinChars: 3,
      minimap: {
        enabled: false,
      },
    }),
  },
})
const propsCode = useVModel(props, 'code', emit)

const editorRef = shallowRef()
const handleMount = (editor: HTMLElement) => (editorRef.value = editor)

/**
 * 格式化代码
 */
function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run()
}
</script>

<template>
  <div class="i-editor">
    <vue-monaco-editor
      v-model:value="propsCode"
      :language="language"
      :options="options"
      :theme="theme"
      v-bind="$attrs"
      @mount="handleMount"
    />
  </div>
</template>

<style lang="scss" scoped>
.i-editor {
  height: 500px;
}
</style>
