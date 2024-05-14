import type { DirectiveBinding } from 'vue'
import { useAppStore } from '@/stores'

let DURATION = 500
const DISTANCE = 100
const animationMap = new WeakMap()

const ob = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // @ts-ignore
        if (entry.boundingClientRect.top > entry.rootBounds.top) {
          const animation = animationMap.get(entry.target)[0]
          animation.play()
        } else {
          const animation = animationMap.get(entry.target)[1]
          animation.play()
        }
        // ob.unobserve(entry.target)
      }
    }
  },
  {
    threshold: 0.3,
  },
)

const isBelowViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const appStore = useAppStore()
    // if (!binding.value?.enter && !isBelowViewport(el)) {
    //   // console.log(!binding.value?.enter, !isBelowViewport(el))
    //   return
    // }
    if (appStore.openAnimation === false) {
      return
    }
    if (binding.value?.enter) {
      DURATION = 300 + 100 * Math.floor(Math.random() * 5)
    }
    const animationBottom = el.animate(
      [
        {
          filter: 'blur(10px)',
          opacity: 0,
          transform: `translateY(${binding && binding.value && binding.value.distance || DISTANCE}px)`,
        },
        {
          filter: 'blur(0)',
          opacity: 1,
          transform: 'translateY(0)',
        },
      ],
      {
        duration: binding && binding.value && binding.value.duration || DURATION,
        easing: 'ease-in-out',
      },
    )
    const animationTop = el.animate(
      [
        {
          filter: 'blur(10px)',
          opacity: 0,
          transform: `translateY(${-(binding && binding.value && binding.value.distance || DISTANCE)}px)`,
        },
        {
          filter: 'blur(0)',
          opacity: 1,
          transform: 'translateY(0)',
        },
      ],
      {
        duration: binding && binding.value && binding.value.duration || DURATION,
        easing: 'ease-in-out',
      },
    )
    animationBottom.pause()
    animationMap.set(el, [animationBottom, animationTop])
    ob.observe(el)
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el)
  },
}
