<script setup lang="ts"></script>

<template>
  <div class="error-page">
    <a-result status="404" :title="$t('exception.404.title')" :sub-title="$t('exception.404.description')">
      <template #extra>
        <a-button type="primary">
          <router-link to="/">{{ $t('exception.404.back-home') }}</router-link>
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
