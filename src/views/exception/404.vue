<script lang="ts" setup></script>

<template>
  <div class="error-page">
    <a-result :sub-title="$t('exception.404.description')" :title="$t('exception.404.title')" status="404">
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">
          {{ $t('exception.404.back-home') }}
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
