// 使用动态引入按需加载
const btn = document.getElementById('btn')
btn.onclick = function () {
  import('./xxx.js').then(module => {
    module.hello()
  })
}
