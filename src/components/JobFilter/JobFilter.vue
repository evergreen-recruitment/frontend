<script setup lang="ts"></script>

<template>
  <div class="job-filter">
    <a-space-compact block>
      <a-dropdown class="job-type" trigger="click">
        <a-button> 职位类型</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item> 1 </a-menu-item>
            <a-menu-item> 2 </a-menu-item>
            <a-menu-item> 3 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown class="apply-type" trigger="click">
        <a-button> 求职类型</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item> 不限 </a-menu-item>
            <a-menu-item> 全职 </a-menu-item>
            <a-menu-item> 兼职 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown class="experience-type" trigger="click">
        <a-button> 工作经验</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item> 不限 </a-menu-item>
            <a-menu-item> 在校生 </a-menu-item>
            <a-menu-item> 应届生 </a-menu-item>
            <a-menu-item> 经验不限 </a-menu-item>
            <a-menu-item> 一年以内 </a-menu-item>
            <a-menu-item> 1-3年 </a-menu-item>
            <a-menu-item> 3-5年 </a-menu-item>
            <a-menu-item> 5-10年 </a-menu-item>
            <a-menu-item> 10年以上 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown class="Nature treatment" trigger="click">
        <a-button> 薪资待遇</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item> 不限 </a-menu-item>
            <a-menu-item> 3k以下 </a-menu-item>
            <a-menu-item> 3k-5k </a-menu-item>
            <a-menu-item> 5k-10k </a-menu-item>
            <a-menu-item> 10k-20k </a-menu-item>
            <a-menu-item> 20k-50k </a-menu-item>
            <a-menu-item> 50k以上 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-space-compact>
  </div>
</template>

<style scoped lang="scss"></style>
