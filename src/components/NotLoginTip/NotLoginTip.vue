<script setup lang="ts">
defineProps<{
  isLogin: boolean
  delivered: boolean
}>()
</script>

<template>
  <div v-if="!isLogin || !delivered" class="not-login">
    <div class="title">{{ !isLogin ? '未登录' : !delivered ? '未上传简历' : '' }}</div>
    <div class="desc">
      <a-button type="primary" @click="$router.push('/recommend')">根据推荐步骤使用本系统</a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 通用未登录样式
.not-login {
  @apply flex flex-col items-center justify-center w-full h-full text-2xl;
  .title {
    @apply font-bold;
  }
}
</style>
