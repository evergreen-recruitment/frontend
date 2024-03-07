<script setup lang="ts">
import IEditor from '@/components/IEditor/IEditor.vue'
import IDiffEditor from '@/components/IDiffEditor/IDiffEditor.vue'
import { ref } from 'vue'

const editorCode = ref("console.log('hello world')")
const language = ref('javascript')
const theme = ref('vs-dark')

const originalCode = ref("console.log('hello world')")
const modifiedCode = ref("console.log('hello world !!!')")
</script>

<template>
  <div class="editor-container">
    <i-card>
      <a-row>
        <a-space>
          <a-select v-model:value="language">
            <a-select-option value="javascript">javascript</a-select-option>
            <a-select-option value="cpp">cpp</a-select-option>
            <a-select-option value="java">java</a-select-option>
          </a-select>
          <a-select v-model:value="theme">
            <a-select-option value="vs-dark">vs-dark</a-select-option>
            <a-select-option value="vs-light">vs-light</a-select-option>
          </a-select>
        </a-space>
      </a-row>
      <br />
      <i-editor v-model:code="editorCode" :language="language" :theme="theme" />
    </i-card>
    <br />
    <i-card>
      <i-diff-editor v-model:original-code="originalCode" v-model:modified-code="modifiedCode" />
    </i-card>
  </div>
</template>

<style scoped lang="scss"></style>
