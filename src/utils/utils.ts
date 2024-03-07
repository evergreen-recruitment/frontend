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
