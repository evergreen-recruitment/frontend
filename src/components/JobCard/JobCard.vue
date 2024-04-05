<script setup lang="ts">
import { useAppStore } from '@/stores'
import variables from '@/styles/variables.module.scss'
import type { SimpleJobItemType } from '@/apis/job'

defineProps<{
  job: SimpleJobItemType
}>()

const appStore = useAppStore()

// TODO
// onMounted(() => {
//   const multiple = 5
//   const element = document.querySelector('.job-card') as HTMLElement
//
//   function transformElement(x: number, y: number) {
//     let box = element.getBoundingClientRect()
//     let calcX = -(y - box.y - box.height / 2) / multiple
//     let calcY = (x - box.x - box.width / 2) / multiple
//
//     element.style.transform = 'rotateX(' + calcX + 'deg) ' + 'rotateY(' + calcY + 'deg)'
//   }
//
//   element.addEventListener('mousemove', (e) => {
//     window.requestAnimationFrame(function () {
//       transformElement(e.clientX, e.clientY)
//     })
//   })
//
//   element.addEventListener('mouseleave', (e) => {
//     window.requestAnimationFrame(function () {
//       element.style.transform = 'rotateX(0) rotateY(0)'
//     })
//   })
// })
</script>

<template>
  <i-navigator class="job-card card" :to="{ name: 'jobDetail', query: { jobId: job.id } }" open-in-new-window>
    <div class="job-card__header">
      <div class="job-card__header--title">{{ job.title }}</div>
      <div class="job-card__header--salary">{{ `${job.salary[0]}-${job.salary[1]}` }}</div>
    </div>
    <div class="job-card__content">
      <div class="job-card__content--company">{{ job.companyName }}</div>
      <div class="job-card__content--address">{{ job.cityName }}</div>
      <div class="job-card__content--tags">
        <a-tag :color="variables[appStore.themeName]" v-for="t in job.jobSkills" :key="t">{{ t }}</a-tag>
      </div>
    </div>
  </i-navigator>
</template>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.job-card {
  @apply w-72 rounded-[var(--border-radius)] shadow-md cursor-pointer;
  //transform-style: preserve-3d;
  //transition: all 0.2s;

  @include useTheme {
    background: getModeVar('cardBgColor');
  }

  .job-card__header {
    @apply flex justify-between items-center px-4 py-2;
    .job-card__header--title {
      @apply text-lg font-bold;
    }

    .job-card__header--salary {
      @apply text-lg font-bold text-red-500;
    }
  }

  .job-card__content {
    @apply px-4 py-2;
    .job-card__content--company {
      @apply text-lg font-bold;
    }

    .job-card__content--address {
      @apply text-gray-500;
    }

    .job-card__content--tags {
      @apply mt-2;
      a-tag {
        @apply mb-2;
      }
    }
  }
}
</style>
