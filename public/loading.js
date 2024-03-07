// 设置禁止元素选中
document.onselectstart = function () {
  return false
}

// 自定义开始加载事件
const startEvent = new CustomEvent('loading')

// 自定义加载完成事件
const loadEvent = new CustomEvent('loaded')

// 开始加载
document.addEventListener('loading', function () {
  let loadingDom = document.querySelector('#loading')
  loadingDom.style.opacity = 1
  loadingDom.style.display = 'flex'
  loadingDom.addEventListener('transitionend', function () {
    if (loadingDom.style.opacity === '1') {
      loadingDom.style.display = 'flex'
    }
  })
})

// 加载完成
document.addEventListener('loaded', function () {
  let loadingDom = document.querySelector('#loading')
  loadingDom.style.opacity = 0
  loadingDom.addEventListener('transitionend', function () {
    if (loadingDom.style.opacity === '0') {
      loadingDom.style.display = 'none'
    }
  })
})
