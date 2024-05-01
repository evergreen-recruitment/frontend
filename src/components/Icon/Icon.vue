<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
})
</script>
<template>
  <component v-bind="$attrs" :is="icon" v-if="icon" :style="{ 'font-size': `${size ? size : null}px` }" />
</template>
