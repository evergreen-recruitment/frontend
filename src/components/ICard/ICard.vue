<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    // TODO 组件Ref获取异常 待修复
    // if (this.$refs.instance && Object.keys(this.$refs.instance).length > 0) {
    //   const entries = Object.entries(this.$refs.instance || {})
    //   entries.forEach(([key, value]) => {
    //     // @ts-ignore
    //     this[key] = value
    //   })
    // }
    if (this.padding !== undefined) {
      ;(document.querySelectorAll('.ant-card-body') as NodeListOf<HTMLElement> | null)?.forEach((item: HTMLElement) => {
        item?.style.setProperty('--padding', `${this.padding || '24px'}`)
      })
    }
  },
  props: {
    padding: {
      type: String,
    },
  },
})
</script>

<template>
  <a-card ref="instance" v-bind="$attrs" class="i-card" style="border-radius: var(--border-radius)">
    <template v-for="(value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </a-card>
</template>

<style lang="scss" scoped>
// :deep 必须配合scoped使用?
:deep(.ant-card-body) {
  --padding: 24px;
  padding: var(--padding) !important;
  @media screen and (max-width: 1280px) {
    --padding: 16px;
  }
  @media screen and (max-width: 768px) {
    --padding: 12px;
  }
}
</style>
