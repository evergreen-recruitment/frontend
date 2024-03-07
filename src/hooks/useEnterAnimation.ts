export type EnterAnimationOptions = {
  type: 'x' | 'y'
  duration?: number
}

/**
 * 元素进入动画
 * @param target 选择器 将选择全部元素
 * @param options 动画选项
 */
export default function useEnterAnimation(target: string, options?: EnterAnimationOptions) {
  // 获取元素
  const els = document.querySelectorAll(target) as unknown as HTMLElement[]
  // 添加类名
  els.forEach((el: HTMLElement) => {
    el.classList.add(`enter-${options?.type}`)
    if (options?.duration) {
      el.style.setProperty('--enter-duration', `${options?.duration}s`)
    }
  })
}
