<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { asyncRouterMap } from '@/router'
import ISide from '@/layouts/components/ISide/ISide.vue'
import IHeader from '@/layouts/components/IHeader/IHeader.vue'
import type { IRouter } from '@/config/router.config'

const route = useRoute() // 路由实例
const router = useRouter() // 路由实例
const menuConfig = reactive({
  menuList: asyncRouterMap, // 菜单列表
  menuListArr: convertToRouterArray(asyncRouterMap.value), // 菜单列表数组
  collapsed: false, // 侧边栏收起
  selectedKeys: [] as string[], // 侧边栏选中的key
  openKeys: [] as string[], // 侧边栏展开的key
  openDrawer: false, // 移动端侧边栏
  hideSide: false, // 隐藏侧边栏
  sideWidth: 240, // 侧边栏宽度
})
const tabList = ref<IRouter[]>([])
const tabConfig = reactive({
  components: {
    Tabs: {
      borderRadius: 10,
      colorBgContainer: '#1677ff',
      colorText: '#4096ff',
      colorPrimary: '#fff',
      fontSize: 14,
      padding: 10,
      margin: 0,
      controlHeight: 30,
      controlHeightLG: 30,
    },
  },
})

/**
 * 将菜单列表转换为数组
 * @param routers 菜单列表
 * @returns 菜单列表数组
 */
function convertToRouterArray(routers: IRouter[]): IRouter[] {
  let result: IRouter[] = []

  routers.forEach((router) => {
    result.push(router)

    if (router.children && router.children.length > 0) {
      const convertedChildren = convertToRouterArray(router.children)
      result = result.concat(convertedChildren)
    }
  })

  return result
}

/**
 * 初始化
 */
function init() {
  const path = router.currentRoute.value.path
  const item = menuConfig.menuListArr.find((item) => item.path === path)
  if (item) {
    menuConfig.selectedKeys = [item.path]
  }
}

/**
 * 处理tab切换
 * @param activeKey 当前选择的tab
 */
function handleTabChange(activeKey: string) {
  router.push(activeKey)
}

/**
 * 处理tab编辑
 * @param activeKey 当前选择的tab
 * @param action 操作
 */
function handleTabEdit(activeKey: string, action: 'add' | 'remove') {
  if (action !== 'remove') {
    return
  }
  let curPath = menuConfig.selectedKeys[0]
  const tabs = tabList.value
  // 关闭当前选择的tab
  if (activeKey === menuConfig.selectedKeys[0]) {
    tabs.forEach((tab, index) => {
      if (tab.path === activeKey) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          curPath = nextTab.path
        }
      }
    })
  }
  tabList.value = tabs.filter((tab) => tab.path !== activeKey)
  if (curPath !== menuConfig.selectedKeys[0]) {
    router.push(curPath)
  }
}

/**
 * 找到子元素的所有父元素
 */
function findParentPath(path: string, routers: IRouter[]): any {
  for (const route of routers) {
    if (route.path === path) {
      return []
    }

    if (route.children) {
      // 递归查找子元素的父元素
      const parentRoutes = findParentPath(path, route.children)
      if (parentRoutes) {
        // 如果找到了父元素，将当前路由对象添加到父元素数组中并返回
        return [...parentRoutes, route]
      }
    }
  }

  // 如果没有找到匹配的父元素，返回 undefined
  return undefined
}

/**
 * 处理路由变化 向tabList中添加tab
 */
watch(
  () => route.path,
  (path) => {
    const item = menuConfig.menuListArr.find((item) => item.path === path) as IRouter
    if (item) {
      menuConfig.selectedKeys = [item.path]
    }
    const curTab = tabList.value.find((item) => item.path === path)
    if (curTab || path === undefined) {
      return
    }
    tabList.value.push(item)
  },
  { immediate: true },
)

/**
 * 处理侧边栏展开
 */
watch(
  () => menuConfig.selectedKeys,
  (selectedKeys) => {
    const item = menuConfig.menuListArr.find((item) => item.path === selectedKeys[0])
    if (item) {
      menuConfig.openKeys = findParentPath(item.path, menuConfig.menuListArr)?.map((item: any) => item.path) || []
    }
  },
  { immediate: true },
)

/**
 * 处理页面布局
 */
function handleWindowResize() {
  const md = 768
  const lg = 1200
  const xl = 1600
  const width = window.innerWidth
  // 页面宽度小于768px时，打开移动端侧边栏
  if (width < md) {
    changeTabConfig(true)
    menuConfig.hideSide = true
    menuConfig.openDrawer = false
    menuConfig.collapsed = false
    // 页面宽度小于1200px时，侧边栏收起, 移动端侧边栏关闭
  } else if (width > md && width < lg) {
    changeTabConfig(false)
    menuConfig.hideSide = false
    menuConfig.openDrawer = false
    menuConfig.collapsed = true
    // 页面宽度大于1200px时，侧边栏展开
  } else if (width > lg) {
    changeTabConfig(false)
    menuConfig.hideSide = false
    menuConfig.collapsed = false
  }
}

/**
 * 修改Tab栏的样式
 * @param isMobile 是否是移动端
 */
function changeTabConfig(isMobile: boolean) {
  if (isMobile) {
    tabConfig.components.Tabs.controlHeight = 25
    tabConfig.components.Tabs.controlHeightLG = 25
    tabConfig.components.Tabs.fontSize = 12
    tabConfig.components.Tabs.padding = 6
  } else {
    tabConfig.components.Tabs.controlHeight = 30
    tabConfig.components.Tabs.controlHeightLG = 30
    tabConfig.components.Tabs.fontSize = 14
    tabConfig.components.Tabs.padding = 10
  }
}

window.addEventListener('resize', handleWindowResize)

/**
 * 页面加载完成后初始化
 */
onMounted(() => {
  init()
  handleWindowResize()
})
</script>

<template>
  <div class="i-layout">
    <a-layout style="flex-direction: column">
      <i-header v-model:menu-collapsed="menuConfig.collapsed" v-model:open-drawer="menuConfig.openDrawer" />
      <a-layout style="gap: 1px">
        <i-side
          v-model:collapsed="menuConfig.collapsed"
          v-model:selected-keys="menuConfig.selectedKeys"
          v-model:open-keys="menuConfig.openKeys"
          :collapsible="true"
          :menu-list="menuConfig.menuList"
          :width="menuConfig.hideSide ? 0 : menuConfig.sideWidth"
          :show-logo="false"
        />
        <a-divider type="vertical" v-if="!menuConfig.hideSide" style="height: calc(100vh - 114px)" />
        <a-layout class="i-layout__inner">
          <!--使用a-config-provider修改单个组件的样式 TODO-->
          <a-config-provider :theme="tabConfig">
            <!--页面切换的Tab栏-->
            <a-tabs
              v-model:active-key="menuConfig.selectedKeys[0]"
              hideAdd
              type="editable-card"
              @change="handleTabChange"
              @edit="handleTabEdit"
            >
              <template v-for="item in tabList" :key="item">
                <a-tab-pane v-if="item" :key="item.path" :closable="tabList.length > 1" :tab="item.meta.title" />
              </template>
            </a-tabs>
          </a-config-provider>
          <a-layout-content>
            <slot></slot>
          </a-layout-content>
          <a-layout-footer>
            <div class="title">vue template Created by pepedd864</div>
            <div class="version">版本号：1.0.0</div>
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>

    <!--移动端侧边栏 a-drawer-->
    <a-drawer
      v-model:open="menuConfig.openDrawer"
      :body-style="{ padding: 0 }"
      :closable="false"
      :width="menuConfig.sideWidth"
      placement="left"
    >
      <i-side
        v-model:selected-keys="menuConfig.selectedKeys"
        v-model:open-keys="menuConfig.openKeys"
        :collapsible="false"
        :menu-list="menuConfig.menuList"
        :width="menuConfig.sideWidth"
        :show-logo="true"
      />
    </a-drawer>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.i-layout {
  .ant-layout {
    --footer-padding: 10px;

    //min-height: 100vh;
    @include useTheme {
      background-color: getModeVar('bgColor');
    }

    .ant-layout-header {
      @include useTheme {
        background-color: getModeVar('cardBgColor');
        color: getModeVar('infoColor');
      }
    }

    .i-layout__content {
      display: flex;
      max-height: calc(100vh - 64px);
    }

    .i-layout__inner {
      @media screen and (max-width: 768px) {
        margin-left: 0;
      }

      .ant-layout-content {
        margin: 0;
        padding: 20px;
        overflow: auto;
        max-height: calc(100vh - 70px - var(--footer-padding) * 2 - 20px - 30px);
        @include useTheme {
          background: getModeVar('containerBgColor');
        }

        @media screen and (max-width: 1280px) {
          padding: 15px;
        }
        @media screen and (max-width: 768px) {
          padding: 10px;
        }
      }

      .ant-layout-footer {
        text-align: center;
        //padding: var(--footer-padding) 5px;
        padding: calc(var(--footer-padding) + 5px) 10px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include useTheme {
          background-color: getModeVar('bg1color');
          color: getModeVar('infoColor');
          border-top: 1px solid getModeVar('borderColor');
        }

        @media screen and (max-width: 768px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          @media screen and (max-width: 768px) {
            font-size: 12px;
          }
        }

        .version {
          @media screen and (max-width: 768px) {
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>
