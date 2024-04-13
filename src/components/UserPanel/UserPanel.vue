<script setup lang="ts">
import { findFullJobType, findFullLocation, formatDateStr } from '@/utils/utils'
import type { UserInfoType } from '@/apis/user'
import { ref } from 'vue'

const props = defineProps<{
  userInfo: UserInfoType
}>()
const jobCategory = ref(findFullJobType(props.userInfo.hopeJob!))
const jobName = ref(jobCategory.value[1].name)
</script>

<template>
  <a-badge-ribbon :text="jobName">
    <div class="user-panel card">
      <div class="user-panel-top">
        <div class="left">
          <div class="avatar">
            <img :src="userInfo?.avatar" />
          </div>
        </div>
        <div class="right">
          <div class="real-name">{{ userInfo.realName }}</div>
          <div class="info-panel">
            <div class="gender">{{ userInfo.gender == 1 ? '男' : '女' }}</div>
            <div class="age">{{ userInfo.age }}岁</div>
            <div class="location">{{ findFullLocation(userInfo.location as number)[1].name }}</div>
          </div>
          <div class="phone"><Icon icon="PhoneOutlined" />&nbsp; {{ userInfo.phone }}</div>
        </div>
        <div class="user-panel-float-top">
          <slot name="float-top"></slot>
        </div>
        <div class="user-panel-float-bottom">
          <slot name="float-bottom"></slot>
        </div>
      </div>
      <div class="user-panel-bottom">
        <div class="apply-status">
          <div class="title">求职状态</div>
          <div class="status">在职-暂不考虑</div>
        </div>
        <div class="join-time">
          <div class="title">加入时间</div>
          <div class="status">{{ formatDateStr(userInfo.createTime as string) }}</div>
        </div>
      </div>
    </div>
  </a-badge-ribbon>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.user-panel {
  @apply p-5 pb-10 rounded-[var(--border-radius)] shadow-lg box-border;

  @include useTheme {
    background-color: getModeVar('cardBgColor');
  }

  .user-panel-top {
    @apply relative flex items-center space-x-5 pl-7;

    .left {
      @apply w-24 h-24 rounded-full overflow-hidden;

      @include useTheme {
        box-shadow: 0 0 10px rgba(getColor('primary'), 1);
      }

      .avatar {
        @apply flex items-center justify-center w-full h-full;

        @include useTheme {
          background: getColor('primary');
        }

        img {
          @apply w-full h-full object-cover object-center;
        }
      }
    }

    .right {
      @apply flex flex-col;

      .real-name {
        @apply text-5xl mb-5;
      }

      .info-panel {
        @apply flex items-center space-x-5;
      }

      .phone {
        @apply mt-2;
      }
    }

    .user-panel-float-top {
      @apply absolute right-5 top-5;
    }

    .user-panel-float-bottom {
      @apply absolute right-5 top-20;
    }
  }

  .user-panel-bottom {
    @apply flex justify-between space-x-6 mt-5;

    .title {
      @apply text-lg font-bold;
    }

    .status {
      @apply text-sm text-gray-500 mt-2;
    }

    .apply-status {
      @apply flex flex-col items-start justify-center;
    }

    .join-time {
      @apply flex flex-col items-start justify-center;
    }
  }
}
</style>
