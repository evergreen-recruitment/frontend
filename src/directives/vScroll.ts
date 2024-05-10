// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
import type { DirectiveBinding } from 'vue'

export default {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 元素出现在视口区域时执行函数
        binding.value()
        stop()
      }
    })
  },
}
