<script setup lang="ts"></script>

<template>
  <a-float-button-group
    trigger="click"
    type="primary"
    style="position: fixed; right: 50px; bottom: 100px; z-index: 999"
  >
    <template #icon>
      <Icon icon="AppstoreOutlined" />
    </template>
    <a-float-button @click="$router.push('#')">
      <template #icon>
        <Icon icon="VerticalAlignTopOutlined" />
      </template>
    </a-float-button>
    <a-float-button @click="$router.push('/settings')">
      <template #icon>
        <Icon icon="SettingOutlined" />
      </template>
    </a-float-button>
  </a-float-button-group>
</template>

<style scoped lang="scss"></style>
