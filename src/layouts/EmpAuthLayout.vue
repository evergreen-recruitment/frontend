<script lang="ts" setup></script>

<template>
  <div class="i-empauth-layout">
    <div class="i-empauth-layout__container">
      <router-view v-slot="{ Component }" class="i-empauth-layout__container--form">
        <transition-slide :offset="[-16, 0]" mode="out-in">
          <component :is="Component" />
        </transition-slide>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-empauth-layout {
  @apply h-screen flex justify-center items-center;

  @media screen and (max-width: 1280px) {
    //height: 100%;
  }

  @media screen and (max-width: 768px) {
    height: 100%;
  }

  .i-empauth-layout__container {
    @apply flex w-[400px] mx-auto rounded-[30px] overflow-hidden transition-all;

    @include useTheme {
      background: getModeVar('cardBgColor');
    }
    @include useTheme {
      box-shadow: 0 0 10px rgba(getModeVar('infoColor'), 0.1);
    }

    @media screen and (max-width: 1280px) {
      left: 0;
    }

    @media screen and (max-width: 768px) {
      @apply w-full h-screen left-0 rounded-none items-center justify-center;
    }

    .i-empauth-layout__container--form {
      @apply p-[20px] max-h-screen overflow-auto;
    }
  }
}
</style>
