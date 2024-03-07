<script lang="ts" setup>
defineProps<{
  menuList: any[]
}>()
</script>

<template>
  <a-menu class="i-menu" v-bind="$attrs" :inline-indent="15" mode="inline">
    <!-- 或者使用 mode="inline" -->
    <template v-for="item in menuList" :key="item.path">
      <a-sub-menu v-if="'children' in item" :key="item.path">
        <template #title>
          <Icon :icon="item.meta.icon" />
          <span>{{ item.name }}</span>
        </template>
        <template v-for="subItem in item.children" :key="subItem.path">
          <a-sub-menu v-if="'children' in subItem" :key="subItem.path">
            <template #title>
              <Icon :icon="subItem.meta.icon" />
              <span>{{ subItem.name }}</span>
            </template>
            <a-menu-item v-for="subSubItem in subItem.children" :key="subSubItem.path">
              <router-link :to="subSubItem.path">
                <Icon :icon="subSubItem.meta.icon" />
                <span>{{ subSubItem.name }}</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="subItem.path!">
            <router-link :to="subItem.path">
              <Icon :icon="subItem.meta.icon" />
              <span>{{ subItem.name }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
      <a-menu-item v-else :key="item.path!">
        <router-link :to="item.path">
          <Icon :icon="item.meta.icon" />
          <span>{{ item.name }}</span>
        </router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-menu {
  background: transparent !important;
  border-inline-end: none !important;

  :deep(.ant-menu-title-content) {
    box-sizing: border-box;
    height: 46px;
    margin: 10px 7px 0 7px;
    width: calc(100% - 14px);
    @include useTheme {
      //background: getModeVar('bgColor');
      //border-bottom: 2px solid getModeVar('borderColor');
    }
  }

  :deep(.ant-menu-item),
  :deep(.ant-menu-submenu-title) {
    box-sizing: border-box;
    height: 46px;
    margin: 3px 0;
    width: 100%;
  }

  :deep(.ant-menu),
  :deep(.ant-menu-sub),
  :deep(.ant-menu-inline) {
    background: transparent !important;
  }

  :deep(.ant-menu-item-selected) {
    @include useTheme {
      //border: 2px solid getModeVar('primary');
      background-color: getColor('primary') !important;
      //color: getColor('primary');
      color: #ffffff;
    }
  }
}
</style>
