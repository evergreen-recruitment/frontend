<script setup lang="ts"></script>

<template>
  <div class="job-item">
    <div class="top">
      <div class="left">
        <div class="job-title">Python工程师</div>
        <div class="other">
          <div class="job-salary">10k-20k</div>
          <div class="job-experience">
            <a-tag>3-5年</a-tag>
          </div>
          <div class="job-education">
            <a-tag>本科</a-tag>
          </div>
          <div class="job-hr">
            <a-tag>黄先生</a-tag>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="company">易邮国际物流</div>
      </div>
    </div>
    <div class="bottom">
      <div class="job-tags">
        <a-tag color="blue">Python</a-tag>
        <a-tag color="blue">Django</a-tag>
        <a-tag color="blue">Flask</a-tag>
        <a-tag color="blue">Tornado</a-tag>
      </div>
      <div class="job-time">发布时间：2021-08-01</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.job-item {
  @apply mb-5 rounded-2xl shadow-lg overflow-hidden;

  @include useTheme {
    background-color: getModeVar('cardBgColor');
  }

  .top {
    @apply flex pt-5 px-5 justify-between items-center;
    .left {
      .job-title {
        @apply text-2xl font-bold;

        @include useTheme {
          color: getColor('primary');
        }
      }

      .other {
        @apply flex items-center mt-5 ml-1;
        .job-salary {
          @apply text-lg mr-3 text-red-600;
        }
      }
    }

    .right {
      .company {
        @apply text-lg;
      }
    }
  }

  .bottom {
    @apply h-12 px-5 flex justify-between items-center;

    @include useTheme {
      background: linear-gradient(0deg, rgba(getColor('primary'), 0.2), getModeVar('cardBgColor'));
    }

    .job-tags {
      a-tag {
      }
    }

    .job-time {
      @apply text-sm text-gray-500;
    }
  }
}
</style>
