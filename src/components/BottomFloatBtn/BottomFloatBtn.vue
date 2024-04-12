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
    <a-float-button>
      <template #icon>
        <i-navigator to="#">
          <Icon icon="VerticalAlignTopOutlined" />
        </i-navigator>
      </template>
    </a-float-button>
    <a-float-button>
      <template #icon>
        <i-navigator :to="{ name: 'settings' }">
          <Icon icon="SettingOutlined" />
        </i-navigator>
      </template>
    </a-float-button>
  </a-float-button-group>
</template>

<style scoped lang="scss"></style>
