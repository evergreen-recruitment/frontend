import type { DirectiveBinding } from 'vue'

let DURATION = 500
const DISTANCE = 100
const animationMap = new WeakMap()
const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = animationMap.get(entry.target)
      animation.play()
      ob.unobserve(entry.target)
    }
  }
})
const isBelowViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (!binding.value?.enter && !isBelowViewport(el)) {
      return
    }
    if (binding.value?.enter) {
      DURATION = Math.random() * 300 + 200
    }
    const animation = el.animate(
      [
        {
          filter: 'blur(10px)',
          transform: `translateX(${(binding && binding.value && binding.value.distance) || DISTANCE}px)`,
          opacity: 0,
        },
        {
          filter: 'blur(0)',
          transform: 'translateX(0)',
          opacity: 1,
        },
      ],
      {
        duration: (binding && binding.value && binding.value.duration) || DURATION,
        easing: 'ease-in-out',
      },
    )
    animation.pause()
    animationMap.set(el, animation)
    ob.observe(el)
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el)
  },
}
