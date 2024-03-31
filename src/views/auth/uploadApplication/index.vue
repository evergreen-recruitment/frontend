<script setup lang="ts"></script>

<template>
  <div class="upload-application">
    <div class="i-auth-title">上传简历</div>
    <a-form>
      <a-form-item>
        <a-button type="primary" style="width: 100%" @click="$router.push('/')">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.upload-application {
  width: calc(100% - 270px);

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  .i-auth-title {
    @apply text-3xl font-bold text-center m-5 drop-shadow-md;
  }
}
</style>
