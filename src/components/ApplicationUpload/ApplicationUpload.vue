<script setup lang="ts">
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import { uploadApplicationApi } from '@/apis/common'
import { message, type UploadChangeParam } from 'ant-design-vue'
import { useVModel } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['update:fileList', 'update:loading'])
const props = defineProps<{
  fileList: any[]
  loading: boolean
}>()
const propsFileList = useVModel(props, 'fileList', emit)
const propsLoading = useVModel(props, 'loading', emit)
const modelState = ref({
  open: false,
  loading: true,
  data: [],
})

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

onMounted(() => {
  const count = 5
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      modelState.value.loading = false
      modelState.value.data = res.results
    })
})
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
      <a-button @click="modelState.open = true">
        <Icon icon="FolderOpenOutlined" />
        所有简历
      </a-button>
    </div>
    <a-modal
      class="setting-modal"
      v-model:open="modelState.open"
      title="所有简历"
      :footer="null"
      style="border-radius: var(--border-radius); overflow: hidden"
      :bodyStyle="{ padding: 0, overflow: 'auto' }"
      destroyOnClose
      centered
    >
      <a-list :loading="modelState.loading" item-layout="horizontal" :data-source="modelState.data">
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a-button type="link">使用该简历</a-button>
              <a-button type="link">删除简历</a-button>
            </template>
            <a-skeleton avatar :title="false" :loading="!!item.loading" active>
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                </template>
                <template #avatar>
                  <a-image :width="200" :src="item.picture.large" />
                </template>
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </a-modal>
  </div>
</template>

<style scoped lang="scss"></style>
