import Lenis from '@studio-freight/lenis'
// @ts-ignore
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// @ts-ignore
import map from '@/assets/map/map.json'

/**
 * 获取assets文件
 * @param url 文件路径
 * @returns {string}
 */
export function getAssetsFile(url: string) {
  // @ts-ignore
  return new URL(`../assets/${url}`, import.meta.url).href
}

/**
 * 在页面所有图片加载完成后执行回调
 * @param callback 回调函数
 */
export function executeAfterImagesLoaded(callback: () => void): void {
  let count = 0
  const images = Array.from(document.querySelectorAll('img'))
  const checkImagesLoaded = (): void => {
    count++

    if (count === images.length) {
      callback()
    }
  }

  const checkComplete = (image: HTMLImageElement): void => {
    if (image.complete) {
      checkImagesLoaded()
    }
  }

  images.forEach((image) => {
    image.addEventListener('load', checkImagesLoaded)
    checkComplete(image)
  })

  if (images.length === 0) {
    callback()
  }
}

export function initSmoothScrolling() {
  if (typeof window === 'undefined') return
  // @ts-ignore
  if (window.lenis) return
  // @ts-ignore
  window.lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    smoothTouch: true,
  })
  // @ts-ignore
  window.lenis.on('scroll', () => ScrollTrigger.update())
  const scrollFn = (time: any) => {
    // @ts-ignore
    window.lenis.raf(time)
    requestAnimationFrame(scrollFn)
  }
  requestAnimationFrame(scrollFn)
}

export function formatDateStr(str: string) {
  const date = new Date(str)
  return date
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '-')
}

/**
 * 通过 二级 location 找到整个路径
 * @param location 城市代码
 */
export function findFullLocation(location: number) {
  const path = []
  for (const province of map) {
    if (province.children) {
      for (const city of province.children) {
        if (city.code === location) {
          path.push(city)
          break
        }
      }
      if (path.length === 1) {
        path.push(province)
        path.reverse()
        break
      }
    }
  }
  return path
}

/**
 * 通过任意省或者市名称找到整个路径
 * @param name 省市名称
 */
export function findFullLocationByAnyName(name: string) {

  const path: string[] = [];

  function traverse(node: any): boolean {
    if (node.name === name) {
      path.push(node.name);
      return true;
    }

    if (node.children) {
      for (const child of node.children) {
        path.push(node.name);
        if (traverse(child)) {
          return true;
        }
        path.pop();
      }
    }

    return false;
  }

  for (const province of map) {
    if (traverse(province)) {
      break;
    }
  }

  return path;
}
