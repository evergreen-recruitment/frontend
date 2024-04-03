<script lang="ts" setup>
import { computed } from 'vue'
import Icon from '@/components/Icon/Icon.vue'

const emit = defineEmits(['update:activeKey'])
const props = defineProps<{
  activeKey: string
}>()
const propsActiveKey = computed({
  get: () => props.activeKey,
  set: (val) => emit('update:activeKey', val),
})

interface DataItem {
  title: string
}

function generateRandomString() {
  return Math.random().toString(36)
}

let data: DataItem[] = Array.from({ length: 5 }).map(() => ({
  title: generateRandomString(),
}))

function handleTabsChange() {
  data = Array.from({ length: 5 }).map(() => ({
    title: generateRandomString(),
  }))
}
</script>

<template>
  <a-popover placement="bottom" trigger="click">
    <a-button class="alert" type="text">
      <Icon icon="AlertOutlined" />
    </a-button>
    <template #content>
      <a-tabs v-model:active-key="propsActiveKey" :tab-bar-gutter="70" @change="handleTabsChange">
        <a-tab-pane key="1" tab="通知">
          <a-list :data-source="data" item-layout="horizontal">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta class="list-meta" description="2023-12-23">
                  <template #title>
                    <router-link class="list-title" to="/">{{ item.title }}</router-link>
                  </template>
                  <template #avatar>
                    <Icon :size="30" icon="InfoCircleOutlined" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" tab="消息">
          <a-list :data-source="data" item-layout="horizontal">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta class="list-meta" description="2023-12-23">
                  <template #title>
                    <router-link class="list-title" to="/">{{ item.title }}</router-link>
                  </template>
                  <template #avatar>
                    <Icon :size="30" icon="InfoCircleOutlined" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="3" tab="待办">
          <a-list :data-source="data" item-layout="horizontal">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta class="list-meta" description="2023-12-23">
                  <template #title>
                    <router-link class="list-title" to="/">{{ item.title }}</router-link>
                  </template>
                  <template #avatar>
                    <Icon :size="30" icon="InfoCircleOutlined" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </template>
  </a-popover>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.alert {
  width: 35px;
  height: 35px;
  margin-right: 10px;
  font-size: 16px;
  padding: 2px;
  border: 1px #eee solid;
  border-radius: 999px;
  @include useTheme {
    color: getModeVar('textColor');
  }
}

.list-meta {
  display: flex;
  justify-content: space-between;
  align-items: center !important;

  .list-title {
    // 单行省略号
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 100%;
  }
}
</style>
