<script lang="ts" setup>
import IEmpLayout from '@/layouts/components/IEmpLayout/IEmpLayout.vue'
</script>
<template>
  <i-emp-layout>
    <router-view v-slot="{ Component }">
      <transition-slide :offset="[-16, 0]" mode="out-in">
        <component :is="Component" />
      </transition-slide>
    </router-view>
  </i-emp-layout>
</template>

<style lang="scss" scoped></style>
