<script setup lang="ts">
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import { uploadApplicationApi } from '@/apis/common'
import { message, type UploadChangeParam } from 'ant-design-vue'
import { useVModel } from '@vueuse/core'

const emit = defineEmits(['update:fileList', 'update:loading'])
const props = defineProps<{
  fileList: any[]
  loading: boolean
}>()
const propsFileList = useVModel(props, 'fileList', emit)
const propsLoading = useVModel(props, 'loading', emit)

function handleChange(info: UploadChangeParam) {
  console.log(info)
  if (info.file.status === 'uploading') {
    propsLoading.value = true
    return
  }
  if (info.file.status === 'done') {
    // formState.avatar = info.file.response
    message.success('上传成功')
    propsLoading.value = false
  }
  if (info.file.status === 'error') {
    propsLoading.value = false
    message.error('upload error')
  }
}

async function customUploadApplication(e: UploadRequestOption) {
  const res = await uploadApplicationApi(e.file as File)
  if (res === undefined) {
    message.error('上传失败')
    return
  }
  // @ts-ignore
  e.onSuccess(res, e.file)
}

function openApplicationList() {}
</script>

<template>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px">
    <div class="upload">
      <a-upload
        v-model:file-list="propsFileList"
        :custom-request="customUploadApplication"
        :show-upload-list="false"
        class="avatar-uploader"
        @change="handleChange"
      >
        <template #default>
          <a-button style="width: 100%" type="primary" :disabled="propsLoading">
            <Icon :icon="`${propsLoading ? 'LoadingOutlined' : 'UploadOutlined'}`" />
            上传简历
          </a-button>
        </template>
      </a-upload>
    </div>
    <div class="list">
      <a-button>
        <Icon icon="FolderOpenOutlined" />
        所有简历
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
