<script lang="ts" setup></script>

<template>
  <div class="i-table">
    <a-table v-bind="$attrs" :scroll="{ x: 1200 }" class="i-table__container">
      <template #title>
        <div class="i-table__title">
          <div class="i-table__title--left">
            <slot name="title-left"></slot>
          </div>
          <div class="i-table__title--right">
            <slot name="title-right"></slot>
          </div>
        </div>
      </template>
      <template #action>
        <slot name="action"></slot>
      </template>
    </a-table>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-table {
  width: calc(100% - 20px);
  margin: 10px;

  .i-table__container {
    width: 100%;

    :deep(.ant-table-title) {
      padding: 10px 0 0 0;
    }

    :deep(.ant-table-cell) {
      @include useTheme {
        background: getModeVar('cardBgColor');
      }
      //color: #1677ff;
    }

    :deep(th.ant-table-cell) {
      color: #1677ff;
      font-size: 18px;
    }

    .i-table__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px 10px 10px;
      border-bottom: 2px #1677ff solid;
      color: #1677ff;

      .i-table__title--left {
        font-size: 20px;
        font-weight: 600;
      }

      .i-table__title--right {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
