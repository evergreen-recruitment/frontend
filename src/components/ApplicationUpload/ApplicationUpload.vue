<script setup lang="ts">
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import { message, type UploadChangeParam } from 'ant-design-vue'
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'
import {
  activeApplicationApi,
  type ApplicationListType,
  deleteApplicationApi,
  getApplicationListApi,
  uploadApplicationApi,
} from '@/apis/application'

const emit = defineEmits(['update:fileList', 'update:loading'])
const props = defineProps<{
  fileList: any[]
  loading: boolean
}>()
const propsFileList = useVModel(props, 'fileList', emit)
const propsLoading = useVModel(props, 'loading', emit)
const modalState = ref({
  open: false,
  loading: true,
  data: [] as ApplicationListType[],
  onClose: () => {
    modalState.value.data = []
    modalState.value.open = false
    modalState.value.loading = true
    console.log('close')
  },
})

function handleChange(info: UploadChangeParam) {
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

async function getApplicationList() {
  const res = await getApplicationListApi()
  if (res === undefined) {
    message.error('获取简历列表失败')
    return
  }
  modalState.value.data = res
}

async function activeApplication(item: ApplicationListType) {
  const res = await activeApplicationApi(item.id)
  if (res !== true) {
    message.error('激活简历失败')
    return
  }
  message.success('已使用该简历')
  // 查询简历列表
  modalState.value.data.forEach((i) => {
    i.active = i.id === item.id
  })
}

async function deleteApplication(item: ApplicationListType) {
  const res = await deleteApplicationApi(item.id)
  if (res !== true) {
    message.error('删除简历失败')
    return
  }
  message.success('删除简历成功')
  // 查询简历列表 如果剩余最后一个简历，让其激活
  const index = modalState.value.data.findIndex((i) => i.id === item.id)
  modalState.value.data.splice(index, 1)
  if (modalState.value.data.length === 1) {
    modalState.value.data[0].active = true
  }
}

async function openApplicationModal() {
  modalState.value.open = true
  await getApplicationList()
  setTimeout(() => {
    modalState.value.loading = false
  }, 500)
}
</script>

<template>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px">
    <div class="upload">
      <a-upload
        v-model:file-list="propsFileList"
        :custom-request="customUploadApplication"
        :show-upload-list="false"
        accept=".pdf,.jpg,.jpeg,.png"
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
      <a-button @click="openApplicationModal">
        <Icon icon="FolderOpenOutlined" />
        所有简历
      </a-button>
    </div>
    <a-modal
      class="setting-modal"
      v-model:open="modalState.open"
      title="所有简历"
      :footer="null"
      style="border-radius: var(--border-radius); overflow: hidden"
      :bodyStyle="{ padding: 0, overflow: 'auto' }"
      @cancel="modalState.onClose"
      destroyOnClose
      centered
    >
      <a-list :loading="modalState.loading" item-layout="horizontal" :data-source="modalState.data">
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a-button type="link" @click="activeApplication(item)">使用该简历</a-button>
              <a-button v-if="item?.pdfUrl" type="link">
                <a :href="item?.pdfUrl" :download="item?.pdfUrl.split('/').pop()">下载简历附件</a>
              </a-button>
              <a-button type="link" danger @click="deleteApplication(item)">删除简历</a-button>
            </template>
            <a-skeleton avatar :title="false" :loading="!!item.loading" active>
              <a-list-item-meta>
                <template #avatar>
                  <a-watermark
                    v-if="item?.active"
                    content="使用中"
                    :font="{ fontSize: 50, fontWeight: 700, color: 'rgba(0, 0, 0, 0.25)' }"
                    :gap="[60, 250]"
                  >
                    <a-image :width="200" :src="item.imageUrl" />
                  </a-watermark>
                  <a-image v-else :width="200" :src="item.imageUrl" />
                </template>
                <template #title>
                  <div class="text-4xl">何嘉炜</div>
                </template>
                <template #description>
                  <div class="text-2xl">Java后端开发（实习）</div>
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
