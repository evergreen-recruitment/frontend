<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
  progress: number
}>()

const timeProgress = ref(0)
// 定时器 3s 内完成动画
gsap.to(timeProgress, {
  duration: 3, // 3s 内完成动画
  value: props.progress,
  onUpdate: () => {
    // 修改自定义CSS属性值 --per
    const progressBar = document.querySelector('.i-3d-progress-bar') as HTMLElement | null
    if (progressBar) {
      progressBar.style.setProperty('--per', `${timeProgress.value}%`)
    }
  },
})
</script>

<template>
  <div class="i-3d-progress-bar">
    <div class="cube-progress-bar perspective">
      <div class="l-cube">
        <div class="li l-top"></div>
        <div class="li l-bottom"></div>
        <div class="li l-front"></div>
        <div class="li l-back"></div>
        <div class="li l-right"></div>
        <div class="li l-left"></div>
      </div>
    </div>
    <div class="percent-num">{{ timeProgress.toFixed(0) }} %</div>
    <div class="plane perspective"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.i-3d-progress-bar {
  --per: 0%;

  .perspective {
    transform-style: preserve-3d;
    perspective: 520px;
    transform: rotateX(15deg);
  }

  .cube-progress-bar {
    @apply relative h-[150px] left-[-15%] z-[2];
    transform: scale(0.6);

    .l-cube {
      @apply absolute top-[50%] left-[50%] w-[300px] h-[100px];
      transform-style: preserve-3d;
      transform: translate(-50%, -50%) rotateX(-33.5deg);

      .li {
        @apply absolute w-[300px] h-[100px];
        background: linear-gradient(
          90deg,
          rgba(156, 39, 176, 0.3),
          rgba(255, 34, 109, 0.8) 70%,
          rgba(255, 255, 255, 0.6) 70%,
          rgba(255, 255, 255, 0.6)
        );
      }

      .l-top {
        transform: rotateX(90deg) translateZ(50px);
      }

      .l-bottom {
        transform: rotateX(-90deg) translateZ(50px);
      }

      .l-front {
        transform: translateZ(50px);
      }

      .l-back {
        transform: rotateX(-180deg) translateZ(50px);
      }

      .l-left {
        display: none;
      }

      .l-right {
        display: none;
      }
    }
  }

  .cube-progress-bar .l-cube {
    .l-top,
    .l-front,
    .l-bottom,
    .l-back {
      background: linear-gradient(
        90deg,
        rgba(255, 217, 34, 0.6),
        rgba(255, 34, 109, 0.8) var(--per),
        rgba(255, 34, 109, 0.1) var(--per),
        rgba(255, 34, 109, 0.1)
      );
    }
  }

  .percent-num {
    @apply absolute top-[50%] text-2xl z-[2];
    left: calc(50% + 70px);
  }

  .plane {
    @apply absolute w-[200px] h-[200px] rounded-full top-[5%] z-0;
    transform: rotateX(45deg) rotateZ(10deg) translateZ(-13px);
    @include useTheme {
      background: radial-gradient(
        circle,
        rgba(getModeVar('infoColor'), 1),
        rgba(getModeVar('bg1color'), 0.2) 70%,
        rgba(getModeVar('bg1color'), 0) 100%
      );
    }
  }
}
</style>
